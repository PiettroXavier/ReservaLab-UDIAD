import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { authenticateCoordinator } from '../common/auth.util';
import { parseSpaceId, parseUserId } from '../common/ids.util';
import { compareTimes, formatTime, parseTime } from '../common/time.util';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@Injectable()
export class SpaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSpaceDto) {
    const responsableId = parseUserId(dto.responsableId);
    const responsable = await this.prisma.user.findUnique({ where: { id: responsableId } });
    if (!responsable || !responsable.coordinator) {
      throw new BadRequestException('O responsável precisa ser um usuário coordenador existente.');
    }
    const opening = parseTime(dto.opening);
    const closing = parseTime(dto.closing);
    this.ensureValidHours(opening, closing);

    const space = await this.prisma.space.create({
      data: {
        name: dto.name,
        opening_days: dto.openingDays,
        opening,
        closing,
        responsable: responsableId,
      },
    });
    return this.toResponse(space);
  }

  async update(id: string, dto: UpdateSpaceDto) {
    if (
      dto.name === undefined &&
      dto.openingDays === undefined &&
      dto.opening === undefined &&
      dto.closing === undefined &&
      dto.newResponsableId === undefined
    ) {
      throw new BadRequestException('Informe ao menos um dado para atualizar.');
    }

    const spaceId = parseSpaceId(id);
    const current = await this.prisma.space.findUnique({ where: { id: spaceId } });
    if (!current) throw new NotFoundException('Espaço não encontrado.');

    const coordinator = await authenticateCoordinator(this.prisma, dto.responsableId, dto.password);
    if (coordinator.id !== current.responsable) {
      throw new ForbiddenException('Somente o responsável atual pode editar este espaço.');
    }

    const opening = dto.opening === undefined ? current.opening : parseTime(dto.opening);
    const closing = dto.closing === undefined ? current.closing : parseTime(dto.closing);
    this.ensureValidHours(opening, closing);

    let responsable = current.responsable;
    if (dto.newResponsableId !== undefined) {
      responsable = parseUserId(dto.newResponsableId);
      const newResponsable = await this.prisma.user.findUnique({ where: { id: responsable } });
      if (!newResponsable || !newResponsable.coordinator) {
        throw new BadRequestException('O novo responsável precisa ser um usuário coordenador existente.');
      }
    }

    const updated = await this.prisma.space.update({
      where: { id: spaceId },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.openingDays !== undefined ? { opening_days: dto.openingDays } : {}),
        opening,
        closing,
        responsable,
      },
    });
    return this.toResponse(updated);
  }

  private ensureValidHours(opening: Date, closing: Date) {
    if (compareTimes(opening, closing) >= 0) {
      throw new BadRequestException('O fechamento deve ocorrer depois da abertura.');
    }
  }

  private toResponse(space: {
    id: number;
    name: string;
    opening_days: number[];
    opening: Date;
    closing: Date;
    responsable: bigint;
  }) {
    return {
      id: space.id,
      name: space.name,
      openingDays: space.opening_days,
      opening: formatTime(space.opening),
      closing: formatTime(space.closing),
      responsableId: Number(space.responsable),
    };
  }
}