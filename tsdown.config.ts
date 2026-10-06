import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  dts: true,
  exports: true,
  publint: true,
  attw: true,
})
