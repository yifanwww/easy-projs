import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => ({
    build: {
        target: browserslistToEsbuild(),
    },
    plugins: [react()],
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
}));
