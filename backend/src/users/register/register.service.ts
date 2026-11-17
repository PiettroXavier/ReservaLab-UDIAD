import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { hashPassword } from '../../common/password.util';
import { toUserResponse } from '../../common/user-response.util';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: RegisterDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          id: BigInt(dto.id),
          name: dto.name,
          password: await hashPassword(dto.password),
          coordinator: dto.coordinator ?? false,
        },
      });
      return toUserResponse(user);
    } catch (error) {
      if (isPrismaError(error, 'P2002')) {
        throw new ConflictException('Já existe um usuário com esse ID.');
      }
      throw error;
    }
  }
}

function isPrismaError(error: unknown, code: string): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === code;
}