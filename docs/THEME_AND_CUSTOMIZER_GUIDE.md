# THEME_AND_CUSTOMIZER_GUIDE.md

This document covers two related but independent runtime theming systems in the portfolio:

1. **Light / Dark Mode Toggle** - switches between a dark and light base surface.
2. **Theme Customizer (Palette Switcher)** - changes the accent colour and background across
   10 predefined palettes, persisted in `localStorage`.

Both systems live in `scripts/script.js`. Their CSS lives in `styles/style.css` under the
`v2.9 — THEME CUSTOMIZER` and `v2.10 — COMPLETE PALETTE CONSISTENCY SYSTEM` comment blocks.

---

## 1. Light / Dark Mode Toggle

### How It Works

The toggle is a button (`#themeToggle`) rendered in the navigation bar on every page. It contains
two icon elements: `.theme-icon-dark` (moon icon, shown in dark mode) and `.theme-icon-light`
(sun icon, shown in light mode).

When clicked, `initThemeToggle()` in `script.js`:

1. Reads the current `data-theme` attribute from `document.documentElement` (`<html>`).
2. Flips the value between `"light"` and `"dark"`.
3. Writes the new value to `localStorage` under the key `"theme"`.
4. Applies the correct attribute: `document.documentElement.setAttribute("data-theme", "light")`
   or `document.documentElement.removeAttribute("data-theme")` for dark mode.

On every page load, the `<head>` contains an inline script that reads `localStorage` and applies
the theme attribute before the DOM renders, preventing a flash of the wrong mode.

### CSS Selector

Light mode overrides are scoped to `:root[data-theme="light"]`:

```css
:root[data-theme="light"] {
  --bg-dark: #f5f0e8;
  --text-dark: #1a1a1a;
  /* ... remaining overrides */
}
```

> **Do not** use `.light-mode` as a class on `<body>`. That pattern is not implemented here.
> All light mode CSS selectors use `:root[data-theme="light"]`.

### Interaction with the Palette System

Light mode and palette selection are independent. A user can be in light mode with the Amethyst
palette active, or dark mode with the Cyber Teal palette active. The palette system updates
`--accent-dark`, `--bg-dark`, `--glass-dark`, and related variables. Light mode then overrides
`--bg-dark`, `--text-dark`, and surface variables on top of whatever the palette has set.
The accent colour (`--accent-dark`) is intentionally **not** overridden by light mode — the
brand colour stays consistent between modes.

---

## 2. Theme Customizer (Palette Switcher)

### Overview

`initThemeCustomizer()` in `script.js` builds a floating trigger button and slide-in panel
entirely in JavaScript. No HTML scaffold is required in any page file. The function appends both
elements to `document.body` on `DOMContentLoaded`.

- **Trigger button:** `#cs-trigger` — fixed bottom-right, `z-index: 1000`, palette icon.
- **Panel:** `#cs-panel` — slides in from the right when the trigger is clicked.
- **Storage key:** `localStorage.getItem('ua-palette')` — persists the active palette.

### The 10 Built-in Palettes

| ID               | Label         | Accent Colour | Background  |
| ---------------- | ------------- | ------------- | ----------- |
| `gold-noir`      | Gold Noir     | `#D4AF37`     | `#1A1A1A`   |
| `royal-amethyst` | Amethyst      | `#A78BFA`     | `#0F0A1E`   |
| `cyber-teal`     | Cyber Teal    | `#22D3EE`     | `#051215`   |
| `rose-prestige`  | Rose Prestige | `#FB7185`     | `#1A0810`   |
| `emerald-elite`  | Emerald       | `#34D399`     | `#051510`   |
| `arctic-frost`   | Arctic Frost  | `#93C5FD`     | `#060D1A`   |
| `amber-forge`    | Amber Forge   | `#FBBF24`     | `#14100A`   |
| `crimson-luxe`   | Crimson       | `#F87171`     | `#1A0808`   |
| `silver-ghost`   | Silver Ghost  | `#CBD5E1`     | `#0A0D12`   |
| `coral-flame`    | Coral Flame   | `#FB923C`     | `#150D08`   |

### What Each Palette Sets

Each palette object in the `PALETTES` array sets:

```js
{
  id:     'palette-id',
  label:  'Display Label',
  swatch: '#HEX',         // colour shown on the swatch button
  rgb:    'R,G,B',        // raw triplet for --accent-rgb (no spaces)
  vars: {
    '--accent-dark':   '#HEX',
    '--accent-light':  '#HEX',
    '--bg-dark':       '#HEX',
    '--glass-dark':    'rgba(...)',
    '--border-dark':   'rgba(...)',
    '--shadow-color':  'rgba(...)',
  },
  liq1: 'linear-gradient(...)',  // liquid-bg ::before blob colour
  liq2: 'linear-gradient(...)',  // liquid-bg ::after blob colour
}
```

`applyPalette(id)` iterates `vars` and calls `root.style.setProperty()` for each, then injects
a `<style id="cs-dyn">` tag to override the liquid background blobs with palette-matching
gradients. The swatch button with the matching `data-palette` attribute receives the `.cs-active`
ring class.

### `--accent-rgb` Requirement

Every palette sets `--accent-rgb` to the raw comma-separated RGB components of its accent colour.
This variable is consumed inside `rgba()` expressions throughout the CSS - notably in the client
initial pill and shimmer tints. If you add a custom palette, always include the `rgb` field.

### Adding a New Palette

1. Open `script.js` and find the `PALETTES` array inside `initThemeCustomizer()`.
2. Append a new palette object following the shape above.
3. Choose an accent colour, derive the `rgb` triplet, and decide on a matching dark background.
4. Set `liq1` and `liq2` to gradient strings that use the accent colour as anchors.
5. Verify the swatch reads clearly against the glassmorphism card backgrounds.
6. No CSS changes required — `applyPalette()` applies all values dynamically via `style.setProperty`.

```js
{
  id: 'midnight-violet',
  label: 'Midnight Violet',
  swatch: '#8B5CF6',
  rgb: '139,92,246',
  vars: {
    '--accent-dark':  '#8B5CF6',
    '--accent-light': '#A78BFA',
    '--bg-dark':      '#0D0A18',
    '--glass-dark':   'rgba(139,92,246,0.06)',
    '--border-dark':  'rgba(139,92,246,0.22)',
    '--shadow-color': 'rgba(139,92,246,0.5)',
  },
  liq1: 'linear-gradient(135deg,#8B5CF6,#6D28D9)',
  liq2: 'linear-gradient(135deg,#3B0764,#8B5CF6)',
},
```

### Panel Structure (Generated by JS)

```
#cs-panel
  .cs-head
    .cs-title        ← "Customize" label
    .cs-close        ← × close button
  .cs-section
    .cs-section-label
    .cs-swatches
      .cs-swatch[data-palette="..."]  ← one per palette
    .cs-active-label[id="cs-palette-name"]
```

### CSS Architecture

The customizer panel styles live in two comment blocks in `style.css`:

- `v2.9 — THEME CUSTOMIZER` — base panel styles, trigger button, swatch grid.
- `v2.10 — COMPLETE PALETTE CONSISTENCY SYSTEM` — ensures the panel, trigger, and all site
  components correctly inherit or override palette variables in both dark and light mode.

Key rules:

```css
/* Trigger button — sits above Available for Work badge */
#cs-trigger {
  position: fixed;
  bottom: 5.5rem;   /* offset above the available-badge */
  right: 2rem;
  z-index: 1000;
}

/* Panel — slides in from right */
#cs-panel {
  position: fixed;
  right: -320px;    /* hidden off-screen */
  transition: right 0.35s var(--ease-out);
}

#cs-panel.cs-open {
  right: 0;
}
```

On mobile (`max-width: 480px`), the panel switches to full-width and slides in from the bottom.

### Accessibility Notes

- The trigger has `aria-label="Open theme customizer"`.
- The panel has `role="dialog"` and `aria-label="Theme Customizer"`.
- Each swatch button has a `title` and `aria-label` matching the palette label.
- The customizer does not trap focus. If keyboard focus management inside the panel is needed
  in a future version, use `focus-trap` logic on `.cs-open` state.

---

## 3. Storage Keys Reference

| Key            | Values                          | Set by                    | Read by                   |
| -------------- | ------------------------------- | ------------------------- | ------------------------- |
| `"theme"`      | `"dark"` \| `"light"`          | `initThemeToggle()`       | Inline `<head>` script    |
| `"ua-palette"` | Any palette `id` string        | `applyPalette()`          | `initThemeCustomizer()`   |

Both keys are read on every page load. Neither key expiring or being absent causes an error —
the code falls back to `"dark"` and `"gold-noir"` respectively.

---

## 4. Debugging Checklist

| Symptom                             | First Thing to Check                                          |
| ----------------------------------- | ------------------------------------------------------------- |
| Flash of wrong mode on load         | Inline theme script in `<head>` is present on that page       |
| Palette not persisting on reload    | `localStorage.getItem('ua-palette')` returning null           |
| Liquid blobs not changing colour    | `<style id="cs-dyn">` not being injected; check `applyPalette()` |
| Swatch active ring not showing      | `data-palette` attribute value matches palette `id` exactly   |
| Client initial pill colour wrong    | `--accent-rgb` not being set by `applyPalette()`              |
| Panel not sliding in on mobile      | Check `#cs-panel` `max-width: 480px` media query in style.css |
| Trigger overlapping Available badge | `#cs-trigger` `bottom` value; must be `≥ 5.5rem`             |
