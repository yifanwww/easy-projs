import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class IntegerIdParamDto {
    @Type(() => Number)
    @IsInt()
    id!: number;
}

export class IntegerIdQueryDto {
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    @IsInt()
    id!: number;
}

export class IntegerIdBodyDto {
    @IsInt()
    id!: number;
}

export class IntegerIdsBodyDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    ids!: number[];
}
