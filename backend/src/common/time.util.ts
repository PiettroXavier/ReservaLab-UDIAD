import { BadRequestException } from '@nestjs/common';

const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/;

export function parseTime(value: string): Date {
  if (!TIME_PATTERN.test(value)) {
    throw new BadRequestException('Horário inválido. Use HH:mm, HH:mm:ss ou HH:mm:ss.SSS.');
  }

  const [hour, minute, secondPart = '0'] = value.split(':');
  const [second, millisecondPart = '0'] = secondPart.split('.');
  const milliseconds = Number(millisecondPart.padEnd(3, '0'));
  return new Date(Date.UTC(1970, 0, 1, Number(hour), Number(minute), Number(second), milliseconds));
}

export function compareTimes(left: Date, right: Date): number {
  return left.getTime() - right.getTime();
}

export function formatTime(value: Date): string {
  return value.toISOString().slice(11, 23).replace(/\.000$/, '');
}
