import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'lib/*': 'src/**/*.ts',
    'index': 'index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  outExtensions({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.js' }
  },
})
