# Strava API 凭证问题

您提供的 code 已过期或无效。

## 🔍 可能原因

1. **Code 已过期** - Strava 的 authorization code 只能使用一次，且有短暂有效期
2. **Code 已被使用** - 如果之前已经用这个 code 获取过 tokens，就不能再次使用
3. **redirect_uri 不匹配** - 请求时的 redirect_uri 必须与 OAuth 应用中配置的完全一致

## 🛠️ 重新获取 Tokens

### 方法 1：使用浏览器重新授权

1. 访问（确保 redirect_uri 与您 Strava 应用配置的完全一致）：
   ```
   https://www.strava.com/oauth/authorize?client_id=236370&response_type=code&redirect_uri=http://localhost:4321&scope=read,activity:read_all
   ```

2. 登录 Strava 并授权

3. 浏览器会跳转到 `http://localhost:4321?code=NEW_CODE`

4. 从 URL 中复制新的 code

5. 使用新 code 获取 tokens：
   ```bash
   curl -X POST https://www.strava.com/oauth/token \
     -F client_id=236370 \
     -F client_secret=YOUR_CLIENT_SECRET \
     -F code=NEW_CODE \
     -F redirect_uri=http://localhost:4321
   ```

### 方法 2：检查 Strava 应用配置

访问 https://www.strava.com/settings/api

确认您的 App 配置：
- **Application Name**: 任意名称
- **Callback Domain**: `localhost` （如果使用 localhost:4321）
- **Callback URL**: `http://localhost:4321` 或 `http://127.0.0.1:4321`

⚠️ 注意：Callback URL 必须是完整的 URL，包括 `http://` 或 `https://`

## 📌 当前配置

- **Client ID**: 236370
- **Client Secret**: (需要您提供)

您的 Strava 应用配置中 Client ID 是 236370（不是 236369），请确认正确性。

取消注释以下内容：

STRAVA_CLIENT_ID=236370
STRAVA_CLIENT_SECRET=your_client_secret_from_strava
STRAVA_REFRESH_TOKEN=new_refresh_token_after_authorization
