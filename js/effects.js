/*!
 * LearnSEO Hub — effects.js  v1.0
 * ─────────────────────────────────────────────────────────────────
 * 4 efecte vizuale pentru homepage:
 *   1. Canvas particles (stele/noduri 3D conectate)
 *   2. Scroll reveal (animații la scroll)
 *   3. Card tilt 3D (hover pe carduri)
 *   4. Page transitions (smooth între pagini)
 *
 * Cum se adaugă în index.html:
 *   <script src="./js/effects.js"></script>  — ÎNAINTE de </body>
 * ─────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     1. CANVAS PARTICLES — rețea de noduri conectate, animată
     ══════════════════════════════════════════════════════════════ */
  function initParticles() {
    var canvas = document.createElement('canvas');
    canvas.id = 'lsh-particles';
    canvas.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'width:100%', 'height:100%',
      'pointer-events:none', 'z-index:0', 'opacity:0.55'
    ].join(';');

    /* Inserăm ca primul copil din body */
    document.body.insertBefore(canvas, document.body.firstChild);

    var ctx = canvas.getContext('2d');
    var W, H, particles, mouse = { x: -9999, y: -9999 };

    var PARTICLE_COUNT = Math.min(80, Math.floor(window.innerWidth / 18));
    var CONNECTION_DIST = 140;
    var MOUSE_DIST = 180;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function getColor() {
      /* Citim tema curentă pentru culori corecte */
      var dark = document.documentElement.getAttribute('data-theme') !== 'light';
      return dark
        ? { r: 99, g: 158, b: 255 }   /* albastru deschis pe dark */
        : { r: 37, g: 99, b: 235 };   /* albastru pe light */
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: Math.random() * 1.8 + 0.8,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var c = getColor();

      particles.forEach(function (p) {
        /* Mișcare */
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        /* Bounce */
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        /* Atracție mouse */
        var dx = mouse.x - p.x, dy = mouse.y - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          p.x += dx * 0.012;
          p.y += dy * 0.012;
        }

        /* Desenăm nodul */
        var radius = p.r + Math.sin(p.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0.8)';
        ctx.fill();
      });

      /* Conexiuni */
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var a = particles[i], b = particles[j];
          var ddx = a.x - b.x, ddy = a.y - b.y;
          var d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONNECTION_DIST) {
            var alpha = (1 - d / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + alpha + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', function () { resize(); createParticles(); });
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });
  }


  /* ══════════════════════════════════════════════════════════════
     2. SCROLL REVEAL — elemente apar elegant la scroll
     ══════════════════════════════════════════════════════════════ */
  function initScrollReveal() {
    var style = document.createElement('style');
    style.textContent = [
      '.lsh-reveal{opacity:0;transform:translateY(32px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1)}',
      '.lsh-reveal.lsh-reveal-left{transform:translateX(-40px)}',
      '.lsh-reveal.lsh-reveal-right{transform:translateX(40px)}',
      '.lsh-reveal.lsh-reveal-scale{transform:scale(.93)}',
      '.lsh-reveal.visible{opacity:1!important;transform:none!important}'
    ].join('');
    document.head.appendChild(style);

    /* Aplicăm clasa pe toate cardurile, secțiunile, hero elements */
    var selectors = [
      '.cd', '.sh', '.hero-cta', '.hero-stats',
      '.feature-card', '.tool-card', '.blog-card',
      '.stat-item', '.section-header', '.cta-section',
      'section > .wrap > *'
    ];

    var elements = document.querySelectorAll(selectors.join(','));

    elements.forEach(function (el, i) {
      el.classList.add('lsh-reveal');
      /* Alternăm direcțiile pentru efect de adâncime */
      if (i % 3 === 1) el.classList.add('lsh-reveal-left');
      if (i % 3 === 2) el.classList.add('lsh-reveal-right');
      el.style.transitionDelay = ((i % 4) * 0.08) + 's';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }


  /* ══════════════════════════════════════════════════════════════
     3. CARD TILT 3D — perspectivă 3D la hover pe carduri
     ══════════════════════════════════════════════════════════════ */
  function initCardTilt() {
    var style = document.createElement('style');
    style.textContent = [
      '.cd,.tool-card,.blog-card,.feature-card{',
      'transition:transform .18s ease,box-shadow .18s ease;',
      'transform-style:preserve-3d;will-change:transform}',
      '.cd:hover,.tool-card:hover,.blog-card:hover,.feature-card:hover{',
      'box-shadow:0 24px 60px rgba(0,0,0,.22),0 0 0 1px rgba(99,158,255,.18)}'
    ].join('');
    document.head.appendChild(style);

    function onMove(e) {
      var card = e.currentTarget;
      var rect = card.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) / (rect.width / 2);
      var dy = (e.clientY - cy) / (rect.height / 2);
      var tiltX = dy * -9;   /* max 9 grade */
      var tiltY = dx * 9;
      card.style.transform = [
        'perspective(800px)',
        'rotateX(' + tiltX + 'deg)',
        'rotateY(' + tiltY + 'deg)',
        'scale3d(1.025,1.025,1.025)'
      ].join(' ');
    }

    function onLeave(e) {
      e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    }

    var cards = document.querySelectorAll('.cd,.tool-card,.blog-card,.feature-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }


  /* ══════════════════════════════════════════════════════════════
     4. PAGE TRANSITIONS — fade smooth la navigare
     ══════════════════════════════════════════════════════════════ */
  function initPageTransitions() {
    var overlay = document.createElement('div');
    overlay.id = 'lsh-transition';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:99999',
      'background:var(--bg,#0d1117)',
      'pointer-events:none',
      'opacity:0',
      'transition:opacity .32s cubic-bezier(.4,0,.2,1)'
    ].join(';');
    document.body.appendChild(overlay);

    /* Fade in la load */
    requestAnimationFrame(function () {
      overlay.style.opacity = '0';
    });

    /* Fade out → navigare → fade in */
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;

      var href = link.getAttribute('href');
      /* Ignorăm: anchore, externe, mailto, js */
      if (!href || href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto') || href.startsWith('javascript') ||
          link.target === '_blank') return;

      e.preventDefault();
      overlay.style.opacity = '1';

      setTimeout(function () {
        window.location.href = href;
      }, 320);
    });

    /* Fade in când pagina se încarcă */
    window.addEventListener('pageshow', function () {
      overlay.style.opacity = '0';
    });
  }


  /* ══════════════════════════════════════════════════════════════
     5. CURSOR CUSTOM — punct albastru care urmărește mouse-ul
     ══════════════════════════════════════════════════════════════ */
  function initCursor() {
    /* Doar pe desktop */
    if (window.matchMedia('(pointer:coarse)').matches) return;

    var dot = document.createElement('div');
    dot.style.cssText = [
      'position:fixed', 'width:8px', 'height:8px',
      'border-radius:50%', 'background:#2563eb',
      'pointer-events:none', 'z-index:99998',
      'transition:transform .12s ease,opacity .2s',
      'transform:translate(-50%,-50%)',
      'mix-blend-mode:screen'
    ].join(';');

    var ring = document.createElement('div');
    ring.style.cssText = [
      'position:fixed', 'width:32px', 'height:32px',
      'border-radius:50%', 'border:1.5px solid rgba(99,158,255,.5)',
      'pointer-events:none', 'z-index:99997',
      'transition:transform .22s ease,width .22s,height .22s,border-color .2s',
      'transform:translate(-50%,-50%)'
    ].join(';');

    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.body.style.cursor = 'none';

    var mx = 0, my = 0;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      ring.style.left = mx + 'px';
      ring.style.top = my + 'px';
    });

    /* Ring se mărește pe hover la linkuri/butoane */
    document.querySelectorAll('a,button,.cd').forEach(function (el) {
      el.style.cursor = 'none';
      el.addEventListener('mouseenter', function () {
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = 'rgba(99,158,255,.9)';
        dot.style.transform = 'translate(-50%,-50%) scale(1.6)';
      });
      el.addEventListener('mouseleave', function () {
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(99,158,255,.5)';
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }


  /* ══════════════════════════════════════════════════════════════
     BOOT — pornim totul după DOMContentLoaded
     ══════════════════════════════════════════════════════════════ */
  function boot() {
    initParticles();
    initScrollReveal();
    initCardTilt();
    initPageTransitions();
    initCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
