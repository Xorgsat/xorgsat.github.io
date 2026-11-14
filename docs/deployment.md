# Deployment Guide: Senior SDET Engineering Portfolio

This guide details how to deploy the portfolio to **Cloudflare Pages** (primary recommendation) or **GitHub Pages** (zero-configuration alternative), along with custom domain and DNS setup.

---

## 1. Hosting Platform Evaluation & Selection

### Primary Recommendation: Cloudflare Pages

- **Cost:** Free tier ($0/month).
- **Limits:** Unlimited bandwidth, 500 builds per month, 1 concurrent build, global Anycast edge network.
- **Key Advantage:** Automatic Pull Request preview deployments. Every PR generates an isolated preview URL (e.g., `https://pr-12.sdet-portfolio.pages.dev`) allowing visual inspection of new case studies before merging to `main`.

### Alternative: GitHub Pages

- **Cost:** Free ($0/month).
- **Limits:** 100 GB monthly bandwidth, 10 builds per hour.
- **Key Advantage:** Native integration with your GitHub repository without creating third-party accounts.

---

## 2. Deploying to Cloudflare Pages (Recommended)

### Step 1: Connect GitHub Repository

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** $\rightarrow$ **Create Application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
3. Select your `Portfolio` repository.

### Step 2: Configure Build Settings

Configure the build settings as follows:

- **Framework Preset:** `Astro`
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Root Directory:** `/` (default)
- **Environment Variables:**
  - `NODE_VERSION`: `20`

### Step 3: Trigger Build

Click **Save and Deploy**. Cloudflare Pages will run `npm run build` and deploy the static site globally across 300+ edge data centers in less than 60 seconds.

---

## 3. Deploying to GitHub Pages (Alternative)

We have already configured [.github/workflows/deploy.yml](file:///Users/satyam/Documents/Portfolio/.github/workflows/deploy.yml).

### Step 1: Enable GitHub Pages in Repository Settings

1. Open your repository on GitHub.
2. Go to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.

### Step 2: Push to `main`

Whenever changes are pushed to `main`, the deployment workflow automatically executes:

1. Prettier format check.
2. TypeScript compilation check (`astro check`).
3. Python content & link graph validation.
4. Vitest unit tests.
5. Production build.
6. Deployment to `https://<username>.github.io/<repo>/`.

---

## 4. Configuring a Custom Domain (e.g. `yourname-sdet.com`)

### Step 1: Purchase a Domain

Acquire your desired technical domain from any accredited registrar (Cloudflare Registrar, Namecheap, Google Domains/Squarespace). Estimated cost: $10 - $14/year.

### Step 2: Add DNS Records

In your DNS provider management panel:

| Type               | Name / Host          | Target / Value                                         | TTL  |
| ------------------ | -------------------- | ------------------------------------------------------ | ---- |
| `CNAME`            | `www` (or subdomain) | `<your-project>.pages.dev` (or `<username>.github.io`) | Auto |
| `CNAME` or `ALIAS` | `@` (Apex / Root)    | `<your-project>.pages.dev`                             | Auto |

Cloudflare Pages automatically provisions and renews a free **Let's Encrypt / DigiCert SSL/TLS certificate** for HTTPS enforcement.

---

## 5. Rollback Procedures

### Instant Rollback in Cloudflare Pages

1. Open **Workers & Pages** $\rightarrow$ Select your project.
2. Under the **Deployments** tab, locate the last known healthy deployment.
3. Click the three dots `...` on that deployment $\rightarrow$ **Rollback to this deployment**.
4. The rollback takes effect instantaneously across all edge nodes.

### Git-Level Rollback

If a defect reaches `main`:

```bash
# Revert the faulty commit cleanly
git revert <faulty-commit-sha>
git push origin main
```

The CI/CD pipeline will automatically build and deploy the reverted state.
