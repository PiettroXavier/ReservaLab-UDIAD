import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CoordinatorActionDto } from './dto/coordinator-action.dto';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { RejectReserveDto } from './dto/reject-reserve.dto';
import { ReserveService } from './reserve.service';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  create(@Body() dto: CreateReserveDto) {
    return this.reserveService.create(dto);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string, @Body() dto: CoordinatorActionDto) {
    return this.reserveService.approve(id, dto);
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string, @Body() dto: RejectReserveDto) {
    return this.reserveService.reject(id, dto);
  }

  @Delete(':id')
  close(@Param('id') id: string, @Body() dto: CoordinatorActionDto) {
    return this.reserveService.close(id, dto);
  }
}