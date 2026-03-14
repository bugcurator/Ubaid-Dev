// =========================================================
//               SKILLS - Categorized Tabbed
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
    category: "Logic & CS",
    skills: [
      { name: "Problem Solving" },
      { name: "Python" },
      { name: "C++" },
      { name: "Data Structures" },
      { name: "Algorithms" },
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
];

// =========================================================
//                          EXPERIENCE
// =========================================================
const experience = [
  {
    title: "Computer Science Student",
    company: "University of Swabi",
    period: "Oct 2023 - Sep 2024",
    description:
      "Began academic journey in Computer Science, focusing on foundational programming in C++ and Python. Developed logical thinking, problem-solving skills, and a deep understanding of core computing principles - laying the groundwork for a strong development career.",
    isInitiallyVisible: true,
  },
  {
    title: "Full-Stack MERN Developer & UI/UX Designer",
    company: "Freelance / Personal Projects",
    period: "Sep 2024 - Present",
    description:
      "Delivering end-to-end digital solutions: from human-centered UI/UX design in Figma to full-stack MERN applications with RESTful APIs. Specializing in responsive interfaces, scalable architectures, and clean code that turns complex client needs into seamless digital products.",
    isInitiallyVisible: true,
  },
];

// =========================================================
//               CLIENTS - Carousel data
// ─────────────────────────────────────────────────────────
// HOW TO ADD A REAL ENTRY:
//   {
//     name:     "Company Name",
//     logo:     "./assets/company-logo.png",  // optional — remove key if no logo yet
//     link:     "https://company.com",        // website > facebook > instagram
//     linkType: "website",                    // "website" | "facebook" | "instagram"
//   }
// If logo is omitted the card auto-renders an initial-based placeholder.
// =========================================================
const clients = [
  // -- Placeholder entries — replace with real companies as you land them --
  {
    name: "Your First SW House",
    // logo: "./assets/logo-swhouse.png",   // uncomment when I have the asset
    link: "https://facebook.com",
    linkType: "facebook",
  },
  {
    name: "Tech Company",
    // logo: "./assets/logo-tech.png",
    link: "https://instagram.com",
    linkType: "instagram",
  },
  {
    name: "Digital Agency",
    // logo: "./assets/logo-agency.png",
    link: "https://yoursite.com",
    linkType: "website",
  },
  {
    name: "Startup Studio",
    // logo: "./assets/logo-startup.png",
    link: "https://facebook.com",
    linkType: "facebook",
  },
  {
    name: "Dev Firm",
    // logo: "./assets/logo-devfirm.png",
    link: "https://yoursite.com",
    linkType: "website",
  },
];

// =========================================================
//                        TESTIMONIALS
// =========================================================
const testimonials = [
  {
    name: "Muhammad Dawood",
    role: "Former DevOps Intern @TechCreator",
    avatar: "./assets/muhammad-dawood-img.jpg",
    text: "I asked for a simple portfolio, but what I received was thoughtful, clean, and far beyond expectations. The attention to detail, responsiveness, and creative touch truly impressed me. It's rare to find someone who listens, learns, and delivers so well - especially so early in their journey. I'm genuinely happy with the result and would gladly collaborate again. Highly recommended for any frontend work!",
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
    text: "Getting the chance to work with Ubaid Ahmad has been genuinely uplifting. He brings clarity, focus, and a deep sense of responsibility to everything he does. Even when things get hectic, he stays calm and thoughtful, always looking for smart solutions. What really stands out is his hunger to learn and grow - it makes him adaptable and sharp in fast-moving environments. Ubaid is reliable, easy to work with, and someone you're glad to have on your team.",
    stars: 5,
  },
];

// =========================================================
//                           STATE
// =========================================================
let currentSkillCategory = skillCategories[0].category;

// =========================================================
//          SCROLL DIRECTION TRACKING
// Continuously updated by a passive scroll listener so the
// IntersectionObserver knows which way the user is scrolling.
// =========================================================
let _lastScrollY = window.scrollY;
let _currentScrollY = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    _lastScrollY = _currentScrollY;
    _currentScrollY = window.scrollY;
  },
  { passive: true },
);

// =========================================================
//            EXPERIENCE PAGINATION CONSTANTS
// =========================================================
const INITIAL_EXP_COUNT = 2; // cards shown on first render
const EXP_BATCH_SIZE = 3; // cards revealed per "Load More" click

// =========================================================
//            BI-DIRECTIONAL SCROLL OBSERVER
// Stored at module level so loadMoreExperience can reuse it.
// =========================================================
let scrollObserver = null;

/**
 * initScrollAnimations
 * Registers elements with the bi-directional IntersectionObserver.
 * Pass an array/NodeList to register specific elements (e.g. newly
 * revealed "Load More" items), or call with no argument to register
 * every .animate-on-scroll element on the page.
 *
 * Bi-directional logic:
 *   - Scrolling DOWN → element enters with "from-below" class (slides up)
 *   - Scrolling UP   → element enters with "from-above" class (slides down)
 *   - On exit the direction classes are cleared so re-entry re-evaluates.
 */
function initScrollAnimations(elements = null) {
  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Determine direction at the moment of entry
            const scrollingDown = _currentScrollY >= _lastScrollY;

            // Clear any previous direction class
            entry.target.classList.remove("from-below", "from-above");

            // Set directional class BEFORE adding visible so the
            // CSS transition starts from the correct offset position.
            entry.target.classList.add(
              scrollingDown ? "from-below" : "from-above",
            );

            // requestAnimationFrame ensures the browser has painted the
            // initial offset before the transition kicks in.
            requestAnimationFrame(() => {
              entry.target.classList.add("visible");
            });
          } else {
            // Remove all state so the next entry re-animates correctly.
            entry.target.classList.remove(
              "visible",
              "from-below",
              "from-above",
            );
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );
  }

  const els = elements || document.querySelectorAll(".animate-on-scroll");
  els.forEach((el) => {
    el.classList.remove("visible", "from-below", "from-above");
    scrollObserver.observe(el);
  });
}

// =========================================================
//                UTILITY - Animated Counter
// =========================================================
function animateCounter(element, target, duration = 1500) {
  if (!element) return;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const current = Math.min((target * progress) / duration, target);
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
//                        MOBILE MENU
// =========================================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileMenu = document.getElementById("closeMobileMenu");

  if (!mobileMenuBtn || !mobileMenu || !closeMobileMenu) return;

  // ── Open / close overlay ──
  mobileMenuBtn.addEventListener("click", () =>
    mobileMenu.classList.add("active"),
  );
  closeMobileMenu.addEventListener("click", () =>
    mobileMenu.classList.remove("active"),
  );
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) mobileMenu.classList.remove("active");
  });

  // ── Sub-nav accordion: tap parent link to expand/collapse ──
  const navGroups = mobileMenu.querySelectorAll(".mobile-nav-group");
  navGroups.forEach((group) => {
    const parentLink = group.querySelector(":scope > .mobile-nav-link");
    if (!parentLink) return;

    parentLink.addEventListener("click", (e) => {
      // Only intercept if there IS a subnav — otherwise navigate normally
      const subnav = group.querySelector(".mobile-subnav");
      if (!subnav) return;

      const isActive = group.classList.contains("is-active");

      // Collapse all groups first
      navGroups.forEach((g) => g.classList.remove("is-active"));

      // Re-open this one if it was closed
      if (!isActive) {
        group.classList.add("is-active");
        e.preventDefault(); // stay on page while expanding
      }
    });
  });

  // ── Close overlay when a sub-link (non-group) link is tapped ──
  mobileMenu
    .querySelectorAll(".mobile-subnav a, .mobile-nav > .mobile-nav-link")
    .forEach((link) => {
      link.addEventListener("click", () =>
        mobileMenu.classList.remove("active"),
      );
    });
}

// =========================================================
//              RENDER SKILLS - Tabbed layout
// =========================================================
function renderSkills() {
  const bar = document.getElementById("skillsCategoryBar");
  const grid = document.getElementById("skillsDisplayGrid");
  if (!bar || !grid) return;

  bar.innerHTML = skillCategories
    .map(
      (cat) => `
      <button
        class="category-btn${cat.category === currentSkillCategory ? " active" : ""}"
        data-category="${cat.category}"
        role="tab"
        aria-selected="${cat.category === currentSkillCategory}"
        aria-label="Show ${cat.category} skills"
      >${cat.category}</button>`,
    )
    .join("");

  bar.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;
      if (currentSkillCategory === cat) return;
      currentSkillCategory = cat;
      renderSkills();
    });
  });

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
      ><span>${s.name}</span></div>`,
    )
    .join("");
}

// =========================================================
//                    RENDER EXPERIENCE
// Always renders the full dataset but hides items beyond
// INITIAL_EXP_COUNT. Button state is managed separately.
// =========================================================
function renderExperience() {
  const timeline = document.getElementById("experienceTimeline");
  if (!timeline) return;

  timeline.innerHTML = experience
    .map(
      (exp, index) => `
      <div class="experience-item glass-card animate-on-scroll slide-up${
        index >= INITIAL_EXP_COUNT ? " hidden" : ""
      }">
        <h3 class="experience-title">${exp.title}</h3>
        <p class="experience-company">${exp.company}</p>
        <p class="experience-period">${exp.period}</p>
        <p class="experience-description">${exp.description}</p>
      </div>`,
    )
    .join("");

  updateExperienceButtons();
}

// =========================================================
//          EXPERIENCE - Dual-button state sync
// =========================================================
function updateExperienceButtons() {
  const loadMoreBtn = document.getElementById("loadMoreExperience");
  const showLessBtn = document.getElementById("showLessExperience");
  const total = experience.length;
  const visibleCount = document.querySelectorAll(
    "#experienceTimeline .experience-item:not(.hidden)",
  ).length;

  // "Load More" only visible when hidden cards remain
  if (loadMoreBtn) {
    loadMoreBtn.style.display = visibleCount >= total ? "none" : "inline-flex";
    // Update label to reflect how many remain
    const remaining = total - visibleCount;
    const nextBatch = Math.min(remaining, EXP_BATCH_SIZE);
    loadMoreBtn.innerHTML = `<i class="fas fa-chevron-down"></i> Show ${nextBatch} More Experience`;
  }

  // "Show Less" only visible once we're beyond the initial count
  if (showLessBtn) {
    showLessBtn.style.display =
      visibleCount > INITIAL_EXP_COUNT ? "inline-flex" : "none";
  }
}

// =========================================================
//              EXPERIENCE - Load More
// Reveals up to EXP_BATCH_SIZE hidden items at a time.
// =========================================================
function loadMoreExperience() {
  const hiddenItems = Array.from(
    document.querySelectorAll("#experienceTimeline .experience-item.hidden"),
  );
  hiddenItems.slice(0, EXP_BATCH_SIZE).forEach((item) => {
    item.classList.remove("hidden");
    initScrollAnimations([item]);
  });
  updateExperienceButtons();
}

// =========================================================
//            EXPERIENCE - Show Less
// Collapses back to the initial INITIAL_EXP_COUNT cards.
// =========================================================
function showLessExperience() {
  const allItems = document.querySelectorAll(
    "#experienceTimeline .experience-item",
  );
  allItems.forEach((item, index) => {
    if (index >= INITIAL_EXP_COUNT) item.classList.add("hidden");
  });
  updateExperienceButtons();

  // Gently scroll back to the top of the Experience section
  const section = document.getElementById("experience");
  if (section) {
    const header = document.querySelector(".glass-header");
    const headerHeight = header ? header.offsetHeight : 0;
    window.scrollTo({
      top:
        section.getBoundingClientRect().top +
        window.pageYOffset -
        (headerHeight + 16),
      behavior: "smooth",
    });
  }
}

// =========================================================
//                     RENDER PROJECTS
// index.html  → only "featured" tagged projects (max 3)
// projects.html → full database from window.projects
// =========================================================
function renderProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  const projectsData = window.projects || [];

  const isProjectsPage = window.location.pathname.includes("projects.html");
  const isSubPage = window.location.pathname.includes("/pages/");
  const resolveImagePath = (path) => (isSubPage ? `../${path}` : path);

  const projectsToRender = isProjectsPage
    ? projectsData
    : projectsData
        .filter((p) => p.type && p.type.includes("featured"))
        .slice(0, 3);

  if (projectsToRender.length === 0) {
    projectsGrid.innerHTML = `<p style="opacity:0.6;text-align:center;width:100%;">No projects to display yet.</p>`;
    return;
  }

  projectsGrid.innerHTML = projectsToRender
    .map((project) => {
      // pin the first 3 entries in window.projects (by original index)
      const originalIndex = projectsData.indexOf(project);
      const isPinned = originalIndex >= 0 && originalIndex < 3;

      // FA icon map for outcome tags
      const faIconMap = {
        "check-circle": "fas fa-check-circle",
        zap: "fas fa-bolt",
        star: "fas fa-star",
      };

      // Outcome tags — Font Awesome icons only
      const outcomesHTML =
        project.outcomes && project.outcomes.length
          ? `<div class="outcome-tags">
              ${project.outcomes
                .map(
                  (o) =>
                    `<span class="outcome-tag">
                      <i class="${faIconMap[o.icon] || "fas fa-check-circle"}"></i>
                      ${o.label}
                    </span>`,
                )
                .join("")}
             </div>`
          : "";

      return `
      <div
        class="project-card glass-card animate-on-scroll zoom-in"
        data-project-id="${project.id}"
        role="button"
        tabindex="0"
        aria-label="View project: ${project.title}"
      >
        ${isPinned ? `<div class="pinned-badge"><i class="fas fa-thumbtack"></i> PINNED</div>` : ""}
        <img
          src="${resolveImagePath(project.image)}"
          alt="Screenshot of the ${project.title} project"
          class="project-image"
          loading="lazy"
        />
        <div class="project-content">
          <div class="project-type-tags">
            ${project.type
              .map(
                (t) =>
                  `<span class="project-type-tag ${window.getProjectTypeClass(t)}">${t.replace(/-/g, " ")}</span>`,
              )
              .join("")}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tech">
            ${project.tech
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
          ${outcomesHTML}
        </div>
      </div>`;
    })
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
//                      PROJECT MODAL
// =========================================================
function openProjectModal(projectId) {
  const projectsData = window.projects || [];
  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("projectModalContent");
  if (!modal || !modalContent) return;

  const isSubPage = window.location.pathname.includes("/pages/");
  const resolveImagePath = (path) => (isSubPage ? `../${path}` : path);

  modalContent.innerHTML = `
    <img
      src="${resolveImagePath(project.image)}"
      alt="Full view of the ${project.title} project"
      class="modal-project-image"
    />
    <h2 class="modal-project-title">${project.title}</h2>
    <div class="project-type-tags" style="margin-bottom:1rem;">
      ${project.type
        .map(
          (t) =>
            `<span class="project-type-tag ${window.getProjectTypeClass(t)}">${t.replace(/-/g, " ")}</span>`,
        )
        .join("")}
    </div>
    <div class="project-tech" style="margin-top:1rem;">
      ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
    </div>
    <p class="modal-project-details">${project.details}</p>
    <div class="modal-project-links">
      <a href="${project.demo}" class="modal-link glow-hover"
         target="_blank" rel="noopener noreferrer">
        Live Demo
      </a>
      <a href="${project.github}" class="modal-link glow-hover"
         target="_blank" rel="noopener noreferrer">
        View Code
      </a>
    </div>
  `;

  setTimeout(() => {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }, 10);
}
function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.classList.remove("active");
  setTimeout(() => document.body.classList.remove("modal-open"), 500);
}

// =========================================================
//        RENDER CLIENTS - infinite carousel
// ─────────────────────────────────────────────────────────
// Supports two card modes:
//   • logo present  → shows the image (grayscale → color on hover)
//   • no logo yet   → shows a gold initial pill + company name
// Each card links out via website > facebook > instagram,
// indicated by a small icon badge in the corner.
// =========================================================
function renderClients() {
  const clientsTrack = document.getElementById("clientsTrack");
  if (!clientsTrack) return;
  if (!clients.length) return;

  const clientsCarousel = document.querySelector(".clients-carousel");

  // FA icon class per link type
  const linkIconMap = {
    website: "fas fa-globe",
    facebook: "fab fa-facebook",
    instagram: "fab fa-instagram",
  };

  function buildCard(client) {
    const initial = client.name.charAt(0).toUpperCase();
    const iconClass =
      linkIconMap[client.linkType] || "fas fa-external-link-alt";
    const hasLogo = Boolean(client.logo);

    const innerHTML = hasLogo
      ? `<img src="${client.logo}" alt="${client.name} logo" loading="lazy" />`
      : `<div class="client-initial-pill" aria-hidden="true">${initial}</div>
         <span class="client-name-label">${client.name}</span>`;

    return `
      <a
        href="${client.link}"
        target="_blank"
        rel="noopener noreferrer"
        class="client-logo${hasLogo ? "" : " client-logo-text"}"
        role="listitem"
        aria-label="Visit ${client.name}"
        data-tooltip="${client.name}"
      >
        ${innerHTML}
        <span class="client-link-badge" aria-hidden="true">
          <i class="${iconClass}"></i>
        </span>
      </a>`;
  }

  // Duplicate for seamless infinite scroll
  const doubled = [...clients, ...clients];
  clientsTrack.innerHTML = doubled.map(buildCard).join("");

  // Pause on hover so users can click
  if (clientsCarousel) {
    clientsCarousel.addEventListener("mouseenter", () => {
      clientsTrack.style.animationPlayState = "paused";
    });
    clientsCarousel.addEventListener("mouseleave", () => {
      clientsTrack.style.animationPlayState = "running";
    });
  }
}

// =========================================================
//                    RENDER TESTIMONIALS
// =========================================================
function renderTestimonials() {
  const testimonialsGrid = document.getElementById("testimonialsGrid");
  if (!testimonialsGrid) return;

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
          <img src="${testimonial.avatar}" alt="Avatar of ${testimonial.name}" class="testimonial-avatar" />
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
//                    TESTIMONIAL MODAL
// =========================================================
function openTestimonialModal(index) {
  const testimonial = testimonials[index];
  if (!testimonial) return;

  const modal = document.getElementById("testimonialModal");
  const modalContent = document.getElementById("testimonialModalContent");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="testimonial-header">
      <img src="${testimonial.avatar}" alt="Avatar of ${testimonial.name}" class="testimonial-avatar" />
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
  if (!modal) return;
  modal.classList.remove("active");
  setTimeout(() => document.body.classList.remove("modal-open"), 500);
}

// =========================================================
//                            COUNTERS
// =========================================================
function initCounters() {
  const statsBar = document.querySelector(".stats-bar");
  if (!statsBar) return;

  // experienceCount is hardcoded "1+" in HTML — do not animate
  const projectsCountEl = document.getElementById("projectsCount");
  const clientsCountEl = document.getElementById("clientsCount");
  const techCountEl = document.getElementById("techCount");

  const totalProjects = 7;
  const totalClients = 3;
  const totalTech = 15;

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(projectsCountEl, totalProjects);
          animateCounter(clientsCountEl, totalClients);
          animateCounter(techCountEl, totalTech);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counterObserver.observe(statsBar);
}

// =========================================================
//                        PAGE LOADER
// =========================================================
function hideLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;
  loader.classList.add("hidden");
  // Remove from DOM after the CSS transition completes (0.5s)
  setTimeout(() => {
    if (loader.parentNode) loader.parentNode.removeChild(loader);
  }, 600);
}

// =========================================================
//                            INIT
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  try {
    // --- Render all dynamic sections ---
    // Each function guards itself with an early return if its
    // target element doesn't exist, so pages that only have a
    // subset of sections (e.g. projects.html) won't throw.
    renderSkills();
    renderExperience();
    renderProjects();
    renderClients();
    renderTestimonials();

    // --- Refresh Lucide icons for dynamically rendered content ---
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    // --- Mobile menu ---
    initMobileMenu();

    // --- Load More / Show Less Experience ---
    const loadMoreBtn = document.getElementById("loadMoreExperience");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", loadMoreExperience);
    }
    const showLessBtn = document.getElementById("showLessExperience");
    if (showLessBtn) {
      showLessBtn.addEventListener("click", showLessExperience);
    }

    // --- Modal close buttons ---
    const closeProjectBtn = document.getElementById("closeProjectModal");
    if (closeProjectBtn) {
      closeProjectBtn.addEventListener("click", closeProjectModal);
    }

    const closeTestimonialBtn = document.getElementById(
      "closeTestimonialModal",
    );
    if (closeTestimonialBtn) {
      closeTestimonialBtn.addEventListener("click", closeTestimonialModal);
    }

    // --- Close modals on backdrop click ---
    const projectModal = document.getElementById("projectModal");
    if (projectModal) {
      projectModal.addEventListener("click", (e) => {
        if (e.target.id === "projectModal") closeProjectModal();
      });
    }

    const testimonialModal = document.getElementById("testimonialModal");
    if (testimonialModal) {
      testimonialModal.addEventListener("click", (e) => {
        if (e.target.id === "testimonialModal") closeTestimonialModal();
      });
    }

    // --- ESC key closes any open modal ---
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeProjectModal();
        closeTestimonialModal();
      }
    });

    // --- Smooth scroll with floating-header offset ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const header = document.querySelector(".glass-header");
          const headerHeight = header ? header.offsetHeight : 0;
          const offsetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            (headerHeight + 16);
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      });
    });

    // --- Kick off animations & counters after a short paint delay ---
    // The 300ms delay ensures rendered HTML is in the DOM before
    // the observer starts measuring element positions.
    setTimeout(() => {
      initScrollAnimations();
      initCounters();
    }, 300);
  } catch (err) {
    console.error("Portfolio init error:", err);
  } finally {
    // --- Guaranteed loader hide ---
    // The finally block runs even if a render step above throws,
    // so the page is never stuck on the loader screen.
    setTimeout(hideLoader, 400);
  }
});

// === AUDIT V2 ADDITIONS ===

// =========================================================
//                  LIGHT / DARK THEME TOGGLE
// =========================================================
function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const iconDark = toggle.querySelector(".theme-icon-dark");
  const iconLight = toggle.querySelector(".theme-icon-light");

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (iconDark) iconDark.style.display = "none";
      if (iconLight) iconLight.style.display = "inline-block";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (iconDark) iconDark.style.display = "inline-block";
      if (iconLight) iconLight.style.display = "none";
    }
  }

  // Read saved preference
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

// =========================================================
//               ACTIVE NAV STATE ON SCROLL
// =========================================================
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav a");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("nav-active");
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.classList.add("nav-active");
            }
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => observer.observe(s));
}

// Hook into DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initActiveNav();
});

// =========================================================
//           THEME CUSTOMIZER  —  Palette + Font
// =========================================================
function initThemeCustomizer() {
  const PALETTES = [
    {
      id: "gold-noir",
      label: "Gold Noir",
      swatch: "#D4AF37",
      rgb: "212,175,55",
      vars: {
        "--accent-dark": "#D4AF37",
        "--accent-light": "#F0D896",
        "--bg-dark": "#1A1A1A",
        "--glass-dark": "rgba(255,255,255,0.05)",
        "--border-dark": "rgba(212,175,55,0.2)",
        "--shadow-color": "rgba(212,175,55,0.5)",
      },
      liq1: "linear-gradient(135deg,#D4AF37,#C49A3A)",
      liq2: "linear-gradient(135deg,#8B7355,#D4AF37)",
    },
    {
      id: "royal-amethyst",
      label: "Amethyst",
      swatch: "#A78BFA",
      rgb: "167,139,250",
      vars: {
        "--accent-dark": "#A78BFA",
        "--accent-light": "#C4B5FD",
        "--bg-dark": "#0F0A1E",
        "--glass-dark": "rgba(167,139,250,0.06)",
        "--border-dark": "rgba(167,139,250,0.25)",
        "--shadow-color": "rgba(167,139,250,0.5)",
      },
      liq1: "linear-gradient(135deg,#A78BFA,#7C3AED)",
      liq2: "linear-gradient(135deg,#4C1D95,#A78BFA)",
    },
    {
      id: "cyber-teal",
      label: "Cyber Teal",
      swatch: "#22D3EE",
      rgb: "34,211,238",
      vars: {
        "--accent-dark": "#22D3EE",
        "--accent-light": "#67E8F9",
        "--bg-dark": "#051215",
        "--glass-dark": "rgba(34,211,238,0.05)",
        "--border-dark": "rgba(34,211,238,0.22)",
        "--shadow-color": "rgba(34,211,238,0.5)",
      },
      liq1: "linear-gradient(135deg,#22D3EE,#0891B2)",
      liq2: "linear-gradient(135deg,#083344,#22D3EE)",
    },
    {
      id: "rose-prestige",
      label: "Rose Prestige",
      swatch: "#FB7185",
      rgb: "251,113,133",
      vars: {
        "--accent-dark": "#FB7185",
        "--accent-light": "#FDA4AF",
        "--bg-dark": "#1A0810",
        "--glass-dark": "rgba(251,113,133,0.06)",
        "--border-dark": "rgba(251,113,133,0.25)",
        "--shadow-color": "rgba(251,113,133,0.5)",
      },
      liq1: "linear-gradient(135deg,#FB7185,#E11D48)",
      liq2: "linear-gradient(135deg,#881337,#FB7185)",
    },
    {
      id: "emerald-elite",
      label: "Emerald",
      swatch: "#34D399",
      rgb: "52,211,153",
      vars: {
        "--accent-dark": "#34D399",
        "--accent-light": "#6EE7B7",
        "--bg-dark": "#051510",
        "--glass-dark": "rgba(52,211,153,0.05)",
        "--border-dark": "rgba(52,211,153,0.22)",
        "--shadow-color": "rgba(52,211,153,0.5)",
      },
      liq1: "linear-gradient(135deg,#34D399,#059669)",
      liq2: "linear-gradient(135deg,#064E3B,#34D399)",
    },
    {
      id: "arctic-frost",
      label: "Arctic Frost",
      swatch: "#93C5FD",
      rgb: "147,197,253",
      vars: {
        "--accent-dark": "#93C5FD",
        "--accent-light": "#BFDBFE",
        "--bg-dark": "#060D1A",
        "--glass-dark": "rgba(147,197,253,0.05)",
        "--border-dark": "rgba(147,197,253,0.22)",
        "--shadow-color": "rgba(147,197,253,0.5)",
      },
      liq1: "linear-gradient(135deg,#93C5FD,#2563EB)",
      liq2: "linear-gradient(135deg,#1E3A5F,#93C5FD)",
    },
    {
      id: "amber-forge",
      label: "Amber Forge",
      swatch: "#FBBF24",
      rgb: "251,191,36",
      vars: {
        "--accent-dark": "#FBBF24",
        "--accent-light": "#FDE68A",
        "--bg-dark": "#14100A",
        "--glass-dark": "rgba(251,191,36,0.05)",
        "--border-dark": "rgba(251,191,36,0.22)",
        "--shadow-color": "rgba(251,191,36,0.5)",
      },
      liq1: "linear-gradient(135deg,#FBBF24,#D97706)",
      liq2: "linear-gradient(135deg,#78350F,#FBBF24)",
    },
    {
      id: "crimson-luxe",
      label: "Crimson",
      swatch: "#F87171",
      rgb: "248,113,113",
      vars: {
        "--accent-dark": "#F87171",
        "--accent-light": "#FCA5A5",
        "--bg-dark": "#1A0808",
        "--glass-dark": "rgba(248,113,113,0.06)",
        "--border-dark": "rgba(248,113,113,0.25)",
        "--shadow-color": "rgba(248,113,113,0.5)",
      },
      liq1: "linear-gradient(135deg,#F87171,#DC2626)",
      liq2: "linear-gradient(135deg,#7F1D1D,#F87171)",
    },
    {
      id: "silver-ghost",
      label: "Silver Ghost",
      swatch: "#CBD5E1",
      rgb: "203,213,225",
      vars: {
        "--accent-dark": "#CBD5E1",
        "--accent-light": "#E2E8F0",
        "--bg-dark": "#0A0D12",
        "--glass-dark": "rgba(203,213,225,0.05)",
        "--border-dark": "rgba(203,213,225,0.22)",
        "--shadow-color": "rgba(203,213,225,0.4)",
      },
      liq1: "linear-gradient(135deg,#CBD5E1,#64748B)",
      liq2: "linear-gradient(135deg,#1E293B,#CBD5E1)",
    },
    {
      id: "coral-flame",
      label: "Coral Flame",
      swatch: "#FB923C",
      rgb: "251,146,60",
      vars: {
        "--accent-dark": "#FB923C",
        "--accent-light": "#FDBA74",
        "--bg-dark": "#150D08",
        "--glass-dark": "rgba(251,146,60,0.05)",
        "--border-dark": "rgba(251,146,60,0.22)",
        "--shadow-color": "rgba(251,146,60,0.5)",
      },
      liq1: "linear-gradient(135deg,#FB923C,#EA580C)",
      liq2: "linear-gradient(135deg,#7C2D12,#FB923C)",
    },
  ];

  // Font family feature removed

  // ── Apply palette ──────────────────────────────────────
  function applyPalette(id) {
    const p = PALETTES.find((x) => x.id === id) || PALETTES[0];
    const root = document.documentElement;
    Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty("--accent-rgb", p.rgb);

    // Update liquid-bg gradient inline
    let dyn = document.getElementById("cs-dyn");
    if (!dyn) {
      dyn = document.createElement("style");
      dyn.id = "cs-dyn";
      document.head.appendChild(dyn);
    }
    dyn.textContent = `.liquid-bg::before{background:${p.liq1}!important;}.liquid-bg::after{background:${p.liq2}!important;}`;

    // Active swatch ring
    document
      .querySelectorAll(".cs-swatch")
      .forEach((s) =>
        s.classList.toggle("cs-active", s.dataset.palette === id),
      );

    // Update label
    const nameEl = document.getElementById("cs-palette-name");
    if (nameEl) nameEl.textContent = p.label;

    localStorage.setItem("ua-palette", id);
  }

  // ── Build DOM ──────────────────────────────────────────
  const trigger = document.createElement("button");
  trigger.id = "cs-trigger";
  trigger.setAttribute("aria-label", "Open theme customizer");
  trigger.innerHTML = '<i class="fas fa-palette"></i>';

  const panel = document.createElement("div");
  panel.id = "cs-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Theme Customizer");
  panel.innerHTML = `
    <div class="cs-head">
      <span class="cs-title"><i class="fas fa-sliders-h"></i>&nbsp; Customize</span>
      <button class="cs-close" aria-label="Close"><i class="fas fa-times"></i></button>
    </div>

    <div class="cs-section">
      <div class="cs-section-label">
        <i class="fas fa-circle-half-stroke"></i>
        <span>Color Palette</span>
      </div>
      <div class="cs-swatches">
        ${PALETTES.map((p) => `<button class="cs-swatch" data-palette="${p.id}" style="background:${p.swatch}" title="${p.label}" aria-label="${p.label}"></button>`).join("")}
      </div>
      <div class="cs-active-label" id="cs-palette-name">Gold Noir</div>
    </div>

  `;

  document.body.appendChild(panel);
  document.body.appendChild(trigger);

  // ── Events ─────────────────────────────────────────────
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = panel.classList.toggle("cs-open");
    trigger.classList.toggle("cs-open", open);
  });

  panel.querySelector(".cs-close").addEventListener("click", () => {
    panel.classList.remove("cs-open");
    trigger.classList.remove("cs-open");
  });

  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && e.target !== trigger) {
      panel.classList.remove("cs-open");
      trigger.classList.remove("cs-open");
    }
  });

  panel.querySelectorAll(".cs-swatch").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      applyPalette(btn.dataset.palette);
    });
  });

  // ── Restore saved on load ──────────────────────────────
  const savedPalette = localStorage.getItem("ua-palette") || "gold-noir";
  applyPalette(savedPalette);
}

// Hook customizer into DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeCustomizer();
});
