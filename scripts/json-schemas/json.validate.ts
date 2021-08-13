import { pathToFileURL } from 'url';

const JsonSchema = require('@hyperjump/json-schema');

interface ValidationResult {
    valid: boolean;
}

export class JsonValidator<T> {
    private _url: URL;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _schema: any;

    public constructor(jsonPath: string) {
        this._url = pathToFileURL(jsonPath);
    }

    public async initialize() {
        this._schema = await JsonSchema.get(this._url.toString());
    }

    public async getResult(json: unknown): Promise<ValidationResult> {
        return JsonSchema.validate(this._schema, json);
    }

    public is(json: unknown, result: ValidationResult): json is T {
        return result.valid;
    }
}
