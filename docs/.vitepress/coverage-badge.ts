import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const label = 'Tested'
const outFile = 'docs/api/test-coverage.svg'

function color(ratio: number): string {
  if (ratio < 50) return '#db654f'
  if (ratio < 90) return '#dab226'
  return '#4fc921'
}

function svg(label: string, ratio: number): string {
  const width = label.length * 8 + 40
  const ratioRectWidth = 40
  const ratioRectX = width - ratioRectWidth
  const ratioTextX = ratioRectX + 20
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <rect rx="3" width="${width}" height="20" fill="#555"/>
  <rect rx="3" x="${ratioRectX}" width="${ratioRectWidth}" height="20" fill="${color(ratio)}"/>
  <path fill="${color(ratio)}" d="M${ratioRectX} 0h4v20h-4z"/>
  <rect rx="3" width="${width}" height="20" fill="url(#a)"/>
  <g fill="#fff" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <g text-anchor="left">
      <text x="5" y="15" fill="#010101" fill-opacity=".3">${label}</text>
      <text x="5" y="14">${label}</text>
    </g>
    <g text-anchor="middle">
      <text x="${ratioTextX}" y="15" fill="#010101" fill-opacity=".3">${ratio}%</text>
      <text x="${ratioTextX}" y="14">${ratio}%</text>
    </g>
  </g>
</svg>
`.trim()
}

// line coverage summed over every file in Bun's lcov report
const dir = mkdtempSync(join(tmpdir(), 'coverage-'))
const run = Bun.spawnSync(['bun', 'test', '--coverage', '--coverage-reporter=lcov', `--coverage-dir=${dir}`], {
  stdout: 'ignore',
  stderr: 'inherit',
})
if (run.exitCode !== 0) {
  rmSync(dir, { recursive: true, force: true })
  throw new Error('Tests failed, not generating the coverage badge')
}

let found = 0
let hit = 0
for (const line of readFileSync(join(dir, 'lcov.info'), 'utf8').split('\n')) {
  if (line.startsWith('LF:')) found += Number(line.slice(3))
  else if (line.startsWith('LH:')) hit += Number(line.slice(3))
}
rmSync(dir, { recursive: true, force: true })

const ratio = found === 0 ? 0 : Math.floor((hit / found) * 100)

writeFileSync(outFile, svg(label, ratio))
console.log(`Test coverage: ${ratio}% of lines → ${outFile}`)
