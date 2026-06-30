<script setup lang="ts">
import libExports from './repl-exports'
import { buildSrcdoc } from './repl-sandbox'
import { withBase } from 'vitepress'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  preload?: string[]
}>(), {
  preload: () => [],
})

const JS_KEYWORDS = [
  'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
  'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends',
  'false', 'finally', 'for', 'function', 'if', 'import', 'in',
  'instanceof', 'let', 'new', 'null', 'return', 'super', 'switch',
  'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while',
  'with', 'yield', 'of', 'as', 'async', 'from', 'static', 'get', 'set',
]

const suggestions = [...libExports as readonly string[], ...JS_KEYWORDS]

const bundleUrl = withBase('/sandbox/tools.bundle.js')

const commands = ref<string[]>([...props.preload])
const outputs = ref<{ logs: string[] }[]>([])
const current = ref('')
const running = ref(false)
const iframeRef = ref<HTMLIFrameElement>()
const error = ref('')
const selectedIdx = ref(-1)

let runId = 0
let doneTimeout: ReturnType<typeof setTimeout> | null = null

const filtered = computed(() => {
  const val = current.value
  if (!val)
    return []
  const lower = val.toLowerCase()
  return suggestions.filter(s => s.toLowerCase().startsWith(lower) && s !== val)
})

watch(current, () => {
  selectedIdx.value = -1
})

function acceptSuggestion(idx: number) {
  if (idx >= 0 && idx < filtered.value.length)
    current.value = filtered.value[idx]

  selectedIdx.value = -1
}

function run() {
  const cmd = current.value.trim()
  if (!cmd || running.value) return
  commands.value.push(cmd)
  current.value = ''
  selectedIdx.value = -1
  error.value = ''
  execute()
}

function execute() {
  if (doneTimeout) clearTimeout(doneTimeout)
  running.value = true
  outputs.value = []
  runId++
  iframeRef.value!.srcdoc = buildSrcdoc(commands.value, bundleUrl, runId)
  doneTimeout = setTimeout(() => {
    if (running.value) {
      running.value = false
      error.value = 'Execution timed out or failed — check for syntax errors'
    }
  }, 5000)
}

function handleMessage(e: MessageEvent) {
  if (!e.data || e.data.id !== runId) return
  if (e.data.type === 'repl-output')
    outputs.value.push({ logs: e.data.logs })

  else if (e.data.type === 'repl-error') {
    if (doneTimeout) {
      clearTimeout(doneTimeout)
      doneTimeout = null
    }
    running.value = false
    error.value = e.data.error || 'Failed to load the sandbox'
  }
  else if (e.data.type === 'repl-done') {
    if (doneTimeout) {
      clearTimeout(doneTimeout)
      doneTimeout = null
    }
    running.value = false
    if (outputs.value.length === 0 && commands.value.length > 0)
      error.value = 'Execution error — check the browser console for details'
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (filtered.value.length > 0) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedIdx.value = selectedIdx.value < filtered.value.length - 1 ? selectedIdx.value + 1 : 0
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedIdx.value = selectedIdx.value > 0 ? selectedIdx.value - 1 : filtered.value.length - 1
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      if (selectedIdx.value >= 0)
        acceptSuggestion(selectedIdx.value)

      else
        acceptSuggestion(0)

      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      selectedIdx.value = -1
      return
    }
  }
  if (e.key === 'Enter' && !e.shiftKey) {
    if (selectedIdx.value >= 0) {
      e.preventDefault()
      acceptSuggestion(selectedIdx.value)
    }
    else {
      e.preventDefault()
      run()
    }
  }
}

function clearAll() {
  commands.value = [...props.preload]
  outputs.value = []
  error.value = ''
  execute()
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
  if (commands.value.length > 0)
    nextTick(() => execute())
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
  if (doneTimeout) clearTimeout(doneTimeout)
})

watch(() => props.preload, (val) => {
  commands.value = [...val]
  outputs.value = []
  error.value = ''
  nextTick(() => execute())
})
</script>

<template>
  <div class="repl">
    <div class="repl-output">
      <div v-if="commands.length === 0 && !running" class="repl-empty">
        Type an expression and press Enter to run it.
      </div>
      <template v-for="(cmd, i) in commands" :key="i">
        <div class="repl-line repl-prompt">
          &gt; {{ cmd }}
        </div>
        <div v-if="outputs[i]?.logs?.length" class="repl-line repl-result">
          <div
            v-for="(log, j) in outputs[i].logs"
            :key="j"
            :class="{ 'repl-err': log.startsWith('SyntaxError:') }"
          >
            {{ log }}
          </div>
        </div>
      </template>
      <div v-if="error" class="repl-error">
        {{ error }}
      </div>
    </div>
    <div class="repl-input-line">
      <span class="repl-prompt-symbol">&gt;</span>
      <div class="repl-input-wrap">
        <input
          v-model="current"
          class="repl-input"
          :disabled="running"
          placeholder="Type here..."
          spellcheck="false"
          autocomplete="off"
          @keydown="handleKeydown"
        >
        <ul v-if="filtered.length > 0" class="repl-suggestions">
          <li
            v-for="(sug, i) in filtered"
            :key="sug"
            :class="{ 'repl-sug-selected': i === selectedIdx }"
            @mousedown.prevent="acceptSuggestion(i)"
          >
            {{ sug }}
          </li>
        </ul>
      </div>
      <button class="repl-run" :disabled="running || !current.trim()" @click="run">
        {{ running ? 'Running...' : 'Run' }}
      </button>
      <button class="repl-clear" :disabled="running" @click="clearAll">
        Clear
      </button>
    </div>
    <iframe ref="iframeRef" class="repl-iframe" sandbox="allow-scripts allow-same-origin" title="REPL sandbox" />
  </div>
</template>

<style scoped>
.repl {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
}

.repl-output {
  background: var(--vp-code-block-bg);
  min-height: 120px;
  max-height: 320px;
  overflow-y: auto;
  padding: 12px 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
}

.repl-empty {
  color: var(--vp-c-text-2);
  font-style: italic;
}

.repl-line {
  white-space: pre-wrap;
  word-break: break-all;
}

.repl-prompt {
  color: var(--vp-c-brand-1);
  margin-top: 4px;
}

.repl-result {
  color: var(--vp-c-text-1);
  padding-left: 8px;
  border-left: 2px solid var(--vp-c-divider);
  margin-left: 4px;
}

.repl-error {
  color: var(--vp-c-danger-1);
  margin-top: 8px;
}

.repl-err {
  color: var(--vp-c-danger-1);
}

.repl-input-line {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.repl-input-wrap {
  flex: 1;
  position: relative;
}

.repl-prompt-symbol {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  padding-top: 4px;
}

.repl-input {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  outline: none;
  padding: 4px 0;
}

.repl-input::placeholder {
  color: var(--vp-c-text-3);
}

.repl-suggestions {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin: 0 0 4px 0;
  padding: 4px 0;
  list-style: none;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  min-width: 180px;
  z-index: 10;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.repl-suggestions li {
  padding: 4px 12px;
  cursor: pointer;
  color: var(--vp-c-text-1);
}

.repl-suggestions li:hover,
.repl-sug-selected {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.repl-run,
.repl-clear {
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 12px;
  cursor: pointer;
  flex-shrink: 0;
}

.repl-run:hover:not(:disabled),
.repl-clear:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.repl-run:disabled,
.repl-clear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.repl-iframe {
  display: none;
}
</style>
