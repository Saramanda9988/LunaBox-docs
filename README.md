# LunaBox Documentation

这是 [LunaBox](https://github.com/Saramanda9988/LunaBox) 项目的官方文档仓库。LunaBox 是一款轻量、快速、功能丰富的视觉小说管理与游玩统计工具。

本文档基于 [VitePress](https://vitepress.dev/) 构建。

## 本地开发

### 环境要求

- [Node.js](https://nodejs.org/) (推荐 v18+)
- [pnpm](https://pnpm.io/) (本项目使用 pnpm 进行包管理)

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm docs:dev
```

启动后，访问 `http://localhost:5173` 即可预览文档。

### 构建与预览

构建生产环境版本：

```bash
pnpm docs:build
```

预览构建产物：

```bash
pnpm docs:preview
```

## 项目结构

- `docs/`: 文档源文件 (Markdown)
- `.vitepress/`: VitePress 配置、主题和自定义组件
- `public/`: 静态资源 (图片、图标等)

## 贡献指南

欢迎提交 Pull Request 来改进文档！请确保修改后的文档在本地能够正常运行并预览。
