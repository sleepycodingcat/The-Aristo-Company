# The Aristo Company — film portfolio site

Static HTML/SCSS/JS site, no build tool or package.json.
Live at https://rachell-aristo.github.io/The-Aristo-Company/

## Rules

- **Ask before running any command** (shell, git, gh, scripts, installs). This includes commands that only read things. Say what the command does and wait for a yes.
- **Big video files never go in the repo.** Upload films and showreels to Vimeo or YouTube and embed them with an `<iframe>`. Only tiny looping clips like the logo animations in `src/assets/logos/` belong in git.

## Deploying (GitHub Pages)

- Pages serves the **`main` branch, `/docs` folder**.
- Edit files in `src/` (and `dist/photos/`), **never** in `docs/`. On each push to `main`, `.github/workflows/deploy.yml` copies `src/` → `docs/`, rewrites the relative paths, and commits as "Deploy: Update docs folder from src/ [skip ci]".
- Because the workflow pushes that bot commit, run `git pull` before pushing or the push will be rejected.

## Where things live

- Pages: `src/html/pages/*.html`. Shared sidebar/footer: `src/html/components/`, loaded at runtime by `src/js/utils/script.js`.
- Styles: `src/styles/main.scss` + `_*.scss` partials, compiled to `src/styles/css.css`, which is the file pages link. Recompile it after editing SCSS.
- JS: `src/js/utils/` (navigation, films, PDFs, click effect) and `src/js/lightbox/` (photo and BTS galleries).
- Images: thumbnails/stills in `src/assets/media/`, logos in `src/assets/logos/`, photography in `dist/photos/webp/` with fallbacks in `dist/photos/compressed/`.
- `archive/` holds old material. It is referenced by some BTS pages, but the deploy workflow does not copy it.
- Paths from a page look like `../../styles/css.css`, `../../dist/photos/webp/x.webp`. Keep that form so the workflow's path rewriting works.
