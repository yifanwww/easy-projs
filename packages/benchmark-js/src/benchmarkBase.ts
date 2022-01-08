export abstract class BenchmarkBase {
    private static staticId: number = 0;

    protected id: number;

    public constructor() {
        this.id = ++BenchmarkBase.staticId;
    }
}
