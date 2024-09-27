import { defineConfig } from 'vitepress';
import typedocSidebar from '../api/typedoc-sidebar.json';

export default defineConfig({
  title: 'Satisfactory Server SDK',
  description:
    'Satisfactory Dedicated Server "TypeScript first" JavaScript HTTP API SDK doc',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick start', link: '/getting-started/quick-start' },
    ],
    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Introduction', link: '/getting-started/introduction' },
          { text: 'Quick start', link: '/getting-started/quick-start' },
          { text: 'Resources', link: '/getting-started/resources' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Health check', link: '/examples/healthcheck' },
          { text: 'Password login', link: '/examples/passwordlogin' },
          { text: 'Query server state', link: '/examples/queryserverstate' },
        ],
      },
      {
        text: 'API Reference',
        items: typedocSidebar,
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/noahjahn/satisfactory-server-sdk',
      },
    ],
    search: {
      provider: 'local',
    },
  },
});
