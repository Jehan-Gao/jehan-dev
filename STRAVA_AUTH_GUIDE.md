# Strava API 授权流程指南

## 🎯 当前问题

之前提供的 code 已过期或已被使用，导致 token 获取失败。

## 📋 正确流程

### 步骤 1: 重新授权

在浏览器中访问以下链接（**重要：请立即访问并授权**）：

```
https://www.strava.com/oauth/authorize?client_id=236369&response_type=code&redirect_uri=http://localhost:4321&scope=read,activity:read_all&approval_prompt=force
```

### 步骤 2: 获取新 Code

授权后，浏览器会跳转到类似这样的 URL：

```
http://localhost:4321?code=a1b2c3d4e5f6...&scope=read,activity:read_all
```

**复制 `code=` 后面的值（到 `&scope` 之前的部分）**

例如，如果跳转 URL 是：
```
http://localhost:4321?code=xyz123abc456&scope=read,activity:read_all
```

则 code 是：`xyz123abc456`

### 步骤 3: 立即使用 Code

**⚠️ 重要：Code 有效期只有几分钟，获取后立即提供给我！**

提供新 code 后，我会：
1. 立即用 code 换取 access_token 和 refresh_token
2. 更新 `.env` 文件
3. 测试 Strava 同步功能

## 🔐 Strava API 凭证配置

您的 Strava 应用配置：
- **Client ID**: 236369 ✓
- **Client Secret**: 2e08167cf195c7bd607a7b4c7151fffc51565cb7 ✓
- **Callback Domain**: localhost ✓
- **Callback URL**: http://localhost:4321 ✓

## 📌 注意事项

1. **Code 有效期**：几分钟内必须使用
2. **Code 使用次数**：只能使用一次
3. **Refresh Token 有效期**：6个月（但可以通过自动刷新延长）
4. **Access Token 有效期**：6小时（每次使用 refresh_token 可以获取新的）

## 🚀 获取 Tokens 后的流程

成功获取 tokens 后：

1. 更新 `.env` 文件
2. 运行 `pnpm sync:strava:activities` 测试
3. 查看同步的活动数据
4. 启动本地开发服务器 `pnpm dev` 查看效果

---

## 🔧 已知配置

- Client ID: **236369**
- Client Secret: **2e08167cf195c7bd607a7b4c7151fffc51565cb7**
- Callback Domain: **localhost**
- Redirect URI: **http://localhost:4321**

## 🎯 下一步行动

请：
1. 点击上面的授权链接
2. 登录 Strava 并授权
3. 从跳转 URL 中提取 code
4. **立即**提供新 code

准备好了吗？