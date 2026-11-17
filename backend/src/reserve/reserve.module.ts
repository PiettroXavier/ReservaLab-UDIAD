import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';

@Module({
  providers: [ReserveService]
})
export class ReserveModule {}
