import { describe, expect, it } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';

import { IntegerIdParamDto } from '../param.dto.js';

describe(`Test dto class \`${IntegerIdParamDto.name}}\``, () => {
    it('should pass validation when request is valid', async () => {
        const model = plainToInstance(IntegerIdParamDto, {
            id: '0',
        });
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
