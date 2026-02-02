import { describe, expect, it } from '@jest/globals';
import { formatLog, formatLogFactory } from '../formatLog.js';

describe(`Test fn \`${formatLog.name}\``, () => {
    it('should format logs', () => {
        // no context

        expect(formatLog('<log>')).toBe('<log>');
        expect(formatLog('<log>', {})).toBe('<log>');

        // with context

        expect(formatLog('<log>', { userId: 1 })).toBe('<log> [user 1]');
        expect(formatLog('Failed to do something', { id: 234, userId: 123 })).toBe(
            'Failed to do something (id: 234) [user 123]',
        );
        expect(formatLog('Created a new record', { id: 234, type: 'image', userId: 123 })).toBe(
            'Created a new record (id: 234, type: image) [user 123]',
        );
        expect(formatLog('Created a new record', { type: 'image', id: 234, userId: 123 })).toBe(
            'Created a new record (type: image, id: 234) [user 123]',
        );
        expect(formatLog('<log>', { type: undefined, id: undefined, userId: undefined })).toBe('<log>');
    });
});

describe(`Test fn \`${formatLogFactory.name}\``, () => {
    it('should format logs with extra prefix', () => {
        const innerFormatLog = formatLogFactory({ prefix: '[prefix] ' });

        expect(innerFormatLog('<log>', { userId: 1 })).toBe('[prefix] <log> [user 1]');
    });

    it('should format logs with extra context', () => {
        {
            const innerFormatLog = formatLogFactory({ context: { id: 234 } });
            expect(innerFormatLog('<log>', { userId: 1 })).toBe('<log> (id: 234) [user 1]');
        }

        {
            const innerFormatLog = formatLogFactory({ context: { userId: 1 } });
            expect(innerFormatLog('<log>')).toBe('<log> [user 1]');
        }
    });
});
