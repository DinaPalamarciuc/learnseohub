/* ============================================================
   site.js — LearnSEO Hub shared nav + footer
   Inject as FIRST element inside <body> on every page.
   ============================================================ */
(function () {

  /* ── 1. Theme init (before render, no flash) ── */
  const saved = localStorage.getItem('lsh-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  /* ── 2. Active path detection ── */
  function getActivePath() {
    const p = location.pathname.replace(/\/$/, '').replace(/\/index\.html$/, '');
    return p || '/';
  }

  function isActive(href) {
    const p = getActivePath();
    const h = href.replace(/^\.\.\//, '/').replace(/^\.\//, '/').replace(/\/$/, '');
    if (h === '' || h === '/') return p === '' || p === '/';
    return p === h || p.startsWith(h + '/');
  }

  /* ── 3. Resolve relative root ── */
  function root(path) {
    const depth = location.pathname.split('/').filter(Boolean).length;
    const prefix = depth > 1 ? '../' : './';
    return prefix + path;
  }

  /* ── 4. Logo SVG — lightbulb circuit board ── */
  const logoSVG = `
    <svg width="38" height="48" viewBox="0 0 100 125" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bulbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="50%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
      </defs>
      <polygon points="50,4 72,16 84,34 80,56 68,72 60,80 40,80 32,72 20,56 16,34 28,16"
        fill="none" stroke="url(#bulbg)" stroke-width="3" stroke-linejoin="round"/>
      <line x1="50" y1="4" x2="32" y2="72" stroke="url(#bulbg)" stroke-width="1.5" stroke-opacity="0.45"/>
      <line x1="50" y1="4" x2="68" y2="72" stroke="url(#bulbg)" stroke-width="1.5" stroke-opacity="0.45"/>
      <line x1="28" y1="16" x2="72" y2="34" stroke="url(#bulbg)" stroke-width="1.2" stroke-opacity="0.35"/>
      <line x1="72" y1="16" x2="28" y2="34" stroke="url(#bulbg)" stroke-width="1.2" stroke-opacity="0.35"/>
      <line x1="50" y1="44" x2="50" y2="68" stroke="url(#bulbg)" stroke-width="2.2" stroke-linecap="round"/>
      <polyline points="50,52 38,52 38,44" fill="none" stroke="url(#bulbg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="38" cy="44" r="2.5" fill="none" stroke="url(#bulbg)" stroke-width="1.8"/>
      <polyline points="50,48 62,48 62,40" fill="none" stroke="url(#bulbg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="62" cy="40" r="2.5" fill="none" stroke="url(#bulbg)" stroke-width="1.8"/>
      <polyline points="50,44 42,38 36,38" fill="none" stroke="url(#bulbg)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="36" cy="38" r="1.8" fill="#a855f7" fill-opacity="0.8"/>
      <polyline points="50,44 58,36 64,36" fill="none" stroke="url(#bulbg)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="64" cy="36" r="1.8" fill="#06b6d4" fill-opacity="0.8"/>
      <polyline points="50,44 50,32 44,26" fill="none" stroke="url(#bulbg)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="44" cy="26" r="1.8" fill="#6366f1" fill-opacity="0.8"/>
      <polyline points="50,32 56,26" fill="none" stroke="url(#bulbg)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="56" cy="26" r="1.8" fill="#6366f1" fill-opacity="0.8"/>
      <rect x="37" y="80" width="26" height="22" rx="3" fill="none" stroke="url(#bulbg)" stroke-width="2.5"/>
      <line x1="39" y1="87" x2="61" y2="87" stroke="url(#bulbg)" stroke-width="1.8"/>
      <line x1="39" y1="93" x2="61" y2="93" stroke="url(#bulbg)" stroke-width="1.4"/>
      <line x1="39" y1="99" x2="61" y2="99" stroke="url(#bulbg)" stroke-width="1"/>
    </svg>`;

  /* ── 5. Nav HTML ── */
  const nav = document.createElement('div');
  nav.innerHTML = `
<style>
  :root {
    --logo-g1: #2563eb;
    --logo-g2: #7c3aed;
  }
  [data-theme="dark"] {
    --logo-g1: #3b82f6;
    --logo-g2: #8b5cf6;
  }
  /* ── Global top-spacing reset ── */
  .main { padding-top: 0 !important; margin-top: 0 !important; }
  .main > .wrap { padding-top: 40px !important; }
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .nav-logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }
  .nav-logo:hover .nav-logo-icon { transform: scale(1.08); }
  .nav-logo-text {
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: var(--t1);
    white-space: nowrap;
  }
  .nav-logo-text em {
    font-style: normal;
    color: var(--accent);
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    justify-content: center;
  }
  .nav-link {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--t2);
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
    cursor: pointer;
    white-space: nowrap;
  }
  .nav-link:hover { color: var(--t1); background: var(--card); }
  .nav-link.on {
    color: var(--t1);
    font-weight: 800;
    background: color-mix(in srgb, var(--accent) 10%, transparent);
  }
  /* Dropdown */
  .nav-dd { position: relative; }
  .nav-dd-menu {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 8px;
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    z-index: 200;
  }
  .nav-dd:hover .nav-dd-menu,
  .nav-dd:focus-within .nav-dd-menu { display: flex; flex-direction: column; gap: 2px; }
  .nav-dd-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--t2);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .nav-dd-item:hover { background: var(--bg); color: var(--t1); }
  .nav-dd-item svg { width: 15px; height: 15px; flex-shrink: 0; opacity: 0.6; }
  /* Right controls */
  .nav-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .theme-btn {
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--t2);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.15s, border-color 0.15s;
  }
  .theme-btn:hover { color: var(--t1); border-color: var(--accent); }
  /* Hamburger */
  .nav-hamburger {
    display: none;
    width: 36px; height: 36px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--t2);
    cursor: pointer;
    align-items: center; justify-content: center;
  }
  /* Mobile menu */
  .mobile-menu {
    display: none;
    flex-direction: column;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: 12px 24px 20px;
    gap: 2px;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--t2);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .mobile-menu a:hover { background: var(--card); color: var(--t1); }
  .mm-group {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--t3);
    padding: 14px 12px 6px;
  }
  /* BTT */
  .btt {
    position: fixed;
    bottom: 24px; right: 24px;
    width: 42px; height: 42px;
    border-radius: 50%;
    background: var(--t1);
    color: var(--card);
    border: none;
    font-size: 16px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.2s, transform 0.2s;
    z-index: 90;
    display: flex; align-items: center; justify-content: center;
  }
  .btt.show { opacity: 1; transform: translateY(0); }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
  }
</style>

<nav class="navbar" role="navigation" aria-label="Primary">
  <div class="nav-inner">
    <a href="${root('')}" class="nav-logo" aria-label="LearnSEO Hub Homepage">
      <div class="nav-logo-icon">${logoSVG}</div>
      <div class="nav-logo-text">LearnSEO <em>Hub</em></div>
    </a>

    <div class="nav-links" aria-label="Primary Navigation">
      <a class="nav-link" href="${root('blog')}">Blog</a>
      <a class="nav-link" href="${root('tools')}">Tools</a>
      <a class="nav-link" href="${root('downloads')}">Downloads</a>
      <a class="nav-link" href="${root('guides')}">Guides</a>

      <div class="nav-dd">
        <div class="nav-link" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">Resources ▾</div>
        <div class="nav-dd-menu" aria-label="Resources submenu">
          <a class="nav-dd-item" href="${root('glossary')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            SEO Glossary
          </a>
          <a class="nav-dd-item" href="${root('prompts')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            AI Prompts
          </a>
          <a class="nav-dd-item" href="${root('compare')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Tool Comparison
          </a>
          <a class="nav-dd-item" href="${root('news')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            News & Trends
          </a>
          <a class="nav-dd-item" href="${root('career')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Career Paths
          </a>
          <a class="nav-dd-item" href="${root('faq')}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            FAQ
          </a>
        </div>
      </div>

      <a class="nav-link" href="${root('about')}">About</a>
    </div>

    <div class="nav-right">
      <button class="theme-btn" id="themeBtn" aria-label="Toggle dark/light mode" onclick="(function(){const h=document.documentElement;const t=h.getAttribute('data-theme')==='dark'?'light':'dark';h.setAttribute('data-theme',t);localStorage.setItem('lsh-theme',t)})()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="nav-hamburger" aria-label="Open mobile menu" onclick="document.getElementById('lsh-mobile').classList.toggle('open')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</nav>

<div class="mobile-menu" id="lsh-mobile" aria-label="Mobile Navigation">
  <a href="${root('')}">Home</a>
  <a href="${root('blog')}">Blog</a>
  <a href="${root('tools')}">Tools</a>
  <a href="${root('downloads')}">Downloads</a>
  <a href="${root('guides')}">Guides</a>
  <div class="mm-group">Resources</div>
  <a href="${root('glossary')}">SEO Glossary</a>
  <a href="${root('prompts')}">AI Prompts</a>
  <a href="${root('compare')}">Tool Comparison</a>
  <a href="${root('news')}">News & Trends</a>
  <a href="${root('career')}">Career Paths</a>
  <a href="${root('faq')}">FAQ</a>
  <div class="mm-group">More</div>
  <a href="${root('about')}">About</a>
</div>`;

  /* ── 6. Insert nav immediately (no flash) ── */
  document.body.insertBefore(nav, document.body.firstChild);

  /* ── 7. Active link highlight ── */
  document.querySelectorAll('.nav-link[href], .nav-dd-item[href]').forEach(a => {
    if (isActive(a.getAttribute('href'))) {
      a.classList.add('on');
      // if inside dropdown, also mark parent
      const dd = a.closest('.nav-dd');
      if (dd) dd.querySelector('.nav-link')?.classList.add('on');
    }
  });

  /* ── 8. Footer + BTT (after DOM ready) ── */
  document.addEventListener('DOMContentLoaded', () => {
    const ftEl = document.getElementById('site-footer');
    if (ftEl) {
      ftEl.innerHTML = `
<style>
  .ft {
    margin-top: 80px;
    border-top: 1px solid var(--border);
    background: var(--card);
  }
  .ft .wrap { padding: 48px 24px 32px; max-width: 1200px; margin: 0 auto; }
  .ft-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 32px;
    margin-bottom: 40px;
  }
  .ft-col h4 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--t3);
    margin-bottom: 14px;
  }
  .ft-col a {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--t2);
    text-decoration: none;
    padding: 4px 0;
    transition: color 0.15s;
  }
  .ft-col a:hover { color: var(--t1); }
  .ft-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--t3);
  }
</style>
<footer class="ft" role="contentinfo">
  <div class="wrap">
    <div class="ft-grid">
      <div class="ft-col">
        <h4>Learn</h4>
        <a href="${root('blog')}">Blog</a>
        <a href="${root('guides')}">Guides</a>
        <a href="${root('downloads')}">Downloads</a>
        <a href="${root('glossary')}">Glossary</a>
      </div>
      <div class="ft-col">
        <h4>Tools</h4>
        <a href="${root('tools/serp-previewer')}">SERP Previewer</a>
        <a href="${root('tools/schema-generator')}">Schema Generator</a>
        <a href="${root('tools/geo-score')}">GEO Score</a>
        <a href="${root('tools/content-workflow')}">Content Workflow</a>
        <a href="${root('tools/crawl-checker')}">Crawl Checker</a>
      </div>
      <div class="ft-col">
        <h4>Resources</h4>
        <a href="${root('prompts')}">AI Prompts</a>
        <a href="${root('compare')}">Tool Comparison</a>
        <a href="${root('news')}">News & Trends</a>
        <a href="${root('career')}">Career Paths</a>
        <a href="${root('faq')}">FAQ</a>
      </div>
      <div class="ft-col">
        <h4>Company</h4>
        <a href="${root('about')}">About</a>
      </div>
    </div>
    <div class="ft-bottom">
      <span>© 2026 LearnSEO Hub. Free & open-source.</span>
      <span>Built for the AI Search Era 🚀</span>
    </div>
  </div>
</footer>`;
    }

    /* BTT scroll */
    const btt = document.getElementById('btt');
    if (btt) {
      window.addEventListener('scroll', () => {
        btt.classList.toggle('show', window.scrollY > 400);
      }, { passive: true });
    }
  });

})();
