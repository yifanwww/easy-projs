import type { ApiPagination } from '@easy-pkg/apis';
import { describe, expect, it } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';

import { ApiPaginationQueryDto } from '../ApiPagination.dto.js';
import { dtoFactory } from '../dtoFactory.js';

describe(`Test dto class \`${ApiPaginationQueryDto.name}}\``, () => {
    it('should pass validation when request is valid', async () => {
        const models = plainToInstance(ApiPaginationQueryDto, [
            {},
            {
                page: '',
                page_size: '',
            },
            {
                page: '1',
                page_size: '10',
            },
        ]);
        expect(models).toStrictEqual([
            dtoFactory<ApiPagination>(ApiPaginationQueryDto, {}),
            dtoFactory<ApiPagination>(ApiPaginationQueryDto, {}),
            dtoFactory<ApiPagination>(ApiPaginationQueryDto, { page: 1, page_size: 10 }),
        ]);

        for (const model of models) {
            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(0);
        }
    });

    function testFields(field: 'page' | 'page_size') {
        it(`should not pass validation when request is invalid [${field}="bad value"]`, async () => {
            const model = plainToInstance(ApiPaginationQueryDto, {
                page: '1',
                page_size: '10',
                [field]: 'bad value',
            });

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe(field);
            expect(errors[0].constraints).toStrictEqual({
                isInt: `${field} must be an integer number`,
                isPositive: `${field} must be a positive number`,
            });
            expect(errors[0].value).toBeNaN();
            expect(errors[0].children).toHaveLength(0);
        });

        it(`should not pass validation when request is invalid [${field}="Infinity"]`, async () => {
            const model = plainToInstance(ApiPaginationQueryDto, {
                page: '1',
                page_size: '10',
                [field]: 'Infinity',
            });

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe(field);
            expect(errors[0].constraints).toStrictEqual({
                isInt: `${field} must be an integer number`,
            });
            expect(errors[0].value).toBe(Infinity);
            expect(errors[0].children).toHaveLength(0);
        });

        it(`should not pass validation when request is invalid [${field}="1.2"]`, async () => {
            const model = plainToInstance(ApiPaginationQueryDto, {
                page: '1',
                page_size: '10',
                [field]: '1.2',
            });

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe(field);
            expect(errors[0].constraints).toStrictEqual({
                isInt: `${field} must be an integer number`,
            });
            expect(errors[0].value).toBe(1.2);
            expect(errors[0].children).toHaveLength(0);
        });

        it(`should not pass validation when request is invalid [${field}="0"]`, async () => {
            const model = plainToInstance(ApiPaginationQueryDto, {
                page: '1',
                page_size: '10',
                [field]: '0',
            });

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe(field);
            expect(errors[0].constraints).toStrictEqual({
                isPositive: `${field} must be a positive number`,
            });
            expect(errors[0].value).toBe(0);
            expect(errors[0].children).toHaveLength(0);
        });
    }

    testFields('page');
    testFields('page_size');
});
