# The Aristo Company - Project Structure

This is a simplified, clean structure that's easy to maintain and scale.

## Quick Overview

```
src/                    → All your working files (HTML, JS, CSS, assets)
dist/photos/            → Optimized photos (WebP, plus JPEG fallbacks)
archive/                → Old projects (keep for reference)
```

---

## Full Structure

```
The-Aristo-Company/
│
├── src/                          # Your working files
│   ├── html/
│   │   ├── pages/                # Add new pages here
│   │   │   ├── index.html
│   │   │   ├── mediaHome.html
│   │   │   ├── mediaPhotography.html
│   │   │   └── [other pages].html
│   │   └── components/           # Reusable parts (footer, sidebar)
│   │       ├── footer.html
│   │       └── sidebar.html
│   │
│   ├── js/
│   │   ├── lightbox/             # Photo/video gallery
│   │   │   ├── photo_lightbox.js
│   │   │   └── btsLightbox.js
│   │   └── utils/                # Everything else
│   │       ├── script.js         # Main navigation & component loading
│   │       ├── allFilms.js
│   │       └── click-spark.js
│   │
│   ├── styles/
│   │   ├── css.css               # Compiled styles (use this)
│   │   ├── main.scss             # Source (if editing)
│   │   └── _*.scss               # Component styles
│   │
│   └── assets/                   # Brand & content files
│       ├── logos/                # Logos, favicons, brand videos
│       ├── photos/               # Source photos (before optimization)
│       └── media/                # BTS content, storyboards, etc.
│
├── dist/photos/                  # Optimized photos (WebP & JPEG)
│   ├── webp/                     # Use these for best performance
│   └── compressed/               # JPEG fallback for older browsers
│
├── archive/                      # Old projects/content (reference only)
│
└── PROJECT_STRUCTURE.md          # This file
```

---

## When Adding Content

### New Page?
→ Create `src/html/pages/new-page.html`

### New Photos?
→ Give me originals → Convert to WebP → Store in `dist/photos/webp/` + `dist/photos/compressed/`

### New Style?
→ Edit `src/styles/` (SCSS files), compiles to `css.css`

### New Script?
→ Add to `src/js/utils/` (or `lightbox/` if it's gallery-related)

---

## Paths from HTML Pages

From `src/html/pages/mediaPhotography.html`:
```html
<link href="../../styles/css.css">
<script src="../../js/lightbox/photo_lightbox.js"></script>
<img src="../../assets/logos/Favicon.png">
<img src="../../../dist/photos/webp/photo-name.webp">   <!-- dist/ is at the repo root, so three levels up -->
```

---

## That's It!

Just remember:
- **src/** = your work files
- **dist/** = optimized photos (don't edit)
- **archive/** = old stuff (ignore)

Simple. Clean. Scalable.

