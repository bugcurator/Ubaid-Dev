// =========================================================
// SKILLS — Categorized Tabbed (Project 2 interaction, Project 1 data)
// =========================================================
const skillCategories = [
  {
    category: "Design",
    skills: [
      { name: "Figma" },
      { name: "UI/UX Design" },
      { name: "User-Centric Design" },
      { name: "Product Development" },
      { name: "Prototyping" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Responsive Web Design" },
      { name: "HTML5 & CSS3" },
      { name: "JavaScript (ES6+)" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Express.js" },
      { name: "MERN Stack" },
      { name: "RESTful APIs" },
    ],
  },
  {
    category: "AI & Logic",
    skills: [
      { name: "Agentic AI" },
      { name: "Agentic Workflows" },
      { name: "Prompt Engineering" },
      { name: "Problem Solving" },
      { name: "Python" },
      { name: "C++" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Linux" },
      { name: "Git / GitHub" },
      { name: "Scalable Architecture" },
      { name: "Team Management" },
    ],
  },
  // Add More
  // {
  //   category: "Testing",
  //   skills: [
  //     { name: "Jest (Placeholder)" },
  //     { name: "Unit Testing (Placeholder)" },
  //     { name: "Integration Testing (Placeholder)" },
  //     { name: "Debugging & Profiling (Placeholder)" },
  //     { name: "Browser DevTools (Placeholder)" },
  //   ],
  // },
];

// =========================================================
// EXPERIENCE
// =========================================================
const experience = [
  {
    title: "Computer Science Student",
    company: "University of Swabi",
    period: "Oct 2023 - Sep 2024",
    description:
      "Began academic journey in Computer Science, focusing on foundational programming in C++ and Python. Developed logical thinking, problem-solving skills, and a deep understanding of core computing principles — laying the groundwork for a strong development career.",
    isInitiallyVisible: true,
  },
  {
    title: "Full-Stack MERN Developer & UI/UX Designer",
    company: "Freelance / Personal Projects",
    period: "Sep 2024 - Present",
    description:
      "Delivering end-to-end digital solutions: from human-centered UI/UX design in Figma to full-stack MERN applications with RESTful APIs. Specializing in Agentic AI workflows, responsive interfaces, and scalable architectures that turn complex startup needs into seamless digital experiences.",
    isInitiallyVisible: true,
  },
  // Add more
  // {
  //   title: "Open Source Contributor (Placeholder)",
  //   company: "Community Projects",
  //   period: "2025 - Present",
  //   description:
  //     "Placeholder: Contributing to open-source frontend and tooling projects. Engaging with the developer community through pull requests, code reviews, and documentation improvements.",
  //   isInitiallyVisible: false,
  // },
];

// =========================================================
// PROJECTS
// =========================================================
const projects = [
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
    image: "./assets/muhammad-dawood-screenshot.png",
    details:
      "A sleek, responsive portfolio built for Muhammad Dawood, a DevOps Engineer, using HTML, CSS, and JavaScript. It highlights his expertise in CI/CD, cloud infrastructure, and automation tools through well-structured sections, interactive UI, and smooth animations crafted to reflect both technical depth and professional identity.",
    demo: "https://idavidkhan.github.io/DevOps/",
    github: "https://github.com/idavidkhan/DevOps",
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
    image: "./assets/study-station-screenshot.png",
    details:
      "StudyStation is a multi-page web interface designed for a WhatsApp learning channel. Built with HTML, Tailwind CSS, and JavaScript, it features responsive layouts, fluid animations, and a clean, soft aesthetic. The site focuses on delivering a seamless and engaging browsing experience, structured to showcase resources, updates, and channel insights effectively.",
    demo: "https://bugcurator.github.io/StudyStation/",
    github: "https://github.com/bugcurator/StudyStation",
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
    type: ["experience-based", "archive", "sale"],
    image: "./assets/hadaf-immigration-screenshot.png",
    details:
      "A modern, single-page website designed for Hadaf Immigration Consultancy, which assists students in pursuing education abroad. This ready-to-use UI emphasizes clarity, smooth animations, and professional layout to attract and engage potential clients. Ideal for any consultancy looking to establish a trustworthy digital presence. Fully responsive and easy to customize or deploy.",
    demo: "https://bugcurator.github.io/Hadaf-Immigration/",
    github: "https://github.com/bugcurator/Hadaf-Immigration",
  },
  // Add more
  // {
  //   id: 4,
  //   title: "SaaS Dashboard UI (Placeholder)",
  //   summary:
  //     "Placeholder: A feature-rich SaaS analytics dashboard with real-time charts, dark mode, and role-based access — built with React and Tailwind CSS.",
  //   tech: [
  //     "React.js",
  //     "Tailwind CSS",
  //     "Node.js",
  //     "MongoDB",
  //     "Chart.js",
  //     "REST APIs",
  //   ],
  //   type: ["personal", "fullstack", "demo"],
  //   image: "./assets/muhammad-dawood-screenshot.png",
  //   details:
  //     "Placeholder: A comprehensive SaaS dashboard template featuring analytics widgets, user management, dark/light theming, and responsive layout. Intended as a starter kit for SaaS founders looking for a production-ready frontend.",
  //   demo: "#",
  //   github: "#",
  // },
];

// =========================================================
// CLIENTS (from Project 3)
// =========================================================
const clients = [
  {
    name: "TechCorp",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=TechCorp",
  },
  {
    name: "DesignHub",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=DesignHub",
  },
  {
    name: "StartupLab",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=StartupLab",
  },
  {
    name: "CreativeStudio",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=CreativeStudio",
  },
  {
    name: "DevAgency",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=DevAgency",
  },
  {
    name: "NovaTech",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=NovaTech",
  },
];

// =========================================================
// TESTIMONIALS
// =========================================================
const testimonials = [
  {
    name: "Muhammad Dawood",
    role: "Former DevOps Intern @TechCreator",
    avatar: "./assets/muhammad-dawood-img.jpg",
    text: "I asked for a simple portfolio, but what I received was thoughtful, clean, and far beyond expectations. The attention to detail, responsiveness, and creative touch truly impressed me. It's rare to find someone who listens, learns, and delivers so well — especially so early in their journey. I'm genuinely happy with the result and would gladly collaborate again. Highly recommended for any frontend work!",
    stars: 5,
  },
  {
    name: "Wajeeha Sultan",
    role: "Frontend Developer - Freelancer",
    avatar: "./assets/wajeeha-sultan.jpg",
    text: "Collaborating with this developer across three distinct projects was incredibly smooth and inspiring. From layout planning to final execution, every stage reflected a deep understanding of both UI/UX design and frontend development. The interfaces were clean, responsive, and user-focused. Creativity and problem-solving were evident throughout the process. Truly impressed by the professionalism, communication, and dedication shown. Highly recommended for anyone seeking quality web design and development work.",
    stars: 5,
  },
  {
    name: "Zaheer Abbas",
    role: "Web Developer - Freelancer",
    avatar: "./assets/zaheer-abbas.jpg",
    text: "Working with Ubaid Ahmad has been a pleasure. His strong attention to detail and willingness to learn stand out. He tackles challenges with positivity and communicates clearly. Ubaid adapts quickly to new tools and applies them effectively. With passion, dedication, and a great attitude, he's a valuable contributor to any project or development team.",
    stars: 4,
  },
  {
    name: "Umair Amjad",
    role: "Software Engineer at TechCreator",
    avatar: "./assets/umair-amjad.jpg",
    text: "Getting the chance to work with Ubaid Ahmad has been genuinely uplifting. He brings clarity, focus, and a deep sense of responsibility to everything he does. Even when things get hectic, he stays calm and thoughtful, always looking for smart solutions. What really stands out is his hunger to learn and grow — it makes him adaptable and sharp in fast-moving environments. Ubaid is reliable, easy to work with, and someone you're glad to have on your team.",
    stars: 5,
  },
  // Add more
  // {
  //   name: "Sarah Mitchell (Placeholder)",
  //   role: "Product Manager at InnovateCo",
  //   avatar: "./assets/muhammad-dawood-img.jpg",
  //   text: "Placeholder: Working with Ubaid on our product's frontend was a great experience. He delivered a polished, responsive interface ahead of schedule. His communication was clear, and he proactively suggested improvements that enhanced user experience. Will definitely work together again.",
  //   stars: 5,
  // },
];

// =========================================================
// STATE — Active skills category
// =========================================================
let currentSkillCategory = skillCategories[0].category;

// =========================================================
// UTILITY — Animated Counter
// =========================================================
function animateCounter(element, target, duration = 1500) {
  const start = 0;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const current = Math.min(start + (target * progress) / duration, target);
    element.textContent = Math.floor(current);
    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  }

  window.requestAnimationFrame(step);
}

// =========================================================
// UTILITY — Project type → CSS class
// =========================================================
function getProjectTypeClass(type) {
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
}

// =========================================================
// MOBILE MENU
// =========================================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileMenu = document.getElementById("closeMobileMenu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  mobileMenuBtn.addEventListener("click", () =>
    mobileMenu.classList.add("active"),
  );
  closeMobileMenu.addEventListener("click", () =>
    mobileMenu.classList.remove("active"),
  );

  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) mobileMenu.classList.remove("active");
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("active"));
  });
}

// =========================================================
// RENDER SKILLS — Tabbed layout (from Project 2)
// =========================================================
function renderSkills() {
  const bar = document.getElementById("skillsCategoryBar");
  const grid = document.getElementById("skillsDisplayGrid");

  // Render category tab buttons
  bar.innerHTML = skillCategories
    .map(
      (cat) => `
      <button
        class="category-btn${cat.category === currentSkillCategory ? " active" : ""}"
        data-category="${cat.category}"
        role="tab"
        aria-selected="${cat.category === currentSkillCategory}"
        aria-label="Show ${cat.category} skills"
      >
        ${cat.category}
      </button>`,
    )
    .join("");

  // Attach click handlers to buttons
  bar.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;
      if (currentSkillCategory === cat) return;
      currentSkillCategory = cat;
      renderSkills();
    });
  });

  // Render skill cards for active category
  const activeData = skillCategories.find(
    (c) => c.category === currentSkillCategory,
  );

  if (!activeData) return;

  grid.innerHTML = activeData.skills
    .map(
      (s, i) => `
      <div
        class="skill-card glass-card skill-card-anim"
        style="animation-delay: ${i * 0.07}s"
        aria-label="${s.name}"
      >
        <span>${s.name}</span>
      </div>`,
    )
    .join("");
}

// =========================================================
// RENDER EXPERIENCE
// =========================================================
function renderExperience() {
  const timeline = document.getElementById("experienceTimeline");
  const loadMoreBtn = document.getElementById("loadMoreExperience");

  const visibleExperiences = experience.filter((e) => e.isInitiallyVisible);

  timeline.innerHTML = experience
    .map(
      (exp) => `
      <div class="experience-item glass-card animate-on-scroll slide-up${
        exp.isInitiallyVisible ? "" : " hidden"
      }">
        <h3 class="experience-title">${exp.title}</h3>
        <p class="experience-company">${exp.company}</p>
        <p class="experience-period">${exp.period}</p>
        <p class="experience-description">${exp.description}</p>
      </div>`,
    )
    .join("");

  if (visibleExperiences.length === experience.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

// =========================================================
// EXPERIENCE — Load More
// =========================================================
function loadMoreExperience() {
  const hiddenItems = document.querySelectorAll(
    "#experienceTimeline .experience-item.hidden",
  );

  const itemsToShow = 2;
  for (let i = 0; i < Math.min(itemsToShow, hiddenItems.length); i++) {
    hiddenItems[i].classList.remove("hidden");
    hiddenItems[i].classList.add("animate-on-scroll", "slide-up");
    initScrollAnimations([hiddenItems[i]]);
  }

  const remaining = document.querySelectorAll(
    "#experienceTimeline .experience-item.hidden",
  );
  if (remaining.length === 0) {
    document.getElementById("loadMoreExperience").style.display = "none";
  }
}

// =========================================================
// RENDER PROJECTS
// =========================================================
function renderProjects() {
  const projectsGrid = document.getElementById("projectsGrid");

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
      <div
        class="project-card glass-card animate-on-scroll zoom-in"
        data-project-id="${project.id}"
        role="button"
        tabindex="0"
        aria-label="View project: ${project.title}"
      >
        <img
          src="${project.image}"
          alt="Screenshot of the ${project.title} project"
          class="project-image"
        />
        <div class="project-content">
          ${project.type
            .map(
              (t) =>
                `<span class="project-type-tag ${getProjectTypeClass(t)}">${t.replace(
                  /-/g,
                  " ",
                )}</span>`,
            )
            .join("")}
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tech">
            ${project.tech
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>
      </div>`,
    )
    .join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    const open = () => openProjectModal(parseInt(card.dataset.projectId));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

// =========================================================
// PROJECT MODAL
// =========================================================
function openProjectModal(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("projectModalContent");

  modalContent.innerHTML = `
    <img
      src="${project.image}"
      alt="Full view of the ${project.title} project"
      class="modal-project-image"
    />
    <h2 class="modal-project-title">${project.title}</h2>
    <div class="project-type-tags" style="margin-bottom:1rem;">
      ${project.type
        .map(
          (t) =>
            `<span class="project-type-tag ${getProjectTypeClass(t)}">${t.replace(
              /-/g,
              " ",
            )}</span>`,
        )
        .join("")}
    </div>
    <div class="project-tech" style="margin-top:1rem;">
      ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
    </div>
    <p class="modal-project-details">${project.details}</p>
    <div class="modal-project-links">
      <a
        href="${project.demo}"
        class="modal-link glow-hover"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Live Demo of ${project.title}"
      >
        <i class="fas fa-external-link-alt"></i> Live Demo
      </a>
      <a
        href="${project.github}"
        class="modal-link glow-hover"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub code for ${project.title}"
      >
        <i class="fab fa-github"></i> View Code
      </a>
    </div>`;

  setTimeout(() => {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }, 10);
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("active");
  setTimeout(() => document.body.classList.remove("modal-open"), 500);
}

// =========================================================
// RENDER CLIENTS (from Project 3) — infinite carousel
// =========================================================
function renderClients() {
  const clientsTrack = document.getElementById("clientsTrack");
  if (!clientsTrack) return;

  // Duplicate for seamless loop
  const clientsForLoop = [...clients, ...clients];

  clientsTrack.innerHTML = clientsForLoop
    .map(
      (client) => `
      <div
        class="client-logo"
        role="img"
        aria-label="Logo for client ${client.name}"
      >
        <img src="${client.logo}" alt="${client.name} logo" />
      </div>`,
    )
    .join("");
}

// =========================================================
// RENDER TESTIMONIALS
// =========================================================
function renderTestimonials() {
  const testimonialsGrid = document.getElementById("testimonialsGrid");

  testimonialsGrid.innerHTML = testimonials
    .map(
      (testimonial, index) => `
      <div
        class="testimonial-card glass-card animate-on-scroll fade-in"
        data-testimonial-index="${index}"
        role="button"
        tabindex="0"
        aria-label="Read full testimonial from ${testimonial.name}"
      >
        <div class="testimonial-header">
          <img
            src="${testimonial.avatar}"
            alt="Avatar of ${testimonial.name}"
            class="testimonial-avatar"
          />
          <div class="testimonial-info">
            <h4>${testimonial.name}</h4>
            <p>${testimonial.role}</p>
          </div>
        </div>
        <p class="testimonial-text">${testimonial.text}</p>
        <div class="testimonial-stars" aria-label="${testimonial.stars} out of 5 stars">
          ${'<i class="fas fa-star"></i>'.repeat(testimonial.stars)}
        </div>
      </div>`,
    )
    .join("");

  document.querySelectorAll(".testimonial-card").forEach((card) => {
    const open = () =>
      openTestimonialModal(parseInt(card.dataset.testimonialIndex));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

// =========================================================
// TESTIMONIAL MODAL
// =========================================================
function openTestimonialModal(index) {
  const testimonial = testimonials[index];
  if (!testimonial) return;

  const modal = document.getElementById("testimonialModal");
  const modalContent = document.getElementById("testimonialModalContent");

  modalContent.innerHTML = `
    <div class="testimonial-header">
      <img
        src="${testimonial.avatar}"
        alt="Avatar of ${testimonial.name}"
        class="testimonial-avatar"
      />
      <div class="testimonial-info">
        <h4>${testimonial.name}</h4>
        <p>${testimonial.role}</p>
      </div>
    </div>
    <div class="testimonial-stars" aria-label="${testimonial.stars} out of 5 stars">
      ${'<i class="fas fa-star"></i>'.repeat(testimonial.stars)}
    </div>
    <p class="testimonial-modal-text">${testimonial.text}</p>`;

  setTimeout(() => {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }, 10);
}

function closeTestimonialModal() {
  const modal = document.getElementById("testimonialModal");
  modal.classList.remove("active");
  setTimeout(() => document.body.classList.remove("modal-open"), 500);
}

// =========================================================
// SCROLL ANIMATIONS
// =========================================================
function initScrollAnimations(elements = null) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scrolled-in");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const els = elements || document.querySelectorAll(".animate-on-scroll");

  els.forEach((el) => {
    if (!el.classList.contains("scrolled-in")) {
      el.style.opacity = "0";
      if (el.classList.contains("slide-up"))
        el.style.transform = "translateY(30px)";
      else if (el.classList.contains("zoom-in"))
        el.style.transform = "scale(0.9)";
      observer.observe(el);
    }
  });
}

// =========================================================
// COUNTERS
// =========================================================
function initCounters() {
  const experienceCountEl = document.getElementById("experienceCount");
  const projectsCountEl = document.getElementById("projectsCount");
  const clientsCountEl = document.getElementById("clientsCount");

  const totalExperiences = 1;
  const totalProjects = 7;
  const totalClients = 3;

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(experienceCountEl, totalExperiences);
          animateCounter(projectsCountEl, totalProjects);
          animateCounter(clientsCountEl, totalClients);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  const statsBar = document.querySelector(".stats-bar");
  if (statsBar) counterObserver.observe(statsBar);
}

// =========================================================
// PAGE LOADER
// =========================================================
function hideLoader() {
  const loader = document.getElementById("page-loader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => loader.remove(), 500);
  }
}

// =========================================================
// INIT
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Render dynamic sections
  renderSkills();
  renderExperience();
  renderProjects();
  renderClients();
  renderTestimonials();

  // Mobile menu
  initMobileMenu();

  // Load More Experience
  document
    .getElementById("loadMoreExperience")
    .addEventListener("click", loadMoreExperience);

  // Modal close buttons
  document
    .getElementById("closeProjectModal")
    .addEventListener("click", closeProjectModal);
  document
    .getElementById("closeTestimonialModal")
    .addEventListener("click", closeTestimonialModal);

  // Close modals on backdrop click
  document.getElementById("projectModal").addEventListener("click", (e) => {
    if (e.target.id === "projectModal") closeProjectModal();
  });
  document.getElementById("testimonialModal").addEventListener("click", (e) => {
    if (e.target.id === "testimonialModal") closeTestimonialModal();
  });

  // ESC key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      closeTestimonialModal();
    }
  });

  // Smooth scroll — offset for floating header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight =
          document.querySelector(".glass-header").offsetHeight;
        const offset = 16;
        const offsetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          (headerHeight + offset);

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });

  // Kick off animations & loader hide
  setTimeout(() => {
    initScrollAnimations();
    initCounters();
    hideLoader();
  }, 300);
});
