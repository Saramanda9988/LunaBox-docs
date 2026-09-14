# LunaBox Documentation

这是 [LunaBox](https://github.com/Saramanda9988/LunaBox) 项目的官方文档仓库。LunaBox 是一款轻量、快速、功能丰富的视觉小说管理与游玩统计工具。

站点使用 [Fumadocs](https://www.fumadocs.dev/)、Next.js App Router 和 Fumadocs MDX 构建，支持中文搜索、明暗主题、移动端导航和静态导出。

## 本地开发

环境要求为 Node.js 22 及以上版本和 pnpm 11.24.0。

```bash
pnpm install
pnpm docs:dev
```

开发服务器地址为 `http://localhost:3000`。

## 构建与预览

```bash
pnpm typecheck
pnpm docs:build
pnpm docs:preview
```

生产构建生成 `out` 目录，预览地址为 `http://localhost:3000`。`pnpm dev` 和 `pnpm build` 分别对应开发和生产构建。

## 项目结构

| 位置 | 用途 |
| --- | --- |
| `docs` | MDX 文档及控制侧边栏顺序的 `meta.json` |
| `app` | 首页、文档页面、搜索索引、站点地图和样式 |
| `components` | 全局 Provider 和搜索对话框 |
| `lib/source.ts` | Fumadocs 文档来源，文档地址从网站根目录开始 |
| `lib/layout.shared.tsx` | 站点名称、导航、GitHub 地址和域名 |
| `mdx-components.tsx` | 文档中的 React 组件配置 |
| `source.config.ts` | Fumadocs MDX 内容集合配置 |
| `public` | 图片、图标、协议测试页和 Google 验证文件 |
| `next.config.mjs` | Next.js 静态导出配置 |

## 文档维护

文档使用 `.mdx` 扩展名，每篇文档通过 YAML frontmatter 定义标题，正文从二级标题开始：

```mdx
---
title: 安装指南
---

## 下载安装包

正文内容。

<Callout type="idea" title="提示">

提示内容。

</Callout>
```

提示框使用 `Callout`，类型包括 `info`、`idea`、`warn` 和 `error`。行内模板变量使用 Markdown 代码标记，例如 `{{.StartDate}}`。HTML 标签中的样式使用 React JSX 语法。

站内链接使用完整页面地址，例如 `/features/manual-add/`；图片继续使用 `/image/example.png`。新增文档后，在对应目录的 `meta.json` 中登记页面名称。

## 贡献指南

欢迎提交 Pull Request 改进文档。提交前请完成类型检查、生产构建和页面预览。
