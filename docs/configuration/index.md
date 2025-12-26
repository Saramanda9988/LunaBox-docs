# 配置指南

您可以在 LunaBox 的设置页面进行各项功能的配置。

## AI 配置

要使用 AI 分析功能，您需要配置相应的 AI 服务提供商。

| 配置项 | 说明 |
|--------|------|
| **AI Provider** | 选择 AI 服务提供商 (例如: deepseek, openai 等) |
| **Base URL** | API 的基础地址 (Base URL) |
| **API Key** | 您的 API 密钥 |
| **Model** | 使用的模型名称 (例如: gpt-3.5-turbo, deepseek-chat) |

## 云备份配置

LunaBox 支持多种云备份方式，确保您的数据安全。详细说明请参考：

- [云备份功能概览](./cloud-backup.md)

### S3 兼容存储

支持 AWS S3、七牛云、阿里云 OSS 等兼容 S3 协议的存储服务。

[查看详细配置指南](./s3-cloud-backup.md)

| 配置项 | 说明 |
|--------|------|
| **Endpoint** | S3 服务端点地址 |
| **Region** | 区域 Region |
| **Bucket** | 存储桶名称 |
| **Access Key** | 访问密钥 (AK) |
| **Secret Key** | 秘密密钥 (SK) |

### OneDrive

LunaBox 集成了 OneDrive 备份支持。

[查看详细配置指南](./onedrive-cloud-backup.md)

在设置页面点击登录 Microsoft 账号并授权，即可开启 OneDrive 云端同步。