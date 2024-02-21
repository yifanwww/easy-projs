import { describe, expect, it } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';

import { PaginationReqDto } from '../pagination.dto.js';

describe(`Test dto class \`${PaginationReqDto.name}}\``, () => {
    it('should validate pagiantion request body when it is valid', async () => {
        {
            const model = new PaginationReqDto();
            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(0);
        }

        {
            const model = new PaginationReqDto();
            model.page = 1;
            model.page_size = 10;
            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(0);
        }

        {
            const plainPaginationReq = {
                page: '1',
                page_size: '10',
            };
            const model = plainToInstance(PaginationReqDto, plainPaginationReq);

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(0);
        }
    });

    it('should validate pagiantion request body when it is not valid', async () => {
        {
            const model = new PaginationReqDto();
            model.page = Number.NaN;
            model.page_size = Infinity;

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(2);

            expect(errors[0].target).toBe(model);
            expect(errors[0].property).toBe('page');
            expect(errors[0].constraints).toStrictEqual({
                isNumber: 'page must be a number conforming to the specified constraints',
            });
            expect(errors[0].value).toBeNaN();

            expect(errors[1].target).toBe(model);
            expect(errors[1].property).toBe('page_size');
            expect(errors[1].constraints).toStrictEqual({
                isNumber: 'page_size must be a number conforming to the specified constraints',
            });
            expect(errors[1].value).toBe(Infinity);
        }

        {
            const plainPaginationReq = {
                page: 'bad value',
                page_size: 'bad value',
            };
            const model = plainToInstance(PaginationReqDto, plainPaginationReq);

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(2);

            expect(errors[0].target).toBe(model);
            expect(errors[0].property).toBe('page');
            expect(errors[0].constraints).toStrictEqual({
                isNumber: 'page must be a number conforming to the specified constraints',
            });
            expect(errors[0].value).toBeNaN();

            expect(errors[1].target).toBe(model);
            expect(errors[1].property).toBe('page_size');
            expect(errors[1].constraints).toStrictEqual({
                isNumber: 'page_size must be a number conforming to the specified constraints',
            });
            expect(errors[1].value).toBeNaN();
        }
    });
});
