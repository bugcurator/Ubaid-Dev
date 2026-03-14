# DESIGN_SYSTEM.md

This document is the complete reference for the visual design system used across the Ubaid Ahmad
portfolio. It covers every colour token, typography rule, component class, animation system, and
layout primitive. Any new page, section, or component added to the portfolio should be built
exclusively using the tokens and patterns defined here.

Consistency is not optional. The portfolio communicates technical credibility in part through
visual coherence. A developer reading this codebase should never encounter a hardcoded hex value
outside of `:root`, a font size that does not map to the established scale, or a card component
that approximates the glass treatment rather than using `.glass-card` directly.

---

## 1. Design Tokens

All design tokens are defined as CSS custom properties inside `:root` in `styles/style.css`. No
value that appears more than once in the codebase should be hardcoded. Reference the variable.

### 1.1 Colour Tokens

#### Dark Mode (Default)

| Variable              | Value                                      | Purpose                                       |
| --------------------- | ------------------------------------------ | --------------------------------------------- |
| `--bg-dark`           | `#1a1a1a`                                  | Page background, the base surface             |
| `--text-dark`         | `#e8e8e8`                                  | Primary body text colour                      |
| `--text-muted-dark`   | `rgba(232, 232, 232, 0.6)`                 | Secondary / muted text, captions, labels      |
| `--accent-dark`       | `#d4af37`                                  | Gold accent - the single brand colour         |
| `--accent-light`      | `#f0d896`                                  | Lighter gold tint for gradient text/headings  |
| `--accent-hover-dark` | `#c49a1a`                                  | Gold accent on hover state                    |
| `--accent-rgb`        | `212,175,55`                               | Raw RGB triplet of `--accent-dark` (no spaces)|
| `--glass-dark`        | `rgba(255, 255, 255, 0.05)`                | Glass card fill                               |
| `--glass-hover-dark`  | `rgba(255, 255, 255, 0.08)`                | Glass card fill on hover                      |
| `--border-dark`       | `rgba(212, 175, 55, 0.2)`                  | Card border colour (gold at 20% opacity)      |
| `--border-hover-dark` | `rgba(212, 175, 55, 0.5)`                  | Card border on hover (gold at 50% opacity)    |
| `--shadow-color`      | `rgba(212, 175, 55, 0.5)`                  | Glow shadow colour for depth effects          |
| `--nav-bg`            | `rgba(26, 26, 26, 0.9)`                    | Navigation bar background with blur           |

> **`--accent-rgb` is required.** This variable holds the raw comma-separated R,G,B triplet of
> the current accent colour. It is consumed inside `rgba()` calls throughout the CSS — for
> example, the client initial pill uses `rgba(var(--accent-rgb), 0.12)`. The Theme Customizer
> updates `--accent-rgb` whenever a new palette is applied. If you add a new palette manually,
> you must set this variable alongside `--accent-dark`.

#### Light Mode

Light mode tokens override the dark mode defaults when the `[data-theme="light"]` attribute is
present on the `:root` element (`<html>`). The JavaScript toggle writes this attribute and also
persists the preference in `localStorage`.

> **Implementation note:** Light mode is applied as `document.documentElement.setAttribute("data-theme", "light")` in `initThemeToggle()`. The CSS selector is `:root[data-theme="light"]`. **Do not use `.light-mode` as a class on `<body>`** — that pattern is not implemented in this codebase.

| Variable              | Light Mode Value                            |
| --------------------- | ------------------------------------------- |
| `--bg-dark`           | `#f5f0e8`                                   |
| `--text-dark`         | `#1a1a1a`                                   |
| `--text-muted-dark`   | `rgba(26, 26, 26, 0.6)`                     |
| `--glass-dark`        | `rgba(255, 255, 255, 0.7)`                  |
| `--glass-hover-dark`  | `rgba(255, 255, 255, 0.9)`                  |
| `--border-dark`       | `rgba(212, 175, 55, 0.3)`                   |
| `--nav-bg`            | `rgba(245, 240, 232, 0.9)`                  |

The accent colour `--accent-dark` (`#d4af37`) does not change between modes. It is the permanent
brand colour of the portfolio in its default Gold Noir palette.

#### To Retheme the Entire Site (Static)

Change the value of `--accent-dark` in `:root`. This single change propagates through every
border, glow, shimmer, badge gradient, icon tint, and hover highlight across the entire site.
Remember to also update `--accent-rgb` to match the new hex value's R,G,B components.

#### To Retheme at Runtime (Dynamic)

Use the Theme Customizer. See `docs/THEME_AND_CUSTOMIZER_GUIDE.md` for the full palette
reference and instructions for adding new palettes.

---

### 1.2 Typography Tokens

| Variable              | Value                                         | Usage                              |
| --------------------- | --------------------------------------------- | ---------------------------------- |
| `--font-primary`      | `'Plus Jakarta Sans', sans-serif`             | All body text, UI labels, headings |
| `--font-mono`         | `'Courier New', monospace`                    | Code snippets, technical strings   |
| `--font-weight-light` | `300`                                         | Muted captions, secondary labels   |
| `--font-weight-base`  | `400`                                         | Body copy                          |
| `--font-weight-medium`| `500`                                         | Card subtitles, nav links          |
| `--font-weight-semi`  | `600`                                         | Section titles, card headings      |
| `--font-weight-bold`  | `700`                                         | Hero title, major CTAs             |

The font stack falls back to `sans-serif` if Google Fonts fails to load. This is intentional - the
layout should remain legible at all times.

---

### 1.3 Spacing Tokens

The spacing system is based on a `0.5rem` (8px) baseline unit. All padding, margin, and gap values
should be multiples of this unit.

| Token name (informal) | Value    | Usage                                      |
| --------------------- | -------- | ------------------------------------------ |
| XS                    | `0.5rem` | Icon padding, tight inline spacing         |
| SM                    | `1rem`   | Card internal padding (compact sections)   |
| MD                    | `1.5rem` | Standard card padding                      |
| LG                    | `2rem`   | Section internal spacing                   |
| XL                    | `3rem`   | Section vertical padding                   |
| XXL                   | `5rem`   | Hero vertical padding                      |

---

### 1.4 Border Radius Tokens

| Variable           | Value    | Usage                                      |
| ------------------ | -------- | ------------------------------------------ |
| `--radius-sm`      | `8px`    | Tags, badges, small buttons                |
| `--radius-md`      | `12px`   | Input fields, compact cards                |
| `--radius-lg`      | `16px`   | Standard glass cards                       |
| `--radius-xl`      | `24px`   | Large hero cards, modal containers         |
| `--radius-full`    | `9999px` | Pill buttons, availability badge           |

---

### 1.5 Animation Tokens

| Variable           | Value                                       | Usage                                         |
| ------------------ | ------------------------------------------- | --------------------------------------------- |
| `--spring`         | `cubic-bezier(0.175, 0.885, 0.32, 1.275)`  | Standard spring - cards, skill tabs           |
| `--coin-ease`      | `cubic-bezier(0.34, 1.56, 0.64, 1)`        | Coin-toss overshoot easing                    |
| `--ease-out`       | `cubic-bezier(0.22, 1, 0.36, 1)`           | Fast-exit animations, modal open              |
| `--ease-in`        | `cubic-bezier(0.64, 0, 0.78, 0)`           | Gradual entry animations                      |
| `--duration-fast`  | `0.15s`                                     | Micro-interactions (hover state changes)      |
| `--duration-base`  | `0.3s`                                      | Standard transitions                          |
| `--duration-slow`  | `0.6s`                                      | Hero entrance, modal fade                     |
| `--coin-size`      | `180px` desktop / `140px` at 480px          | Profile coin diameter CSS variable            |

---

## 2. Component Classes

### 2.1 Glass Card

The `.glass-card` class is the primary surface component of the portfolio. It implements the
full glassmorphism treatment: semi-transparent fill, backdrop blur, gold border, depth shadow,
and hover state transitions.

```css
.glass-card {
  background: var(--glass-dark);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s var(--spring),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover-dark);
  box-shadow: 0 20px 60px var(--shadow-color);
}
```

Apply `.glass-card` to any container that should sit on the dark surface as a distinct panel.
Do not approximate the glass treatment with inline styles or partial rule sets.

**Critical exception:** Do not add `overflow: hidden` directly to `.glass-card` in any global
rule. The shimmer effect requires `overflow: hidden` for the sweep animation, but `.modal-content`
extends `.glass-card` and requires `overflow-y: auto`. The shimmer CSS scopes this correctly via
`.glass-card:not(.modal-content)`. Breaking this scope breaks modal scrolling.

---

### 2.2 CTA Button (Primary)

The `.cta-button` class is used for high-priority calls to action: CV download, contact links,
service CTAs, and page-level primary actions.

```css
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--accent-dark), var(--accent-hover-dark));
  color: #1a1a1a;
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: transform 0.2s var(--spring), box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px var(--shadow-color);
}
```

All `.cta-button` elements must link to a `mailto:` address, a direct `href` URL, or a file
download. Never link a `.cta-button` to an HTML form.

---

### 2.3 Section Layout

All sections follow a consistent layout pattern. This pattern ensures spacing and container
behaviour remain uniform across pages:

```html
<section id="section-id" class="section">
  <div class="container-custom">
    <div class="section-wrapper">
      <h2 class="section-title">Section Title</h2>
      <!-- Section content goes here -->
    </div>
  </div>
</section>
```

| Class               | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `.section`          | Vertical padding (typically `5rem` top and bottom)                   |
| `.container-custom` | Max-width constraint with horizontal padding                         |
| `.section-wrapper`  | Inner flex or grid layout wrapper                                    |
| `.section-title`    | Section heading with gold underline accent and uppercase tracking     |

---

### 2.4 Navigation Bar

The navigation uses a floating glass header that becomes visible immediately on load:

```css
.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-dark);
  z-index: 1000;
}
```

Navigation links use the `.nav-link` class. The active state is tracked by `IntersectionObserver`
on all pages and applies `.nav-active` to the link whose destination section is currently in view.

The nav includes a theme toggle button (`#themeToggle`) and — on mobile — a hamburger button
(`#mobileMenuBtn`) that opens the full-screen overlay (`#mobileMenu`). See
`docs/PROJECT_EDITING_GUIDE.md` section 17 for mobile sub-nav documentation.

---

### 2.5 Type Tag Badges

Project type tags use the `.type-tag` base class combined with one of the type-specific classes
defined in `docs/PROJECT_TYPE_DEFINITIONS.md`:

```css
.type-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: var(--font-weight-semi);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

Type tags are always rendered by `getProjectTypeClass()` in `projects-data.js` and injected via
`renderProjects()`. Do not hardcode type tag HTML.

---

### 2.6 Skill Card

Skill cards inside the tabbed skills grid use `.skill-card-anim` for their entrance animation.
This class is applied dynamically by `renderSkills()` and should not be renamed.

---

### 2.7 Available for Work Badge

The availability badge is a fixed-position element rendered on every page in the bottom-right
corner:

```css
.available-badge {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, var(--accent-dark), var(--accent-hover-dark));
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-bold);
  font-size: 0.85rem;
  animation: bounce 2s infinite;
  z-index: 999;
  text-decoration: none;
}
```

The `bounce` keyframe is defined globally in `style.css`. The badge always links to the primary
`mailto:` contact address.

> **Stacking note:** The Theme Customizer trigger button (`#cs-trigger`) is also fixed at the
> bottom-right at `z-index: 1000`, positioned just above the Available for Work badge. Both
> elements coexist at the same corner. Do not change either `z-index` or `bottom`/`right` values
> without checking for visual overlap between these two elements.

---

### 2.8 Client Logo Card

The client carousel renders two card variants driven by the `clients` array in `script.js`. Both
variants are wrapped in an `<a>` tag with a link-type icon badge in the corner.

**Logo variant** (when `logo` field is present):
```html
<a href="{link}" class="client-logo" ...>
  <img src="{logo}" alt="{name} logo" />
  <span class="client-link-badge"><i class="{icon}"></i></span>
</a>
```

**No-logo variant** (when `logo` field is absent):
```html
<a href="{link}" class="client-logo client-logo-text" ...>
  <div class="client-initial-pill">{initial}</div>
  <span class="client-name-label">{name}</span>
  <span class="client-link-badge"><i class="{icon}"></i></span>
</a>
```

The `.client-initial-pill` uses `rgba(var(--accent-rgb), 0.12)` for its background, which is
why `--accent-rgb` must be set correctly for each palette.

---

## 3. Animation System

### 3.1 Scroll Animation Framework

The scroll animation system is built on `IntersectionObserver`. Any HTML element can opt into
scroll-triggered animation by adding two classes: the base class `animate-on-scroll` and one
modifier class.

**Base class:**

```css
.animate-on-scroll {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s var(--spring);
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: none;
}
```

**Modifier classes:**

```css
/* Slide up (direction-aware) */
.animate-on-scroll.slide-up.from-below { transform: translateY(40px); }
.animate-on-scroll.slide-up.from-above { transform: translateY(-40px); }

/* Zoom in (direction-agnostic) */
.animate-on-scroll.zoom-in { transform: scale(0.88); }

/* Fade in (direction-aware, subtle) */
.animate-on-scroll.fade-in.from-below { transform: translateY(12px); }
.animate-on-scroll.fade-in.from-above { transform: translateY(-12px); }
```

The `from-below` and `from-above` classes are applied by JavaScript at the exact moment the
element enters the viewport, based on the tracked scroll direction. Both classes are cleared on
exit so that the next scroll pass always re-evaluates cleanly. `zoom-in` is direction-agnostic
and does not receive directional modifier classes.

Do not apply `animate-on-scroll` to the hero section. The hero uses its own keyframe animation
(`heroFadeUp`) that fires on page load without any scroll trigger.

---

### 3.2 Keyframe Animations

| Keyframe Name  | Used On                          | Description                                        |
| -------------- | -------------------------------- | -------------------------------------------------- |
| `heroFadeUp`   | Hero section (all pages)         | Fades in + slides up 20px, fires on page load      |
| `coinGlow`     | Profile coin outer ring          | Pulses gold box-shadow at idle                     |
| `bounce`       | Available for Work badge         | Vertical bounce loop at 2s interval                |
| `carouselSlide`| Client logo carousel track       | Infinite horizontal scroll, pauses on hover        |
| `liquidFloat`  | Background blob elements         | Slow radial float cycle (20s), purely decorative   |
| `shimmerSweep` | Handled via CSS transition       | Not a keyframe - uses `left` property transition   |
| `fadeInScale`  | Page loader exit                 | Fades and scales out the loader overlay            |

All keyframe definitions live inside `style.css` under their respective named comment blocks.
Do not define keyframes inside component-level style rules.

---

### 3.3 Coin-Toss Animation

The 3D coin-toss uses CSS `transform: rotateY` rather than keyframes. The full class hierarchy
is documented in `docs/PROJECT_EDITING_GUIDE.md` section 3.

Key values:

```css
.profile-coin-container {
  perspective: 1500px;
}

.coin-inner {
  transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-style: preserve-3d;
}

.profile-coin-container:hover .coin-inner {
  transform: rotateY(720deg);
}

.coin-front,
.coin-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.coin-back {
  transform: rotateY(180deg);
}
```

The `1500px` perspective value is not arbitrary - it produces the correct depth curve for a
`180px` coin at standard desktop viewing distances. Do not change this value.

---

### 3.4 Shimmer-Gradient Hover Effect

The shimmer is a `::after` pseudo-element diagonal stripe that sweeps left to right on hover.
Full implementation details and the list of selectors it applies to are documented in
`docs/PROJECT_EDITING_GUIDE.md` section 11.

Key values:

```css
/* Stripe properties */
width: 65%;
transform: skewX(-18deg);
background: linear-gradient(
  120deg,
  transparent 0%,
  rgba(212, 175, 55, 0.18) 50%,
  transparent 100%
);

/* Position transition */
left: -110%;             /* resting position (off-screen left) */
left: 160%;              /* hover position (off-screen right)   */
transition: left 0.65s ease;
```

The `skewX(-18deg)` value was chosen to produce a clean diagonal at the `65%` width. Do not
adjust the skew angle without adjusting the stripe width proportionally.

---

## 4. Responsive Breakpoints

The layout uses two breakpoints defined in `style.css`:

### 4.1 768px (Tablet and Mobile)

- Desktop navigation hidden; mobile hamburger drawer activates.
- Project grid collapses from multi-column to single column.
- Experience timeline shifts to single-column layout.
- Stats bar reflows from horizontal row to 2x2 grid.
- Hero layout stacks vertically (coin above text).
- Theme Customizer panel adjusts to full-width slide-in from bottom.

### 4.2 480px (Small Mobile)

- Hero padding reduces to accommodate small screens.
- Profile coin shrinks from `180px` to `140px` via `--coin-size` CSS variable.
- Body font size reduces by approximately 10% for comfortable reading.
- Card padding reduces to maintain usable content width.

Never remove `@media` blocks. Never use `px` values inside responsive blocks - use `rem` or
percentages to ensure the layout responds to the user's base font size setting.

---

## 5. Icon System

The portfolio uses two icon libraries. Each has a specific scope of use.

### 5.1 Lucide Icons (Primary)

Lucide icons are the primary icon system. They are used for all functional UI icons: navigation
toggle, theme toggle, outcome tags on project cards, stat counter labels, social links in the
footer, and the Available for Work badge.

Lucide icons are loaded via unpkg CDN and initialised with `createIcons()`:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

```js
// Call after rendering any section that contains Lucide placeholder elements
lucide.createIcons();
```

To use a Lucide icon in HTML:

```html
<i data-lucide="arrow-right"></i>
```

To find available icon names, see [lucide.dev/icons](https://lucide.dev/icons).

### 5.2 Font Awesome 6.5 (Supplemental)

Font Awesome is used for:
- The profile coin back-face badge (`fa-certificate` + `fa-check`)
- The pinned badge thumbtack icon (`fa-thumbtack`)
- The Theme Customizer trigger (`fa-palette`) and panel controls (`fa-sliders-h`, `fa-times`)
- The client carousel link-type badges (`fa-globe`, `fab fa-facebook`, `fab fa-instagram`)
- Testimonial star ratings (`fa-star`)
- Experience pagination buttons (`fa-chevron-down`)

All other icon needs should be handled by Lucide. Do not add new Font Awesome icon usage for
areas where a Lucide equivalent exists.

---

## 6. Colour Usage Rules

- **Gold (`#d4af37`) is for emphasis only.** It should not be used as a fill colour for large
  surfaces. It is used for borders, glows, text highlights, gradients on buttons and badges,
  and the shimmer stripe. Backgrounds that are primarily gold will overwhelm the dark palette.

- **Text on dark surfaces** should use `--text-dark` (`#e8e8e8`) for primary copy and
  `--text-muted-dark` for secondary or supporting copy. Never use pure white (`#ffffff`) as a
  text colour against the dark background - it creates too much contrast and fights the gold.

- **Text on gold surfaces** (buttons, badges, the coin back face) should use `#1a1a1a` (the
  page background colour) for maximum legibility and visual consistency.

- **Error and warning states** (if ever needed) should use a red at `rgba(220, 20, 60, 1)` to
  match the `.type-demo` tag colour, keeping the palette internally consistent.

- **Palette-aware colours** that must follow the active palette should reference CSS variables
  (`var(--accent-dark)`, `var(--border-dark)`, etc.). Hardcoded hex values like `#d4af37`
  inside component rules will not update when the user changes palettes via the Theme Customizer.

---

## 7. Dos and Don'ts

### Do

- Reference CSS variables for every repeated value. Hard-coding a hex value more than once is
  a system violation.
- Use `.glass-card` for every surface that sits on the dark background as a distinct panel.
- Use `animate-on-scroll` with one modifier class for every section that should enter on scroll.
- Keep all contact links as `mailto:` or direct `href` - no HTML forms, ever.
- Call `lucide.createIcons()` after every render function that injects Lucide icon placeholders.
- Update `--accent-rgb` alongside `--accent-dark` whenever manually adding a new palette.

### Do Not

- Do not use `!important` anywhere in `style.css` unless overriding a prior `!important` from
  a patch block. If a specificity conflict requires it in a new rule, restructure the selector
  chain instead.
- Do not define colours, font sizes, or border radii as hardcoded values outside of `:root`.
- Do not add `overflow: hidden` to `.modal-content` in any CSS rule, scoped or global.
- Do not use emoji characters in any rendered content. All iconography is handled by Lucide SVGs
  or Font Awesome classes.
- Do not write inline styles on HTML elements for anything other than temporary debugging.
  All styles belong in `style.css`.
- Do not add `<form>`, `<input>`, or `<textarea>` elements to any page. All contact interaction
  flows use `mailto:` links only.
- Do not apply the `[data-theme="light"]` attribute pattern as `.light-mode` on `<body>`. The
  CSS uses `:root[data-theme="light"]` selectors exclusively.

---

## 8. Adding a New Page

When a new page is needed (for example, a blog, a case study, or a resume view), follow this
checklist to maintain design system consistency:

1. Copy the `<head>` block from `pages/about.html` as the starting point. Update the `<title>`
   and `<meta name="description">` content only.
2. Copy the `<nav>` block verbatim from any existing page. Do not modify the navigation structure.
3. Copy the `<footer>` block verbatim from any existing page.
4. Apply the `heroFadeUp` animation to the page hero section by giving the hero element the
   class `hero-animate` or wrapping its contents in the same pattern used on existing pages.
5. Use the standard section layout pattern from section 2.3 of this document for all content
   sections.
6. Include the Available for Work badge element in the page body as a fixed element.
7. Include the theme toggle script logic by copying the inline theme initialisation block from
   the `<head>` of an existing page (it reads from `localStorage` before the DOM renders to
   prevent a flash of the wrong theme).
8. The Theme Customizer (`initThemeCustomizer()`) and theme toggle (`initThemeToggle()`) are
   called from `script.js` on `DOMContentLoaded` — no manual inclusion needed as long as
   `script.js` is loaded on the new page.
9. Test at 768px and 480px viewport widths before committing.

---

This design system is a living document. When a new component is built that introduces a new
token, class, or pattern, document it here immediately. A design system that is not maintained
is not a design system - it is a collection of coincidences.
