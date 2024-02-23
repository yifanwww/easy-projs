import { describe, expect, it } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';

import { PaginationQueryDto } from '../pagination.dto.js';

describe(`Test dto class \`${PaginationQueryDto.name}}\``, () => {
    it('should pass validation when request is valid', async () => {
        {
            const model = plainToInstance(PaginationQueryDto, {});
            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(0);
        }

        {
            const model = plainToInstance(PaginationQueryDto, {
                page: '1',
                page_size: '10',
            });
            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(0);
        }
    });

    it('should not pass validation when request is invalid [page="bad value"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page: 'bad value',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'page must be an integer number',
            isPositive: 'page must be a positive number',
        });
        expect(errors[0].value).toBeNaN();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [page="Infinity"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page: 'Infinity',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'page must be an integer number',
        });
        expect(errors[0].value).toBe(Infinity);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [page="1.2"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page: '1.2',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'page must be an integer number',
        });
        expect(errors[0].value).toBe(1.2);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [page="0"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page: '0',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page');
        expect(errors[0].constraints).toStrictEqual({
            isPositive: 'page must be a positive number',
        });
        expect(errors[0].value).toBe(0);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [page_size="bad value"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page_size: 'bad value',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page_size');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'page_size must be an integer number',
            isPositive: 'page_size must be a positive number',
        });
        expect(errors[0].value).toBeNaN();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [page_size="Infinity"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page_size: 'Infinity',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page_size');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'page_size must be an integer number',
        });
        expect(errors[0].value).toBe(Infinity);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [page_size="1.2"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page_size: '1.2',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page_size');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'page_size must be an integer number',
        });
        expect(errors[0].value).toBe(1.2);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [page_size="0"]', async () => {
        const model = plainToInstance(PaginationQueryDto, {
            page_size: '0',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('page_size');
        expect(errors[0].constraints).toStrictEqual({
            isPositive: 'page_size must be a positive number',
        });
        expect(errors[0].value).toBe(0);
        expect(errors[0].children).toHaveLength(0);
    });
});
