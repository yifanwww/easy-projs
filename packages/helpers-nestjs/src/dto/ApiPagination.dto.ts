import { IsUndefinable } from '@easy-pkg/helpers-class-validator';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

// This type may come from a package (like a package for defining APIs)
export interface ApiPagination {
    page?: number;
    page_size?: number;
}

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
