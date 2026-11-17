import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/;

export class UpdateSpaceDto {
  @Type(() => Number)
  @IsInt()
  @Min(10000)
  @Max(99999)
  responsableId!: number;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(7, { each: true })
  openingDays?: number[];

  @IsOptional()
  @IsString()
  @Matches(timePattern)
  opening?: string;

  @IsOptional()
  @IsString()
  @Matches(timePattern)
  closing?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10000)
  @Max(99999)
  newResponsableId?: number;
}