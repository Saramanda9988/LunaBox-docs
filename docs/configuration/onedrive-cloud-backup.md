# 使用 OneDrive 进行云备份

LunaBox 支持直接通过 Microsoft OneDrive 进行数据备份。这对于使用 Windows 的用户来说是一个非常方便的选择。

## 配置步骤

1. 在 **设置** -> **云备份** 中，将 **提供商 (Provider)** 选择为 `OneDrive`。
2. 点击 **登录并授权 (Login & Authorize)** 按钮。
3. 此时会弹出一个浏览器窗口，引导您登录 Microsoft 账号并授权 LunaBox 访问您的 OneDrive 存储空间（通常是 `App Folder` 权限或文件读写权限）。
4. 授权完成后，LunaBox 会自动获取 `Refresh Token` 并保存。
5. 界面显示 "已连接" 或显示您的用户信息，即表示配置成功。

::: info
#### 它是如何工作的？
- **OAuth 2.0**: LunaBox 使用标准的 OAuth 2.0 协议进行认证。
- **Refresh Token**: 首次登录后，LunaBox 会保存 `refresh_token`。这意味着您不需要每次都登录，LunaBox 会在后台自动刷新访问令牌以确保持续的连接能力。
- **存储位置**: 备份文件通常会存储在您 OneDrive 的 `应用 (Apps) / LunaBox` 目录下（具体取决于微软应用的权限范围设置）。
:::

::: warning
#### 注意事项
- 请确保您的网络环境可以正常访问 Microsoft 的登录服务和 OneDrive API。
- Refresh Token，虽然有刷新机制，但如果长期未使用或密码变更，授权可能会失效。如果遇到备份失败，请尝试重新点击登录按钮进行授权。
- LunaBox 无法通过默认的 Azure 应用访问您的 OneDrive 数据，所有数据传输均通过微软的官方 API 进行，确保数据安全。
- **一切出现的数据问题，作者概不负责，请谨慎操作**
:::

## 使用您自己的 Azure 应用
我们提供一个默认的 Azure 应用供大多数用户开箱使用
但如果您对隐私和安全有更高的要求，您也可以选择使用自己的 Azure 应用进行 OneDrive 备份。 
请按照以下步骤操作：
1. 进入[Azure 应用注册](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
2. 进行应用注册，填写名称，选择支持的账户类型（建议选择“任何组织目录中的账户和个人微软账户”）
3. 在重定向 URI 中添加 `http://localhost:23456/callback` （LunaBox 使用本地回调进行 OAuth 流程）
![img.png](/image/onedrive.png)
4. 创建应用后，记下clientId，保存到 LunaBox 的 OneDrive 配置中的 `Client ID` 字段，进行前确保处于退出登录状态
![img_1.png](/image/onedrive1.png)
5. 重新进行授权即可

::: warning
**一切出现的数据问题，作者概不负责，请谨慎操作**
:::