import { IsNotEmpty, IsString } from 'class-validator';
import { CoordinatorActionDto } from './coordinator-action.dto';

export class RejectReserveDto extends CoordinatorActionDto {
  @IsString()
  @IsNotEmpty()
  description!: string;
}