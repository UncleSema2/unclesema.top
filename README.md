# Semen Korobko — personal website

A small, static research homepage at **https://unclesema.top**. HTML, CSS, and a little JavaScript. No build step, server, analytics, or runtime dependencies. Fonts are self-hosted; their OFL licenses are included.

## Preview

```sh
python3 -m http.server 4173 --bind localhost --directory docs
```

Open http://localhost:4173. The page supports mobile layouts, keyboard navigation, reduced motion, and a persistent light/dark theme. The entire content remains usable without JavaScript.

## Edit

- `docs/index.html`: biography, research, experience, teaching, publications and links.
- `docs/assets/style.css`: typography, spacing, responsive layout and themes.
- `docs/assets/main.js`: theme control and section navigation.
- `docs/assets/semen-korobko-cv.pdf`: downloadable English CV.

To update the CV, replace the PDF at that path.
