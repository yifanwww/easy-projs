import { Settings } from '../Settings';

describe(`test class \`${Settings.name}\``, () => {
    it('returns default settings', () => {
        const settings = new Settings({});

        expect(settings.delay).toBe(5_000_000);
        expect(settings.initOpsCount).toBe(1);
        expect(settings.minSampleTime).toBe(100_000_000);
        expect(settings.samplesCount).toBe(15);
    });

    it('gets custom settings', () => {
        const settings = new Settings({
            delay: 1,
            initOpsCount: 100,
            minSampleTime: 25,
            samplesCount: 10,
        });

        expect(settings.delay).toBe(1_000_000);
        expect(settings.initOpsCount).toBe(100);
        expect(settings.minSampleTime).toBe(25_000_000);
        expect(settings.samplesCount).toBe(10);
    });
});
