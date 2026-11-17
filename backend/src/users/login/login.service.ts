import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { verifyPassword } from '../../common/password.util';
import { toUserResponse } from '../../common/user-response.util';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { id: BigInt(dto.id) } });
    if (!user || !(await verifyPassword(dto.password, user.password))) {
      throw new UnauthorizedException('ID ou senha inválidos.');
    }
    return toUserResponse(user);
  }
}