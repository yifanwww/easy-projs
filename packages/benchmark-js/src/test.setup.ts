import { TimeTool as _TimeTool } from './tools/TimeTool';

export namespace Test {
    export interface TimeTool {
        ns: typeof _TimeTool.ns;
        ms2ns: typeof _TimeTool.ms2ns;
        hrtime2ns: typeof _TimeTool.hrtime2ns;
        sleep: typeof _TimeTool.sleep;
        getMinResolution: typeof _TimeTool['getMinResolution'];
        minResolution: typeof _TimeTool.minResolution;
    }
}
