import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { parseUserId } from './ids.util';
import { verifyPassword } from './password.util';

export async function authenticateUser(
  prisma: PrismaService,
  userId: string | number,
  password: string,
) {
  const user = await prisma.user.findUnique({ where: { id: parseUserId(userId) } });
  if (!user || !(await verifyPassword(password, user.password))) {
    throw new UnauthorizedException('ID ou senha inválidos.');
  }
  return user;
}

export async function authenticateCoordinator(
  prisma: PrismaService,
  userId: string | number,
  password: string,
) {
  const user = await authenticateUser(prisma, userId, password);
  if (!user.coordinator) {
    throw new ForbiddenException('Esta operação exige um usuário coordenador.');
  }
  return user;
}
