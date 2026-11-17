import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsNotEmpty, IsString, Matches, Max, Min } from 'class-validator';

const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/;

export class CreateSpaceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(7, { each: true })
  openingDays!: number[];

  @IsString()
  @Matches(timePattern)
  opening!: string;

  @IsString()
  @Matches(timePattern)
  closing!: string;

  @Type(() => Number)
  @IsInt()
  @Min(10000)
  @Max(99999)
  responsableId!: number;
}