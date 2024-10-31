import type { ApiPagination } from '@easy-pkg/apis';
import { IsUndefinable } from '@easy-pkg/helpers-class-validator';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class ApiPaginationQueryDto implements ApiPagination {
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    @IsUndefinable()
    @IsInt()
    @IsPositive()
    page?: number;

    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    @IsUndefinable()
    @IsInt()
    @IsPositive()
    page_size?: number;
}
