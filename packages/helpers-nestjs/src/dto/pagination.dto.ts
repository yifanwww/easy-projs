import { IsUndefinable } from '@easy-pkg/helpers-class-validator';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export interface PaginationReq {
    page?: number;
    page_size?: number;
}

export class PaginationReqDto implements PaginationReq {
    @IsNumber()
    @Type(() => Number)
    @IsUndefinable()
    page?: number;

    @IsNumber()
    @Type(() => Number)
    @IsUndefinable()
    page_size?: number;
}
