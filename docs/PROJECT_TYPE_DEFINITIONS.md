# PROJECT_TYPE_DEFINITIONS.md

This document is the official technical specification for project classification within the
portfolio's data layer. Type tags are consumed by `getProjectTypeClass()` in `projects-data.js`,
which maps each string to a CSS class that applies a distinct colour treatment in the Gold/Dark
Glassmorphism design system. The full tag vocabulary, CSS values, and usage rules are defined here.

---

## Why Type Tags Exist

The portfolio renders projects from a flat array. Type tags are the mechanism that allows one
project to appear in multiple views (homepage featured grid, full projects page, filtered subsets)
and carry contextual meaning (was this client work, personal R&D, or an Agentic AI integration?).

Tags are consumed in two ways:
1. **CSS colour treatment** - `getProjectTypeClass()` maps each tag string to a CSS class.
2. **Filter logic** - The projects page filter bar uses `type.includes(tag)` to show or hide cards.

---

## Classification Taxonomy

Tags are grouped into five categories. Use **2 to 4 tags** per project to keep the card UI
readable and informative without creating visual noise. Always use lowercase strings - the
`getProjectTypeClass()` function is case-sensitive and will not match uppercase or mixed-case
strings.

---

### Category 1 - Engagement and Status Tags

Identifies the professional origin or current lifecycle state of the project. Every project should
carry exactly one engagement tag. This answers the question: "Where did this project come from?"

| Tag                | CSS Class           | Definition                                                                                                                                                                                    |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client-based`     | `.type-client`      | Built for an external client under a freelance or contract agreement. Implies a delivery deadline, a client feedback loop, and real-world deployment against someone else's requirements.      |
| `experience-based` | `.type-experience`  | Completed during formal employment, an internship, a professional course, or as part of a structured academic programme. The work was produced in exchange for compensation or credit.         |
| `sale`             | `.type-sale`        | A commercial product, template, or UI kit available for purchase or licensing. Implies the work has standalone market value independent of any single client relationship.                     |
| `maintenance`      | `.type-maintenance` | A live project that is actively receiving updates, patches, performance improvements, or new feature development. The work is ongoing, not complete.                                           |
| `archive`          | `.type-archive`     | A discontinued or legacy build kept for historical reference. Useful for demonstrating range, growth, and technical progression but no longer actively maintained or supported.                |
| `featured`         | `.type-featured`    | Reserved for the highest-priority entries that represent exceptional skill, innovation, or commercial impact. On `index.html`, only projects tagged `featured` appear in the homepage grid (maximum 3 shown). |
| `personal`         | `.type-personal`    | Self-initiated research and development built to explore new technology, deepen a specific skill, or solve a personal problem. No client. No deadline imposed externally.                      |

---

### Category 2 - Technical Stack Tags

Describes the core architectural layer or domain of the implementation. Use this to communicate
which part of the stack the project primarily operates in.

| Tag         | CSS Class         | Definition                                                                                                                             |
| ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `frontend`  | `.type-frontend`  | Client-side focused implementation: HTML, CSS, JavaScript, React, Vue, or similar. No significant server-side logic or data layer.     |
| `backend`   | `.type-backend`   | Server-side focused implementation: Node.js, Express, databases, REST APIs, or GraphQL. Minimal frontend surface area.                 |
| `fullstack` | `.type-fullstack` | A complete solution covering both the frontend UI and backend data/logic layer. Typical of MERN or similar integrated stack projects.  |
| `devops`    | `.type-devops`    | Infrastructure-oriented work: CI/CD pipelines, Docker, Kubernetes, cloud service configuration, or platform automation.               |
| `micro`     | `.type-micro`     | A small-scope utility, script, widget, or CLI tool solving exactly one specific problem. Minimal surface area by deliberate design.    |

> **Important — `micro` tag mapping:** In `scripts/projects-data.js`, the `getProjectTypeClass()`
> map currently uses the key `"micro-project"` to map to `.type-micro`. Always use the string
> **`"micro"`** in your project's `type` array to match this document's taxonomy. If you add a
> project with `type: ["micro"]`, also verify `getProjectTypeClass()` has a `"micro"` key; if it
> only has `"micro-project"`, add the `"micro"` key pointing to `"type-micro"` to fix the
> discrepancy.

---

### Category 3 - Development Context Tags

Describes the "why" and "how" behind the project's creation - the conditions under which it was
built and the intent behind it.

| Tag            | CSS Class           | Definition                                                                                                                                                     |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `team-project` | `.type-team`        | Built collaboratively with one or more other developers. Implies version control branching strategy, code review processes, and distributed contribution.       |
| `solo-project` | `.type-solo`        | Independently developed end-to-end by a single person. Architecture, design, implementation, testing, and deployment were all handled without collaboration.   |
| `clone`        | `.type-clone`       | A deliberate recreation of an existing platform or product (e.g. a Spotify UI clone, a Twitter feed clone) built purely for architectural study and practice.  |
| `educational`  | `.type-educational` | Created for a teaching context: a bootcamp capstone, a tutorial walkthrough, an academic lab submission, or an open learning resource.                          |
| `demo`         | `.type-demo`        | A rapid prototype or Proof of Concept built to validate a specific idea, design pattern, or technology choice. Not intended for production deployment.          |
| `template`     | `.type-template`    | A reusable boilerplate, starter kit, or layout system intended for rapid deployment or adaptation across multiple future projects.                              |

---

### Category 4 - Design and Visual Tags

For projects where the aesthetic layer, user experience architecture, or interaction design is the
primary deliverable - not just a supporting concern to the engineering work.

| Tag                | CSS Class                | Definition                                                                                                                                                                 |
| ------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui-ux`            | `.type-ui-ux`            | Primary emphasis on layout composition, visual hierarchy, user journey architecture, accessibility compliance, and interaction micro-patterns. Code exists to serve the UX. |
| `design-prototype` | `.type-design-prototype` | A high-fidelity mockup or interactive wireframe, typically produced in Figma or as a coded prototype, created before full implementation begins as a validation artefact.  |

---

### Category 5 - AI and Specialisation Tags

Tags that communicate domain-specific expertise that is increasingly valued in the 2026 market.
These are distinct from projects that simply "use AI" as a feature.

| Tag          | CSS Class          | Definition                                                                                                                                                                                                                                            |
| ------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agentic-ai` | `.type-agentic-ai` | Projects that integrate Agentic AI workflows - meaning autonomous, multi-step AI systems built with deliberate prompt engineering, tool-calling chains, memory management, or LLM orchestration. Distinct from passive AI feature integrations (e.g. calling a single GPT API endpoint and rendering the result). |

#### Activating `agentic-ai` in CSS and JS

The `.type-agentic-ai` CSS class is not included in the default `style.css` tag block. It must be
added manually when the first `agentic-ai` project is added.

**Step 1 — Add the CSS rule** in `styles/style.css` under the Project Type Tags comment block:

```css
.type-agentic-ai {
  background: rgba(147, 112, 219, 0.12);
  color: #9b59b6;
}
```

**Step 2 — Add the JS mapping** in `scripts/projects-data.js` inside `getProjectTypeClass()`:

```js
"agentic-ai": "type-agentic-ai",
```

Both steps are required. The CSS rule alone will not render unless the tag string is mapped to the
class name in `getProjectTypeClass()`.

---

## Badge Logic - How CSS Handles Type Colours

Each type tag maps to a low-opacity background and a higher-opacity text colour. This approach
ensures tags are readable at any card size while remaining visually distinct from one another
without competing with the gold accent system (`#d4af37`) that defines the site identity.

The full CSS mapping that should exist in `style.css` is shown below for reference:

```css
/* -- Engagement -- */
.type-client {
  background: rgba(212, 175, 55, 0.1);
  color: #b8860b;
}
.type-personal {
  background: rgba(255, 99, 71, 0.1);
  color: #ff6347;
}
.type-experience {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}
.type-sale {
  background: rgba(30, 144, 255, 0.1);
  color: #1e90ff;
}
.type-maintenance {
  background: rgba(128, 0, 128, 0.1);
  color: #800080;
}
.type-archive {
  background: rgba(105, 105, 105, 0.1);
  color: #696969;
}
.type-featured {
  background: rgba(255, 215, 0, 0.1);
  color: #daa520;
}

/* -- Stack -- */
.type-frontend {
  background: rgba(255, 140, 0, 0.1);
  color: #ff8c00;
}
.type-backend {
  background: rgba(0, 128, 128, 0.1);
  color: #008080;
}
.type-fullstack {
  background: rgba(199, 21, 133, 0.1);
  color: #c71585;
}
.type-devops {
  background: rgba(65, 105, 225, 0.1);
  color: #4169e1;
}
.type-micro {
  background: rgba(0, 206, 209, 0.1);
  color: #00ced1;
}

/* -- Context -- */
.type-team {
  background: rgba(32, 178, 170, 0.1);
  color: #20b2aa;
}
.type-solo {
  background: rgba(72, 61, 139, 0.1);
  color: #483d8b;
}
.type-clone {
  background: rgba(112, 128, 144, 0.1);
  color: #708090;
}
.type-educational {
  background: rgba(154, 205, 50, 0.1);
  color: #9acd32;
}
.type-demo {
  background: rgba(220, 20, 60, 0.1);
  color: #dc143c;
}
.type-template {
  background: rgba(255, 160, 122, 0.1);
  color: #ffa07a;
}

/* -- Design -- */
.type-ui-ux {
  background: rgba(255, 105, 180, 0.1);
  color: #ff69b4;
}
.type-design-prototype {
  background: rgba(70, 130, 180, 0.1);
  color: #4682b4;
}

/* -- AI (add manually when using agentic-ai tag) -- */
/* .type-agentic-ai {
  background: rgba(147, 112, 219, 0.12);
  color: #9b59b6;
} */
```

Each colour is chosen to read clearly on the dark glassmorphism surface (`#1a1a1a` base) without
using a background that clashes with the gold accent system. All colours remain legible when the
active palette changes via the Theme Customizer because the tag colours use fixed `rgba` values
rather than CSS variables.

---

## The Pinned Badge - Separate from Type Tags

The gold **PINNED** ribbon that appears on the top three project cards is **not** a type tag and
is **not** controlled by the `type` array. It is applied automatically by `renderProjects()` based
on array index position. Any project at index 0, 1, or 2 in `window.projects` receives the badge
regardless of its `type` array contents.

```css
.pinned-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, var(--accent-dark), #c49a1a);
  color: #1a1a1a;
  /* corner-radius, padding, z-index are all defined in style.css */
}
```

To pin different projects, move them to array positions 0, 1, or 2. No type tag changes are
required - the pinned state is entirely controlled by array order.

---

## Usage Rules

### 1. Case Sensitivity

Always use the exact lowercase strings shown in the taxonomy tables above. The string
`"Client-Based"` will not match; `"client-based"` will. The string `"FullStack"` will not match;
`"fullstack"` will.

### 2. Tag Count Limit

Use **2 to 4 tags per project**. Using more than 4 tags creates visual noise inside the card and
the modal header. If more than 4 tags seem necessary, reconsider whether all of them are genuinely
communicating distinct information to a viewer.

### 3. No Duplicates

Do not add the same tag string twice to one project's `type` array. This will render the CSS
class twice but communicate nothing new.

### 4. Adding a Brand New Tag

Before creating a custom tag string that is not in this document, verify that none of the 22
existing definitions already cover the use case. If a genuinely new tag is needed:

- Step 1: Add the lowercase string to the project object's `type` array.
- Step 2: Add a `getProjectTypeClass()` mapping entry in `projects-data.js` pointing the string to a
  new CSS class name.
- Step 3: Add a `.type-yournewtag` CSS rule in `style.css` following the same low-opacity
  background / higher-opacity text pattern as the existing type classes.
- Step 4: Document the new tag in this file under the appropriate category.

### 5. Featured vs Pinned - They Are Not the Same

These two systems are completely independent and serve different purposes:

- Use the `featured` **type tag** to control which projects appear in the homepage grid on
  `index.html`. Maximum 3 featured projects are shown on the homepage.
- **Reorder the projects array** to control which three cards receive the gold PINNED ribbon on
  the full projects page.

A project can have the `featured` tag without being at the top of the array. A project can be at
array index 0, 1, or 2 without having the `featured` tag. They are independent levers.

---

## Full Tag Reference (Quick Lookup)

| Tag                | Category         | CSS Class                | In `getProjectTypeClass()` |
| ------------------ | ---------------- | ------------------------ | -------------------------- |
| `client-based`     | Engagement       | `.type-client`           | ✓                          |
| `experience-based` | Engagement       | `.type-experience`       | ✓                          |
| `sale`             | Engagement       | `.type-sale`             | ✓                          |
| `maintenance`      | Engagement       | `.type-maintenance`      | ✓                          |
| `archive`          | Engagement       | `.type-archive`          | ✓                          |
| `featured`         | Engagement       | `.type-featured`         | ✓                          |
| `personal`         | Engagement       | `.type-personal`         | ✓                          |
| `frontend`         | Stack            | `.type-frontend`         | ✓                          |
| `backend`          | Stack            | `.type-backend`          | ✓                          |
| `fullstack`        | Stack            | `.type-fullstack`        | ✓                          |
| `devops`           | Stack            | `.type-devops`           | ✓                          |
| `micro`            | Stack            | `.type-micro`            | ⚠ mapped as `micro-project` |
| `team-project`     | Context          | `.type-team`             | ✓                          |
| `solo-project`     | Context          | `.type-solo`             | ✓                          |
| `clone`            | Context          | `.type-clone`            | ✓                          |
| `educational`      | Context          | `.type-educational`      | ✓                          |
| `demo`             | Context          | `.type-demo`             | ✓                          |
| `template`         | Context          | `.type-template`         | ✓                          |
| `ui-ux`            | Design           | `.type-ui-ux`            | ✓                          |
| `design-prototype` | Design           | `.type-design-prototype` | ✓                          |
| `agentic-ai`       | AI               | `.type-agentic-ai`       | ✗ must add manually        |

Total: 21 tags across 5 categories. When adding a new tag, update this table as the first step.

> ⚠ **`micro` tag note:** The JS map in `projects-data.js` currently keys this as `"micro-project"`.
> Update the map key to `"micro"` to match this specification.
>
> ✗ **`agentic-ai` note:** Not yet in the JS map. Follow the two-step activation process in
> Category 5 above before using this tag on any project.
