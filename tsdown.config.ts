import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'lib/*': 'src/**/*.ts',
    'index': 'index.ts',
  },
  format: 'esm',
  dts: true,
  minify: true,
  outputOptions: {
    entryFileNames: '[name].js',
  },
})
