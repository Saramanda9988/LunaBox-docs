import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "LunaBox",
  description: "轻量、快速、功能强大的视觉小说管理与游玩统计工具",
  head: [['link', { rel: 'icon', href: '/appicon.png' }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { light: '/logo.svg', dark: '/logo-dark.svg' },

    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/introduction' },
      { text: '加入我们', link: '/contribution/' }
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '简介', link: '/guide/introduction' },
          { text: '安装', link: '/guide/installation' },
          { text: '开始使用', link: '/guide/quick-start' }
        ]
      },
      {
        text: '功能特性',
        items: [
          { text: '功能概览', link: '/features/' },
          { text: '批量导入数据', link: '/features/batch-import' },
          { text: '从Playnite迁移', link: '/features/import-from-playnite' },
          { text: '从PotatoVN迁移', link: '/features/import-from-potatovn' },
          { text: '手动添加游戏', link: '/features/manual-add' },
          { text: 'AI评价', link: '/features/ai-review' },
        ]
      },
      {
        text: '高级配置',
        items: [
          { text: '配置指南', link: '/configuration/' },
          { text: '使用云盘备份功能', link: '/configuration/cloud-backup' },
          { text: '使用S3存储云备份', link: '/configuration/s3-cloud-backup' },
          { text: '使用OneDrive存储云备份', link: '/configuration/onedrive-cloud-backup' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Saramanda9988/LunaBox' }
    ],

    footer: {
      message: 'Released under the AGPL v3 License.',
      copyright: 'Copyright © 2025 LunaBox'
    }
  }
})
