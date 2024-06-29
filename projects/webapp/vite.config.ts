import react from '@vitejs/plugin-react';
import child from 'node:child_process';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig(() => ({
    plugins: [react(), tsconfigPaths(), checker({ enableBuild: false, typescript: true })],
    define: {
        __APP_VERSION__: JSON.stringify(packageJson.version),
        __APP_HASH__: JSON.stringify(child.execSync('git rev-parse HEAD').toString().trim()),
        __EXPERIMENTAL__: JSON.stringify(process.env.EXPERIMENTAL === 'true'),
    },
    server: {
        port: 3000,
    },
}));
