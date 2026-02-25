# PROJECT_EDITING_GUIDE.md

This document explains how to safely edit, extend, and maintain the
portfolio system.

The project follows a data driven architecture. Most dynamic content
lives inside `scripts/script.js`. Layout structure is defined in
`index.html`. Styling and animation rules are defined in
`styles/style.css`.

Do not edit randomly. Follow the rules below to avoid breaking rendering
logic.

---

## 1. Project Structure Overview

### Core Files

- `index.html` → Static layout skeleton and SEO structure\
- `styles/style.css` → Design system, animations, layout rules\
- `scripts/script.js` → Data arrays, state logic, DOM rendering\
- `assets/` → Images, icons, fonts\
- `docs/PROJECT_EDITING_GUIDE.md` → Editing documentation

### Rendering Pattern

Each dynamic section works like this:

1.  HTML contains an empty container with an ID.\
2.  JavaScript selects that container.\
3.  A render function maps array data into template strings.\
4.  The result is injected into the DOM.

If content does not appear, check the container ID first.

---

## 2. Editing Basic Static Content

Static text lives inside `index.html`.

### Change Hero Title

Find:

`<h1 id="hero-title">`

Edit the text inside the tag.

### Change Subtitle

Find:

`<h2 class="hero-subtitle">`

Update the content directly.

### Change Description

Locate:

`<p class="hero-description">`

Modify the paragraph text.

### Update CV Button

Find the anchor with class `cta-button`.

Example:

`<a href="./assets/your-new-cv.pdf" download class="cta-button glow-hover">`

Replace the file path only. Do not remove the class names.

---

## 3. Editing Counters

Counters animate when the section becomes visible.

### Existing Counter IDs

- `experienceCount`
- `projectsCount`
- `clientsCount`

### How It Works

The `initCounters()` function calls `animateCounter()` for each ID.

### Add a New Counter

Step 1: Add HTML

Add inside the counters section:

`<h3 id="awardsCount">0</h3>`

Step 2: Update JS

Inside `initCounters()` in `scripts/script.js`, add:

`animateCounter("awardsCount", 10, 1500);`

Second parameter = target number\
Third parameter = duration in milliseconds

---

## 4. Adding Skills

Skills are stored inside the `skillCategories` array in
`scripts/script.js`.

### Add Skill to Existing Category

Inside the correct category object:

`{ name: "New Skill" }`

No HTML editing required.

### Add New Category

Add a new object inside `skillCategories`:

{ category: "Mobile", skills: \[ { name: "React Native" }, { name:
"Flutter" } \] }

The `renderSkills()` function automatically creates:

- A new category tab
- A new filtered view

Do not rename `category` or `skills` keys.

---

## 5. Adding Experience

Experience data is inside the `experience` array.

Required structure:

- title
- company
- period
- description
- isInitiallyVisible

Example:

{ title: "Senior Developer", company: "Company Name", period: "2024 -
Present", description: "Role details here", isInitiallyVisible: true }

Set `isInitiallyVisible` to false if it should appear only after
clicking Load More.

Layout alternation is automatic. Do not manually change positioning
classes.

---

## 6. Adding Projects

Projects are stored in the `projects` array.

Required fields:

- id
- title
- summary
- tech
- type
- image
- details
- demo
- github

Example:

{ id: "project-x", title: "New Project", summary: "Short description",
tech: \["React", "Node"\], type: \["Full-Stack"\], image:
"assets/images/project.jpg", details: "Full explanation", demo:
"https://demo.com", github: "https://github.com/username" }

Rules:

- ID must be unique.
- Image path must exist inside assets.
- Do not remove required fields.

The modal system uses the project ID to fetch correct data.

---

## 7. Adding Testimonials

Testimonials are inside the `testimonials` array.

Required structure:

- name
- role
- avatar
- text
- stars

Example:

{ name: "Client Name", role: "CEO", avatar: "assets/images/avatar.jpg",
text: "Feedback message", stars: 5 }

The render function converts the stars number into icon elements
automatically.

No layout edits required.

---

## 8. Editing Collaboration Section

Collaboration data is inside the `clients` array.

To replace a logo:

Update the `logo` path inside the object.

Use SVG or high resolution PNG for best quality.

Do not modify the container ID `clientsGrid`.

---

## 9. Styling Rules

All theme control is inside `styles/style.css`.

### Change Accent Color

Inside `:root`, edit:

`--accent-dark`

This updates borders, icons, hover effects, and glow styles globally.

### Glass Effect

Use the `.glass-card` class for new sections to inherit blur and border
styles.

### Responsive Behavior

Mobile breakpoint triggers below 768px.

Grids automatically collapse to single column.

Avoid removing responsive media queries.

---

## 10. Safe Editing Rules

Never delete:

- skillsCategoryBar
- skillsDisplayGrid
- experienceTimeline
- projectsGrid
- clientsGrid
- testimonialsGrid
- projectModal
- modalTitle
- modalDescription

Do not rename:

- animate-on-scroll
- skill-card-anim
- glass-card

Common mistakes:

- Duplicate project IDs
- Wrong asset paths
- Deleting container IDs used in JS
- Editing key names inside arrays

---

## Final Rule

If something breaks:

1.  Check container ID.
2.  Check array structure.
3.  Check console for errors.
4.  Confirm unique IDs.

The system is predictable. Follow structure. It will scale cleanly.
