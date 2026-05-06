# 🗂️ 项目文件清单

```
jehan-dev/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI 检查工作流
│       ├── deploy.yml             # GitHub Pages 自动部署
│       └── sync-strava.yml        # Strava 同步工作流
├── .gitignore                   # Git 忽略文件
├── .env.example                 # 环境变量示例
├── DEPLOY.md                    # 部署指南
├── README.md                    # 项目说明
├── TODO.md                      # 待办事项
├── SUMMARY.md                   # 项目摘要
├── astro.config.mjs             # Astro 配置
├── package.json                 # 依赖配置
├── tsconfig.json                # TypeScript 配置
├── public/                      # 静态资源
│   ├── CNAME                    # 自定义域名
│   └── favicon.svg              # 网站图标
├── data/strava/                 # Strava 数据
│   ├── _index.json
│   ├── _meta.json
│   └── 0.json
├── scripts/                     # 构建脚本
│   ├── create-post.mjs
│   ├── export-post-pdf.mjs
│   ├── screenshot.mjs
│   └── sync-strava-activities.mjs
└── src/
    ├── assets/                  # 图片资源
    │   └── avatar.png
    ├── components/              # Astro 组件
    │   ├── Avatar.astro
    │   ├── Button.astro
    │   ├── CornerMarkers.astro
    │   ├── Footer.astro
    │   ├── LightBox.astro
    │   ├── Thought.astro
    │   ├── cards/               # 卡片组件
    │   │   ├── Github.astro
    │   │   ├── Location.astro
    │   │   ├── Posts.astro
    │   │   ├── Profile.astro
    │   │   ├── Thoughts.astro
    │   │   └── Workouts.astro
    │   └── icons/               # 图标组件
    │       ├── ArrowRight.astro
    │       ├── ArrowUpRight.astro
    │       ├── ChevronRight.astro
    │       ├── Github.astro
    │       ├── Globe.astro
    │       ├── MapFold.astro
    │       ├── MapPin.astro
    │       └── X.astro
    ├── content/                 # Markdown 内容
    │   ├── posts/               # 博客文章
    │   │   ├── 2024/
    │   │   │   └── setup-mac-mini.md
    │   │   ├── 2026/
    │   │   │   ├── strava-integration.md
    │   │   │   └── welcome.md
    │   │   └── deepseek.md
    │   └── thoughts/
    │       └── first.md
    ├── content.config.ts        # 内容配置
    ├── layouts/                 # 布局组件
    │   ├── Layout.astro
    │   ├── PostLayout.astro
    │   └── WorkoutsLayout.astro
    ├── lib/                     # 库代码
    │   └── leafletTiles.ts      # 地图配置
    ├── pages/                   # 页面路由
    │   ├── index.astro
    │   ├── posts/
    │   │   ├── [slug].astro
    │   │   └── index.astro
    │   ├── thoughts/
    │   │   └── index.astro
    │   └── workouts/
    │       ├── [id].astro
    │       └── index.astro
    ├── styles/                  # CSS 样式
    │   └── global.css
    └── utils/                   # 工具函数
        ├── date.ts
        ├── strava.ts
        ├── strava-activities.ts
        ├── thoughts-canvas-layout.ts
        ├── thoughts.ts
        ├── workout-display.ts
        ├── workouts-calendar.ts
        └── workouts-date-range.ts
```

## 📊 文件统计

- **配置文件**: 5 个
- **Astro 组件**: 20+ 个
- **Markdown 内容**: 4 个
- **TypeScript 文件**: 11 个
- **工作流文件**: 3 个
- **文档文件**: 4 个
- **总计**: 68+ 个文件

## 🎯 文件用途

| 类型 | 用途 | 数量 |
|------|------|------|
| Astro 组件 | 页面和 UI 组件 | 20+ |
| TypeScript | 工具和配置 | 11 |
| Markdown | 内容 | 4 |
| YAML | GitHub Actions | 3 |
| 其他 | 文档/配置 | 10+ |
