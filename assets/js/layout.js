/* 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNATIONAL DELHI PUBLIC SCHOOL, NIDAGUNDI
Shared Layout Dynamic Injector (layout.js)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject CSS Icon CDN (Font Awesome 6) in <head> for crisp branding icons
  if (!document.getElementById("font-awesome-cdn")) {
    const faLink = document.createElement("link");
    faLink.id = "font-awesome-cdn";
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(faLink);
  }

  // 2. Automatically Inject Preloader into body (Checks session storage first)
  injectPreloader();

  // 3. Inject Header Components (Topbar + Sticky Navbar)
  injectHeader();

  // 4. Inject Footer Component
  injectFooter();

  // 5. Inject Floating Buttons (WhatsApp pulsing badge & Back to Top button)
  injectFloaters();

  // 6. Handle Global Scroll Triggers & Loader Completion
  handleGlobalInteractivity();
});

// --- Injections Functions ---

function injectPreloader() {
  // If the user has already loaded a page in this session, skip the preloader entirely
  if (sessionStorage.getItem("idps_loaded")) {
    return;
  }

  const preloaderHTML = `
    <div id="preloader">
      <div class="loader-logo-wrapper">
        <img src="assets/images/logo.svg" alt="IDPS Nidagundi Logo" style="width:100%; height:100%;">
      </div>
      <div class="loader-bar">
        <div class="loader-progress"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", preloaderHTML);
}

function injectHeader() {
  const headerTag = document.querySelector("header");
  if (!headerTag) return;

  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || "index.html";

  // Navigation Structure array for quick single-point modifications
  const navItems = [
    { title: "Home", link: "index.html" },
    { 
      title: "About Us", 
      link: "about.html",
      dropdown: [
        { title: "Our School", link: "about.html#intro" },
        { title: "Vision & Mission", link: "about.html#vision" },
        { title: "Chairman's Message", link: "about.html#chairman" },
        { title: "Principal's Message", link: "about.html#principal" },
        { title: "School Timeline", link: "about.html#timeline" }
      ]
    },
    { title: "Academics", link: "academics.html" },
    { title: "Admissions", link: "admissions.html" },
    { title: "Facilities", link: "facilities.html" },
    { title: "Gallery", link: "gallery.html" },
    { title: "Disclosure", link: "disclosure.html" },
    { 
      title: "More", 
      link: "#",
      dropdown: [
        { title: "News & Events", link: "news.html" },
        { title: "Achievements", link: "achievements.html" },
        { title: "Faculty", link: "faculty.html" },
        { title: "Downloads", link: "downloads.html" },
        { title: "Careers", link: "careers.html" },
        { title: "Transport", link: "transport.html" },
        { title: "Contact Us", link: "contact.html" }
      ]
    }
  ];

  // Construct Nav Menu HTML
  let menuHTML = `<ul class="nav-menu">`;
  navItems.forEach(item => {
    const isDropdown = item.dropdown ? true : false;
    let activeClass = "";
    
    // Check if parent or child inside dropdown matches current file
    if (item.link === pageName) {
      activeClass = "active";
    } else if (isDropdown) {
      const match = item.dropdown.some(sub => sub.link === pageName);
      if (match) activeClass = "active";
    }

    if (isDropdown) {
      menuHTML += `
        <li class="nav-item ${activeClass}">
          <a href="#" class="nav-link">${item.title} <i class="fa-solid fa-angle-down" style="font-size:0.75rem; margin-left:3px;"></i></a>
          <div class="nav-dropdown">
            ${item.dropdown.map(sub => `<a href="${sub.link}" class="nav-dropdown-link">${sub.title}</a>`).join("")}
          </div>
        </li>
      `;
    } else {
      menuHTML += `
        <li class="nav-item ${activeClass}">
          <a href="${item.link}" class="nav-link">${item.title}</a>
        </li>
      `;
    }
  });
  
  // Append mobile-only enquiry button inside the menu drawer list
  menuHTML += `
    <li class="nav-item mobile-only-enquiry" style="margin-top: 20px; width: 100%; text-align: center;">
      <a href="admissions.html#inquiry" class="btn btn-green" style="padding: 10px 24px; font-size: 0.9rem; color: #fff; width: 80%; display: inline-flex; justify-content: center; align-items: center; gap: 8px; margin: 0 auto;">
        <i class="fa-solid fa-paper-plane"></i> Enquire Now
      </a>
    </li>
  `;
  
  menuHTML += `</ul>`;

  const headerContent = `
    <!-- Top Contact Bar -->
    <div class="top-bar">
      <div class="container top-bar-content">
        <div class="top-bar-left">
          <div class="top-bar-item">
            <i class="fa-solid fa-phone"></i>
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
          <div class="top-bar-item">
            <i class="fa-solid fa-envelope"></i>
            <a href="mailto:info@idpsnidagundi.edu.in">info@idpsnidagundi.edu.in</a>
          </div>
          <div class="top-bar-item">
            <i class="fa-solid fa-location-dot"></i>
            <span>Nidagundi, Karnataka, India</span>
          </div>
        </div>
        <div class="top-bar-right">
          <span class="affiliation-notice"><i class="fa-solid fa-certificate" style="color:var(--color-gold);"></i> Affiliated to CBSE</span>
          <div class="social-links">
            <a href="#" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" target="_blank"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Header -->
    <div class="container navbar-container">
      <a href="index.html" class="logo-link">
        <img src="assets/images/logo.svg" alt="IDPS Nidagundi Crest" class="nav-logo">
        <div class="nav-logo-text">
          <h2>INTERNATIONAL DELHI PUBLIC SCHOOL</h2>
          <p>Nidagundi • Affiliated to CBSE</p>
        </div>
      </a>

      <!-- Menu Items -->
      ${menuHTML}

      <!-- Action Button -->
      <a href="admissions.html#inquiry" class="header-enquire-btn-desktop">
        <button class="btn-nav-enquiry"><i class="fa-solid fa-paper-plane" style="margin-right:6px;"></i>Enquire Now</button>
      </a>

      <!-- Hamburger for mobile -->
      <button class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;

  headerTag.innerHTML = headerContent;

  // Bind Hamburger Click Event
  const burgerBtn = headerTag.querySelector(".hamburger");
  const navMenu = headerTag.querySelector(".nav-menu");
  const navItemDropdowns = headerTag.querySelectorAll(".nav-item");

  const toggleMobileMenu = () => {
    navMenu.classList.toggle("active");
    burgerBtn.classList.toggle("active");
    const spans = burgerBtn.querySelectorAll("span");
    if (burgerBtn.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  };

  burgerBtn.addEventListener("click", toggleMobileMenu);

  // Mobile Click to open dropdowns
  navItemDropdowns.forEach(item => {
    const parentLink = item.querySelector(".nav-link");
    const dropdown = item.querySelector(".nav-dropdown");
    if (dropdown) {
      parentLink.addEventListener("click", (e) => {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          item.classList.toggle("active-dropdown");
        }
      });
    }
  });

  // Auto-close menu when clicking non-dropdown links on mobile
  const allNavLinks = headerTag.querySelectorAll(".nav-menu a");
  allNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // If clicking a real navigation target on mobile, close the menu
      if (window.innerWidth <= 991) {
        const href = link.getAttribute("href");
        if (href && href !== "#") {
          toggleMobileMenu();
        }
      }
    });
  });
}

function injectFooter() {
  const footerTag = document.querySelector("footer");
  if (!footerTag) return;

  const footerContent = `
    <div class="container footer-grid">
      <!-- About School Col -->
      <div class="footer-col">
        <div class="footer-about-logo">
          <img src="assets/images/logo.svg" alt="IDPS Nidagundi crest" class="footer-logo-img">
          <div class="footer-logo-text">
            <h2>INTERNATIONAL DELHI PUBLIC SCHOOL</h2>
            <p>Nidagundi • Affiliated to CBSE</p>
          </div>
        </div>
        <p>IDPS Nidagundi is a world-class premium institution providing high-quality educational frameworks, encouraging holistic learning, values, character build, and physical intelligence.</p>
        <div class="social-links" style="gap:16px;">
          <a href="#" style="width:34px; height:34px; font-size:1rem;"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" style="width:34px; height:34px; font-size:1rem;"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" style="width:34px; height:34px; font-size:1rem;"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" style="width:34px; height:34px; font-size:1rem;"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>

      <!-- Quick Nav Links -->
      <div class="footer-col">
        <h3>Quick Navigation</h3>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="academics.html">Academics</a></li>
          <li><a href="admissions.html">Admissions</a></li>
          <li><a href="facilities.html">Facilities</a></li>
          <li><a href="disclosure.html">Mandatory Disclosures</a></li>
        </ul>
      </div>

      <!-- Essential Utilities -->
      <div class="footer-col">
        <h3>Resources</h3>
        <ul class="footer-links">
          <li><a href="gallery.html">Photo Gallery</a></li>
          <li><a href="news.html">News & Events</a></li>
          <li><a href="achievements.html">School Milestones</a></li>
          <li><a href="faculty.html">Our Teachers</a></li>
          <li><a href="downloads.html">Downloads Directory</a></li>
          <li><a href="careers.html">Join Our Faculty</a></li>
        </ul>
      </div>

      <!-- Primary Contacts -->
      <div class="footer-col">
        <h3>Contact Admissions</h3>
        <div class="footer-contact-item">
          <i class="fa-solid fa-map-pin"></i>
          <span>IDPS Campus, NH-50 Road, Nidagundi, Bagalkot District, Karnataka - 586213, India</span>
        </div>
        <div class="footer-contact-item">
          <i class="fa-solid fa-phone-volume"></i>
          <span>+91 98765 43210<br>+91 98765 43211</span>
        </div>
        <div class="footer-contact-item">
          <i class="fa-solid fa-envelope-open-text"></i>
          <span>admissions@idpsnidagundi.edu.in</span>
        </div>
      </div>
    </div>

    <!-- Sub Footer copyrights -->
    <div class="container footer-bottom">
      <p>© 2026 International Delhi Public School, Nidagundi. All Rights Reserved. Affiliation No: 1234567 (CBSE).</p>
      <p>Designed with Excellence | <a href="disclosure.html" style="color:var(--color-gold-light); font-weight:600;">CBSE Mandatory Disclosure</a></p>
    </div>
  `;

  footerTag.innerHTML = footerContent;
}

function injectFloaters() {
  const floatersHTML = `
    <!-- Floating WhatsApp Widget -->
    <a href="https://wa.me/919876543210?text=Hello%20IDPS%20Nidagundi%20Admissions%20Office%2C%20I%20am%20interested%20in%20seeking%20admission." 
       target="_blank" 
       class="floating-whatsapp" 
       title="Chat with Admissions Office">
      <i class="fa-brands fa-whatsapp"></i>
    </a>

    <!-- Back to top trigger button -->
    <div class="back-to-top" id="scrollTopBtn" title="Scroll to Top">
      <i class="fa-solid fa-chevron-up"></i>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", floatersHTML);
}

function handleGlobalInteractivity() {
  const preloader = document.getElementById("preloader");
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // 1. Terminate Preloader
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        sessionStorage.setItem("idps_loaded", "true"); // Flag session as loaded
      }, 400); // Small premium delay to witness logo animation
    });

    // Backup in case load event takes too long due to heavy assets
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      sessionStorage.setItem("idps_loaded", "true");
    }, 3000);
  }

  // 2. Handle Scroll listeners
  window.addEventListener("scroll", () => {
    // Header shadow and padding adjustment
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Back to top button visibility toggle
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  // 3. Scroll to top button functionality
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}



