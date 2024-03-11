import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page_size?: number;
}
