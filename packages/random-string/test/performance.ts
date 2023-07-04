import { RandomGenerator } from '../src/index';

class Stopwatch {
    private _timeStart = 0;
    private _timeEnd = 0;
    private _totalSeconds = 0;

    start(): void {
        this._timeStart = Date.now();
    }

    stop(): void {
        this._timeEnd = Date.now();
        this._totalSeconds = (this._timeEnd - this._timeStart) / 1000;
    }

    get totalSeconds() {
        return this._totalSeconds;
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
