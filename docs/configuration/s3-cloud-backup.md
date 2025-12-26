# 使用 S3 兼容存储进行云备份

LunaBox 支持所有兼容 Amazon S3 协议的对象存储服务，包括 AWS S3、MinIO、阿里云 OSS、腾讯云 COS、七牛云 Kodo 等。

## 配置步骤

1. 在 **设置** -> **云备份** 中，将 **提供商 (Provider)** 选择为 `S3`。
2. 填写以下配置信息：

| 配置项 | 字段名 | 说明 |
| :--- | :--- | :--- |
| **服务端点 (Endpoint)** | `s3_endpoint` | S3 服务的访问地址。例如 `s3.amazonaws.com` 或 `oss-cn-hangzhou.aliyuncs.com`。 |
| **区域 (Region)** | `s3_region` | 存储桶所在的区域代码, 如 `us-east-1`, `cn-hangzhou`。如果您的服务商不强制要求，可填 `auto` 或留空。 |
| **存储桶 (Bucket)** | `s3_bucket` | 您创建的用于存放备份数据的存储桶名称。 |
| **访问密钥 (Access Key)** | `s3_access_key` | 您的 API Access Key ID。 |
| **秘密密钥 (Secret Key)** | `s3_secret_key` | 您的 API Secret Access Key。 |

## 常见服务商配置示例

### MinIO (自建)
- **Endpoint**: `play.min.io` (或者您的私有地址)
- **Region**: `us-east-1` (MinIO 默认区域通常也是这个，或者按需填写)

### 阿里云 OSS
- **Endpoint**: `oss-cn-hangzhou.aliyuncs.com` (根据实际区域填写)
- **Region**: `cn-hangzhou`

### 七牛云
- **Endpoint**: `s3-cn-east-1.qiniucs.com` (华东区域示例)
- **Region**: `cn-east-1`

## 注意事项

- 请确保填写的 **Access Key** 和 **Secret Key** 具有对该存储桶的读写权限 (`ListBucket`, `PutObject`, `GetObject`, `DeleteObject`)。
- 建议为 LunaBox 创建一个单独的存储桶，或者在现有存储桶中使用特定的前缀（LunaBox 会使用 UserID 作为根目录），以免混淆数据。
