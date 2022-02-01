import { Test } from '../../test.setup';
import { Time } from '../../tools/TimeTool';
import { Settings } from '../Settings';

beforeAll(() => {
    jest.spyOn(Time as unknown as Test.TimeTool, 'getMinResolution').mockImplementation(() => Time.ns(100));
});

describe(`test class \`${Settings.name}\``, () => {
    it('returns default settings', () => {
        const settings = new Settings({});

        expect(settings.delay).toBe(5_000_000);
        expect(settings.initCount).toBe(1);
        expect(settings.maxAdjustTime).toBe(100_000_000);
        expect(settings.maxPreparingTime).toBe(10_000_000);
        expect(settings.maxTime).toBe(5_000_000_000);
        expect(settings.minSamples).toBe(5);
        expect(settings.minTime).toBe(50_000_000);
    });

    it('gets custom settings', () => {
        const settings = new Settings({
            delay: 1,
            initCount: 100,
            maxAdjustTime: 50,
            maxPreparingTime: 5,
            maxTime: 2_500,
            minSamples: 10,
            minTime: 25,
        });

        expect(settings.delay).toBe(1_000_000);
        expect(settings.initCount).toBe(100);
        expect(settings.maxAdjustTime).toBe(50_000_000);
        expect(settings.maxPreparingTime).toBe(5_000_000);
        expect(settings.maxTime).toBe(2_500_000_000);
        expect(settings.minSamples).toBe(10);
        expect(settings.minTime).toBe(25_000_000);
    });
});
