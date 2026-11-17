import { BadRequestException } from '@nestjs/common';

export function parseUserId(value: string | number): bigint {
  const text = String(value);
  if (!/^\d{5}$/.test(text)) {
    throw new BadRequestException('O ID do usuário deve conter exatamente 5 dígitos.');
  }
  return BigInt(text);
}

export function parseReserveId(value: string): bigint {
  if (!/^\d+$/.test(value)) {
    throw new BadRequestException('ID de reserva inválido.');
  }
  return BigInt(value);
}

export function parseSpaceId(value: string): number {
  if (!/^\d+$/.test(value)) {
    throw new BadRequestException('ID de espaço inválido.');
  }
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1 || id > 32767) {
    throw new BadRequestException('ID de espaço fora do intervalo válido.');
  }
  return id;
}
