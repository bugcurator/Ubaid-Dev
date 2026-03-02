# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## 2.0.0 - 2026-03-02

This release is a complete visual and interaction overhaul. Every
animated element, hover effect, and interactive widget has been rebuilt
from scratch or significantly upgraded. The data architecture is
unchanged - all content still lives in arrays inside `script.js` - but
the rendering layer, animation system, and CSS design system have all
moved to their next major version.

### Added

#### 3D Coin-Toss Profile Card

- Replaced the static profile `<img>` with a multi-layer 3D flip card
  hierarchy: `.profile-coin-container` → `.coin-inner` → `.coin-front`
  / `.coin-back`.
- On hover, `.coin-inner` executes a **720-degree Y-axis rotation**
  (two full turns) - one spin to reveal the back face, one to return to
  the front.
- Transition: `0.9s cubic-bezier(0.34, 1.56, 0.64, 1)` - the overshoot
  past 720° and spring-back creates a "coin flick" feel identical to
  native mobile physics.
- `perspective: 1500px` on the outer container gives mathematically
  accurate depth throughout the rotation.
- Back face renders a **"TRUSTED EXPERT"** verification badge using a
  stacked icon composition: `fa-certificate` (gold gradient shell) with
  `fa-check` overlaid at `z-index: 1` (dark fill), producing a
  Meta-style verification mark without custom SVG.
- `backface-visibility: hidden` on both faces prevents any bleed-through
  during the mid-spin transition frames.
- `coinGlow` keyframe animation pulses the outer ring between standard
  and intensified gold shadow to draw attention at idle.
- CSS custom property `--coin-size` controls diameter at all breakpoints
  via a single variable (`180px` desktop / `140px` at 480px).

#### Bi-Directional Scroll Animations

- Added a passive `scroll` event listener that continuously updates
  `_lastScrollY` and `_currentScrollY` module-level variables.
- `IntersectionObserver` callback now reads scroll direction at the
  moment each element enters the viewport.
- Scrolling **down** → element enters with `.from-below` (slides up
  from `+40px`).
- Scrolling **up** → element enters with `.from-above` (slides down
  from `−40px`).
- `zoom-in` modifier scales from `0.88` regardless of direction.
- `fade-in` modifier uses a smaller `±12px` directional offset for
  subtlety.
- Both direction classes are wiped on exit so every scroll pass
  re-evaluates direction - no stale state.
- `requestAnimationFrame` wrapper on the `.visible` class ensures the
  browser paints the offset position before the CSS transition fires,
  preventing the "flash then animate" artifact.

#### Smart Experience Pagination

- Two new module-level constants drive the system:
  `INITIAL_EXP_COUNT = 2` and `EXP_BATCH_SIZE = 3`.
- `renderExperience()` now uses **array index** (not `isInitiallyVisible`
  boolean) to determine initial visibility - simpler and less error-prone.
- New `updateExperienceButtons()` function syncs both buttons on every
  state change and updates the "Show More" label text dynamically to
  reflect the next batch size (e.g. "Show 3 More Experience").
- New **"Show Less"** button (`#showLessExperience`) collapses the view
  back to `INITIAL_EXP_COUNT` cards and smooth-scrolls to the section
  header.
- Both buttons are wrapped in `.experience-btn-group` flex container
  for clean side-by-side layout.
- System is array-length-agnostic: tested with 2 through 80+ entries.

#### Auto-Pinned Project Badges

- `renderProjects()` uses `projectsData.indexOf(project)` to detect
  each project's position in the source array.
- Projects at index **0, 1, and 2** automatically receive a
  `.pinned-badge` HTML element injected into the top-right corner of
  their card.
- Badge uses a gold linear-gradient background, dark text, `fa-thumbtack`
  icon rotated 45° to point naturally into the card corner, and a corner
  radius that follows the card's own `border-radius` curve.
- No type tag required - reordering the `projects` array is all that is
  needed to change which three are pinned.

#### Universal Shimmer-Gradient Hover Effect

- All `.glass-card`, `.cta-button`, `.load-more-btn`, `.connect-btn`,
  `.modal-link`, and `.category-btn` elements now carry a CSS `::after`
  pseudo-element shimmer.
- The shimmer is a `skewX(-18deg)` diagonal stripe of
  `rgba(212, 175, 55, 0.18)` that translates from `left: -110%` to
  `left: 160%` on hover in `0.65s ease`.
- `.modal-content` is deliberately excluded via `:not(.modal-content)`
  to preserve its `overflow-y: auto` behaviour for long project details.

#### Interactive Client Carousel

- `clients` array objects now accept a `url` field.
- Each logo is wrapped in a `<a>` tag targeting the client URL with
  `target="_blank" rel="noopener noreferrer"`.
- `mouseenter` on the carousel container sets
  `animationPlayState: paused`; `mouseleave` resumes - giving users
  time to click logos without fighting the scroll animation.
- Logo images now render with `object-fit: cover` and zero padding,
  filling the full 200×120px tile regardless of image aspect ratio.

---

### Changed

#### Experience Array - `isInitiallyVisible` Deprecated

- The `isInitiallyVisible` boolean field on experience objects is no
  longer read by `renderExperience()`. The field can remain in the
  array without causing errors, but it has no effect.
- Visibility is now controlled entirely by array index position relative
  to `INITIAL_EXP_COUNT`. See `PROJECT_EDITING_GUIDE.md` §6 for the
  full migration guide.

#### Load More Button - Display Model

- Changed from `display: block` to `display: inline-flex` to support
  icon + text layout and the new side-by-side button group.
- `margin: 2rem auto 0` removed; spacing is now owned by the parent
  `.experience-btn-group` flex container.

#### Project Card - Overflow Behaviour

- Added `position: relative` to `.project-card` (required for the
  `.pinned-badge` absolute positioning to anchor correctly).

#### CSS Architecture - Scroll Animation Classes

- `.animate-on-scroll.slide-up` no longer defines a single static
  `translateY(30px)` offset. It now uses directional variants:
  `.slide-up.from-below { transform: translateY(40px) }` and
  `.slide-up.from-above { transform: translateY(-40px) }`.
- Same directional split applied to `.fade-in`.
- `.zoom-in` is direction-agnostic (scale only) and unchanged.

---

### Fixed

#### Modal Scroll Broken by Shimmer Overflow

- `overflow: hidden` was being applied globally to all `.glass-card`
  elements as part of the shimmer stacking context. `.modal-content`
  extends `.glass-card` and already had `overflow-y: auto` - the
  global rule silently overrode it, trapping long project details inside
  an invisible crop.
- Fixed by scoping the shimmer overflow rule to
  `.glass-card:not(.modal-content)`.

#### Collaboration Carousel - Logo Fill

- Client logos were rendering at `max-width: 100%` / `max-height: 100%`
  with `1.5rem` padding, leaving empty space around images that weren't
  exactly the container aspect ratio.
- Fixed: `padding: 0`, `width: 100%`, `height: 100%`,
  `object-fit: cover`, `object-position: center`, `overflow: hidden`
  on `.client-logo`. Images now fill the full tile cleanly.

#### Carousel `<a>` Wrapper Styling

- Wrapping logos in `<a>` tags introduced an underline and default link
  colour visible in some browsers.
- Fixed with `a.client-logo { text-decoration: none; color: inherit; }`.

---

## 1.0.0 - 2024-09-01

Initial release of the portfolio.

### Added

- Data-driven rendering architecture: `skillCategories`, `experience`,
  `projects`, `clients`, and `testimonials` arrays powering all dynamic
  sections.
- Tabbed skills section with category filtering and pop-in animation.
- Alternating experience timeline with `isInitiallyVisible` flag and
  basic "Load More" button.
- Featured projects grid (max 3) on homepage with full database view
  on `projects.html`.
- Project detail modal with live demo and GitHub links.
- Infinite-scroll client logo carousel.
- Testimonial grid with expandable modal.
- Static hero section with profile image, role subtitle, and CV
  download button.
- Gold/Dark glassmorphism design system with CSS custom properties.
- `IntersectionObserver`-driven scroll animations (single-direction).
- Animated stat counters (`experienceCount`, `projectsCount`, `clientsCount`).
- Floating glass header with smooth-scroll anchor navigation.
- Mobile hamburger menu with slide-in drawer.
- Page loader with gold spinner.
- Liquid background animation (two radial blobs, 20s float cycle).
- Custom gold scrollbar.
- Full responsive layout at 768px and 480px breakpoints.
- SEO metadata: Open Graph, Twitter Card, canonical URL.
- MIT License.

---
