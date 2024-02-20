import react from '@vitejs/plugin-react';
import child from 'node:child_process';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [react(), tsconfigPaths(), command === 'serve' && checker({ typescript: true })],
    define: {
        __APP_VERSION__: JSON.stringify(packageJson.version),
        __APP_HASH__: JSON.stringify(child.execSync('git rev-parse HEAD').toString().trim()),
    },
    server: {
        port: 3000,
    },
}));
