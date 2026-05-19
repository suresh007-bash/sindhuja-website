# Sindhuja Website Deployment

This is a production-ready Vite-based static deployment package for the `sindhuja_website.jsx` project.

## Setup

1. Open a terminal in `C:\Users\avsve\Downloads\sindhuja-website-deploy`
2. Run `npm install`
3. Run `npm run dev` for local development
4. Run `npm run build` to create optimized production files in `dist`

## Deploy options

### GitHub Pages
1. Push the folder to a GitHub repository.
2. Configure GitHub Pages to publish from the `gh-pages` or `main` branch.
3. Use the generated `dist` folder as the deploy source.

### Netlify
1. Connect the repository to Netlify.
2. Set the publish directory to `dist`.
3. Run deploy.

### Vercel
1. Import the repository into Vercel.
2. Set the root directory and deploy.

## Notes

- This project now uses Vite and React modules, not in-browser Babel.
- The production build is precompiled and optimized for deployment.
- Open the local dev server instead of using `file://` for the best experience.
