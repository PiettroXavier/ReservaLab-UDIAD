import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { PrismaModule } from './prisma/prisma.module';
import { SpaceModule } from './space/space.module';
import { ReserveModule } from './reserve/reserve.module';
import { RegisterModule } from './users/register/register.module';
import { LoginModule } from './users/login/login.module';
import { ManagementModule } from './users/management/management.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'backend',
    }),
    PrismaModule,
    SpaceModule,
    ReserveModule,
    RegisterModule,
    LoginModule,
    ManagementModule,
  ],
})
export class AppModule {}