# Ubaid Ahmad — Full-Stack MERN Developer & Agentic AI Specialist (2026 Edition)

A high-performance, single-page portfolio built on a **data-driven vanilla JavaScript architecture**. Engineered for speed, structured for long-term scalability, and designed without a single build dependency. The 2026 edition introduces a premium 3D interaction layer, direction-aware scroll animations, smart pagination, and a universal shimmer-gradient design system — all written in pure HTML, CSS, and JavaScript.

---

## Live Preview

**[bugcurator.github.io](https://bugcurator.github.io/)**

---

## What's New in 2026

### Dynamic 3D Coin-Toss Profile

The hero profile image is now a fully interactive 3D flip card. On hover, `.coin-inner` performs a **720-degree rotation** (two full Y-axis turns) in `0.9s` using a springy `cubic-bezier(0.34, 1.56, 0.64, 1)` easing — the same "flick" physics used in native mobile UI. A gold-gradient **"TRUSTED EXPERT"** verification badge renders on the reverse face, with a stacked `fa-certificate` + `fa-check` icon composited through `z-index` layering. `perspective: 1500px` and `backface-visibility: hidden` on both faces ensure mathematically correct depth and zero bleed-through during the spin.

### Direction-Aware Scroll Animations

A passive `scroll` event listener continuously tracks `_lastScrollY` vs `_currentScrollY`. The shared `IntersectionObserver` reads this delta at the exact moment an element enters the viewport, then stamps either a `from-below` class (scrolling down → element slides up) or `from-above` class (scrolling up → element slides down) before firing the `visible` transition. Both direction classes are wiped on exit, so every scroll pass re-evaluates direction cleanly.

### Smart Experience Loader

The Experience section uses a constant-driven pagination model. `INITIAL_EXP_COUNT = 2` controls the initial render; `EXP_BATCH_SIZE = 3` controls how many cards are revealed per click. A `updateExperienceButtons()` function syncs both the **Show More** and **Show Less** buttons on every state change — dynamically updating the label text to reflect the next batch count (e.g., "Show 3 More Experience"). The **Show Less** button smooth-scrolls the user back to the section header on collapse. The logic is array-length-agnostic: it works whether there are 5 or 80 experience entries.

### Auto-Pinned Projects

The first three entries in the `window.projects` array are automatically detected by `renderProjects()` via `projectsData.indexOf(project)` and receive a gold `.pinned-badge` ribbon injected into the top-right corner of their card. No manual tagging required — repositioning a project in the array is all it takes to change which three are pinned.

### Universal Shimmer-Gradient Hover

All `.glass-card`, `.cta-button`, `.load-more-btn`, `.connect-btn`, `.modal-link`, and `.category-btn` elements now carry a CSS `::after` pseudo-element — a `skewX(-18deg)` diagonal stripe of `rgba(212, 175, 55, 0.18)` that sweeps left-to-right on hover. `.modal-content` is deliberately excluded via `:not(.modal-content)` to preserve its `overflow-y: auto` modal scroll.

### Interactive Collaboration Carousel

The clients carousel now accepts a `url` field per entry and wraps each logo in a clickable `<a>` tag. `mouseenter` sets `animationPlayState: paused` on the track; `mouseleave` resumes it — giving users time to read and click logos without fighting the animation.

---

## Architecture

```
.
├── index.html              ← Semantic layout shell and SEO metadata
├── styles/
│   └── style.css           ← Design system, animation engine, responsive rules
├── scripts/
│   └── script.js           ← Data arrays, state logic, all DOM rendering
├── assets/                 ← Images, icons, fonts
├── docs/
│   ├── PROJECT_EDITING_GUIDE.md
│   ├── PROJECT_TYPE_DEFINITIONS.md
│   └── CHANGELOG.md
├── README.md
└── LICENSE
```

The project enforces strict separation of concerns:

- **HTML** handles structure and static metadata only.
- **CSS** owns every presentational and animation rule.
- **JavaScript** owns all data, state, and DOM output.

---

## Data-Driven Rendering

All dynamic content lives in arrays inside `scripts/script.js`:

| Array             | Renders Into             |
| ----------------- | ------------------------ |
| `skillCategories` | Tabbed skills grid       |
| `experience`      | Paginated timeline       |
| `projects`        | Filterable project cards |
| `clients`         | Infinite logo carousel   |
| `testimonials`    | Testimonial grid + modal |

To add content, append a correctly structured object to the relevant array. No HTML editing required.

---

## Tech Stack

### Core

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

### MERN Stack (Projects)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

### Agentic AI & Tooling

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)

---

## Design System

### Color Tokens (`styles/style.css`)

| Variable         | Value                                     | Role                                |
| ---------------- | ----------------------------------------- | ----------------------------------- |
| `--bg-dark`      | `#1a1a1a`                                 | Page background                     |
| `--text-dark`    | `#e8e8e8`                                 | Body text                           |
| `--accent-dark`  | `#d4af37`                                 | Gold accent — borders, glows, icons |
| `--glass-dark`   | `rgba(255,255,255,0.05)`                  | Card fill                           |
| `--border-dark`  | `rgba(212,175,55,0.2)`                    | Card borders                        |
| `--shadow-color` | `rgba(212,175,55,0.5)`                    | Glow shadows                        |
| `--spring`       | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Default spring easing               |

Changing `--accent-dark` in `:root` propagates the new colour across every border, glow, hover effect, and gradient instance simultaneously.

### Glass Cards

Apply `.glass-card` to any new container to inherit the full glassmorphism treatment: `backdrop-filter: blur(15px)`, semi-transparent fill, gold border, and depth shadow.

### Scroll Animations

Add `animate-on-scroll` to any element, then pair it with one of three modifier classes:

| Modifier   | Effect                                            |
| ---------- | ------------------------------------------------- |
| `slide-up` | Slides from ±40px Y depending on scroll direction |
| `zoom-in`  | Scales from 0.88 to 1.0                           |
| `fade-in`  | Fades from ±12px Y depending on scroll direction  |

The `IntersectionObserver` in `script.js` handles everything automatically.

---

## Performance

- **IntersectionObserver** — animations fire only when elements enter the viewport; no `scroll` event-loop polling.
- **Passive scroll listener** — the direction-tracking listener is registered as `{ passive: true }` to never block rendering.
- **Lazy loading** — project images use `loading="lazy"`.
- **Event delegation** — modal open/close is handled with minimal listeners.
- **Zero build step** — no bundler, no transpiler. One file open = running site.

---

## Installation

No build process required.

```bash
# 1. Clone the repository
git clone https://github.com/bugcurator/bugcurator.github.io.git

# 2. Open directly, or serve locally for live reload
npx serve .
# or
python -m http.server 8080
```

Navigate to `http://localhost:8080` (or the port shown in terminal).

---

## Deployment

This is a fully static site — push and deploy with no configuration:

| Platform     | Method                                                  |
| ------------ | ------------------------------------------------------- |
| GitHub Pages | Push to `main`; Pages serves `index.html` automatically |
| Netlify      | Drag-and-drop the repo folder or connect via Git        |
| Vercel       | `vercel --prod` in the project root                     |

---

## Extending the Portfolio

See **`docs/PROJECT_EDITING_GUIDE.md`** for the full reference. Quick summary:

- **New project** → append to `projects` array. First 3 entries auto-pin.
- **New skill** → append to the correct `skillCategories[n].skills` array.
- **New experience** → append to `experience` array; index controls initial visibility.
- **New testimonial** → append to `testimonials` array.
- **New client logo** → append to `clients` array with `name`, `logo`, and `url` fields.

---

## Engineering Philosophy

This project favors:

- **Simplicity over abstraction** — if vanilla JS solves it cleanly, no library is added.
- **Data-driven rendering** — arrays own all content; functions own all layout logic.
- **Performance over decoration** — every animation serves a UX purpose.
- **Clear structure over framework complexity** — the codebase is readable by any developer in under 10 minutes.

Strong structure signals strong thinking.

---

## License

[MIT](./LICENSE) © 2026 Ubaid Ahmad
