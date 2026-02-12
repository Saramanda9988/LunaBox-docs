# 命令行工具 (CLI)

从 `1.4.0` 开始，LunaBox 提供命令行工具 **lunacli**，用于在终端里快速查询游戏库、启动游戏、查看详情、创建存档备份等。

![alt text](/image/cli-1.png)

::: warning 重要
当前 lunacli 需要 **LunaBox GUI 应用正在运行** 才能执行命令（它会通过 IPC 调用正在运行的主程序）。
如果未启动 LunaBox，会提示：`LunaBox application is not running.`
:::

## 1. 基本用法

```bash
lunacli <command> [flags]
```

常用命令：

- `lunacli list`：列出游戏库
- `lunacli detail <game>`：查看单个游戏详情
- `lunacli start <game>`：启动游戏并开始记录游玩
- `lunacli backup -g <game>`：创建该游戏的存档备份
- `lunacli version`：输出版本信息

其中 `<game>` 支持多种写法：

- 完整游戏 ID
- **短 ID 前缀**（只要能唯一匹配）
- 游戏名（不区分大小写，支持包含式模糊匹配）

当匹配到多个游戏时，lunacli 会提示你用更精确的 ID/名称。

## 2. 启动游戏：start

```bash
lunacli start <game>
```

可选参数：

- `-l, --le`：使用 Locale Emulator 启动（需要先在 LunaBox 设置里配置 LEProc.exe 路径）
- `-m, --magpie`：启动后配合 Magpie（需要先在设置里配置 Magpie.exe 路径）

示例：

```bash
lunacli start 1a2b3c4d
lunacli start "Wonderful Everyday" -l
lunacli start "Wonderful Everyday" -m
```

## 3. 查看详情：detail

```bash
lunacli detail <game>
```

会输出包括：状态、来源、公司、启动路径、存档路径、监控进程名、是否启用 LE/Magpie 等信息。

## 4. 创建备份：backup

目前支持为指定游戏创建存档备份：

```bash
lunacli backup -g <game>
```

示例：

```bash
lunacli backup -g 1a2b3c4d
lunacli backup -g "Wonderful Everyday"
```

## 5. 常见问题

### Q: 提示应用未运行？

A: 先启动 LunaBox（GUI），再执行 lunacli 命令。

### Q: 找不到 lunacli 在哪里？

A: 如果你使用的是带 CLI 的发行版本（`1.4.0+`），通常会在安装目录或解压目录中提供 `lunacli` 可执行文件。
也可以通过源码构建生成对应二进制。
