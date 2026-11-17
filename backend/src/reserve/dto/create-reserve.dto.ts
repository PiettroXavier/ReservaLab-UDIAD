import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/;

export class CreateReserveDto {
  @Transform(({ value }) =>
    (Array.isArray(value) ? value : [value]).map((item: unknown) => Number(item)),
  )
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(10000, { each: true })
  @Max(99999, { each: true })
  studentIds!: number[];

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(32767)
  spaceId!: number;

  @IsString()
  @Matches(timePattern)
  start!: string;

  @IsString()
  @Matches(timePattern)
  end!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}