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
      "Delivering end-to-end digital solutions: from human-centered UI/UX design in Figma to full-stack MERN applications with RESTful APIs. Specializing in Agentic AI workflows, responsive interfaces, and scalable architectures that turn complex startup needs into seamless digital experiences.",
    isInitiallyVisible: true,
  },
];

// =========================================================
//               CLIENTS - infinite carousel
// =========================================================
const clients = [
  {
    name: "TechCorp",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=TechCorp",
    url: "https://techcorp.com",
  },
  {
    name: "DesignHub",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=DesignHub",
    url: "https://designhub.io",
  },
  {
    name: "StartupLab",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=StartupLab",
    url: "https://startuplab.co",
  },
  {
    name: "CreativeStudio",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=CreativeStudio",
    url: "https://creativestudio.design",
  },
  {
    name: "DevAgency",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=DevAgency",
    url: "https://devagency.dev",
  },
  {
    name: "NovaTech",
    logo: "https://via.placeholder.com/200x80/d4af37/1a1a1a?text=NovaTech",
    url: "https://novatech.io",
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
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (!mobileMenuBtn || !mobileMenu || !closeMobileMenu) return;

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
          ${project.type
            .map(
              (t) =>
                `<span class="project-type-tag ${window.getProjectTypeClass(t)}">${t.replace(/-/g, " ")}</span>`,
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
// Each logo is now a clickable link. The carousel animation
// pauses when the user hovers over the container.
// =========================================================
function renderClients() {
  const clientsTrack = document.getElementById("clientsTrack");
  if (!clientsTrack) return;

  const clientsCarousel = document.querySelector(".clients-carousel");

  // Duplicate the array so the seamless loop works
  const clientsForLoop = [...clients, ...clients];
  clientsTrack.innerHTML = clientsForLoop
    .map(
      (client) => `
      <a
        href="${client.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="client-logo"
        aria-label="Visit ${client.name}"
      >
        <img src="${client.logo}" alt="${client.name} logo" />
      </a>`,
    )
    .join("");

  // Pause animation on hover so users can click logos
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
