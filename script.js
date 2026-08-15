'use strict';

// ─── Register GSAP plugins ─────────────────────────────────────
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


// ─── Scroll progress bar ──────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = Math.min(scrolled, 100) + '%';
  }, { passive: true });
}

// ─── Header glassmorphism on scroll ──────────────────────────
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const isScrolled = window.scrollY > 60;
  header?.classList.toggle('scrolled', isScrolled);
  backToTop?.classList.toggle('visible', isScrolled);
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Dark theme default
document.documentElement.setAttribute('data-theme', 'dark');

// ─── Mobile menu (hamburger morph → X, stagger reveal) ───────
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
let menuOpen = false;

function toggleMenu(state) {
  menuOpen = state;
  hamburger?.classList.toggle('open', menuOpen);
  mobileMenu?.classList.toggle('open', menuOpen);
  hamburger?.setAttribute('aria-expanded', String(menuOpen));
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

hamburger?.addEventListener('click', () => toggleMenu(!menuOpen));
mobileCloseBtn?.addEventListener('click', () => toggleMenu(false));

// Close on link click or backdrop
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuOpen) {
    toggleMenu(false);
    hamburger?.focus();
  }
});

// ─── Hero Carousel (Magarigawa Club style) ────────────────────
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let carouselInterval;

function goToSlide(index) {
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.setAttribute('aria-selected', 'false');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
  dots[currentSlide]?.setAttribute('aria-selected', 'true');
}

function startCarousel() {
  stopCarousel();
  carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 5500);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { stopCarousel(); goToSlide(i); startCarousel(); });
  dot.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stopCarousel(); goToSlide(i); startCarousel(); }
  });
});

// Pause on hover — accessibility
const heroEl = document.getElementById('hero');
heroEl?.addEventListener('mouseenter', stopCarousel);
heroEl?.addEventListener('mouseleave', startCarousel);

// ─── Hero carousel — Swipe / Pointer Events (Apple: 1:1 tracking) ──
let _swipeStartX = 0;
let _swipeStartY = 0;
let _swipeActive = false;

if (heroEl) {
  heroEl.addEventListener('pointerdown', (e) => {
    _swipeStartX = e.clientX;
    _swipeStartY = e.clientY;
    _swipeActive = true;
  }, { passive: true });

  heroEl.addEventListener('pointerup', (e) => {
    if (!_swipeActive) return;
    _swipeActive = false;
    const dx = e.clientX - _swipeStartX;
    const dy = e.clientY - _swipeStartY;
    // Only trigger if horizontal swipe dominates (> 50px, > 1.5× vertical)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      stopCarousel();
      goToSlide(dx < 0 ? currentSlide + 1 : currentSlide - 1);
      startCarousel();
    }
  }, { passive: true });

  heroEl.addEventListener('pointercancel', () => { _swipeActive = false; }, { passive: true });
}

// Respect prefers-reduced-motion — don't auto-advance
const _prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!_prefersReducedMotion) {
  startCarousel();
}

// ─── Countdown Timer ──────────────────────────────────────────
const EVENT_DATE = new Date('2026-05-23T08:00:00');
const cdDays  = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMin   = document.getElementById('cd-min');
const cdSec   = document.getElementById('cd-sec');

function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

function updateCountdown() {
  const diff = EVENT_DATE - Date.now();
  if (diff <= 0) {
    [cdDays, cdHours, cdMin, cdSec].forEach(el => { if (el) el.textContent = '00'; });
    return;
  }
  if (cdDays)  cdDays.textContent  = pad(Math.floor(diff / 86400000));
  if (cdHours) cdHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
  if (cdMin)   cdMin.textContent   = pad(Math.floor((diff % 3600000) / 60000));
  if (cdSec)   cdSec.textContent   = pad(Math.floor((diff % 60000) / 1000));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ─── Events filter tabs ────────────────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-tab');
const eventCards  = document.querySelectorAll('.event-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    eventCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('visible-card', match);
    });
  });
});

// ─── Event Card Image Carousel (Supermoto & more) ────────────
function initCardCarousels() {
  document.querySelectorAll('.card-carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    if (slides.length <= 1) return;

    let current = 0;
    let timer = null;

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(() => goTo(current + 1), 3600);
    }

    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    prevBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(current - 1);
      startTimer();
    });

    nextBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(current + 1);
      startTimer();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goTo(idx);
        startTimer();
      });
    });

    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    startTimer();
  });
}
initCardCarousels();

// ─── Track SVG — historic / modern toggle ─────────────────────
const btnModern  = document.getElementById('btn-modern');
const btnHistoric = document.getElementById('btn-historic');
const trackSVGRoot = document.getElementById('track-svg-root');

function setTrackMode(mode) {
  const isHistoric = mode === 'historic';
  trackSVGRoot?.classList.toggle('show-historic', isHistoric);
  btnModern?.classList.toggle('active', !isHistoric);
  btnModern?.setAttribute('aria-pressed', String(!isHistoric));
  btnHistoric?.classList.toggle('active', isHistoric);
  btnHistoric?.setAttribute('aria-pressed', String(isHistoric));
}

btnModern?.addEventListener('click',  () => setTrackMode('modern'));
btnHistoric?.addEventListener('click', () => setTrackMode('historic'));

// ─── Track SVG hotspot tooltips & touch interaction ───────────
const hotspots   = document.querySelectorAll('.track-hotspot');
const tooltipFO  = document.getElementById('track-tooltip');
const tooltipTxt = document.getElementById('track-tooltip-text');
const mobileInfo = document.getElementById('track-mobile-info');

function showHotspotInfo(hs) {
  const tip = hs.dataset.tip;
  const raw = hs.dataset.pos ? hs.dataset.pos.split(',') : [];

  hotspots.forEach(h => h.setAttribute('aria-expanded', 'false'));
  hs.setAttribute('aria-expanded', 'true');

  if (tip && tooltipFO && tooltipTxt) {
    tooltipTxt.textContent = tip;
    tooltipFO.style.opacity = '1';
    if (raw.length >= 2) {
      tooltipFO.setAttribute('x', Math.max(10, Math.min(310, parseFloat(raw[0]) - 70)));
      tooltipFO.setAttribute('y', Math.max(10, parseFloat(raw[1]) - 52));
    }
  }

  if (mobileInfo && tip) {
    mobileInfo.textContent = '📍 ' + tip;
    mobileInfo.classList.add('active');
  }
}

hotspots.forEach(hs => {
  hs.addEventListener('mouseenter', () => showHotspotInfo(hs));
  hs.addEventListener('mouseleave', () => {
    if (tooltipFO) tooltipFO.style.opacity = '0';
  });

  // Touch and click support for smartphones & tablets
  const handleTouchClick = (e) => {
    e.stopPropagation();
    showHotspotInfo(hs);
  };

  hs.addEventListener('click', handleTouchClick);
  hs.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleTouchClick(e);
  }, { passive: false });

  hs.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showHotspotInfo(hs);
    }
  });
});

// Dismiss mobile info / tooltip when tapping outside
document.addEventListener('click', () => {
  if (tooltipFO) tooltipFO.style.opacity = '0';
  if (mobileInfo) mobileInfo.classList.remove('active');
});

// ─── Language toggle ──────────────────────────────────────────
const langBtns = document.querySelectorAll('.lang-toggle button');
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.textContent.trim();
    langBtns.forEach(b => {
      const match = b.textContent.trim() === lang;
      b.classList.toggle('active', match);
      b.setAttribute('aria-pressed', String(match));
    });
  });
});

// ─── Scroll reveal — IntersectionObserver (GPU-safe) ─────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── GSAP scroll animations ───────────────────────────────────
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

  // Hero title — cinematic entrance
  gsap.from('#hero-title', {
    opacity: 0,
    y: 80,
    duration: 1.4,
    ease: 'expo.out',
    delay: 0.25
  });

  gsap.from('.hero-sub', {
    opacity: 0,
    y: 30,
    duration: 1.1,
    ease: 'expo.out',
    delay: 0.55
  });

  gsap.from('.hero-actions', {
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: 'expo.out',
    delay: 0.8
  });

  // Events cards stagger
  gsap.from('.event-card.visible-card', {
    opacity: 0,
    y: 32,
    duration: 0.6,
    stagger: 0.07,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '#events',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Parallax hero — GPU-safe (transform only)
  gsap.to('.hero-slide.active img', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });

  // Refresh ScrollTrigger on window resize (orientation change on mobile)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
}

