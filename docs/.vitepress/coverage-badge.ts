import { writeFileSync } from 'node:fs'

const label = 'Tests'
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
  <script/>
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

const output = Bun.spawnSync(['bun', 'test', '--coverage'], {
  stdout: 'pipe',
  stderr: 'pipe',
})

const text = new TextDecoder().decode(output.stdout) + new TextDecoder().decode(output.stderr)
const lines = text.split('\n')

let ratio = 0
for (const line of lines) {
  if (line.startsWith('All files')) {
    const parts = line.split('|').map(p => p.trim())
    ratio = Math.round(Number.parseFloat(parts[1]))
    break
  }
}

writeFileSync(outFile, svg(label, ratio))
console.log(`Test coverage: ${ratio}% → ${outFile}`)
