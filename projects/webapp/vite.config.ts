import child from 'node:child_process';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';
import packageJson from './package.json' with { type: 'json' };

// https://vitejs.dev/config/
export default defineConfig({
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
  test: {
    setupFiles: ['./src/test.setup.ts'],

    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    environment: 'jsdom',

    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__mocks__/**/*.{ts,tsx}',
        'src/**/__tests__/**/*.{ts,tsx}',
        'src/**/*.{spec,test}.{ts,tsx}',
        'src/**/*.d.ts',
        'src/test.setup.ts',
      ],
    },

    // https://vitest.dev/config/mockreset.html
    mockReset: true,
    // https://vitest.dev/config/restoremocks.html
    restoreMocks: true,
  },
});
