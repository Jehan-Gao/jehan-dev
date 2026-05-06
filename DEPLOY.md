# Deploy to GitHub Pages

## Step 1: Create GitHub Repository

Create a new repository at https://github.com/new with:

- **Repository name**: `jehan-dev`
- **Owner**: `Jehan-Gao` (or your preferred owner)
- **Description**: "Jehan's Personal Website"
- **Public**: Yes
- **Uncheck**: "Initialize this repository with a README"

Click **Create repository**

## Step 2: Connect Local Project to GitHub

```bash
cd ~/github/jehan-dev
git remote set-url origin https://github.com/Jehan-Gao/jehan-dev.git
git push -u origin main
```

If prompted for credentials, use:
- **Username**: Your GitHub username (e.g., `Jehan-Gao`)
- **Password**: GitHub Personal Access Token (PAT) or your GitHub password

## Step 3: Create GitHub Personal Access Token (if needed)

1. Go to https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Set permissions:
   - `public_repo` (for public repos)
   - `workflow` (for GitHub Actions)
4. Click **Generate token**
5. Copy the token and use it as your password

## Step 4: Enable GitHub Pages

1. Go to https://github.com/Jehan-Gao/jehan-dev/settings/pages
2. Under **Build and deployment**:
   - Source: **GitHub Actions**
3. Scroll down and click **Save**

## Step 5: Configure Custom Domain (Optional)

1. Go to https://github.com/Jehan-Gao/jehan-dev/settings/pages
2. Under **Custom domain**:
   - Enter: `jehan-dev.com`
   - Click **Save**
3. Configure DNS records (see DNS Configuration below)

## Step 6: Set up GitHub Actions Secrets for Strava

1. Go to https://github.com/Jehan-Gao/jehan-dev/settings/secrets/actions
2. Click **New repository secret**
3. Add secrets:
   - **Name**: `STRAVA_CLIENT_ID`
   - **Value**: Your Strava Client ID
   
   - **Name**: `STRAVA_CLIENT_SECRET`
   - **Value**: Your Strava Client Secret
   
   - **Name**: `STRAVA_REFRESH_TOKEN`
   - **Value**: Your Strava Refresh Token

## DNS Configuration

For `jehan-dev.com` apex domain:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

For `www.jehan-dev.com` subdomain:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | Jehan-Gao.github.io |

## Verify Deployment

After pushing, wait 1-2 minutes for GitHub Actions to build and deploy, then visit:

- https://jehan-gao.github.io/jehan-dev/ (default GitHub Pages)
- https://jehan-dev.com (custom domain, if configured)

## Troubleshooting

If the site doesn't appear:

1. Check GitHub Actions tab for build failures
2. Verify CNAME file exists in `public/` folder
3. Wait 5-10 minutes for DNS propagation
4. Clear browser cache or use incognito mode
