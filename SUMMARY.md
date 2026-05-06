# Jehan.dev 项目已创建完成！

## 📦 项目概览

已成功创建并配置了 Jehan.dev 项目，这是一个基于 Astro 的个人网站，功能与 yuler.dev 类似。

## 📍 项目位置

```
~/github/jehan-dev
```

## ✅ 已完成的功能

### 核心功能
- ✅ Astro 6.1.8 静态站点生成器
- ✅ Tailwind CSS 样式（含 Typography 插件）
- ✅ MDX 支持（Markdown + JSX）
- ✅ 5个页面路由：首页、Posts、Thoughts、Workouts、Workouts详情页
- ✅ Strava API 集成（需要配置凭证）
- ✅ Leaflet 地图（支持 CartoDB/AMap 切换）

### 网站组件
- ✅ Profile 卡片（头像、昵称、说明）
- ✅ Github/X 社交链接卡片
- ✅ Location 地图卡片（北京位置）
- ✅ Thoughts 响应式思维笔记卡片
- ✅ Workouts 工作日志（GitHub 风格热力图）
- ✅ Posts 博客列表卡片
- ✅ LightBox 图片预览功能

### 部署准备
- ✅ GitHub Pages 部署工作流 (.github/workflows/deploy.yml)
- ✅ Strava 同步工作流 (.github/workflows/sync-strava.yml)
- ✅ CI 检查工作流 (.github/workflows/ci.yml)
- ✅ CNAME 文件 (public/CNAME)
- ✅ 自定义域名配置文档 (DEPLOY.md)

### 示例内容
- ✅ 3个示例 Posts（2024、2026 年份）
- ✅ 1个示例 Thoughts
- ✅ 空 Strava 活动数据结构
- ✅ 示例头像图片

## 🚀 开始使用

### 本地开发

```bash
cd ~/github/jehan-dev
pnpm install
pnpm dev
```

访问 **http://localhost:4321** 查看网站

### 构建生产版本

```bash
pnpm build
```

### Strava 同步配置

1. 创建 Strava OAuth 应用：https://www.strava.com/settings/api
2. 获取 Client ID、Client Secret 和 Refresh Token
3. 创建 .env 文件：

```env
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REFRESH_TOKEN=your_refresh_token
```

4. 运行同步：

```bash
pnpm sync:strava:activities
```

## 🛠️ GitHub Pages 部署步骤

### 1️⃣ 创建仓库

访问 https://github.com/new 创建仓库：
- **仓库名**: `jehan-dev`
- **所有者**: `Jehan-Gao`
- **类型**: Public
- **取消勾选**: "Initialize this repository with a README"

### 2️⃣ 推送代码

```bash
cd ~/github/jehan-dev
git remote set-url origin https://github.com/Jehan-Gao/jehan-dev.git
git push -u origin main
```

需要使用 GitHub Personal Access Token 作为密码。

**如何创建 PAT**:
1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 设置权限: `public_repo` + `workflow`
4. 复制生成的 token 作为密码使用

### 3️⃣ 启用 GitHub Pages

1. 访问 https://github.com/Jehan-Gao/jehan-dev/settings/pages
2. **Source**: 选择 **"GitHub Actions"**
3. 滚动到底部点击 **Save**

### 4️⃣ 配置自定义域名（可选）

1. GitHub Pages 设置中添加 `jehan-dev.com`
2. 在 DNS 提供商配置以下记录：

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
CNAME www    Jehan-Gao.github.io
```

更多详情请参见 `DEPLOY.md` 文件。

### 5️⃣ 设置 Strava 同步 Secrets

1. 访问 https://github.com/Jehan-Gao/jehan-dev/settings/secrets/actions
2. 点击 **New repository secret** 添加：
   - `STRAVA_CLIENT_ID` - 您的 Strava Client ID
   - `STRAVA_CLIENT_SECRET` - 您的 Strava Client Secret
   - `STRAVA_REFRESH_TOKEN` - 您的 Strava Refresh Token

## 📁 项目结构

```
jehan-dev/
├── .github/workflows/    # GitHub Actions workflows
├── data/strava/          # Strava 数据存储
├── public/               # 静态资源
│   ├── CNAME             # 自定义域名
│   └── favicon.svg       # 网站图标
├── scripts/              # 构建和同步脚本
├── src/
│   ├── assets/          # 图片资源
│   ├── components/      # Astro 组件
│   ├── content/         # Markdown 内容
│   ├── layouts/         # 布局组件
│   ├── lib/             # 库代码（Leaflet）
│   ├── pages/           # 页面路由
│   ├── styles/          # CSS 样式
│   └── utils/           # 工具函数
├── DEPLOY.md            # 部署指南
├── README.md            # 项目说明
├── TODO.md              # 待办事项
├── astro.config.mjs     # Astro 配置
├── package.json         # 依赖
└── tsconfig.json        # TypeScript 配置
```

## 📝 下一步建议

### 🔥 着手做的
1. 使用 **`pnpm dev`** 启动本地开发服务器，检查页面效果
2. 根据需要调整 `src/content/` 文件夹中的示例内容
3. 配置 Strava API 凭证以获得实时运动数据
4. 添加更多 posts 和 thoughts 内容
5. 替换 `src/assets/avatar.png` 为您的真实照片

### 📌 稍后做的
1. 配置 GitHub Actions secrets 以自动同步 Strava 数据
2. 设置自定义域名 DNS 记录
3. 在 GitHub Pages 设置中启用 **Enforce HTTPS**
4. 添加 SEO 增强，如 sitemap.xml 和 robots.txt
5. 自定义博客文章样式和布局

## 🔧 技术细节

### 核心技术栈
- **框架**: Astro 6.1.8 (MPA 模式，无客户端 hydration)
- **样式**: Tailwind CSS 4.2.2 + Typography 插件
- **地图**: Leaflet 1.9.4 + CartoDB/高德地图
- **数据**: Strava API v3
- **语言**: TypeScript + Astro Components
- **构建**: Vite 7.3.1

### 样式特点
- 统一的灰色背景 (#f5f5f5)
- 白色卡片风格
- 加粗字体 (font-mono)
- 拐角装饰元素
- Hover 交互效果
- 响应式布局（1列/3列自适应）

### 功能亮点
- Workouts 热力图（GitHub 风格贡献图）
- 思维笔记双重视图（Canvas & List）
- 地图组件支持切换底图供应商
- 图片预览灯箱
- 日期范围过滤器

## ❓ 支持和故障排除

### 本地开发问题
- 运行 **`pnpm check`** 检查 TypeScript 错误
- 运行 **`pnpm dev`** 查看实时开发服务器
- 检查 `src/` 目录中的 Astro 文件语法

### GitHub Pages 部署问题
- 检查 GitHub Actions tab 中的构建日志
- 等待 5-10 分钟等待部署完成
- 清除浏览器缓存或使用无痕模式
- 验证 CNAME 文件存在

### Strava API 问题
- 确保密钥正确配置在 .env 文件中
- 检查 Strava OAuth 应用的重定向 URL 设置
- 运行 **`pnpm sync:strava:activities`** 手动测试同步

## 📚 资源链接

- **Astro 官方文档**: https://docs.astro.build
- **Tailwind CSS 文档**: https://tailwindcss.com/docs
- **GitHub Pages 指南**: https://docs.github.com/en/pages
- **Strava API 文档**: https://developers.strava.com/docs/reference

---

**项目已就绪！** 🎉

请按照 `DEPLOY.md` 文件的说明进行 GitHub Pages 部署。

如有问题，请随时询问！
