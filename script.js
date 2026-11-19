document.addEventListener('DOMContentLoaded', () => {
  /* =========================================================
     1. Multi-Artboard View Router (?view=artboard4 / ?view=artboard5)
        Supports Interactions #2 and #4 opening in a new browser tab
     ========================================================= */
  const params = new URLSearchParams(window.location.search);
  const activeView = params.get('view');

  const topNav = document.getElementById('top-nav');
  const mainLanding = document.getElementById('main-landing-view');
  const artboard4View = document.getElementById('artboard-4-view');
  const artboard5View = document.getElementById('artboard-5-view');

  if (activeView === 'artboard4') {
    document.title = 'Our Purpose — New Balance Concept';
    topNav.classList.add('hidden');
    mainLanding.classList.add('hidden');
    artboard4View.classList.remove('hidden');
  } else if (activeView === 'artboard5') {
    document.title = 'Gallery & Shoe History — New Balance Concept';
    topNav.classList.add('hidden');
    mainLanding.classList.add('hidden');
    artboard5View.classList.remove('hidden');
  }

  /* =========================================================
     2. Mobile Navigation Toggle
     ========================================================= */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const primaryNav = document.getElementById('primary-nav');

  if (mobileMenuBtn && primaryNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================================
     3. Interaction #6: Click-to-Zoom Lightbox Modal
        Applies to all .zoomable-img elements (excludes Artboard #3)
     ========================================================= */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('.zoomable-img');

  let lastFocusedElement = null;

  function openLightbox(imgEl) {
    lastFocusedElement = document.activeElement;
    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxCaption.textContent = imgEl.dataset.caption || imgEl.alt;
    lightboxModal.classList.remove('hidden');
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightboxModal.classList.add('hidden');
    lightboxImg.src = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  zoomableImages.forEach((img) => {
    // Double-check exclusion of anything inside #artboard-3
    if (img.closest('#artboard-3')) return;

    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img);
    });

    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  /* =========================================================
     4. Visual Simulation Feedback (Search & Profile Icons)
     ========================================================= */
  const simToast = document.getElementById('sim-toast');
  const searchBtn = document.getElementById('search-sim-btn');
  const accountBtn = document.getElementById('account-sim-btn');
  let toastTimer = null;

  function showToast(message) {
    simToast.textContent = message;
    simToast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      simToast.classList.remove('visible');
    }, 2600);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      showToast('Search bar is a visual placeholder in this prototype.');
    });
  }

  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      showToast('Account sign-in is a visual placeholder in this prototype.');
    });
  }
});
