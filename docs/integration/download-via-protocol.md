# 外部下载接入（lunabox://）

本文档面向第三方站点/工具，说明如何通过 `lunabox://` 协议唤起 LunaBox 并创建下载任务。

::: danger
免责声明

LunaBox 仅提供“协议唤起 + 下载任务 + 本地导入”技术能力，不参与也不审核第三方内容来源。

- 任何资源版权合法性（含盗版风险）由接入方与终端用户自行判断并承担责任
- 任何下载链接安全问题（恶意文件、木马、钓鱼、篡改等）由接入方与终端用户自行承担风险
- 因第三方链接失效、内容变更、参数错误、环境差异导致的下载失败或数据问题，作者不承担责任
- 接入方应确保其服务符合所在地法律法规与平台规则
:::

## 1. 协议格式

协议入口：`lunabox://install?...`

```text
lunabox://install?url=<下载链接>&file_name=<文件名>&archive_format=<压缩格式>&...
```

请对 query 参数进行 URL 编码（尤其是中文、空格、路径、标题）。

## 2. 参数定义

| 参数 | 类型 | 可选 | 说明 |
|---|---|---|---|
| `url` | string | 否 | 下载直链 |
| `file_name` | string | 否 | 下载文件名（不会从 URL 自动猜测） |
| `archive_format` | string | 否 | 压缩格式：`none/zip/rar/7z/tar/tar.gz/tar.bz2/tar.xz/tar.zst/tgz/tbz2/txz/tzst` |
| `startup_path` | string | 是 | 启动相对路径。用于下载完成后拼接可执行路径 |
| `launch_path` | string | 是 | `startup_path` 的兼容别名（仅当 `startup_path` 为空时生效） |
| `title` | string | 是 | 游戏标题（展示与兜底命名） |
| `download_source` | string | 是 | 下载来源标识（如站点名） |
| `source` | string | 是 | 元数据来源：`bangumi`/`vndb`/`ymgal` |
| `meta_source` | string | 是 | `source` 的兼容别名（仅当 `source` 为空时生效） |
| `meta_id` | string | 是 | 元数据 ID |
| `size` | int64 | 是 | 文件大小（字节）；若提供会做大小一致性校验 |
| `checksum_algo` | string | 是 | 校验算法：`sha256` 或 `blake3`（需与 `checksum` 成对） |
| `checksum` | string | 是 | 校验值（hex；建议小写）（需与 `checksum_algo` 成对） |
| `expires_at` | int64 | 是 | 请求过期时间（Unix 秒） |

## 3. 参数校验与行为

- `url`、`file_name`、`archive_format` 缺失会直接拒绝
- `archive_format` 必须在支持列表内
- `size` 传入时必须 `>= 0`
- `expires_at` 传入时必须 `> 0` 且未过期
- `checksum_algo` 与 `checksum` 必须同时提供，且算法仅支持 `sha256` / `blake3`
- `startup_path` 规则：
  - 必须是相对路径
  - 不能是绝对路径
  - 不能越级（如 `../`）

## 4. 下载与导入流程

1. 客户端收到请求后弹出确认框
2. 用户确认后开始下载任务
3. 下载目录：
   - 已配置 `GameLibraryPath` 时，使用该目录
   - 否则使用用户目录下的 `Games`（即 `~/Games`）
4. 下载支持断点续传（HTTP Range），并持续推送 `download:progress`
5. `archive_format != none` 时自动解压并清理原压缩包
6. 下载完成后：
   - 若提供 `source/meta_source + meta_id`，会尝试预抓取元数据
   - 会尝试自动创建/更新游戏记录

## 5. 示例

### 最小示例

```text
lunabox://install?url=https%3A%2F%2Fexample.com%2Fgame.zip&file_name=game.zip&archive_format=zip
```

### 完整示例

```text
lunabox://install?url=https%3A%2F%2Fcdn.example.com%2Fvn%2Fgame.7z&file_name=MyGame.7z&archive_format=7z&startup_path=Game%2Fgame.exe&title=My%20Game&download_source=ExampleStore&source=vndb&meta_id=v12345&size=4294967296&checksum_algo=sha256&checksum=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef&expires_at=1893456000
```

## 6. 接入注意事项

::: warning
- 请确保下载链接可由客户端直接访问（鉴权链接请控制时效）
- `archive_format` 必须与真实文件格式一致
- `startup_path` 必须传相对路径，不要传绝对路径
- 建议提供 `size` 与 `checksum` 以提升完整性校验能力
- 建议在接入方实现按钮防刷、人机验证、来源审计与风控策略
:::

## 7. 错误排查建议

当协议触发失败或下载失败时，优先检查：

- 是否为 `lunabox://install`
- 便携版客户端是否注册 `lunabox://` 协议
- 必填参数是否齐全
- 参数是否 URL 编码
- `archive_format` 是否与实际文件一致
- `size` / `checksum` 是否与文件一致
- `startup_path` 是否为合法相对路径
