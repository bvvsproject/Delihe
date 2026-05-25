/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNATIONAL DELHI PUBLIC SCHOOL, NIDAGUNDI
Core Interactive Interactivity (main.js)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialise Scroll Reveal (Intersection Observer)
  initScrollReveal();

  // 2. Initialise Achievements Count-Up Animations
  initCounters();

  // 3. Setup Academics Tab Panel Switcher
  initAcademicsTabs();

  // 4. Setup FAQ Accordion System
  initFAQs();

  // 5. Setup Interactive Gallery Filter & Lightbox
  initGallerySystem();

  // 6. Setup Form Validations & Custom Success Popup Modals
  initFormValidation();

  // 7. Hero Slide Showcase Auto-Interval
  initHeroSlider();
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. SCROLL REVEAL ANIMATION SYSTEM
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal only once for premium organic experience
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Trigger when 15% of element is in viewport
    rootMargin: "0px 0px -40px 0px"
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. MILESTONE COUNTERS ANIMATION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initCounters() {
  const counterSection = document.querySelector(".counters-section");
  const counters = document.querySelectorAll(".counter-value");
  if (!counterSection || counters.length === 0) return;

  let started = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"));
      const suffix = counter.getAttribute("data-suffix") || "";
      let count = 0;
      const speed = 2000 / target; // Animate over exactly 2 seconds

      const updateCount = () => {
        count += Math.ceil(target / 100);
        if (count >= target) {
          counter.innerText = target + suffix;
        } else {
          counter.innerText = count + suffix;
          setTimeout(updateCount, 15);
        }
      };

      updateCount();
    });
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        startCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterObserver.observe(counterSection);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. ACADEMICS TABS CONTROLLER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initAcademicsTabs() {
  const tabContainer = document.querySelector(".academics-tabs-container");
  if (!tabContainer) return;

  const tabBtns = tabContainer.querySelectorAll(".tab-btn");
  const tabPanels = tabContainer.querySelectorAll(".academics-tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetPanelId = btn.getAttribute("data-tab");

      // Set button active
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.add("active");
      btn.classList.add("active");

      // Crossfade panels
      tabPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.style.opacity = "0";
          panel.classList.add("active");
          setTimeout(() => {
            panel.style.transition = "opacity 0.4s ease";
            panel.style.opacity = "1";
          }, 50);
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. ADMISSIONS ACCORDIONS (FAQs)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initFAQs() {
  const faqItems = document.querySelectorAll(".accordion-item");
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items first for neatness
      faqItems.forEach(otherItem => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-content").style.maxHeight = "0";
      });

      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. PHOTO GALLERY MASONRY & LIGHTBOX
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initGallerySystem() {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // A. Category Filter
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-filter");

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (selectedCategory === "all" || itemCategory === selectedCategory) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // B. Custom Lightbox popup
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `
    <div class="lightbox-content-wrapper">
      <button class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>
      <img src="" alt="Popup Preview" class="lightbox-img">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector(".gallery-item-img").src;
      const imgTitle = item.querySelector("h4").innerText;
      const imgCategory = item.querySelector("p").innerText;

      lightboxImg.src = imgSrc;
      lightboxCaption.innerHTML = `<strong>${imgTitle}</strong> • <span style="color:var(--color-gold-light);">${imgCategory}</span>`;
      
      lightbox.classList.add("active");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. CONTACT / ADMISSION FORM VALIDATIONS & SUCCESS MODALS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initFormValidation() {
  const forms = document.querySelectorAll(".validated-form");
  if (forms.length === 0) return;

  // Append Dynamic Modal to body if not already present
  if (!document.getElementById("admissions-success-modal")) {
    const modalHTML = `
      <div class="modal-overlay" id="admissions-success-modal">
        <div class="success-modal">
          <div class="modal-success-icon">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h2 style="margin-bottom:12px; font-family:var(--font-heading); color:var(--color-primary-dark);">Submitted Successfully</h2>
          <p style="color:var(--color-text-muted); margin-bottom:30px; font-size:0.95rem;">
            Thank you for reaching out to International Delhi Public School, Nidagundi. Your enquiry has been registered. Our admissions counselor will contact you within 24 hours.
          </p>
          <button class="btn btn-green" id="closeSuccessModal" style="width:100%;">Continue</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  const successModal = document.getElementById("admissions-success-modal");
  const closeBtn = document.getElementById("closeSuccessModal");

  closeBtn.addEventListener("click", () => {
    successModal.classList.remove("active");
  });

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Check generic inputs
      let isValid = true;
      const inputs = form.querySelectorAll(".form-control[required]");
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#E53E3E";
        } else {
          input.style.borderColor = "var(--color-border)";
        }
      });

      // Special check for mobile number length
      const phoneInput = form.querySelector("input[type='tel']");
      if (phoneInput && phoneInput.value.trim().length < 10) {
        isValid = false;
        phoneInput.style.borderColor = "#E53E3E";
        alert("Please enter a valid 10-digit mobile number.");
      }

      if (isValid) {
        // Trigger Popup
        successModal.classList.add("active");
        form.reset(); // clear inputs
      }
    });
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. HERO MULTI-SLIDESHOW CYCLER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length <= 1) return;

  let currentIdx = 0;
  const slideInterval = 5000; // Change campus slide every 5 seconds

  setInterval(() => {
    slides[currentIdx].classList.remove("active");
    currentIdx = (currentIdx + 1) % slides.length;
    slides[currentIdx].classList.add("active");
  }, slideInterval);
}
