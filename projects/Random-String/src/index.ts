/* eslint-disable max-classes-per-file */

import crypto from 'crypto';

class Stopwatch {
    private _timeStart: number = 0;
    private _timeEnd: number = 0;
    private _totalSeconds: number = 0;

    public start(): void {
        this._timeStart = Date.now();
    }

    public stop(): void {
        this._timeEnd = Date.now();
        this._totalSeconds = (this._timeEnd - this._timeStart) / 1000;
    }

    public get totalSeconds() {
        return this._totalSeconds;
    }
}

class RandomGenerator {
    private static _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \n';
    private static _charbytes = Buffer.from(RandomGenerator._chars, 'ascii');

    public string(length: number): string {
        const bytes = crypto.randomBytes(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = RandomGenerator._charbytes[bytes[i] % 64];
        }
        return bytes.toString('ascii');
    }
}

function main() {
    const number = 2_000;
    const length = 1_000_000;
    const totalSize = (4 * length * number) / 1024 / 1024;

    const rg = new RandomGenerator();

    // Used for JIT compilation.
    for (let i = 0; i < 10; i++) rg.string(length);

    const sw = new Stopwatch();
    sw.start();
    for (let i = 0; i < number; i++) {
        rg.string(length);
    }
    sw.stop();

    console.info(`Time:  ${sw.totalSeconds} s`);
    console.info(`Speed: ${totalSize / sw.totalSeconds} MB/s`);
}

main();
