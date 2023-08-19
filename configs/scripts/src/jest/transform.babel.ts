import babelJest from 'babel-jest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export default babelJest.createTransformer({
    presets: [
        [require.resolve('babel-preset-react-app'), { runtime: 'automatic' }],
        [
            '@babel/preset-typescript',
            {
                // Can omit this setting when babel is upgrade above v8
                // https://github.com/babel/babel/issues/10746
                allowDeclareFields: true,
            },
        ],
    ],
    babelrc: false,
    configFile: false,
});
