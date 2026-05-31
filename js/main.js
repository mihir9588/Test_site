/**
 * Tantronics - Core Site Interactions (UI, Carousels, Filters)
 */

// 1. Mobile Menu Toggle
const burger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

burger?.addEventListener('click', () => {
  const isOpen = mobileMenu.style.display === 'block' || mobileMenu.classList.contains('open');
  if (!isOpen) {
    mobileMenu.style.display = 'block';
    mobileMenu.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  } else {
    mobileMenu.style.display = 'none';
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.style.display = 'none';
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}));

// 2. Dynamic Year in Footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 3. Contact Form Validation + Submission UX
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!statusEl) return;
  
  statusEl.textContent = '';
  if (!form.checkValidity()) {
    statusEl.textContent = 'Please fill required fields.';
    return;
  }
  statusEl.textContent = 'Thanks! Your enquiry has been sent.';
  form.reset();
});

// 4. Component Carousels
// SMPS Carousel
const smpsImgs = document.querySelectorAll('.smps-carousel .smps-img');
if (smpsImgs.length > 0) {
  const smpsPrev = document.querySelector('.smps-prev');
  const smpsNext = document.querySelector('.smps-next');
  let smpsIndex = 0;

  function showSmpsImg(idx) {
    smpsImgs.forEach((img, i) => {
      img.style.display = i === idx ? 'block' : 'none';
    });
  }
  smpsPrev?.addEventListener('click', () => {
    smpsIndex = (smpsIndex - 1 + smpsImgs.length) % smpsImgs.length;
    showSmpsImg(smpsIndex);
  });
  smpsNext?.addEventListener('click', () => {
    smpsIndex = (smpsIndex + 1) % smpsImgs.length;
    showSmpsImg(smpsIndex);
  });
  showSmpsImg(smpsIndex);
}

// WLC Carousel
const wlcImgs = document.querySelectorAll('.wlc-carousel .wlc-img');
if (wlcImgs.length > 0) {
  const wlcPrev = document.querySelector('.wlc-prev');
  const wlcNext = document.querySelector('.wlc-next');
  let wlcIndex = 0;

  function showWlcImg(idx) {
    wlcImgs.forEach((img, i) => {
      img.style.display = i === idx ? 'block' : 'none';
    });
  }
  wlcPrev?.addEventListener('click', () => {
    wlcIndex = (wlcIndex - 1 + wlcImgs.length) % wlcImgs.length;
    showWlcImg(wlcIndex);
  });
  wlcNext?.addEventListener('click', () => {
    wlcIndex = (wlcIndex + 1) % wlcImgs.length;
    showWlcImg(wlcIndex);
  });
  showWlcImg(wlcIndex);
}

// Auto Carousel
const autoImgs = document.querySelectorAll('.auto-carousel .auto-img');
if (autoImgs.length > 0) {
  const autoPrev = document.querySelector('.auto-prev');
  const autoNext = document.querySelector('.auto-next');
  let autoIndex = 0;

  function showAutoImg(idx) {
    autoImgs.forEach((img, i) => {
      img.style.display = i === idx ? 'block' : 'none';
    });
  }
  autoPrev?.addEventListener('click', () => {
    autoIndex = (autoIndex - 1 + autoImgs.length) % autoImgs.length;
    showAutoImg(autoIndex);
  });
  autoNext?.addEventListener('click', () => {
    autoIndex = (autoIndex + 1) % autoImgs.length;
    showAutoImg(autoIndex);
  });
  showAutoImg(autoIndex);
}

// 5. Product Grid Filtering
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    const items = document.querySelectorAll(".product-item");

    items.forEach(item => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.style.display = "block";
        item.classList.add("fade-in");
      } else {
        item.style.display = "none";
      }
    });
  });
});