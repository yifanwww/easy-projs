import dayjs from 'dayjs';
import { Between, type FindOperator, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Raw } from 'typeorm';

import { type MysqlCollation } from './sql.js';

const DateTemplate = 'YYYY-MM-DD HH:mm:ss';

function formatDate(date: Date) {
    // TypeORM requires `Date | FindOperator<Date>` type when we want to query with Date
    // Change the type to make TypeScript happy
    return dayjs(date).format(DateTemplate) as unknown as Date;
}

export function MoreThanDate(date: Date) {
    return MoreThan(formatDate(date));
}

export function LessThanDate(date: Date) {
    return LessThan(formatDate(date));
}

export function MoreThanOrEqualDate(date: Date) {
    return MoreThanOrEqual(formatDate(date));
}

export function LessThanOrEqualDate(date: Date) {
    return LessThanOrEqual(formatDate(date));
}

export function BetweenDate(from: Date, to: Date) {
    return Between(formatDate(from), formatDate(to));
}

export function PartiallyBetween<T>(from?: T | FindOperator<T>, to?: T | FindOperator<T>): FindOperator<T> | undefined {
    if (from && to) return Between(from, to);
    if (from) return MoreThanOrEqual(from);
    if (to) return LessThanOrEqual(to);
    return undefined;
}

export function PartiallyBetweenDate(from?: Date, to?: Date) {
    if (from && to) return BetweenDate(from, to);
    if (from) return MoreThanOrEqualDate(from);
    if (to) return LessThanOrEqualDate(to);
    return undefined;
}

export function LikeByCollation(value: string, collation: MysqlCollation) {
    return Raw((alias) => `${alias} COLLATE ${collation} LIKE :value`, { value: `%${value}%` });
}
