# Jehan.dev

My personal website: https://jehan-dev.com — built with the [Astro](https://astro.build) stack.

## Features

- **Astro 6.1.8** - Modern static site generator with island architecture
- **Tailwind CSS** - Utility-first CSS framework
- **MDX Support** - Write Markdown with JSX components
- **Strava Integration** - Sync and display workout activities
- **Leaflet Maps** - Interactive maps with CartoDB/AMap support
- **GitHub Pages** - Free hosting with custom domain

## Development

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/jehan-dev.git
cd jehan-dev

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Strava Integration

To sync Strava activities:

1. Create a Strava OAuth app at https://www.strava.com/settings/api
2. Get your `Client ID` and `Client Secret`
3. Obtain a `Refresh Token` using the OAuth flow
4. Create a `.env` file:

```env
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REFRESH_TOKEN=your_refresh_token
```

5. Run sync:

```bash
pnpm sync:strava:activities
```

This will:
- Fetch all your activities
- Save them as JSON in `data/strava/activities/`
- Update the workout heatmap on your site

## Project Structure

```
jehan-dev/
├── data/strava/activities/     # Strava activity data
├── public/                     # Static assets
│   ├── CNAME                   # Custom domain configuration
│   └── favicon.svg             # Website favicon
├── scripts/                    # Build and sync scripts
├── src/
│   ├── assets/                 # Images and other assets
│   ├── components/             # Astro components
│   ├── content/                # Markdown posts and thoughts
│   ├── layouts/                # Layout components
│   ├── lib/                    # Library code (Leaflet tiles)
│   ├── pages/                  # Page routes
│   ├── styles/                 # CSS files
│   └── utils/                  # Utility functions
├── .github/workflows/          # GitHub Actions workflows
├── astro.config.mjs            # Astro configuration
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript configuration
```

## Deploy to GitHub Pages

### GitHub Actions (Recommended)

The project includes automatic deployment via GitHub Actions:

1. Create a GitHub repository named `jehan-dev`
2. Push your code
3. Enable GitHub Pages in repository settings (publish from `main` branch)
4. Configure custom domain if needed

### Manual Deployment

```bash
pnpm build
# Deploy the `dist/` folder to GitHub Pages
```

## Custom Domain

To use `jehan-dev.com`:

1. Add the domain in GitHub Pages settings
2. Configure DNS records:

**A records (apex domain):**
- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

**CNAME record (www subdomain):**
- `www` → `your-username.github.io`

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Map**: [Leaflet](https://leafletjs.com) + CartoDB/AMap
- **API**: [Strava API](https://developers.strava.com)
- **Hosting**: [GitHub Pages](https://pages.github.com)
- **Icons**: Lucide Icons

## License

MIT License

## Acknowledgments

- Inspired by [yuler.dev](https://yuler.dev)
