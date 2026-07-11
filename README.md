# ACG Philip Group

Site for the Atmospheric Chemistry Group (Prof. Sajeev Philip), Centre for Atmospheric Sciences, IIT Delhi — built with React, TypeScript, and Vite.

Live at **https://ast222340.github.io/ACGPhilipG/**

## Editing content

All page content lives in one file: [`src/data/profile.ts`](src/data/profile.ts). Update the values there (name, bio, research themes, publications, presentations, highlights, team members, gallery, etc.) — nothing else needs to change for content updates.

## Development

```bash
npm install
npm run dev      # start local dev server
npm run build    # type-check and build for production
npm run lint     # run eslint
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages.
