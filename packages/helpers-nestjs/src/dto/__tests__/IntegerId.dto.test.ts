import { describe, expect, it } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';
import { dtoFactory } from '../dtoFactory.js';
import { IntegerIdBodyDto, IntegerIdParamDto, IntegerIdQueryDto, IntegerIdsBodyDto } from '../IntegerId.dto.js';

describe(`Test dto class \`${IntegerIdParamDto.name}}\``, () => {
    it('should pass validation when request is valid', async () => {
        const model = plainToInstance(IntegerIdParamDto, {
            id: '0',
        });
        expect(model).toStrictEqual(dtoFactory(IntegerIdParamDto, { id: 0 }));

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id="bad value"]', async () => {
        const model = plainToInstance(IntegerIdParamDto, {
            id: 'bad value',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBeNaN();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id="Infinity"]', async () => {
        const model = plainToInstance(IntegerIdParamDto, {
            id: 'Infinity',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBe(Infinity);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id="1.2"]', async () => {
        const model = plainToInstance(IntegerIdParamDto, {
            id: '1.2',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBe(1.2);
        expect(errors[0].children).toHaveLength(0);
    });
});

describe(`Test dto class \`${IntegerIdQueryDto.name}}\``, () => {
    it('should pass validation when request is valid', async () => {
        const model = plainToInstance(IntegerIdQueryDto, {
            id: '0',
        });
        expect(model).toStrictEqual(dtoFactory(IntegerIdQueryDto, { id: 0 }));

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id=undefined]', async () => {
        {
            const model = plainToInstance(IntegerIdQueryDto, {});

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('id');
            expect(errors[0].constraints).toStrictEqual({
                isInt: 'id must be an integer number',
            });
            expect(errors[0].value).toBeUndefined();
            expect(errors[0].children).toHaveLength(0);
        }

        {
            const model = plainToInstance(IntegerIdQueryDto, {
                id: undefined,
            });

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('id');
            expect(errors[0].constraints).toStrictEqual({
                isInt: 'id must be an integer number',
            });
            expect(errors[0].value).toBeNaN();
            expect(errors[0].children).toHaveLength(0);
        }
    });

    it('should not pass validation when request is invalid [id=""]', async () => {
        const model = plainToInstance(IntegerIdQueryDto, {
            id: '',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBeUndefined();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id="bad value"]', async () => {
        const model = plainToInstance(IntegerIdQueryDto, {
            id: 'bad value',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBeNaN();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id="Infinity"]', async () => {
        const model = plainToInstance(IntegerIdQueryDto, {
            id: 'Infinity',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBe(Infinity);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id="1.2"]', async () => {
        const model = plainToInstance(IntegerIdQueryDto, {
            id: '1.2',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBe(1.2);
        expect(errors[0].children).toHaveLength(0);
    });
});

describe(`Test dto class \`${IntegerIdBodyDto.name}}\``, () => {
    it('should pass validation when request is valid', async () => {
        const model = plainToInstance(IntegerIdBodyDto, {
            id: 0,
        });
        expect(model).toStrictEqual(dtoFactory(IntegerIdBodyDto, { id: 0 }));

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id=undefined]', async () => {
        {
            const model = plainToInstance(IntegerIdBodyDto, {});

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('id');
            expect(errors[0].constraints).toStrictEqual({
                isInt: 'id must be an integer number',
            });
            expect(errors[0].value).toBeUndefined();
            expect(errors[0].children).toHaveLength(0);
        }

        {
            const model = plainToInstance(IntegerIdBodyDto, {
                id: undefined,
            });

            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('id');
            expect(errors[0].constraints).toStrictEqual({
                isInt: 'id must be an integer number',
            });
            expect(errors[0].value).toBeUndefined();
            expect(errors[0].children).toHaveLength(0);
        }
    });

    it('should not pass validation when request is invalid [id=null]', async () => {
        const model = plainToInstance(IntegerIdBodyDto, {
            id: null,
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBeNull();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id="bad value"]', async () => {
        const model = plainToInstance(IntegerIdBodyDto, {
            id: 'bad value',
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBe('bad value');
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [id=1.2]', async () => {
        const model = plainToInstance(IntegerIdBodyDto, {
            id: 1.2,
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('id');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'id must be an integer number',
        });
        expect(errors[0].value).toBe(1.2);
        expect(errors[0].children).toHaveLength(0);
    });
});

describe(`Test dto class \`${IntegerIdsBodyDto.name}}\``, () => {
    it('should pass validation when request is valid', async () => {
        const models = plainToInstance(IntegerIdsBodyDto, [
            {
                ids: [1],
            },
            {
                ids: [1, 2, 3],
            },
        ]);
        expect(models).toStrictEqual([
            dtoFactory(IntegerIdsBodyDto, {
                ids: [1],
            }),
            dtoFactory(IntegerIdsBodyDto, {
                ids: [1, 2, 3],
            }),
        ]);

        for (const model of models) {
            const errors = await new Validator().validate(model);
            expect(errors).toHaveLength(0);
        }
    });

    it('should not pass validation when request is invalid [ids=undefined]', async () => {
        const model = plainToInstance(IntegerIdsBodyDto, {
            ids: undefined,
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('ids');
        expect(errors[0].constraints).toStrictEqual({
            arrayNotEmpty: 'ids should not be empty',
            isArray: 'ids must be an array',
            isInt: 'each value in ids must be an integer number',
        });
        expect(errors[0].value).toBeUndefined();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [ids=null]', async () => {
        const model = plainToInstance(IntegerIdsBodyDto, {
            ids: null,
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('ids');
        expect(errors[0].constraints).toStrictEqual({
            arrayNotEmpty: 'ids should not be empty',
            isArray: 'ids must be an array',
            isInt: 'each value in ids must be an integer number',
        });
        expect(errors[0].value).toBeNull();
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [ids=[]]', async () => {
        const model = plainToInstance(IntegerIdsBodyDto, {
            ids: [],
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('ids');
        expect(errors[0].constraints).toStrictEqual({
            arrayNotEmpty: 'ids should not be empty',
        });
        expect(errors[0].value).toStrictEqual([]);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [ids=[undefined]]', async () => {
        const model = plainToInstance(IntegerIdsBodyDto, {
            ids: [undefined],
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('ids');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'each value in ids must be an integer number',
        });
        expect(errors[0].value).toStrictEqual([undefined]);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [ids=[null]]', async () => {
        const model = plainToInstance(IntegerIdsBodyDto, {
            ids: [null],
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('ids');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'each value in ids must be an integer number',
        });
        expect(errors[0].value).toStrictEqual([null]);
        expect(errors[0].children).toHaveLength(0);
    });

    it('should not pass validation when request is invalid [ids=["hello"]]', async () => {
        const model = plainToInstance(IntegerIdsBodyDto, {
            ids: ['hello'],
        });

        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].property).toBe('ids');
        expect(errors[0].constraints).toStrictEqual({
            isInt: 'each value in ids must be an integer number',
        });
        expect(errors[0].value).toStrictEqual(['hello']);
        expect(errors[0].children).toHaveLength(0);
    });
});
