import { BeforeInsert, BeforeUpdate } from 'typeorm';

/**
 * This column decorator will register a handler to auto generate the created date of the inserted object.
 */
export function AutoCreateDate(): PropertyDecorator {
    return (target, columnName) => {
        const fnName = `_updateCreatedDate_${columnName.toString()}`;
        BeforeInsert()(target, fnName);
        Object.defineProperty(target, columnName, {
            value() {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this[columnName] = Date.now();
            },
        });
    };
}

/**
 * This column decorator will register a handler to auto generate the updated date of the updated object.
 */
export function AutoUpdateDate(): PropertyDecorator {
    return (target, columnName) => {
        const fnName = `_updateUpdatedDate_${columnName.toString()}`;
        BeforeUpdate()(target, fnName);
        BeforeInsert()(target, fnName);
        Object.defineProperty(target, columnName, {
            value() {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this[columnName] = Date.now();
            },
        });
    };
}
