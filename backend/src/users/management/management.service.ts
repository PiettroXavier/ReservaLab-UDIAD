import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { parseUserId } from '../../common/ids.util';
import { hashPassword, verifyPassword } from '../../common/password.util';
import { toUserResponse } from '../../common/user-response.util';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(id: string, dto: UpdateProfileDto) {
    if (dto.name === undefined && dto.newPassword === undefined) {
      throw new BadRequestException('Informe ao menos o nome ou a nova senha.');
    }

    const userId = parseUserId(id);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    if (!(await verifyPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Senha atual incorreta.');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.newPassword !== undefined ? { password: await hashPassword(dto.newPassword) } : {}),
      },
    });
    return toUserResponse(updated);
  }

  async deleteAccount(id: string, dto: DeleteAccountDto) {
    const userId = parseUserId(id);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    if (!(await verifyPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const [spaces, reservations] = await Promise.all([
      this.prisma.space.count({ where: { responsable: userId } }),
      this.prisma.reserve.count({ where: { coordenator: userId } }),
    ]);
    if (spaces > 0 || reservations > 0) {
      throw new ConflictException(
        'Reatribua os espaços e as reservas vinculados antes de excluir a conta.',
      );
    }

    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'Conta excluída.' };
  }
}
