/// <reference types="vite/client" />

import type { EnhanceAppContext } from 'vitepress'
import Repl from './components/Repl.vue'
import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('Repl', Repl)
  },
}
