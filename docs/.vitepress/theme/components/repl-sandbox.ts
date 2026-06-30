function checkSyntax(cmd: string): string | null {
  // eslint-disable-next-line no-new, style/max-statements-per-line, no-new-func
  try { new Function(cmd); return null }
  catch (e) { return e instanceof SyntaxError ? e.message : null }
}

const EXPRESSION_REGEX = /^(?:let|const|var|if|for|while|do|function|class|import|export|try|throw|switch|return|break|continue|debugger)\b/

function isExpression(cmd: string): boolean {
  const trimmed = cmd.trim()
  if (!trimmed || trimmed.includes(';')) return false
  return !EXPRESSION_REGEX.test(trimmed)
}

export function buildSrcdoc(cmds: string[], bundleUrl: string, runId: number): string {
  const items = cmds.map((c) => {
    const escaped = c
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$')
    const err = checkSyntax(c)
    if (err)
      return { code: `console.log('SyntaxError: ' + ${JSON.stringify(err)})`, err: true }

    return {
      code: isExpression(c) ? `{let __r=${escaped};if(__r!==void 0)console.log(__r)}` : escaped,
      err: false,
    }
  })

  const body = items
    .map(({ code }) => `${code}\n__snap()\n`)
    .join('')

  const doneId = runId

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>body{margin:0;font:14px monospace}</style></head>
<body>
<script type="importmap">
{"imports":{"@danyalwe/tools":"${bundleUrl}"}}
</script>
<script>
window.addEventListener('error', function(e) {
  parent.postMessage({
    type: 'repl-error',
    id: ${doneId},
    error: e.message || 'Module failed to load'
  }, '*');
});
</script>
<script type="module">
import * as tools from '@danyalwe/tools';
Object.assign(globalThis, tools);

let __cmdLogs = [];

console.log = (...args) => {
  __cmdLogs.push(args.map(a => {
    if (a === null) return 'null';
    if (a === undefined) return 'undefined';
    if (typeof a === 'function') return a.toString();
    if (typeof a === 'object') {
      try { return JSON.stringify(a) } catch {}
    }
    return String(a);
  }).join(' '));
};

function __snap() {
  parent.postMessage({
    type: 'repl-output',
    id: ${doneId},
    logs: [...__cmdLogs],
  }, '*');
  __cmdLogs = [];
}

${body}
parent.postMessage({ type: 'repl-done', id: ${doneId} }, '*');
</script>
</body>
</html>`
}
