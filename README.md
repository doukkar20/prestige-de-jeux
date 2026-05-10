# Prestige de jeux

Prestige de jeux is a React + Vite website. It builds to the `dist/` folder and is configured for automatic deployment to GitHub Pages with GitHub Actions.

## Deployment Setup

### 1. Create a GitHub Repository

1. Go to GitHub.
2. Create a new repository.
3. Keep it empty: do not initialize it with a README, license, or `.gitignore`.

### 2. Push This Project

Run these commands from the project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Replace `USERNAME` with your GitHub username and `REPOSITORY` with your repository name.

### 3. Enable GitHub Pages

In your GitHub repository:

1. Open `Settings`.
2. Go to `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Save the setting.

### 4. Website URL

After the workflow finishes, your website will be available at:

```text
https://USERNAME.github.io/REPOSITORY/
```

### 5. Automatic Redeployment

Every push to the `main` branch runs `.github/workflows/deploy.yml`.

The workflow:

1. Installs dependencies with `npm ci`.
2. Type-checks the project with `npm run lint`.
3. Builds the Vite site with `npm run build`.
4. Verifies that `dist/index.html` and `dist/404.html` exist.
5. Uploads `dist/` as the GitHub Pages artifact.
6. Deploys the website automatically.

## Local Development

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Production Build

```bash
npm run build
```

The production files are generated in `dist/`.

## GitHub Pages Notes

- The Vite config automatically uses the correct repository base path on GitHub Actions.
- A `404.html` fallback is generated from `index.html`, so React routes such as `/tournaments`, `/gallery`, and `/reservation` work on GitHub Pages.
- French and Arabic language switching continues to work because routing is handled client-side.
