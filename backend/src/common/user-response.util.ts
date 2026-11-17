import type { user } from '@prisma/client';

export function toUserResponse(value: user) {
  const { password: _password, ...safeUser } = value;
  return { ...safeUser, id: Number(value.id) };
}
