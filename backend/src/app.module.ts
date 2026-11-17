import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { SpaceController } from './space/space.controller';
import { SpaceModule } from './space/space.module';
import { ReserveController } from './reserve/reserve.controller';
import { ReserveModule } from './reserve/reserve.module';

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
    SpaceModule,
    ReserveModule,
  ],
  controllers: [SpaceController, ReserveController],
})
export class AppModule {}
