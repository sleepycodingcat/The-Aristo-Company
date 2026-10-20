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
- Styles: `src/styles/main.scss` + `_*.scss` partials, compiled to `src/styles/css.css`, which is the file pages link. **`css.css` has hand edits that are not in the SCSS** (e.g. the Instagram grid), so recompiling would delete them. Until they're ported back, make style changes in both the `.scss` partial and `css.css`.
- Video pages: `otherMediaHome.html` is **Narrative** (YouTube films, lightbox in `allFilms.js`); `commercial.html` is **Commercial** (horizontal promos in the same lightbox, plus Instagram reel embeds). The header is copied into every page, not a component, so nav changes must be made on each page.
- JS: `src/js/utils/` (navigation, films, PDFs, click effect) and `src/js/lightbox/` (photo and BTS galleries).
- Images: thumbnails/stills in `src/assets/media/`, logos in `src/assets/logos/`, photography in `dist/photos/webp/` with fallbacks in `dist/photos/compressed/`.
- Client logo banner (bottom of `commercial.html`): originals in `src/assets/logos/clients/`, single-colour transparent PNGs in `clients/mono/`. The banner uses the mono PNGs as CSS masks, so their colour comes from CSS; `allFilms.js` duplicates the logos for the seamless scroll. No image library is installed, so new mono PNGs were made with a headless-Chrome canvas script (background removed, trimmed, 240px tall).
- `archive/` holds old material referenced by some BTS pages; the deploy workflow copies it to `docs/archive/`.
- Paths from a page look like `../../styles/css.css`, `../../assets/…`, and `../../../dist/photos/webp/x.webp` (`dist/` and `archive/` are at the repo root, one level further up). Keep that form so local preview works and the workflow's path rewriting works.
- GitHub Pages is case-sensitive but macOS isn't: match file name capitalisation exactly.
