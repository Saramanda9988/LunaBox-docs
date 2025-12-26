# 安装指南

## 下载安装包

我们推荐直接从 GitHub Releases 页面下载最新版本的安装包。

[前往 Releases 下载](https://github.com/Saramanda9988/LunaBox/releases)

提供便携版（portable）和安装版（setup），目前仅支持 Windows 系统。

## 从源码构建

如果您是开发者，或者希望体验最新的开发功能，可以从源码构建 LunaBox。

### 前置要求

在开始之前，请确保您的开发环境已准备好以下工具：

- [Go 1.24+](https://go.dev/dl/)
- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Wails CLI](https://wails.io/docs/gettingstarted/installation)
- [msys2](https://www.msys2.org/) (duckdb-go sdk需要)

安装 Wails CLI：

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 构建步骤

#### 1.**克隆项目**

```bash
git clone https://github.com/Saramanda9988/lunabox.git
cd lunabox
```

#### 2. **安装前端依赖**

```bash
cd frontend && pnpm install && cd ..
```

#### 3. **运行开发模式**

```bash
wails dev
```

#### 4. **手动构建生产版本**

LunaBox的版本号和安装形式需要在构建时通过参数指定

```cmd
# 语法：build.bat [构建模式] [版本号]
# 构建模式：portable(便携版) | installer(安装版) | all(全部)
# 版本号：可选参数，不指定时自动从Git标签获取
```
建议使用 Windows 批处理脚本构建：

```cmd
.\scripts\build.bat all v1.0.0-beta
```

脚本支持以下构建模式：
- `portable`：构建便携版，数据存储在程序目录
- `installer`：构建安装版，数据存储在 `%APPDATA%\LunaBox`
- `all`：同时构建便携版和安装版

版本号可以通过以下方式指定：
- 通过命令行参数直接传入（如 `v1.0.0-beta`）
- 不指定时自动从 Git 标签获取最新版本号
- 版本号中的 `v` 前缀会被自动移除

构建时会自动注入以下信息到可执行文件中：
- 版本号
- Git 提交哈希
- 构建时间
- 构建模式
