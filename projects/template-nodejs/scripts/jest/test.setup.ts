import path from 'path';

const project = path.join(__dirname, '../..');
const blocks = [path.join(project, 'src')];

function wrapConsole(): void {
    type Output = (...data: unknown[]) => void;

    function outputFactory(outputImpl: Output): Output {
        const output: Output = (...data) => {
            const obj = {} as Error;
            Error.captureStackTrace(obj, output);

            const callerPath: string = obj.stack!.split('\n')[1];
            if (blocks.every((block) => !callerPath.includes(block))) {
                outputImpl(...data);
            }
        };

        return output;
    }

    console.debug = outputFactory(console.debug);
    console.error = outputFactory(console.error);
    console.info = outputFactory(console.info);
    console.log = outputFactory(console.log);
    console.warn = outputFactory(console.warn);
}

function setupJest(): void {
    wrapConsole();

    global.expectSnapshot = (actual) => expect(actual).toMatchSnapshot();
}

setupJest();
