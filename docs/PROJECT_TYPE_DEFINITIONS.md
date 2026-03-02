# Project Type Definitions (`getProjectTypeClass()`)

This document is the official technical specification for project
classification within the portfolio's data layer. Type tags are
consumed by `getProjectTypeClass()` in `script.js`, which maps each
string to a CSS class that applies a distinct colour treatment in the
Gold/Dark Glassmorphism design system.

---

## Classification Taxonomy

Tags are grouped into four primary categories. Use **2–4 tags** per
project to keep card UI readable. Always use lowercase strings — the
function is case-sensitive.

---

### 1. Engagement & Status Tags

Identifies the professional origin or current lifecycle state of the project.

| Tag | CSS Class | Definition |
|---|---|---|
| `client-based` | `.type-client` | Built for an external client under a freelance or contract agreement. Implies a delivery deadline, client feedback loop, and real-world deployment. |
| `experience-based` | `.type-experience` | Completed during formal employment, an internship, a professional course, or as part of a structured academic programme. |
| `sale` | `.type-sale` | A commercial product, template, or UI kit available for purchase or licensing. Implies the work has standalone market value. |
| `maintenance` | `.type-maintenance` | A live project actively receiving updates, patches, performance improvements, or new feature development. |
| `archive` | `.type-archive` | A discontinued or legacy build kept for historical reference. Useful for showing growth and range but no longer actively maintained. |
| `featured` | `.type-featured` | Reserved for high-priority entries that represent exceptional skill, innovation, or commercial impact. On `index.html`, only projects tagged `featured` appear in the homepage grid (max 3). |
| `personal` | `.type-personal` | Self-initiated research and development built to explore new technology, deepen a skill, or solve a personal problem. |

---

### 2. Technical Stack Tags

Describes the core architectural layer of the implementation.

| Tag | CSS Class | Definition |
|---|---|---|
| `frontend` | `.type-frontend` | Client-side focused: HTML, CSS, JavaScript, React, Vue, or similar. No significant server-side logic. |
| `backend` | `.type-backend` | Server-side focused: Node.js, Express, databases, REST or GraphQL APIs. Minimal frontend surface. |
| `fullstack` | `.type-fullstack` | A complete solution covering both frontend UI and backend logic. Typical of MERN or similar integrated stacks. |
| `devops` | `.type-devops` | Infrastructure-oriented: CI/CD pipelines, Docker, Kubernetes, cloud automation, or platform configuration. |
| `micro` | `.type-micro` | A small-scope utility, widget, or script solving a single, specific task. Minimal surface area by design. |

---

### 3. Development Context Tags

Describes the "why" and "how" behind the project's creation.

| Tag | CSS Class | Definition |
|---|---|---|
| `team-project` | `.type-team` | Built collaboratively with one or more developers. Implies version control branching, code review, and distributed contribution. |
| `solo-project` | `.type-solo` | Independently developed end-to-end — architecture, design, coding, testing, and deployment all by one person. |
| `clone` | `.type-clone` | A deliberate recreation of an existing platform (e.g., a Spotify or Netflix UI) built purely for architectural study and skill practice. |
| `educational` | `.type-educational` | Created for a teaching context: a bootcamp project, tutorial, academic lab, or open learning resource. |
| `demo` | `.type-demo` | A rapid prototype or Proof of Concept (PoC) built to validate a specific idea, feature, or technology choice. Not intended for production. |
| `template` | `.type-template` | A reusable boilerplate, layout, or starter kit intended for rapid deployment across multiple projects. |

---

### 4. Design & Visual Tags

For projects where the aesthetic layer or user experience flow is the
primary deliverable — not just a supporting concern.

| Tag | CSS Class | Definition |
|---|---|---|
| `ui-ux` | `.type-ui-ux` | Emphasis on layout composition, visual hierarchy, user journey, accessibility, and interaction micro-patterns. The code exists to serve the experience. |
| `design-prototype` | `.type-design-prototype` | A high-fidelity mockup or interactive wireframe, typically built in Figma or as a coded prototype, before full implementation begins. |

---

### 5. AI & Specialisation Tags

Tags that communicate domain-specific expertise increasingly relevant
to the 2025–2026 market.

| Tag | CSS Class | Definition |
|---|---|---|
| `agentic-ai` | `.type-agentic-ai` | Projects that integrate Agentic AI workflows — autonomous, multi-step AI systems built with prompt engineering, tool use, or LLM orchestration. Distinct from passive AI feature integrations. |

To activate `agentic-ai` in the CSS, add the following to `style.css`
under the Project Type Tags block:

```css
.type-agentic-ai {
  background: rgba(147, 112, 219, 0.12);
  color: #9b59b6;
}
```

---

## Badge Logic — How CSS Handles Type Colours

Each type tag maps to a low-opacity coloured background and a
higher-opacity matching text colour. This ensures tags are readable at
any size while staying visually distinct without competing with the
gold accent system.

The full mapping in `style.css` follows this pattern:

```css
/* ── Engagement ── */
.type-client     { background: rgba(212, 175, 55, 0.10); color: #b8860b; }
.type-personal   { background: rgba(255,  99, 71, 0.10); color: #ff6347; }
.type-experience { background: rgba( 76, 175, 80, 0.10); color: #4caf50; }
.type-sale       { background: rgba( 30, 144,255, 0.10); color: #1e90ff; }
.type-maintenance{ background: rgba(128,   0,128, 0.10); color: #800080; }
.type-archive    { background: rgba(105, 105,105, 0.10); color: #696969; }
.type-featured   { background: rgba(255, 215,  0, 0.10); color: #daa520; }

/* ── Stack ── */
.type-frontend   { background: rgba(255, 140,  0, 0.10); color: #ff8c00; }
.type-backend    { background: rgba(  0, 128,128, 0.10); color: #008080; }
.type-fullstack  { background: rgba(199,  21,133, 0.10); color: #c71585; }
.type-devops     { background: rgba( 65, 105,225, 0.10); color: #4169e1; }
.type-micro      { background: rgba(  0, 206,209, 0.10); color: #00ced1; }

/* ── Context ── */
.type-team       { background: rgba( 32, 178,170, 0.10); color: #20b2aa; }
.type-solo       { background: rgba( 72,  61,139, 0.10); color: #483d8b; }
.type-clone      { background: rgba(112, 128,144, 0.10); color: #708090; }
.type-educational{ background: rgba(154, 205, 50, 0.10); color: #9acd32; }
.type-demo       { background: rgba(220,  20, 60, 0.10); color: #dc143c; }
.type-template   { background: rgba(255, 160,122, 0.10); color: #ffa07a; }

/* ── Design ── */
.type-ui-ux         { background: rgba(255, 105,180, 0.10); color: #ff69b4; }
.type-design-prototype { background: rgba(70, 130,180, 0.10); color: #4682b4; }
```

Each colour is chosen so that it reads cleanly on the dark glassmorphism
surface (`#1a1a1a` base) without using a background that would clash
with the site's gold accent (`#d4af37`).

---

## The Pinned Badge — Separate from Type Tags

The gold **PINNED** ribbon is **not** a type tag. It is applied
automatically by `renderProjects()` based on array index position —
any project at index 0, 1, or 2 in `window.projects` receives the
badge regardless of its `type` array contents.

```css
.pinned-badge {
  position: absolute;
  top: 0; right: 0;
  background: linear-gradient(135deg, var(--accent-dark), #c49a1a);
  color: #1a1a1a;
  /* … corner-radius, padding, z-index … */
}
```

To pin a different project, move it to one of the first three array
positions. No type tag changes required.

---

## Usage Rules

1. **Case sensitivity.** Always use the exact lowercase strings shown
   above. `"Client-Based"` will not match; `"client-based"` will.

2. **Tag limits.** Use **2–4 tags per project**. More than 4 creates
   visual noise inside the card and modal.

3. **No duplicates.** Do not add the same tag twice to one project's
   `type` array.

4. **Adding new tags.** Before creating a custom tag string, check
   whether one of the 21 definitions above already covers the use case.
   If a truly new tag is needed: (a) add the lowercase string to the
   project object, (b) add a `getProjectTypeClass()` mapping entry in
   `script.js`, and (c) add a `.type-yournewtag` CSS rule in `style.css`.

5. **`featured` vs pinned.** These are independent controls. Use
   `featured` to control homepage visibility. Reorder the array to
   control the pinned ribbon. A project can have either, both, or neither.
