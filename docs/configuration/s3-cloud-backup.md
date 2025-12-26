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
1. MinIO (自建)
2. 阿里云 OSS
3. 七牛云

以下以七牛云为例，说明如何配置 S3 兼容存储：
1. 首先注册并登录七牛云，完成实名验证。
2. 进入[对象存储kodo](https://www.qiniu.com/products/kodo)页面，点击立即使用
![img.png](/image/s3backup.png)
3. 创建一个新的存储空间（Bucket），选择合适的区域和权限（建议私有）

![img_1.png](/image/s3backup1.png)

![img_2.png](/image/s3backup2.png)

4. 打开LunaBox，进入设置页面，选择云备份提供商为 S3，Endpoint 输入访问地址，可以通过打开[服务域名](https://developer.qiniu.com/kodo/4088/s3-access-domainname) ，按照页面说明复制刚刚创建的空间对应的区域 Region ID 字符串
![img_3.png](/image/s3backup3.png)

5. 输入对应的内容
- 输入 Acess Key 和 Secret Key，可以前往[密钥管理](https://portal.qiniu.com/developer/user/key)获取
![img_4.png](/image/s3backup4.png)
- Bucket 输入你的存储桶名称，也就是你创建的空间的名称 
- Region 输入区域简称 Region ID ，之前在[服务域名](https://developer.qiniu.com/kodo/4088/s3-access-domainname)中查找过
- 备份密码请自行设置，建议使用强密码，这个密码用于加密备份数据/生成 UserId用于定位您的备份数据
![img_5.png](/image/s3backup5.png)

6. 保存配置后，点击测试连接按钮，确认配置正确

::: warning
#### 注意事项
- 请确保填写的 **Access Key** 和 **Secret Key** 具有对该存储桶的读写权限 (`ListBucket`, `PutObject`, `GetObject`, `DeleteObject`)。
- 建议为 LunaBox 创建一个单独的存储桶，或者在现有存储桶中使用特定的前缀（LunaBox 会使用 UserID 作为根目录），以免混淆数据。
- 敏感信息（如 Access Key 和 Secret Key）均保存在本地，不会上传云端，请妥善保管，避免泄露。
- **一切出现的数据问题，作者概不负责，请谨慎操作**
:::
