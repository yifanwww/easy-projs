import dayjs from 'dayjs';
import { Between, type FindOperator, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Raw } from 'typeorm';

import { type MysqlCollation } from './types.js';

const DateTemplate = 'YYYY-MM-DD HH:mm:ss';

function formatDate(date: Date) {
    // TypeORM requires `Date | FindOperator<Date>` type when we want to query with Date
    // Change the type to make TypeScript happy
    return dayjs(date).format(DateTemplate) as unknown as Date;
}

export class MysqlOperatorHelper {
    static moreThanDate(date: Date) {
        return MoreThan(formatDate(date));
    }

    static lessThanDate(date: Date) {
        return LessThan(formatDate(date));
    }

    static moreThanOrEqualDate(date: Date) {
        return MoreThanOrEqual(formatDate(date));
    }

    static lessThanOrEqualDate(date: Date) {
        return LessThanOrEqual(formatDate(date));
    }

    static betweenDate(from: Date, to: Date) {
        return Between(formatDate(from), formatDate(to));
    }

    static betweenPartially<T>(from?: T | FindOperator<T>, to?: T | FindOperator<T>): FindOperator<T> | undefined {
        if (from && to) return Between(from, to);
        if (from) return MoreThanOrEqual(from);
        if (to) return LessThanOrEqual(to);
        return undefined;
    }

    static betweenDatePartially(from?: Date, to?: Date) {
        if (from && to) return this.betweenDate(from, to);
        if (from) return this.moreThanOrEqualDate(from);
        if (to) return this.lessThanOrEqualDate(to);
        return undefined;
    }

    static like(value: string, collation: MysqlCollation) {
        return Raw((alias) => `${alias} COLLATE ${collation} LIKE :value`, { value: `%${value}%` });
    }
}
