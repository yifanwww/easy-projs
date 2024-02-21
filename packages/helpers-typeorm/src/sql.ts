/**
 * The charset enum for MySQL.
 *
 * - Can be used to define column charset:
 * ```ts
 * Column({ type: 'varchar', charset: MysqlCharset.UTF8 })
 * ```
 */
export enum MysqlCharset {
    UTF8 = 'utf8mb4',
}

/**
 * The collation enum for MySQL.
 *
 * - Can be used to define column charset:
 * ```ts
 * Column({ type: 'varchar', collation: MysqlCollation.UTF8_CS })
 * ```
 *
 * - Can be used to define collation when querying:
 * ```ts
 * Raw((alias) => `${alias} COLLATE ${MysqlCollation.UTF8_CI} LIKE :value`, { value: `%${value}%` })
 * ```
 */
export enum MysqlCollation {
    UTF8_CI = 'utf8mb4_0900_ai_ci',
    UTF8_CS = 'utf8mb4_0900_as_cs',
}
