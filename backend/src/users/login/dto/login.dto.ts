import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class LoginDto {
  @Type(() => Number)
  @IsInt()
  @Min(10000)
  @Max(99999)
  id!: number;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
