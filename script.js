/* ========================================
   Hugh Patrick Digital — Script
   ======================================== */

(function () {
  "use strict";

  // ========== THEME TOGGLE ==========
  var themeToggle = document.getElementById("theme-toggle");
  var savedTheme = localStorage.getItem("theme");

  // Apply saved theme or default to dark
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  themeToggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "light" ? "dark" : "light";
    if (next === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", next);
    }
    localStorage.setItem("theme", next);
  });

  // ========== MOBILE NAV ==========
  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const header = document.getElementById("site-header");

  // Create overlay element for mobile menu
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  function openNav() {
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    navLinks.classList.add("open");
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", function () {
    navLinks.classList.contains("open") ? closeNav() : openNav();
  });

  overlay.addEventListener("click", closeNav);

  // Close nav when a link is clicked
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ========== ACTIVE NAV HIGHLIGHTING ==========
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  function highlightNav() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          a.classList.remove("active");
          if (a.getAttribute("href") === "#" + id) {
            a.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });

  // ========== SCROLL FADE-IN ==========
  var fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ========== CONTACT FORM ==========
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showStatus("Please fill in all required fields.", "error");
      return;
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    // Success (client-side demo — wire to Formspree/Netlify/backend for production)
    showStatus(
      "Thanks, " + name + "! I'll get back to you within one business day.",
      "success"
    );
    form.reset();
  });

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = "form-status " + type;
    statusEl.hidden = false;

    setTimeout(function () {
      statusEl.hidden = true;
    }, 6000);
  }
})();
