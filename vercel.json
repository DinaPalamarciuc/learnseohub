/*!
 * LearnSEO Hub — site.js  v1.0
 * ─────────────────────────────────────────────────────────────────
 * Fișier UNIC pentru navbar, footer, temă și scroll.
 * Dacă vrei să modifici navigarea sau footer-ul, editezi DOAR ACEST FIȘIER.
 *
 * Cum se folosește în fiecare pagină HTML:
 *   1. Pune <script src="/js/site.js"></script> ca PRIMUL element din <body>
 *   2. La finalul paginii, înaintea </body>, pune:
 *        <div id="site-footer"></div>
 *        <button class="btt" id="btt" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>
 *   3. Elimină vechiul bloc <nav>, <div class="mobile-menu">, <footer> și scriptul inline
 * ─────────────────────────────────────────────────────────────────
 */

(function () {

  /* ── 1. RESTORE THEME (instant, no flash) ──────────────────── */
  var savedTheme = localStorage.getItem('lsh-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);


  /* ── 2. NAV HTML ────────────────────────────────────────────── */
  var NAV_HTML = '<nav class="navbar">'
    + '<div class="wrap" style="display:flex;align-items:center;justify-content:space-between">'

    /* Logo */
    + '<a href="/" class="logo">'
    + '<svg width="28" height="28" viewBox="0 0 40 40"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">'
    + '<stop offset="0%" stop-color="#2563eb"/><stop offset="100%" stop-color="#7c3aed"/>'
    + '</linearGradient></defs>'
    + '<rect width="40" height="40" rx="8" fill="url(#lg)"/>'
    + '<circle cx="17" cy="17" r="8" stroke="#fff" stroke-width="2.5" fill="none"/>'
    + '<line x1="23" y1="23" x2="30" y2="30" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>'
    + '<path d="M12 20 L15 14 L18 17 L22 11" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
    + '</svg>LearnSEO <span style="color:var(--accent)">Hub</span></a>'

    /* Desktop links */
    + '<div class="nav-links">'
    + '<a class="nav-link" href="/blog">Blog</a>'
    + '<a class="nav-link" href="/tools">Tools</a>'
    + '<a class="nav-link" href="/downloads">Downloads</a>'
    + '<a class="nav-link" href="/guides">Guides</a>'

    /* Resources dropdown */
    + '<div class="nav-dd"><div class="nav-link">Resources ▾</div><div class="nav-dd-menu">'
    + '<a class="nav-dd-item" href="/glossary">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>'
    + 'SEO Glossary</a>'
    + '<a class="nav-dd-item" href="/prompts">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>'
    + 'AI Prompts</a>'
    + '<a class="nav-dd-item" href="/compare">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'
    + 'Tool Comparison</a>'
    + '<a class="nav-dd-item" href="/news">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>'
    + 'News &amp; Trends</a>'
    + '<a class="nav-dd-item" href="/career">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
    + 'Career Paths</a>'
    + '<a class="nav-dd-item" href="/faq">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    + 'FAQ</a>'
    + '</div></div>'

    + '<a class="nav-link" href="/about">About</a>'
    + '</div>'

    /* Right side buttons */
    + '<div class="nav-right">'
    + '<button class="theme-btn" onclick="toggleTheme()" id="themeBtn">'
    + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    + '</button>'
    + '<button class="nav-hamburger" onclick="document.getElementById(\'mobileMenu\').classList.toggle(\'open\')">'
    + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">'
    + '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'
    + '</svg></button>'
    + '</div>'

    + '</div></nav>'

    /* Mobile menu */
    + '<div class="mobile-menu" id="mobileMenu">'
    + '<a href="/">Home</a>'
    + '<a href="/blog">Blog</a>'
    + '<a href="/tools">Tools</a>'
    + '<a href="/downloads">Downloads</a>'
    + '<a href="/guides">Guides</a>'
    + '<div class="mm-group">Resources</div>'
    + '<a href="/glossary">SEO Glossary</a>'
    + '<a href="/prompts">AI Prompts</a>'
    + '<a href="/compare">Tool Comparison</a>'
    + '<a href="/news">News &amp; Trends</a>'
    + '<a href="/career">Career Paths</a>'
    + '<a href="/faq">FAQ</a>'
    + '<div class="mm-group">More</div>'
    + '<a href="/about">About</a>'
    + '</div>';


  /* ── 3. FOOTER HTML ─────────────────────────────────────────── */
  var FOOTER_HTML = '<footer class="ft"><div class="wrap"><div class="ft-grid">'
    + '<div class="ft-col"><h4>Learn</h4>'
    + '<a href="/blog">Blog</a><a href="/guides">Guides</a>'
    + '<a href="/downloads">Downloads</a><a href="/glossary">Glossary</a></div>'
    + '<div class="ft-col"><h4>Tools</h4>'
    + '<a href="/tools/serp-previewer">SERP Previewer</a>'
    + '<a href="/tools/schema-generator">Schema Generator</a>'
    + '<a href="/tools/geo-score">GEO Score</a>'
    + '<a href="/tools/content-workflow">Content Workflow</a>'
    + '<a href="/tools/crawl-checker">Crawl Checker</a></div>'
    + '<div class="ft-col"><h4>Resources</h4>'
    + '<a href="/downloads">Downloads</a>'
    + '<a href="/prompts">AI Prompts</a>'
    + '<a href="/compare">Tool Comparison</a>'
    + '<a href="/about">About</a></div>'
    + '</div>'
    + '<div class="ft-bottom">'
    + '<span>© 2026 LearnSEO Hub. Free &amp; open-source.</span>'
    + '<span style="font-size:11px;color:var(--t3)">Built for the AI Search Era</span>'
    + '</div></div></footer>';


  /* ── 4. INJECT NAV (synchronous — no flash) ─────────────────── */
  var tmp = document.createElement('div');
  tmp.innerHTML = NAV_HTML;
  var script = document.currentScript;
  while (tmp.firstChild) {
    script.parentNode.insertBefore(tmp.firstChild, script);
  }


  /* ── 5. DOM READY: footer, active link, scroll ──────────────── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Inject footer */
    var ftEl = document.getElementById('site-footer');
    if (ftEl) ftEl.outerHTML = FOOTER_HTML;

    /* Highlight active nav link */
    var path = window.location.pathname.replace(/\/$/, '') || '/';

    document.querySelectorAll('.nav-link[href], .mobile-menu a[href]').forEach(function (el) {
      var href = (el.getAttribute('href') || '').replace(/\/$/, '') || '/';
      if (path === href || (href !== '/' && path.startsWith(href))) {
        el.classList.add('on');
      }
    });

    /* Back-to-top button */
    window.addEventListener('scroll', function () {
      var btt = document.getElementById('btt');
      if (btt) btt.classList.toggle('show', window.scrollY > 400);
    });

  });


  /* ── 6. GLOBAL: theme toggle ────────────────────────────────── */
  window.toggleTheme = function () {
    var h = document.documentElement;
    var next = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    h.setAttribute('data-theme', next);
    localStorage.setItem('lsh-theme', next);
  };

})();
