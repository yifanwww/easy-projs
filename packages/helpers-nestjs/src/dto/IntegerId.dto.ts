import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IntegerIdParamDto {
    @Type(() => Number)
    @IsInt()
    id!: number;
}

export class IntegerIdQueryDto {
    @Type(() => Number)
    @IsInt()
    id!: number;
}

export class IntegerIdBodyDto {
    @IsInt()
    id!: number;
}
