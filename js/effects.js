/*!
 * LearnSEO Hub — effects.js  v2.0
 * ─────────────────────────────────────────────────────────────────
 * Versiune curată — fără particule, fără 3D agresiv.
 * Doar efecte discrete care ajută UX-ul:
 *   1. Scroll reveal — elemente apar lin la scroll
 *   2. Card hover   — ridicare subtilă (fără tilt 3D)
 *   3. Page transitions — fade smooth între pagini
 * ─────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ───────────────────────────────────────── */
  function initScrollReveal() {
    var style = document.createElement('style');
    style.textContent =
      '.lsh-reveal{opacity:0;transform:translateY(22px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}' +
      '.lsh-reveal.visible{opacity:1!important;transform:none!important}';
    document.head.appendChild(style);

    var els = document.querySelectorAll(
      '.cd,.sh,.hero-cta,.hero-stats,.feature-card,.tool-card,.blog-card,.stat-item,.cta-section'
    );

    els.forEach(function (el, i) {
      el.classList.add('lsh-reveal');
      el.style.transitionDelay = ((i % 4) * 0.07) + 's';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── 2. CARD HOVER — ridicare subtilă, fără tilt 3D ────────── */
  function initCardHover() {
    var style = document.createElement('style');
    style.textContent =
      '.cd,.tool-card,.blog-card,.feature-card,.ts-item,.start-step{' +
        'transition:transform .2s ease,box-shadow .2s ease}' +
      '.cd:hover,.tool-card:hover,.blog-card:hover,.feature-card:hover,.ts-item:hover,.start-step:hover{' +
        'transform:translateY(-4px);' +
        'box-shadow:0 16px 40px rgba(0,0,0,.16)}';
    document.head.appendChild(style);
  }

  /* ── 2.5. MAGNETIC HOVER — cardurile se "magnetizează" spre cursor ─── */
  function initMagneticHover() {
    var cards = document.querySelectorAll('.cd, .ts-item, .blog-card, .start-step');
    
    cards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        
        // Magnetic effect: 5% movement towards cursor (subtle!)
        card.style.transform = 'translate3d(' + (x * 0.05) + 'px, ' + (y * 0.05 - 6) + 'px, 0)';
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
    });
  }

  /* ── 3. PAGE TRANSITIONS — fade smooth ─────────────────────── */
  function initPageTransitions() {
    var overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:99999;' +
      'background:var(--bg,#0d1117);' +
      'pointer-events:none;opacity:0;' +
      'transition:opacity .28s ease';
    document.body.appendChild(overlay);

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto') || href.startsWith('javascript') ||
          link.target === '_blank') return;
      e.preventDefault();
      overlay.style.opacity = '1';
      setTimeout(function () { window.location.href = href; }, 280);
    });

    window.addEventListener('pageshow', function () {
      overlay.style.opacity = '0';
    });
  }

  /* ── BOOT ───────────────────────────────────────────────────── */
  function boot() {
    initScrollReveal();
    initCardHover();
    initMagneticHover(); // 🆕 Magnetic hover effect
    initPageTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
