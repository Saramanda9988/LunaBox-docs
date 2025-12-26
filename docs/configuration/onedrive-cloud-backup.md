# 使用 OneDrive 进行云备份

LunaBox 支持直接通过 Microsoft OneDrive 进行数据备份。这对于使用 Windows 的用户来说是一个非常方便的选择。

## 配置步骤

1. 在 **设置** -> **云备份** 中，将 **提供商 (Provider)** 选择为 `OneDrive`。
2. 点击 **登录并授权 (Login & Authorize)** 按钮。
3. 此时会弹出一个浏览器窗口，引导您登录 Microsoft 账号并授权 LunaBox 访问您的 OneDrive 存储空间（通常是 `App Folder` 权限或文件读写权限）。
4. 授权完成后，LunaBox 会自动获取 `Refresh Token` 并保存。
5. 界面显示 "已连接" 或显示您的用户信息，即表示配置成功。

## 它是如何工作的？

- **OAuth 2.0**: LunaBox 使用标准的 OAuth 2.0 协议进行认证。
- **Refresh Token**: 首次登录后，LunaBox 会保存 `refresh_token`。这意味着您不需要每次都登录，LunaBox 会在后台自动刷新访问令牌以确保持续的连接能力。
- **存储位置**: 备份文件通常会存储在您 OneDrive 的 `应用 (Apps) / LunaBox` 目录下（具体取决于微软应用的权限范围设置）。

## 注意事项

- **网络连接**: 请确保您的网络环境可以正常访问 Microsoft 的登录服务和 OneDrive API。
- **Token 过期**: 虽然有刷新机制，但如果长期未使用或密码变更，授权可能会失效。如果遇到备份失败，请尝试重新点击登录按钮进行授权。
