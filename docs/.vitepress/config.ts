import typedocSidebar from '../api/typedoc-sidebar.json'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Home',
  titleTemplate: 'Alwe\'s Tools - :title',
  description: 'Hackable and production-ready framework for developing AI agents on top of LLMs',
  lastUpdated: true,
  cleanUrls: true,
  base: '/tools/',
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction' },
      { text: 'API', link: '/api/' },
      { text: 'Playground', link: '/playground' },
    ],
    sidebar: [
      {
        text: 'Documentation',
        items: [
          {
            text: 'Introduction',
            link: '/introduction',
          },
          {
            text: 'Getting Started',
            link: '/getting-started',
          },
        ],
      },
      {
        text: 'API Reference',
        items: [
          {
            text: 'Overview',
            link: '/api/',
          },
          ...typedocSidebar,
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zAlweNy26/tools' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@danyalwe/tools' },
    ],
  },
})
