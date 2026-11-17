import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { authenticateCoordinator } from '../common/auth.util';
import { parseReserveId } from '../common/ids.util';
import { compareTimes, formatTime, parseTime } from '../common/time.util';
import { CoordinatorActionDto } from './dto/coordinator-action.dto';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { RejectReserveDto } from './dto/reject-reserve.dto';

@Injectable()
export class ReserveService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReserveDto) {
    const studentIds = dto.studentIds.map((id) => BigInt(id));
    const space = await this.prisma.space.findUnique({ where: { id: dto.spaceId } });
    if (!space) throw new NotFoundException('Espaço não encontrado.');

    const students = await this.prisma.user.findMany({ where: { id: { in: studentIds } } });
    if (students.length !== studentIds.length) {
      throw new BadRequestException('Um ou mais usuários informados não existem.');
    }

    const start = parseTime(dto.start);
    const end = parseTime(dto.end);
    if (compareTimes(start, end) >= 0) {
      throw new BadRequestException('O horário de saída deve ser posterior ao de entrada.');
    }
    if (compareTimes(start, space.opening) < 0 || compareTimes(end, space.closing) > 0) {
      throw new BadRequestException('A reserva precisa estar dentro do horário de funcionamento do espaço.');
    }

    const overlapping = await this.prisma.reserve.findFirst({
      where: {
        space: dto.spaceId,
        status: { in: [0, 1] },
        start: { lt: end },
        end: { gt: start },
      },
    });
    if (overlapping) {
      throw new ConflictException('Esse horário conflita com outra reserva ativa do espaço.');
    }

    const reservation = await this.prisma.reserve.create({
      data: {
        student: studentIds,
        coordenator: space.responsable,
        space: space.id,
        start,
        end,
        descripition: dto.description,
      },
    });
    return this.toResponse(reservation);
  }

  async approve(id: string, dto: CoordinatorActionDto) {
    const reservation = await this.authorizeResponsible(id, dto);
    if (reservation.status !== 0) {
      throw new ConflictException('Somente reservas pendentes (status 0) podem ser aprovadas.');
    }
    return this.changeStatus(reservation.id, [0], 1);
  }

  async reject(id: string, dto: RejectReserveDto) {
    const reservation = await this.authorizeResponsible(id, dto);
    if (![0, 1].includes(reservation.status)) {
      throw new ConflictException('Somente reservas pendentes ou aprovadas podem ser recusadas.');
    }
    return this.changeStatus(reservation.id, [0, 1], 2, dto.description);
  }

  async close(id: string, dto: CoordinatorActionDto) {
    const reservation = await this.authorizeResponsible(id, dto);
    if (reservation.status !== 1) {
      throw new ConflictException('Somente reservas aprovadas (status 1) podem ser encerradas.');
    }
    return this.changeStatus(reservation.id, [1], 3);
  }

  private async authorizeResponsible(id: string, dto: CoordinatorActionDto) {
    const reservationId = parseReserveId(id);
    const reservation = await this.prisma.reserve.findUnique({
      where: { id: reservationId },
      include: { space_reserve_spaceTospace: true },
    });
    if (!reservation) throw new NotFoundException('Reserva não encontrada.');

    const coordinator = await authenticateCoordinator(this.prisma, dto.coordinatorId, dto.password);
    const space = reservation.space_reserve_spaceTospace;
    if (!space || space.responsable !== coordinator.id) {
      throw new ForbiddenException('Somente o coordenador responsável pelo espaço pode alterar a reserva.');
    }
    return reservation;
  }

  private async changeStatus(
    id: bigint,
    allowedStatuses: number[],
    status: number,
    description?: string,
  ) {
    const result = await this.prisma.reserve.updateMany({
      where: { id, status: { in: allowedStatuses } },
      data: { status, ...(description !== undefined ? { descripition: description } : {}) },
    });
    if (result.count === 0) {
      throw new ConflictException('O status da reserva foi alterado por outra operação.');
    }

    const updated = await this.prisma.reserve.findUniqueOrThrow({ where: { id } });
    return this.toResponse(updated);
  }

  private toResponse(reservation: {
    id: bigint;
    student: bigint[];
    coordenator: bigint;
    descripition: string | null;
    start: Date;
    end: Date;
    space: number | null;
    status: number;
  }) {
    return {
      id: reservation.id.toString(),
      studentIds: reservation.student.map(Number),
      coordinatorId: Number(reservation.coordenator),
      description: reservation.descripition,
      start: formatTime(reservation.start),
      end: formatTime(reservation.end),
      spaceId: reservation.space,
      status: reservation.status,
    };
  }
}