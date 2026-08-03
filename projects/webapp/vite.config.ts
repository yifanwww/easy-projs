import child from 'node:child_process';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import packageJson from './package.json' with { type: 'json' };

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => ({
  build: {
    target: browserslistToEsbuild(),
  },
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __APP_HASH__: JSON.stringify(child.execSync('git rev-parse HEAD').toString().trim()),
    __EXPERIMENTAL__: JSON.stringify(process.env.EXPERIMENTAL === 'true'),
  },
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['.'],
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test.setup.ts'],
  },
}));
