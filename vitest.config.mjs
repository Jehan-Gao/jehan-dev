import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, 'scripts'),
    },
  },
  test: {
    env: loadEnv(mode, __dirname, ''),
    include: ['scripts/**/*.test.mjs', 'src/**/*.test.ts'],
    environment: 'node',
    maxWorkers: 1,
    fileParallelism: false,
    testTimeout: 120_000,
  },
}))