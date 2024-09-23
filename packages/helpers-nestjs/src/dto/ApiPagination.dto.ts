import { IsUndefinable } from '@easy-pkg/helpers-class-validator';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class ApiPaginationQueryDto {
    @IsUndefinable()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page?: number;

    @IsUndefinable()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page_size?: number;
}
