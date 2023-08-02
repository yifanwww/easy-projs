import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [react(), tsconfigPaths(), command === 'serve' && checker({ typescript: true })],
    server: {
        port: 3000,
    },
}));
