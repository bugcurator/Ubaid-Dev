# PROJECT_EDITING_GUIDE.md

This document is the single source of truth for safely extending and maintaining the portfolio
codebase. Follow every section carefully. The system is predictable and will scale cleanly as long
as the structural rules below are respected. A developer who has never seen this project before
should be able to add a new project, skill, or experience entry in under five minutes by following
this guide.

---

## 1. Project Structure Overview

### Core Files

| File                         | Role                                                      |
| ---------------------------- | --------------------------------------------------------- |
| `index.html`                 | Static layout skeleton, SEO metadata, modal containers    |
| `pages/about.html`           | About / Story page - bio, timeline, philosophy, currently |
| `pages/projects.html`        | Full projects grid with filters and pinned cards          |
| `pages/services.html`        | Services page - tiers, process, no forms                  |
| `pages/contact.html`         | Contact channels page - mailto and href links only        |
| `styles/style.css`           | Design system, animation engine, responsive breakpoints   |
| `scripts/script.js`          | All data arrays, state logic, and DOM rendering functions |
| `scripts/projects-data.js`   | Single source of truth for all project objects            |
| `assets/`                    | Images, fonts, icons                                      |
| `docs/`                      | Project documentation (this file and three others)        |

### Rendering Pattern

Every dynamic section in the project follows the same contract:

1. `index.html` (or a page file) contains an **empty container** with a specific `id`.
2. A **render function** in `script.js` selects that container by its `id`.
3. The function **maps an array** of data objects into HTML template strings.
4. The result is **injected** into the container via `innerHTML`.

If content does not appear on screen, check the container `id` first, then check the array object
structure, then open the browser console. All render functions log to `console.error` on failure.

---

## 2. Editing Static Hero Content

Static text lives directly in `index.html`. Find elements by their class or `id` and edit the text
content only. Do not remove class names - they are required for CSS targeting and animation.

| Content               | Selector to find                                             |
| --------------------- | ------------------------------------------------------------ |
| Hero name             | `<h1 id="hero-title">`                                       |
| Role subtitle         | `<h2 class="hero-subtitle">`                                 |
| Description paragraph | `<p class="hero-description">`                               |
| CV download button    | `<a class="cta-button" download>` - update `href` path only  |

The hero entrance animation (`heroFadeUp`) fires automatically on page load. Do not wrap the hero
section in an `animate-on-scroll` class - it will conflict.

---

## 3. Profile Coin-Toss Card

The hero profile is a **3D flip card** rendered in pure CSS and HTML. Understanding the class
hierarchy is important before touching this section.

```
.profile-coin-container     <- perspective wrapper (perspective: 1500px)
  .coin-inner               <- rotating element (transform: rotateY)
    .coin-front             <- front face (profile photo)
    .coin-back              <- back face (TRUSTED EXPERT badge)
```

### To Replace the Profile Photo

1. Drop the new image file into `assets/`.
2. In `index.html`, find the `.coin-front` block and update the `src` attribute:

```html
<div class="coin-front">
  <img src="./assets/your-new-photo.jpg" alt="Ubaid Ahmad" />
</div>
```

Use a square crop image for best results. The coin renders at `180px` on desktop and `140px` at
the 480px breakpoint, both controlled by the `--coin-size` CSS variable.

### To Change the Back-Face Text

Find `.coin-back` in `index.html` and edit the `.coin-back-title` and `.coin-back-sub` spans.

### Classes That Must Not Be Changed or Removed

Do not change or remove `.coin-inner`, `.coin-front`, `.coin-back`, or `profile-coin-container`.
These are all required for the 3D animation to function correctly. The animation behaviour and
timing are controlled entirely in `style.css` under the `PREMIUM 3D PROFILE COIN-TOSS` comment
block. Do not remove `backface-visibility: hidden` from either face.

---

## 4. Editing Animated Stat Counters

The animated stat counters trigger once when the stats bar scrolls into the viewport. They are
driven by the `animateCounter()` function in `script.js`.

### Existing Counter IDs

| ID                | What it counts                  |
| ----------------- | ------------------------------- |
| `experienceCount` | Years or entries of experience  |
| `projectsCount`   | Total projects shipped          |
| `clientsCount`    | Clients served                  |
| `techCount`       | Technologies in active use      |

### To Change a Counter's Target Value

Inside `initCounters()` in `script.js`, change the second argument of `animateCounter()`:

```js
animateCounter(projectsCountEl, 12); // change 12 to your target number
```

### To Add a Completely New Counter

**Step 1 - HTML.** Inside the `.stats-bar` element in `index.html`, add a new stat item:

```html
<div class="stat-item">
  <h3 id="awardsCount">0</h3>
  <p>Awards Won</p>
</div>
```

**Step 2 - JS.** Inside `initCounters()` in `script.js`, wire up the new counter:

```js
const awardsCountEl = document.getElementById("awardsCount");
animateCounter(awardsCountEl, 5); // 5 is the target value
```

The counter animates from 0 to the target value over a fixed duration when the stats bar enters
the viewport. It fires only once per page load.

---

## 5. Adding and Editing Skills

Skills live in the `skillCategories` array at the top of `script.js`.

### Add a Skill to an Existing Category

Find the correct category object and append a new skill object to its `skills` array:

```js
{
  category: "Frontend",
  skills: [
    { name: "React.js" },
    { name: "Tailwind CSS" },
    { name: "Your New Skill" }, // append here
  ],
},
```

No HTML changes required. `renderSkills()` rebuilds the grid automatically.

### Add a New Category Tab

Append a new object to the `skillCategories` array:

```js
{
  category: "Mobile",
  skills: [
    { name: "React Native" },
    { name: "Flutter" },
  ],
},
```

`renderSkills()` automatically creates a new tab button and its associated grid view. Do not
rename the `category` or `skills` keys - the render function expects these exact key names.

---

## 6. Adding and Managing Experience Entries

Experience entries live in the `experience` array in `script.js`.

### Required Object Shape

```js
{
  title: "Role Title",
  company: "Company Name or Context",
  period: "Month YYYY - Month YYYY",
  description: "What you did, what you built, what you learned, what the impact was.",
}
```

### Deprecated Field

The `isInitiallyVisible` boolean field from v1.0.0 is no longer read by `renderExperience()`.
The field can remain in existing array entries without causing errors, but it has zero effect on
rendering. Visibility is now controlled entirely by array index position.

### Pagination Logic

The Experience section uses two constants defined near the top of `script.js`:

```js
const INITIAL_EXP_COUNT = 2; // cards shown on first render
const EXP_BATCH_SIZE = 3;    // cards revealed per "Show More" click
```

The first `INITIAL_EXP_COUNT` entries (index 0 and 1) always render immediately. Every entry
beyond that index is hidden and revealed in batches of `EXP_BATCH_SIZE` when the user clicks
"Show More Experience". The "Show Less" button collapses back to `INITIAL_EXP_COUNT` cards and
smooth-scrolls the user back to the section header.

### Practical Rules

- **Most recent role goes first.** The timeline renders top-to-bottom in array order. The role
  at index 0 appears at the top. Put the current or most recent role at index 0.
- **Adjust the constants freely.** If there are 10 entries and 3 should be visible by default,
  change `INITIAL_EXP_COUNT = 3`. The pagination system adapts automatically with no other
  code changes needed.
- The system is array-length-agnostic. It works correctly with 2 entries or 80.

### Example Array

```js
const experience = [
  {
    title: "Senior Full-Stack Developer",    // index 0 - always visible
    company: "Client Name",
    period: "Jan 2026 - Present",
    description: "Led development of ...",
  },
  {
    title: "Full-Stack MERN Developer",      // index 1 - always visible
    company: "Freelance",
    period: "Sep 2025 - Dec 2025",
    description: "Delivered end-to-end ...",
  },
  {
    title: "Computer Science Student",       // index 2 - hidden, shown on "Show More"
    company: "University of Swabi",
    period: "Oct 2024 - Aug 2025",
    description: "Began academic journey ...",
  },
];
```

---

## 7. Adding and Managing Projects

Projects live in the `projects` array inside `scripts/projects-data.js`.

### Required Object Shape

```js
{
  id: 4,                            // Must be a unique integer across all projects
  title: "Project Title",
  summary: "One or two sentence description shown on the project card.",
  tech: ["React.js", "Node.js", "MongoDB"],
  type: ["fullstack", "featured"],  // See docs/PROJECT_TYPE_DEFINITIONS.md for all valid tags
  image: "./assets/your-screenshot.png",
  details: "Full modal description. This can be as long as needed - the modal scrolls.",
  outcomes: [
    { icon: "check-circle", label: "Reduced load time by 40%" },
    { icon: "zap",          label: "Shipped in 3 weeks" },
    { icon: "star",         label: "Client renewed contract" },
  ],
  demo: "https://your-live-demo.com",
  github: "https://github.com/your-repo",
}
```

The `outcomes` array uses Font Awesome icon names mapped internally by `renderProjects()`.
Valid `icon` values are: `"check-circle"`, `"zap"`, and `"star"`.

### The Auto-Pin System

The first three entries in the `projects` array (index 0, 1, and 2) are automatically pinned.
`renderProjects()` uses `projectsData.indexOf(project)` to detect position and injects a
`.pinned-badge` ribbon into the top-right corner of those three cards. No `type` tag or manual
flag is needed to activate the badge.

To change which projects are pinned, **reorder the array**. To feature a new project as a top-3
pin, move it to index 0, 1, or 2. No other code change is required.

### Featured vs Pinned

These are two independent systems that can overlap or operate separately:

- **Pinned** - a visual gold ribbon on the top 3 cards by array position. Fully automatic.
- **Featured** - a `type` array tag that controls which projects appear in the homepage grid on
  `index.html`. Only projects with `type.includes("featured")` are shown on the homepage (max 3).

A project can be pinned without being featured. A project can be featured without being pinned.

---

## 8. Adding Client Logos

Clients live in the `clients` array in `script.js`.

### Required Object Shape

```js
{
  name: "Client or Company Name",
  logo: "./assets/client-logo.png",   // optional - omit key entirely if no logo yet
  link: "https://client-website.com", // the URL the card links to
  linkType: "website",                // "website" | "facebook" | "instagram"
}
```

**`link` and `linkType` are both required.** The `linkType` value controls which icon badge
renders in the card corner: `"website"` shows a globe icon, `"facebook"` shows the Facebook icon,
`"instagram"` shows the Instagram icon. If `logo` is omitted, the card auto-renders a gold
initial pill using the first letter of `name` plus the company name as a text label.

Each logo is wrapped in a clickable `<a>` tag targeting `link` with `rel="noopener noreferrer"`.
The carousel animation pauses automatically when the user hovers over the carousel container,
allowing time to read and click logos without fighting the scroll.

Use square or landscape-ratio images for consistent tile fill. Logo images render with
`object-fit: cover` to fill the full tile regardless of aspect ratio.

---

## 9. Adding Testimonials

Testimonials live in the `testimonials` array in `script.js`.

### Required Object Shape

```js
{
  name: "Full Name",
  role: "Job Title at Company",
  avatar: "./assets/their-photo.jpg",
  text: "The full testimonial text. This can be as long as needed - the modal shows it all.",
  stars: 5, // Integer from 1 to 5
}
```

Cards on the grid truncate long text with CSS `line-clamp`. The full text is always shown in the
testimonial modal when the card is clicked. The star rating renders as a row of filled Font Awesome
star icons.

---

## 10. Scroll Animation Classes

Apply `animate-on-scroll` plus one modifier class to any new element to have it animate in when
it enters the viewport. The `IntersectionObserver` in `script.js` handles timing automatically -
no additional JavaScript is needed.

| Class combination             | Effect                                                  |
| ----------------------------- | ------------------------------------------------------- |
| `animate-on-scroll slide-up`  | Slides from +/-40px Y depending on scroll direction     |
| `animate-on-scroll zoom-in`   | Scales from 0.88 to 1.0, direction-agnostic             |
| `animate-on-scroll fade-in`   | Fades from +/-12px Y depending on scroll direction      |

**Direction awareness is automatic.** When the user scrolls down, elements enter from below (slide
up). When they scroll up, elements enter from above (slide down). Both direction classes
(`from-below` and `from-above`) are cleared on exit so every scroll pass re-evaluates correctly.

Example usage on a new section:

```html
<div class="my-new-section glass-card animate-on-scroll slide-up">
  Content goes here
</div>
```

---

## 11. Shimmer-Gradient Hover Effect

The shimmer sweep is applied automatically by CSS to these selectors:

```
.glass-card:not(.modal-content)
.cta-button
.load-more-btn
.connect-btn
.modal-link
.category-btn
```

To add the shimmer to a **new element type**, append its selector to the three shimmer rule blocks
inside `style.css` under the `UNIVERSAL SHIMMER-GRADIENT HOVER` comment:

```css
/* 1. Set up the stacking context */
.glass-card:not(.modal-content),
.your-new-element {
  position: relative;
  overflow: hidden;
}

/* 2. Define the pseudo-element */
.glass-card:not(.modal-content)::after,
.your-new-element::after {
  content: "";
  position: absolute;
  top: 0;
  left: -110%;
  width: 65%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(212, 175, 55, 0.18) 50%,
    transparent 100%
  );
  transform: skewX(-18deg);
  transition: left 0.65s ease;
  pointer-events: none;
  z-index: 2;
}

/* 3. Trigger on hover */
.glass-card:not(.modal-content):hover::after,
.your-new-element:hover::after {
  left: 160%;
}
```

**Critical:** Never add `.modal-content` to these selectors. The `:not(.modal-content)` exclusion
exists specifically to protect modal scroll. Adding `overflow: hidden` to `.modal-content` would
break `overflow-y: auto` and trap long project details inside an invisible crop.

---

## 12. Styling Rules

### Change the Accent Colour

In `styles/style.css`, edit `--accent-dark` inside `:root`:

```css
:root {
  --accent-dark: #d4af37; /* Change this single value to retheme the entire site */
}
```

This single variable propagates through every border, glow, icon colour, badge gradient, hover
highlight, and shimmer tint across the entire site simultaneously. See also: the Theme Customizer
(section 16) for the runtime palette-switching system available to visitors.

### Add a New Glass Section

Use this pattern to add any new content section that follows the existing visual language:

```html
<section id="my-section" class="section">
  <div class="container-custom">
    <div class="section-wrapper">
      <h2 class="section-title">Section Title</h2>
      <div class="glass-card animate-on-scroll fade-in">
        Content goes here
      </div>
    </div>
  </div>
</section>
```

### Mobile Breakpoints

- `768px` - Desktop nav hides; mobile hamburger shows. Grids collapse to single column.
  Experience timeline shifts to single-column layout.
- `480px` - Hero padding reduces. Profile coin shrinks to `140px` via the `--coin-size` CSS
  variable. Font sizes reduce for readability on small screens.

Never remove the responsive `@media` blocks. They handle layout, spacing, and touch-target sizing
for mobile users.

---

## 13. Container IDs - Never Delete or Rename

These HTML element IDs are referenced directly by render functions in `script.js`. Removing or
renaming any of them will break the corresponding render function silently, with no visible error
in the HTML itself. Always check this table before doing a find-and-replace operation.

| ID                         | Used by                   |
| -------------------------- | ------------------------- |
| `skillsCategoryBar`        | `renderSkills()`          |
| `skillsDisplayGrid`        | `renderSkills()`          |
| `experienceTimeline`       | `renderExperience()`      |
| `loadMoreExperience`       | `loadMoreExperience()`    |
| `showLessExperience`       | `showLessExperience()`    |
| `projectsGrid`             | `renderProjects()`        |
| `clientsTrack`             | `renderClients()`         |
| `testimonialsGrid`         | `renderTestimonials()`    |
| `projectModal`             | `openProjectModal()`      |
| `projectModalContent`      | `openProjectModal()`      |
| `testimonialModal`         | `openTestimonialModal()`  |
| `testimonialModalContent`  | `openTestimonialModal()`  |
| `closeProjectModal`        | modal close listener      |
| `closeTestimonialModal`    | modal close listener      |
| `page-loader`              | `hideLoader()`            |
| `themeToggle`              | `initThemeToggle()`       |
| `mobileMenuBtn`            | `initMobileMenu()`        |
| `mobileMenu`               | `initMobileMenu()`        |
| `closeMobileMenu`          | `initMobileMenu()`        |

---

## 14. Safe Editing Rules

**Never:**

- Delete or rename any container ID from the table in section 13.
- Duplicate project `id` integer values across the `projects` array.
- Add `overflow: hidden` to `.modal-content` directly or via a global rule.
- Rename `animate-on-scroll`, `glass-card`, or `skill-card-anim` CSS classes.
- Remove `backface-visibility: hidden` from `.coin-front` or `.coin-back`.
- Add a `<form>`, `<input>`, or `<textarea>` element anywhere in the codebase. All contact
  flows use `mailto:` links only.
- Wrap the hero section in `animate-on-scroll`. The hero uses its own `heroFadeUp` keyframe.

**Always:**

- Keep project `id` values as unique positive integers.
- Verify that asset paths exist in the `assets/` directory before referencing them in arrays.
- Test in both a desktop viewport and a mobile viewport (768px and 480px) after any structural
  change.
- Check the browser console after changes - all render functions log `console.error` on failure.
- Call `createIcons()` after any render function that injects Lucide placeholder elements.
- Run `updateExperienceButtons()` after any change to the experience array length if testing
  the pagination manually.

---

## 15. Debugging Checklist

Use this table as the first diagnostic step before opening the source code.

| Symptom                          | First Thing to Check                                                  |
| -------------------------------- | --------------------------------------------------------------------- |
| Section content not rendering    | Container `id` matches the JS selector exactly (case-sensitive)       |
| Project card not appearing       | Array object has all required fields; `id` is a unique integer        |
| Animation not triggering         | Element has both `animate-on-scroll` and exactly one modifier class   |
| Modal not scrolling              | `.modal-content` accidentally received `overflow: hidden` somewhere   |
| Pinned badge not showing         | Project is at array index 0, 1, or 2 in the `projects` array         |
| Coin-toss not animating          | `.coin-front` or `.coin-back` missing `backface-visibility: hidden`   |
| Shimmer sweep not appearing      | Element selector is missing from all three shimmer CSS rule blocks    |
| Lucide icon renders as empty     | `createIcons()` is not being called after the element renders         |
| Experience count is wrong        | `INITIAL_EXP_COUNT` or `EXP_BATCH_SIZE` constants set incorrectly    |
| Theme not persisting on reload   | `localStorage.setItem('theme', ...)` not being called on toggle click |
| CV button downloads wrong file   | `href` on the CV `<a>` element does not point to the correct path     |
| Palette not restoring on reload  | `localStorage.getItem('ua-palette')` key is correct; see section 16  |
| Client card has no link icon     | `linkType` field is missing or uses an unrecognised string            |
| Mobile sub-nav not toggling      | `.mobile-nav-group` missing or `initMobileMenu()` not called          |

---

## 16. Theme Customizer

The portfolio includes a runtime palette-switching panel (introduced in v2.9) that allows
visitors to change the entire site colour scheme without reloading. It is managed by
`initThemeCustomizer()` in `script.js` and styled under the `v2.9 — THEME CUSTOMIZER` comment
block in `style.css`.

For full documentation on the Theme Customizer - including palette definitions, how to add new
palettes, how it interacts with light/dark mode, and accessibility considerations - see
`docs/THEME_AND_CUSTOMIZER_GUIDE.md`.

### Quick Reference

- **Trigger button:** `#cs-trigger` - fixed-position button, bottom-right, just above the
  Available for Work badge.
- **Panel:** `#cs-panel` - slides in from the right when the trigger is clicked.
- **Palette storage key:** `localStorage.getItem('ua-palette')` - persists the selected
  palette across page loads and navigation.
- **Apply programmatically:** Call `applyPalette(paletteId)` where `paletteId` is one of the
  ten palette `id` strings defined in the `PALETTES` array inside `initThemeCustomizer()`.
- **The `--accent-rgb` variable:** Each palette sets this as a raw `R,G,B` triplet (e.g.
  `212,175,55`) used inside `rgba()` calls throughout the CSS. It is required for the initial
  pill in the clients carousel and for shimmer tints to follow the active palette colour.

---

## 17. Mobile Menu Sub-Navigation

The mobile menu (introduced in v2.2, refined in v2.3) supports an accordion sub-navigation
system for top-level nav links that have sub-sections.

### Class Hierarchy

```
#mobileMenu                     <- full-screen overlay
  .mobile-menu-content          <- inner card
    .mobile-nav                 <- nav list
      .mobile-nav-group         <- parent item with sub-nav
        .mobile-nav-link        <- parent link (tap to expand sub-nav)
        .mobile-subnav          <- collapsible sub-section
          <a>                   <- individual sub-links
      .mobile-nav-link          <- standalone link (no sub-nav)
```

### Behaviour

- Tapping a `.mobile-nav-group`'s parent link adds `is-active` to the group, expanding
  `.mobile-subnav` with a CSS height transition.
- Only one group can be active at a time. Tapping a second group collapses the first.
- Tapping a standalone `.mobile-nav-link` (not inside a group) navigates normally and closes
  the overlay.
- Tapping any sub-link inside `.mobile-subnav` also closes the overlay.
- The close button (`#closeMobileMenu`) and backdrop tap both close the overlay.

### Adding a Sub-Nav Group

```html
<div class="mobile-nav-group">
  <a href="#section" class="mobile-nav-link">Section Name</a>
  <div class="mobile-subnav">
    <a href="#subsection-1">Sub-section 1</a>
    <a href="#subsection-2">Sub-section 2</a>
  </div>
</div>
```

The `initMobileMenu()` function in `script.js` handles all accordion events automatically.
No additional JavaScript is needed.

---

The system is predictable. Follow the structure and it will scale cleanly from 3 projects to 300,
from 2 experience entries to 80, and from one page to ten. When in doubt, look at how an existing
working section is built and mirror its structure exactly.
