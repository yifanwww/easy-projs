import { describe, expect, it } from '@jest/globals';
import { Equals, Validator } from 'class-validator';

import { IsEmptyStringIgnorable, IsUndefinable } from '../decorators.js';

describe(`Test decorator \`${IsUndefinable.name}}\``, () => {
    class MyClass {
        @IsUndefinable()
        @Equals('test')
        title?: string;
    }

    it('should ignore a property when value is undefined', async () => {
        const model = new MyClass();
        model.title = undefined;
        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(0);
    });

    it('should validate a property when value is supplied', async () => {
        const model = new MyClass();
        model.title = 'bad_value';
        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].target).toBe(model);
        expect(errors[0].property).toBe('title');
        expect(errors[0].constraints).toStrictEqual({ equals: 'title must be equal to test' });
        expect(errors[0].value).toBe('bad_value');
    });
});

describe(`Test decorator \`${IsEmptyStringIgnorable.name}}\``, () => {
    class MyClass {
        @IsEmptyStringIgnorable()
        @Equals('test')
        title!: string;
    }

    it('should ignore a property when value is empty', async () => {
        const model = new MyClass();
        model.title = '';
        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(0);
    });

    it('should validate a property when value is supplied', async () => {
        const model = new MyClass();
        model.title = 'bad_value';
        const errors = await new Validator().validate(model);
        expect(errors).toHaveLength(1);
        expect(errors[0].target).toBe(model);
        expect(errors[0].property).toBe('title');
        expect(errors[0].constraints).toStrictEqual({ equals: 'title must be equal to test' });
        expect(errors[0].value).toBe('bad_value');
    });
});
