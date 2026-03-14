# Ubaid Ahmad - Full-Stack MERN Developer & UI/UX Designer

A high-performance, multi-page developer portfolio built on a **data-driven vanilla JavaScript
architecture**. Engineered for speed, structured for long-term scalability, and designed without a
single build dependency. The 2026 edition introduces a premium 3D interaction layer, direction-aware
scroll animations, smart pagination, a universal shimmer-gradient design system, a runtime 10-palette
theme customizer, and a full suite of dedicated pages (About, Services, Contact) - all written in
pure HTML, CSS, and JavaScript.

---

## Live Preview

**[bugcurator.github.io](https://bugcurator.github.io/Ubaid-Dev)**

---

## What is This Project?

This is a personal developer portfolio for **Ubaid Ahmad**, a Full-Stack MERN developer, UI/UX
designer. The portfolio is not a template or a theme - it is a custom,
production-grade static site engineered to communicate technical depth, design sensibility, and
professional credibility to prospective clients and collaborators.

Every design decision in this codebase serves a purpose. The gold/dark glassmorphism system was
chosen for visual authority. The 3D coin-toss profile card was engineered to demonstrate front-end
physics knowledge before a single line of copy is read. The data-driven rendering architecture was
chosen so that adding a new project, experience entry, or testimonial requires zero HTML changes.

The portfolio is fully static. No server, no database, no build step. One `index.html` file opened
in a browser is a running site.

---

## Tech Stack

### Core

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

### MERN Stack (Projects Showcased)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

### Design & Tooling

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)

### CDN Dependencies (No npm Required)

| Dependency        | Source       | Purpose                               |
| ----------------- | ------------ | ------------------------------------- |
| Tailwind CSS      | CDN          | Utility classes and responsive grid   |
| Lucide Icons      | unpkg CDN    | SVG icon system (replaces all emojis) |
| Font Awesome 6.5  | CDN          | Supplemental icon library             |
| Plus Jakarta Sans | Google Fonts | Primary typeface                      |

---

## File Structure

```
Ubaid-Dev/
|
|- index.html                          # Home page - semantic layout shell, SEO metadata
|
|- assets/
|   |- ubaidahmad-img.jpg              # Profile photo
|   |- ubaid-ahmad-cv.pdf              # CV - REPLACE WITH REAL FILE
|   |- webpage-icon.png                # Favicon
|   |- muhammad-dawood-screenshot.png  # Project thumbnail
|   |- hadaf-immigration-screenshot.png
|   `- study-station-screenshot.png
|
|- pages/
|   |- about.html                      # About / Story page (hero bio, timeline, philosophy)
|   |- projects.html                   # Full projects grid with filters
|   |- services.html                   # Services / Hire Me (3 tiers, 5-step process)
|   `- contact.html                    # Contact channels (no forms, mailto only)
|
|- scripts/
|   |- projects-data.js                # Single source of truth for all project data
|   `- script.js                       # All JS - render functions, animations, theme toggle,
|                                      #   theme customizer, mobile menu
|
|- styles/
|   `- style.css                       # Design system, animation engine, responsive rules
|
|- docs/
|   |- PROJECT_EDITING_GUIDE.md        # How to safely extend and maintain the codebase
|   |- PROJECT_TYPE_DEFINITIONS.md     # Official tag taxonomy for project classification
|   |- DESIGN_SYSTEM.md               # Complete design token and component reference
|   `- THEME_AND_CUSTOMIZER_GUIDE.md  # Palette system, light/dark mode, customizer panel
|
|- README.md
|- CHANGELOG.md
`- LICENSE
```

The project enforces strict separation of concerns:

- **HTML** handles structure, static metadata, and modal scaffold containers only.
- **CSS** owns every presentational rule, animation keyframe, and responsive breakpoint.
- **JavaScript** owns all data arrays, render logic, state management, and DOM output.

---

## Pages

| Page     | File                  | Status | Description                                                     |
| -------- | --------------------- | ------ | --------------------------------------------------------------- |
| Home     | `index.html`          | Live   | Hero, stats, skills, experience, projects preview, testimonials |
| About    | `pages/about.html`    | Live   | Bio, career timeline, tech philosophy, currently block          |
| Projects | `pages/projects.html` | Live   | Filterable full grid, pinned badges, currently-building card    |
| Services | `pages/services.html` | Live   | 3 service tiers, 5-step process, no HTML forms                  |
| Contact  | `pages/contact.html`  | Live   | Channel cards with mailto and href links only                   |

---

## What is New in the 2026 Edition

### Dynamic 3D Coin-Toss Profile Card

The hero profile image is a fully interactive 3D flip card. On hover, `.coin-inner` performs a
**720-degree rotation** (two full Y-axis turns) in `0.9s` using a springy
`cubic-bezier(0.34, 1.56, 0.64, 1)` easing. A gold-gradient **"TRUSTED EXPERT"** verification
badge renders on the reverse face. `perspective: 1500px` and `backface-visibility: hidden` on
both faces ensure mathematically correct depth. The `coinGlow` keyframe pulses the outer ring
at idle. The CSS custom property `--coin-size` controls diameter at all breakpoints.

### Direction-Aware Scroll Animations

A passive `scroll` event listener continuously tracks `_lastScrollY` vs `_currentScrollY`. The
shared `IntersectionObserver` reads this delta at the exact moment an element enters the viewport,
then stamps either a `from-below` class (scrolling down) or `from-above` class (scrolling up)
before firing the `visible` transition. A `requestAnimationFrame` wrapper prevents the
"flash then animate" artifact.

### Smart Experience Pagination

`INITIAL_EXP_COUNT = 2` controls the initial render; `EXP_BATCH_SIZE = 3` controls how many cards
are revealed per click. A `updateExperienceButtons()` function syncs both **Show More** and
**Show Less** buttons on every state change, updating label text dynamically. The system is
array-length-agnostic.

### Auto-Pinned Projects

The first three entries in `window.projects` are automatically detected and receive a gold
`.pinned-badge` ribbon. No manual tagging required.

### Universal Shimmer-Gradient Hover

All `.glass-card`, `.cta-button`, `.load-more-btn`, `.connect-btn`, `.modal-link`, and
`.category-btn` elements carry a `::after` pseudo-element shimmer stripe.
`.modal-content` is deliberately excluded via `:not(.modal-content)`.

### Dedicated Pages Added (Audit v2.0)

- **About page** - Full career narrative, CSS-only timeline, tech philosophy cards, and a
  "Currently" block showing active music, reading, and projects.
- **Services page** - Three service tiers (MERN Full-Stack, UI/UX Design, Agentic AI), a
  five-step engagement process, all CTAs linking to `mailto:` only.
- **Contact page** - Dedicated channel cards for email, GitHub, LinkedIn, and Calendly.
  The contact form was permanently removed from the codebase.

### Theme Customizer - 10-Palette Runtime Switcher

A floating palette trigger button (`#cs-trigger`) opens a slide-in panel (`#cs-panel`) that
allows visitors to switch between 10 colour palettes at runtime. Palettes include: Gold Noir,
Amethyst, Cyber Teal, Rose Prestige, Emerald, Arctic Frost, Amber Forge, Crimson, Silver Ghost,
and Coral Flame. The selected palette persists across page loads and navigation via
`localStorage('ua-palette')`. The `--accent-rgb` CSS variable is updated per-palette to keep
rgba-based component colours consistent with the active accent.

See `docs/THEME_AND_CUSTOMIZER_GUIDE.md` for the full palette reference and instructions for
adding new palettes.

### Interactive Client Carousel (v2.5 Upgrade)

The `clients` array accepts `link` and `linkType` fields (not `url`). Each logo is wrapped in
a clickable `<a>` tag. Cards with no `logo` field render a gold initial pill + company name.
A link-type badge icon (globe, Facebook, or Instagram) renders in the card corner based on
`linkType`. `mouseenter` pauses the animation track; `mouseleave` resumes it.

### Light / Dark Mode Toggle

A persistent theme toggle backed by `localStorage("theme")` allows users to switch between dark
and light modes. Light mode is applied via `data-theme="light"` on the `<html>` element. The
active theme persists across page loads. See `docs/THEME_AND_CUSTOMIZER_GUIDE.md` section 1.

### Available for Work Badge

A sticky "Available for Work" badge is fixed to the bottom-right corner of every page. It uses
a `bounce` keyframe animation and links directly to the primary contact `mailto:` address.

### Mobile Menu Sub-Navigation

The mobile hamburger menu supports an accordion sub-navigation system. Tapping a top-level link
with a `.mobile-subnav` block expands it while collapsing any previously open group. See
`docs/PROJECT_EDITING_GUIDE.md` section 17.

---

## Data-Driven Rendering

All dynamic content lives in arrays inside `scripts/script.js` and `scripts/projects-data.js`:

| Array             | Renders Into             | File               |
| ----------------- | ------------------------ | ------------------ |
| `skillCategories` | Tabbed skills grid       | `script.js`        |
| `experience`      | Paginated timeline       | `script.js`        |
| `projects`        | Filterable project cards | `projects-data.js` |
| `clients`         | Infinite logo carousel   | `script.js`        |
| `testimonials`    | Testimonial grid + modal | `script.js`        |

To add content, append a correctly structured object to the relevant array. No HTML editing
required. For the full object shape of each array, see `docs/PROJECT_EDITING_GUIDE.md`.

---

## Design System

### Color Tokens (`styles/style.css`)

| Variable         | Value                                     | Role                                 |
| ---------------- | ----------------------------------------- | ------------------------------------ |
| `--bg-dark`      | `#1a1a1a`                                 | Page background                      |
| `--text-dark`    | `#e8e8e8`                                 | Body text                            |
| `--accent-dark`  | `#d4af37`                                 | Gold accent - borders, glows, icons  |
| `--accent-light` | `#f0d896`                                 | Lighter gold for gradient text       |
| `--accent-rgb`   | `212,175,55`                              | Raw RGB triplet for rgba() calls     |
| `--glass-dark`   | `rgba(255,255,255,0.05)`                  | Card fill                            |
| `--border-dark`  | `rgba(212,175,55,0.2)`                    | Card borders                         |
| `--shadow-color` | `rgba(212,175,55,0.5)`                    | Glow shadows                         |
| `--spring`       | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Default spring easing                |
| `--coin-size`    | `180px` (desktop), `140px` (480px)        | Profile coin diameter (CSS variable) |

Changing `--accent-dark` in `:root` propagates the new colour across every border, glow, hover
effect, and gradient instance simultaneously. Always update `--accent-rgb` to match.

### Glass Cards

Apply `.glass-card` to any new container to inherit the full glassmorphism treatment:
`backdrop-filter: blur(15px)`, semi-transparent fill, gold border, and depth shadow. See
`docs/DESIGN_SYSTEM.md` for the complete component reference.

### Scroll Animations

Add `animate-on-scroll` to any element, then pair it with one of three modifier classes:

| Modifier   | Effect                                              |
| ---------- | --------------------------------------------------- |
| `slide-up` | Slides from +/-40px Y depending on scroll direction |
| `zoom-in`  | Scales from 0.88 to 1.0                             |
| `fade-in`  | Fades from +/-12px Y depending on scroll direction  |

---

## Performance

- **IntersectionObserver** - animations fire only when elements enter the viewport.
- **Passive scroll listener** - direction-tracking listener is `{ passive: true }`.
- **Lazy loading** - project images use `loading="lazy"`.
- **Event delegation** - modal open/close handled with minimal document-level listeners.
- **Zero build step** - no bundler, no transpiler, no Node.js.
- **CDN-only dependencies** - all third-party libraries load from CDN.

---

## Installation and Local Development

No build process required.

```bash
# Option 1 - Open directly in a browser
open index.html

# Option 2 - Serve locally with npx (recommended for consistent behaviour)
npx serve .

# Option 3 - Python server
python -m http.server 8080
```

Navigate to `http://localhost:8080` (or the port shown in the terminal).

VS Code with the Live Server extension also works and provides hot-reload on file save.

---

## Deployment

This is a fully static site. Push to any static host with no configuration required.

| Platform     | Method                                                  |
| ------------ | ------------------------------------------------------- |
| GitHub Pages | Push to `main`; Pages serves `index.html` automatically |
| Netlify      | Drag-and-drop the project folder or connect via Git     |
| Vercel       | Run `vercel --prod` from the project root               |

The live site is currently deployed at [bugcurator.github.io](https://bugcurator.github.io/Ubaid-Dev).

---

## Audit Compliance Summary (v2.0 Rebuild)

| Audit Finding                           | Status      | File(s) Changed                     |
| --------------------------------------- | ----------- | ----------------------------------- |
| Hero not visible on load                | Implemented | `index.html`, `style.css`           |
| Generic hero copy                       | Implemented | `index.html`                        |
| CV download commented out               | Implemented | `index.html`, `about.html`          |
| Coin back "TRUSTED EXPERT" weak         | Implemented | `index.html`, `style.css`           |
| Fake client placeholder logos           | Implemented | `scripts/script.js`                 |
| Stat counter labels vague               | Implemented | `index.html`, `script.js`           |
| 4th stat "Technologies" missing         | Implemented | `index.html`                        |
| No About page                           | Implemented | `pages/about.html`                  |
| No Services page                        | Implemented | `pages/services.html`               |
| No Contact page (form-free)             | Implemented | `pages/contact.html`                |
| Nav only had section anchors            | Implemented | All pages                           |
| No available-for-work signal            | Implemented | All pages, `style.css`              |
| No light/dark mode toggle               | Implemented | All pages, `script.js`, `style.css` |
| No career timeline                      | Implemented | `pages/about.html`, `style.css`     |
| No tech philosophy section              | Implemented | `pages/about.html`                  |
| No featured project differentiation     | Implemented | `script.js`, `style.css`            |
| No outcome tags on project cards        | Implemented | `projects-data.js`, `script.js`     |
| No currently-building signal            | Implemented | `pages/projects.html`, `style.css`  |
| Footer had no quick links or social row | Implemented | All pages, `style.css`              |
| No social proof CTA under testimonials  | Implemented | `index.html`                        |
| Blog page referenced in nav             | Removed     | All pages                           |
| Forms anywhere in codebase              | Removed     | All pages (mailto only)             |

---

## Extending the Portfolio

See `docs/PROJECT_EDITING_GUIDE.md` for the complete reference. Quick summary:

- **New project** - Append to the `projects` array in `scripts/projects-data.js`. First 3 entries auto-pin.
- **New skill** - Append to the correct `skillCategories[n].skills` array in `script.js`.
- **New experience entry** - Append to the `experience` array. Index controls visibility.
- **New testimonial** - Append to the `testimonials` array.
- **New client** - Append to the `clients` array with `name`, `link`, `linkType`, and optional `logo`.
- **New palette** - Add a palette object to `PALETTES` in `initThemeCustomizer()`. See `docs/THEME_AND_CUSTOMIZER_GUIDE.md`.
- **New section** - Apply `.section`, `.container-custom`, `.section-wrapper`, and `.animate-on-scroll`.

---

## Engineering Philosophy

This project favors:

- **Simplicity over abstraction** - if vanilla JS solves it cleanly, no library is added.
- **Data-driven rendering** - arrays own all content; functions own all layout logic.
- **Performance over decoration** - every animation serves a UX purpose and costs nothing at idle.
- **Clear structure over framework complexity** - the codebase is readable by any developer in under 10 minutes.
- **No forms, no friction** - all contact CTAs use `mailto:` links. Visitors go directly to email.

Strong structure signals strong thinking.

---

## Documentation

All extended documentation lives in the `docs/` directory.

| File                                 | Purpose                                                           |
| ------------------------------------ | ----------------------------------------------------------------- |
| `docs/PROJECT_EDITING_GUIDE.md`      | Step-by-step instructions for adding and modifying all content    |
| `docs/PROJECT_TYPE_DEFINITIONS.md`   | Full taxonomy of project classification tags and their CSS values |
| `docs/DESIGN_SYSTEM.md`              | Complete design token reference, component classes, and animation |
| `docs/THEME_AND_CUSTOMIZER_GUIDE.md` | Palette system, light/dark mode, and customizer panel reference   |

---

## License

All rights reserved. See `LICENSE` for full terms.

This source code is the proprietary work of Ubaid Ahmad. Viewing for reference is permitted.
Copying, redistribution, modification, and commercial use are strictly prohibited without explicit
written permission from the author.

Copyright 2026 Ubaid Ahmad.
