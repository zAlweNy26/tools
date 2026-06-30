import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'vite'

const root = resolve(import.meta.dirname, '../..')
const outDir = resolve(root, 'docs/public/sandbox')

await build({
  resolve: {
    alias: [
      { find: '@structures', replacement: resolve(root, 'src/structures') },
      { find: '@distances', replacement: resolve(root, 'src/distances') },
      { find: '@utils', replacement: resolve(root, 'src/utils') },
      { find: '@sortings', replacement: resolve(root, 'src/sortings') },
      { find: '@dim_red', replacement: resolve(root, 'src/dim_red') },
      { find: '@researches', replacement: resolve(root, 'src/researches') },
    ],
  },
  build: {
    lib: {
      entry: resolve(root, 'index.ts'),
      formats: ['es'],
      fileName: () => 'tools.bundle.js',
    },
    outDir,
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      external: [],
    },
  },
  logLevel: 'warn',
})

// Extract export names from the built bundle
const bundle = readFileSync(resolve(outDir, 'tools.bundle.js'), 'utf-8')
const match = bundle.match(/export\s*\{([^}]+)\}/)
const exports: string[] = match
  ? match[1]
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  : []

writeFileSync(
  resolve(root, 'docs/.vitepress/theme/components/repl-exports.ts'),
  `export default [${exports.map(e => `'${e}'`).join(', ')}] as const\n`,
)
