# PROJECT_EDITING_GUIDE.md

This document is the single source of truth for safely extending and
maintaining the portfolio codebase. Follow every section carefully -
the system is predictable and will scale cleanly as long as the
structural rules below are respected.

---

## 1. Project Structure Overview

### Core Files

| File                | Role                                                      |
| ------------------- | --------------------------------------------------------- |
| `index.html`        | Static layout skeleton, SEO metadata, modal containers    |
| `styles/style.css`  | Design system, animation engine, responsive breakpoints   |
| `scripts/script.js` | All data arrays, state logic, and DOM rendering functions |
| `assets/`           | Images, fonts, icons                                      |
| `docs/`             | Project documentation                                     |

### Rendering Pattern

Every dynamic section follows the same contract:

1. `index.html` contains an **empty container** with a specific `id`.
2. A **render function** in `script.js` selects that container.
3. The function **maps an array** into HTML template strings.
4. The result is **injected** via `innerHTML`.

If content does not appear, check the container `id` first, then check
the array structure, then open the browser console.

---

## 2. Editing Static Hero Content

Static text lives directly in `index.html`. Find elements by their
class or `id` and edit the text content only - do not remove class names.

| Content               | Selector to find                                            |
| --------------------- | ----------------------------------------------------------- |
| Hero name             | `<h1 id="hero-title">`                                      |
| Role subtitle         | `<h2 class="hero-subtitle">`                                |
| Description paragraph | `<p class="hero-description">`                              |
| CV download button    | `<a class="cta-button" download>` - update `href` path only |

---

## 3. Profile Coin-Toss Card

The hero profile is a **3D flip card** rendered in pure CSS/HTML. To
replace the profile photo:

1. Drop your new image into `assets/`.
2. In `index.html`, find the `.coin-front` block and update the `src`
   attribute:

```html
<div class="coin-front">
  <img src="./assets/your-new-photo.jpg" alt="Your name" />
</div>
```

To change the back-face text (`TRUSTED` / `EXPERT`), find `.coin-back`
in `index.html` and edit `.coin-back-title` and `.coin-back-sub` spans.

Do **not** change or remove `.coin-inner`, `.coin-front`, `.coin-back`,
or the `profile-coin-container` class - these are required for the 3D
animation to function. Animation behaviour is controlled entirely in
`style.css` under the `PREMIUM 3D PROFILE COIN-TOSS` block.

---

## 4. Editing Counters

The animated stat counters trigger once when the stats bar scrolls
into view.

### Existing Counter IDs

| ID                | What it counts                |
| ----------------- | ----------------------------- |
| `experienceCount` | Years / entries of experience |
| `projectsCount`   | Total projects                |
| `clientsCount`    | Clients served                |

### To Change a Counter Value

Inside `initCounters()` in `script.js`, change the second argument of
`animateCounter()`:

```js
animateCounter(projectsCountEl, 12); // change 12 to your target number
```

### To Add a New Counter

**Step 1 - HTML.** Inside the `.stats-bar` element in `index.html`, add:

```html
<div class="stat-item">
  <h3 id="awardsCount">0</h3>
  <p>Awards Won</p>
</div>
```

**Step 2 - JS.** Inside `initCounters()` in `script.js`, add:

```js
const awardsCountEl = document.getElementById("awardsCount");
animateCounter(awardsCountEl, 5);
```

---

## 5. Adding Skills

Skills live in the `skillCategories` array at the top of `script.js`.

### Add a Skill to an Existing Category

Find the correct category object and append to its `skills` array:

```js
{
  category: "Frontend",
  skills: [
    { name: "React.js" },
    { name: "Tailwind CSS" },
    { name: "Your New Skill" }, // ← add here
  ],
},
```

No HTML changes required.

### Add a New Category Tab

Append a new object to `skillCategories`:

```js
{
  category: "Mobile",
  skills: [
    { name: "React Native" },
    { name: "Flutter" },
  ],
},
```

`renderSkills()` automatically creates the tab button and grid view.
Do not rename the `category` or `skills` keys.

---

## 6. Adding Experience

Experience entries live in the `experience` array in `script.js`.

### Required Object Shape

```js
{
  title: "Role Title",
  company: "Company or Context",
  period: "Month YYYY - Month YYYY",
  description: "What you did, what you built, what you learned.",
}
```

> **Note:** The `isInitiallyVisible` field from older versions is no
> longer used. Visibility is now controlled entirely by array **index
> position** via the constants below.

### Pagination Logic

The Experience section uses two constants defined near the top of
`script.js`:

```js
const INITIAL_EXP_COUNT = 2; // cards shown on first render
const EXP_BATCH_SIZE = 3; // cards revealed per "Show More" click
```

**The first `INITIAL_EXP_COUNT` entries (index 0, 1) always render
immediately.** Every entry beyond that is hidden and revealed in
batches of `EXP_BATCH_SIZE` when the user clicks "Show More Experience".

The "Show Less" button collapses the view back to `INITIAL_EXP_COUNT`
cards and smooth-scrolls the user back to the section header.

### Practical Rules

- **Most recent role first.** The timeline renders top-to-bottom in
  array order, so put your current role at index 0.
- **Adjust constants as needed.** If you have 10 entries and want 3
  visible by default, change `INITIAL_EXP_COUNT = 3`. The entire
  pagination system adapts automatically - no other code changes needed.
- The system is array-length-agnostic: it works correctly with 2 or 80
  entries.

### Example

```js
const experience = [
  {
    title: "Senior Full-Stack Developer", // index 0 - visible by default
    company: "Acme Corp",
    period: "Jan 2026 - Present",
    description: "Led development of ...",
  },
  {
    title: "Full-Stack MERN Developer", // index 1 - visible by default
    company: "Freelance",
    period: "Sep 2024 - Dec 2025",
    description: "Delivered end-to-end ...",
  },
  {
    title: "Computer Science Student", // index 2 - hidden, shown on "Show More"
    company: "University of Swabi",
    period: "Oct 2023 - Sep 2024",
    description: "Began academic journey ...",
  },
];
```

---

## 7. Adding and Managing Projects

Projects live in the `projects` array in `script.js`.

### Required Object Shape

```js
{
  id: 4,                           // Must be unique integer
  title: "Project Title",
  summary: "One or two sentence card description.",
  tech: ["React.js", "Node.js", "MongoDB"],
  type: ["fullstack", "featured"], // See PROJECT_TYPE_DEFINITIONS.md
  image: "./assets/your-screenshot.png",
  details: "Full modal description - as long as needed.",
  demo: "https://your-live-demo.com",
  github: "https://github.com/your-repo",
}
```

### The Auto-Pin System

**The first three entries in the `projects` array (index 0, 1, 2) are
automatically pinned.** `renderProjects()` uses `projectsData.indexOf(project)`
to detect position and injects a `.pinned-badge` ribbon into the
top-right corner of those cards. No `type` tag or manual flag needed.

To change which projects are pinned, **reorder the array**. To feature
a new project as a top-3 pin, move it to index 0, 1, or 2.

The badge is styled with a gold gradient and dark text in `.pinned-badge`
inside `style.css`. Do not alter the badge markup injected by JS:

```html
<div class="pinned-badge"><i class="fas fa-thumbtack"></i> PINNED</div>
```

### Featured vs Pinned

- **Pinned** - visual ribbon on the top 3 cards by array position. Automatic.
- **Featured** - a `type` tag that controls which projects show on the
  homepage grid (max 3, filtered by `type.includes("featured")`).

These are independent. A project can be pinned without being featured,
and featured without being pinned.

---

## 8. Adding Clients / Logos

Clients live in the `clients` array in `script.js`.

### Required Object Shape

```js
{
  name: "Client Name",
  logo: "./assets/client-logo.png", // Use SVG or high-res PNG
  url: "https://client-website.com",
}
```

Each logo is wrapped in a clickable `<a>` tag targeting `url`. The
carousel animation pauses automatically when the user hovers, allowing
time to read and click logos.

Use square or landscape-ratio images for consistent card fill. Images
render with `object-fit: cover` to fill the full 200×120px tile.

---

## 9. Adding Testimonials

Testimonials live in the `testimonials` array in `script.js`.

### Required Object Shape

```js
{
  name: "Full Name",
  role: "Job Title @ Company",
  avatar: "./assets/their-photo.jpg",
  text: "The full testimonial text. Can be as long as needed.",
  stars: 5, // Integer 1–5
}
```

Cards on the grid truncate long text with CSS line-clamp. The full text
is always shown in the modal when the card is clicked.

---

## 10. Scroll Animation Classes

Apply `animate-on-scroll` plus one modifier class to any new element
to have it animate in on scroll. The `IntersectionObserver` handles
timing automatically.

| Class                        | Effect                                |
| ---------------------------- | ------------------------------------- |
| `animate-on-scroll slide-up` | Slides from ±40px Y (direction-aware) |
| `animate-on-scroll zoom-in`  | Scales from 0.88 → 1.0                |
| `animate-on-scroll fade-in`  | Fades from ±12px Y (direction-aware)  |

**Direction awareness is automatic.** When the user scrolls down, the
element enters from below (slides up). When they scroll up, it enters
from above (slides down). Both direction classes (`from-below`,
`from-above`) are cleared on exit so every scroll pass re-evaluates.

Example:

```html
<div class="my-new-section glass-card animate-on-scroll slide-up">
  Content here
</div>
```

---

## 11. Shimmer-Gradient Hover Effect

The shimmer sweep is automatically applied by CSS to these selectors:

```
.glass-card:not(.modal-content)
.cta-button
.load-more-btn
.connect-btn
.modal-link
.category-btn
```

To add the shimmer to a **new element type**, append its selector to
the three shimmer rule blocks inside `style.css` under the comment
`UNIVERSAL SHIMMER-GRADIENT HOVER`:

```css
/* 1. Set up the stacking context */
.glass-card:not(.modal-content),
.your-new-element {
  /* ← add here */
  position: relative;
  overflow: hidden;
}

/* 2. Define the pseudo-element */
.glass-card:not(.modal-content)::after,
.your-new-element::after {
  /* ← add here */
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
  /* ← add here */
  left: 160%;
}
```

> **Important:** Never add `.modal-content` to these selectors. The
> `:not(.modal-content)` exclusion exists specifically to protect the
> modal scroll - `overflow: hidden` on the modal would break
> `overflow-y: auto` and trap long project details.

---

## 12. Styling Rules

### Change the Accent Colour

In `styles/style.css`, edit `--accent-dark` inside `:root`:

```css
:root {
  --accent-dark: #d4af37; /* Change this value */
}
```

This single variable controls every border, glow, icon colour, badge
gradient, and hover highlight across the entire interface.

### Add a New Glass Section

```html
<section id="my-section" class="section">
  <div class="container-custom">
    <div class="section-wrapper">
      <h2 class="section-title">Section Title</h2>
      <div class="glass-card animate-on-scroll fade-in">Content</div>
    </div>
  </div>
</section>
```

### Mobile Breakpoints

- `768px` - Desktop nav hides, mobile hamburger shows. Grids collapse
  to single column. Experience timeline shifts to single-column layout.
- `480px` - Hero padding reduces. Profile coin shrinks to 140px via
  `--coin-size` CSS variable.

Never remove the responsive `@media` blocks. They handle layout,
spacing, and touch-target sizing.

---

## 13. Container IDs - Never Delete or Rename

These IDs are referenced directly by JavaScript. Removing or renaming
any of them will break the corresponding render function silently.

| ID                        | Used by                  |
| ------------------------- | ------------------------ |
| `skillsCategoryBar`       | `renderSkills()`         |
| `skillsDisplayGrid`       | `renderSkills()`         |
| `experienceTimeline`      | `renderExperience()`     |
| `loadMoreExperience`      | `loadMoreExperience()`   |
| `showLessExperience`      | `showLessExperience()`   |
| `projectsGrid`            | `renderProjects()`       |
| `clientsTrack`            | `renderClients()`        |
| `testimonialsGrid`        | `renderTestimonials()`   |
| `projectModal`            | `openProjectModal()`     |
| `projectModalContent`     | `openProjectModal()`     |
| `testimonialModal`        | `openTestimonialModal()` |
| `testimonialModalContent` | `openTestimonialModal()` |
| `closeProjectModal`       | modal close listener     |
| `closeTestimonialModal`   | modal close listener     |
| `page-loader`             | `hideLoader()`           |

---

## 14. Safe Editing Rules

Never:

- Delete or rename container IDs from the table above.
- Duplicate project `id` values.
- Add `overflow: hidden` to `.modal-content`.
- Rename `animate-on-scroll`, `glass-card`, or `skill-card-anim`.
- Remove `backface-visibility: hidden` from `.coin-front` or `.coin-back`.

Always:

- Keep project `id` values as unique integers.
- Verify asset paths exist in `assets/` before adding them to arrays.
- Test in both desktop and mobile viewport after any structural change.
- Check the browser console - all render functions log to `console.error`
  on failure.

---

## 15. Debugging Checklist

| Symptom                       | First thing to check                                                |
| ----------------------------- | ------------------------------------------------------------------- |
| Section content not rendering | Container `id` matches JS selector                                  |
| Project card not appearing    | Array object has all required fields; `id` is unique                |
| Animation not triggering      | Element has both `animate-on-scroll` and a modifier class           |
| Modal not scrolling           | `.modal-content` accidentally got `overflow: hidden`                |
| Badge not showing on card     | Project is at array index 0, 1, or 2 in `projects`                  |
| Coin-toss not working         | `.coin-front` or `.coin-back` missing `backface-visibility: hidden` |
| Shimmer sweep missing         | Element selector not in all three shimmer CSS rule blocks           |

---

The system is predictable. Follow the structure and it will scale
cleanly from 3 projects to 300.
