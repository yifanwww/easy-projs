import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IntegerIdParamDto {
    @Type(() => Number)
    @IsInt()
    id!: number;
}
