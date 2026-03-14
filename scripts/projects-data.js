// =========================================================
// PROJECTS DATABASE
// This is the single source of truth for all project data.
// It is imported BEFORE script.js in both index.html and
// projects.html so that window.projects is always available
// when renderProjects() is called.
//
// index.html  → shows only projects tagged "featured" (max 3)
// projects.html → shows the full list
// =========================================================

window.projects = [
  {
    id: 1,
    title: "DevOps Engineer Portfolio - Muhammad Dawood",
    summary:
      "Responsive DevOps Portfolio showcasing CI/CD, cloud tools, automation expertise, and smooth UI/UX, all built with HTML, CSS, and JavaScript.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "Scroll-based Animation",
      "Landing Page Design",
    ],
    type: ["client-based", "featured", "maintenance"],
    image: "assets/muhammad-dawood-screenshot.png",
    details:
      "A sleek, responsive portfolio built for Muhammad Dawood, a DevOps Engineer, using HTML, CSS, and JavaScript. It highlights his expertise in CI/CD, cloud infrastructure, and automation tools through well-structured sections, interactive UI, and smooth animations crafted to reflect both technical depth and professional identity.",
    demo: "https://idavidkhan.github.io/DevOps/",
    github: "https://github.com/idavidkhan/DevOps",
    outcomes: [
      { icon: "check-circle", label: "Client live since Jan 2025" },
      { icon: "star", label: "5-star client review" },
    ],
  },
  {
    id: 2,
    title: "StudyStation - WhatsApp Channel Site",
    summary:
      "Responsive multi-page website with smooth animations, soft UI/UX, and user-friendly navigation, built using HTML, Tailwind CSS, and JavaScript.",
    tech: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Design",
      "UI/UX Design",
      "Multi-Page Architecture",
    ],
    type: ["personal", "educational", "featured", "maintenance"],
    image: "assets/study-station-screenshot.png",
    details:
      "StudyStation is a multi-page web interface designed for a WhatsApp learning channel. Built with HTML, Tailwind CSS, and JavaScript, it features responsive layouts, fluid animations, and a clean, soft aesthetic. The site focuses on delivering a seamless and engaging browsing experience, structured to showcase resources, updates, and channel insights effectively.",
    demo: "https://bugcurator.github.io/StudyStation/",
    github: "https://github.com/bugcurator/StudyStation",
    outcomes: [
      { icon: "zap", label: "Sub-1s load time" },
      { icon: "check-circle", label: "Client live since Jan 2025" },
    ],
  },
  {
    id: 3,
    title: "Hadaf Immigration - Study Abroad Consultancy UI",
    summary:
      "Single-page responsive design with smooth UI/UX, crafted for educational consultancies. Fully animated and optimized for all screen sizes.",
    tech: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Design",
      "UI/UX Design",
      "Scroll-based Animation",
      "Landing Page Design",
    ],
    type: ["experience-based", "featured", "archive", "sale"],
    image: "assets/hadaf-immigration-screenshot.png",
    details:
      "A modern, single-page website designed for Hadaf Immigration Consultancy, which assists students in pursuing education abroad. This ready-to-use UI emphasizes clarity, smooth animations, and professional layout to attract and engage potential clients. Ideal for any consultancy looking to establish a trustworthy digital presence. Fully responsive and easy to customize or deploy.",
    demo: "https://bugcurator.github.io/Hadaf-Immigration/",
    github: "https://github.com/bugcurator/Hadaf-Immigration",
    outcomes: [
      { icon: "check-circle", label: "Client live since Jan 2025" },
      { icon: "zap", label: "Sub-1s load time" },
    ],
  },

  // --- ADD MORE PROJECTS BELOW ----------------------------------------
  // Copy and paste this template, fill in the fields, and
  // increment the id by 1 each time.
  //
  // {
  //   id: 4,
  //   title: "Project Title",
  //   summary: "Short summary shown on the card (1–2 sentences).",
  //   tech: ["React.js", "Tailwind CSS", "Node.js"],
  //   type: ["personal", "fullstack"],
  //   //  ↑ See getProjectTypeClass() below for all valid type values.
  //   //    Add "featured" to show the card on the home page.
  //   image: "./assets/your-screenshot.png",
  //   details: "Longer description shown inside the modal.",
  //   demo: "https://your-demo-link.com",
  //   github: "https://github.com/your-repo",
  // },
];

// =========================================================
//            UTILITY - Project type → CSS class
// Add new type strings here when introduce new tag styles
// in style.css.
// =========================================================
window.getProjectTypeClass = function getProjectTypeClass(type) {
  const map = {
    "client-based": "type-client",
    personal: "type-personal",
    "experience-based": "type-experience",
    sale: "type-sale",
    maintenance: "type-maintenance",
    archive: "type-archive",
    featured: "type-featured",
    "ui-ux": "type-ui-ux",
    "design-prototype": "type-design-prototype",
    frontend: "type-frontend",
    backend: "type-backend",
    fullstack: "type-fullstack",
    devops: "type-devops",
    demo: "type-demo",
    "team-project": "type-team",
    "solo-project": "type-solo",
    clone: "type-clone",
    educational: "type-educational",
    template: "type-template",
    "micro-project": "type-micro",
  };
  return map[type] || "";
};
