// Adds a GitHub release's notes to the top of CHANGELOG.md under a `## <tag>` heading.
// Usage: node .github/scripts/changelog.ts <tag> <notes-file>
import { readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'

const FILE = 'CHANGELOG.md'
// entries sit under a level-2 heading, so headings in the notes must start at level 3
const TOP_LEVEL_HEADING = /^#{1,2} /gm

const [tag, notesFile] = process.argv.slice(2)
if (!tag || !notesFile) {
  console.error('Usage: node .github/scripts/changelog.ts <tag> <notes-file>')
  process.exit(1)
}

const changelog = readFileSync(FILE, 'utf8')
if (changelog.includes(`\n## ${tag}\n`)) {
  console.log(`${FILE} already has an entry for ${tag}`)
  process.exit(0)
}

const notes = readFileSync(notesFile, 'utf8').trim().replace(TOP_LEVEL_HEADING, '### ')
const entry = `## ${tag}\n\n${notes}\n\n`

// insert above the newest existing entry, keeping the title at the top
const index = changelog.indexOf('\n## ')
const updated = index === -1
  ? `${changelog.trimEnd()}\n\n${entry}`
  : `${changelog.slice(0, index + 1)}${entry}${changelog.slice(index + 1)}`

writeFileSync(FILE, updated)
console.log(`Added ${tag} to ${FILE}`)
