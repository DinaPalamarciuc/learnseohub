/* ============================================================
   site.js — LearnSEO Hub shared nav + footer
   Inject as FIRST element inside <body> on every page.
   ============================================================ */
(function () {

  /* ── 1. Theme init (before render, no flash) ── */
  const saved = localStorage.getItem('lsh-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);


  /* ── Cookie Consent ── */
  const COOKIE_KEY = 'lsh-cookie-consent';

  function lshGetConsent() {
    try { return JSON.parse(localStorage.getItem(COOKIE_KEY)) || null; } catch(e) { return null; }
  }

  function lshSetConsent(analytics) {
    const val = { analytics, date: new Date().toISOString() };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(val));
    document.getElementById('lsh-cookie-banner')?.remove();
    if (analytics) lshLoadAnalytics();
  }

  function lshLoadAnalytics() {
    // Add your GA4 script here once you have a GA4 property
    // Example: const s = document.createElement('script');
    // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX';
    // document.head.appendChild(s);
  }

  window.lshCookieOpen = function() {
    const b = document.getElementById('lsh-cookie-banner');
    if (b) { b.style.display = 'flex'; return; }
    lshShowBanner();
  };

  function lshShowBanner() {
    const consent = lshGetConsent();
    if (consent !== null) return; // already decided

    const banner = document.createElement('div');
    banner.id = 'lsh-cookie-banner';
    banner.innerHTML = \`
      <style>
        #lsh-cookie-banner {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
          background: var(--card); border-top: 1px solid var(--border);
          padding: 16px 24px; display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
          box-shadow: 0 -4px 24px rgba(0,0,0,.08);
        }
        #lsh-cookie-banner p {
          font-size: 13px; color: var(--t2); line-height: 1.5;
          margin: 0; flex: 1; min-width: 240px;
        }
        #lsh-cookie-banner a { color: var(--accent); }
        .lsh-cb-btns { display: flex; gap: 8px; flex-wrap: wrap; flex-shrink: 0; }
        .lsh-cb-accept {
          padding: 9px 20px; background: var(--t1); color: var(--bg);
          border: none; border-radius: 8px; font-weight: 700; font-size: 13px;
          cursor: pointer; font-family: inherit; white-space: nowrap;
        }
        .lsh-cb-reject {
          padding: 9px 20px; background: transparent; color: var(--t2);
          border: 1px solid var(--border); border-radius: 8px; font-weight: 600;
          font-size: 13px; cursor: pointer; font-family: inherit; white-space: nowrap;
        }
        .lsh-cb-reject:hover { border-color: var(--border2); color: var(--t1); }
      </style>
      <p>
        🍪 We use cookies to improve your experience and analyze site usage.
        Essential cookies are always active.
        <a href="./cookies" style="font-weight:700">Cookie Policy</a> ·
        <a href="./privacy" style="font-weight:700">Privacy Policy</a>
      </p>
      <div class="lsh-cb-btns">
        <button class="lsh-cb-reject" onclick="lshSetConsent(false)">Essential Only</button>
        <button class="lsh-cb-accept" onclick="lshSetConsent(true)">Accept All</button>
      </div>
    \`;
    document.body.appendChild(banner);
  }

  // Init cookie consent after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    lshShowBanner();
    const consent = lshGetConsent();
    if (consent?.analytics) lshLoadAnalytics();
  });


  /* ── Cookie Consent (GDPR) ── */
  (function() {
    const COOKIE_KEY = 'lsh_consent';
    const CONSENT_VER = '1';

    function getConsent() {
      try { return JSON.parse(localStorage.getItem(COOKIE_KEY)); } catch(e) { return null; }
    }

    function setConsent(analytics, marketing) {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({
        v: CONSENT_VER, analytics, marketing, date: new Date().toISOString()
      }));
    }

    function applyConsent(consent) {
      if (consent && consent.analytics) {
        // Enable analytics here when you add Google Analytics
        // e.g. load GA script dynamically
      }
    }

    function injectBanner() {
      const style = document.createElement('style');
      style.textContent = `
        #lsh-cookie-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.35);
          z-index: 9998; display: flex; align-items: flex-end;
          justify-content: center; padding: 16px;
          animation: fadeInOverlay 0.3s ease;
        }
        @keyframes fadeInOverlay { from { opacity:0 } to { opacity:1 } }
        #lsh-cookie-box {
          background: var(--card, #fff); color: var(--t1, #1a1a1a);
          border: 1px solid var(--border, #ddd); border-radius: 16px;
          padding: 24px 28px; max-width: 680px; width: 100%;
          box-shadow: 0 8px 40px rgba(0,0,0,0.18);
          animation: slideUp 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity:0 } to { transform: translateY(0); opacity:1 } }
        #lsh-cookie-box h3 {
          font-size: 15px; font-weight: 800; margin-bottom: 8px; color: var(--t1, #1a1a1a);
        }
        #lsh-cookie-box p {
          font-size: 12px; color: var(--t2, #4d4a45); line-height: 1.6; margin-bottom: 16px;
        }
        #lsh-cookie-box p a {
          color: var(--accent, #111); font-weight: 600;
        }
        .lsh-cookie-toggles {
          display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;
        }
        .lsh-toggle {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: var(--t2, #4d4a45);
        }
        .lsh-toggle input[type=checkbox] {
          width: 16px; height: 16px; accent-color: var(--accent, #111);
          cursor: pointer;
        }
        .lsh-toggle.disabled { opacity: 0.5; }
        .lsh-cookie-btns {
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .lsh-btn-accept {
          flex: 1; min-width: 120px; padding: 10px 20px;
          background: var(--t1, #111); color: var(--bg, #fff);
          border: none; border-radius: 10px; font-size: 13px;
          font-weight: 700; cursor: pointer; font-family: inherit;
          transition: opacity 0.2s;
        }
        .lsh-btn-accept:hover { opacity: 0.85; }
        .lsh-btn-custom {
          flex: 1; min-width: 120px; padding: 10px 20px;
          background: transparent; color: var(--t2, #4d4a45);
          border: 1px solid var(--border, #ddd); border-radius: 10px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: border-color 0.2s;
        }
        .lsh-btn-custom:hover { border-color: var(--t1, #111); color: var(--t1, #111); }
        .lsh-btn-reject {
          padding: 10px 16px; background: transparent;
          color: var(--t3, #7a766d); border: none; border-radius: 10px;
          font-size: 12px; font-weight: 600; cursor: pointer;
          font-family: inherit; text-decoration: underline;
        }
        /* Cookie settings button (always visible after close) */
        #lsh-cookie-settings-btn {
          position: fixed; bottom: 72px; left: 16px;
          background: var(--card, #fff); border: 1px solid var(--border, #ddd);
          border-radius: 50%; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; cursor: pointer; z-index: 80;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        #lsh-cookie-settings-btn:hover { transform: scale(1.1); }
      `;
      document.head.appendChild(style);

      const overlay = document.createElement('div');
      overlay.id = 'lsh-cookie-overlay';
      overlay.innerHTML = \`
        <div id="lsh-cookie-box">
          <h3>🍪 We use cookies</h3>
          <p>
            We use essential cookies to make this site work. With your consent, we may also use analytics cookies to understand how you use it.
            Read our <a href="/privacy">Privacy Policy</a> and <a href="/cookies">Cookie Policy</a>.
          </p>
          <div class="lsh-cookie-toggles">
            <label class="lsh-toggle disabled">
              <input type="checkbox" id="lsh-c-essential" checked disabled/>
              Essential (required)
            </label>
            <label class="lsh-toggle">
              <input type="checkbox" id="lsh-c-analytics"/>
              Analytics (optional)
            </label>
            <label class="lsh-toggle">
              <input type="checkbox" id="lsh-c-marketing"/>
              Marketing (optional)
            </label>
          </div>
          <div class="lsh-cookie-btns">
            <button class="lsh-btn-accept" id="lsh-accept-all">Accept All</button>
            <button class="lsh-btn-custom" id="lsh-accept-custom">Save My Choices</button>
            <button class="lsh-btn-reject" id="lsh-reject-all">Reject Optional</button>
          </div>
        </div>
      \`;
      document.body.appendChild(overlay);

      document.getElementById('lsh-accept-all').onclick = function() {
        setConsent(true, true);
        applyConsent({ analytics: true, marketing: true });
        overlay.remove();
        showSettingsBtn();
      };
      document.getElementById('lsh-accept-custom').onclick = function() {
        const a = document.getElementById('lsh-c-analytics').checked;
        const m = document.getElementById('lsh-c-marketing').checked;
        setConsent(a, m);
        applyConsent({ analytics: a, marketing: m });
        overlay.remove();
        showSettingsBtn();
      };
      document.getElementById('lsh-reject-all').onclick = function() {
        setConsent(false, false);
        overlay.remove();
        showSettingsBtn();
      };
    }

    function showSettingsBtn() {
      if (document.getElementById('lsh-cookie-settings-btn')) return;
      const btn = document.createElement('button');
      btn.id = 'lsh-cookie-settings-btn';
      btn.title = 'Cookie Settings';
      btn.innerHTML = '🍪';
      btn.onclick = function() {
        localStorage.removeItem(COOKIE_KEY);
        location.reload();
      };
      document.body.appendChild(btn);
    }

    // Init
    const consent = getConsent();
    if (!consent || consent.v !== CONSENT_VER) {
      document.addEventListener('DOMContentLoaded', injectBanner);
    } else {
      applyConsent(consent);
      document.addEventListener('DOMContentLoaded', showSettingsBtn);
    }
  })();

  /* ── 2. Favicon injection ── */
  (function() {
    const faviconSVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'><defs><linearGradient id='fg' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23a855f7'/><stop offset='100%' stop-color='%2306b6d4'/></linearGradient></defs><rect width='36' height='36' rx='9' fill='url(%23fg)'/><path d='M18 6C13 6 10 9.5 10 13.5c0 3 1.5 5.5 4 7L14 23h8l0-2.5c2.5-1.5 4-4 4-7C26 9.5 23 6 18 6Z' fill='none' stroke='white' stroke-width='1.8'/><rect x='14' y='23' width='8' height='2' rx='0.5' fill='white' fill-opacity='0.9'/><rect x='14.5' y='25' width='7' height='2' rx='0.5' fill='white' fill-opacity='0.7'/><line x1='18' y1='20' x2='18' y2='15' stroke='white' stroke-width='1.4' stroke-linecap='round'/><line x1='18' y1='17' x2='14.5' y2='14' stroke='white' stroke-width='1.2' stroke-linecap='round'/><circle cx='14' cy='13.5' r='1.2' fill='%2367e8f9'/><line x1='18' y1='16' x2='21.5' y2='13.5' stroke='white' stroke-width='1.2' stroke-linecap='round'/><circle cx='22' cy='13' r='1.2' fill='%23e879f9'/><line x1='18' y1='15' x2='18' y2='11' stroke='white' stroke-width='1.2' stroke-linecap='round'/><circle cx='16' cy='10' r='1.2' fill='%23a5f3fc'/></svg>`;
    const encoded = 'data:image/svg+xml,' + faviconSVG;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = encoded;
  })();

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

  /* ── 4. Logo SVG — lightbulb circuit board on colored bg ── */
  const logoSVG = `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bulbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#06b6d4"/>
        </linearGradient>
      </defs>
      <!-- Rounded square background -->
      <rect width="36" height="36" rx="9" fill="url(#bulbg)"/>
      <!-- Bulb body -->
      <path d="M18 6 C13 6 10 9.5 10 13.5 C10 16.5 11.5 19 14 20.5 L14 23 L22 23 L22 20.5 C24.5 19 26 16.5 26 13.5 C26 9.5 23 6 18 6 Z"
        fill="none" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
      <!-- Base cap -->
      <rect x="14" y="23" width="8" height="2" rx="0.5" fill="white" fill-opacity="0.9"/>
      <rect x="14.5" y="25" width="7" height="2" rx="0.5" fill="white" fill-opacity="0.7"/>
      <rect x="15" y="27" width="6" height="1.5" rx="0.5" fill="white" fill-opacity="0.5"/>
      <!-- Circuit lines inside bulb -->
      <line x1="18" y1="20" x2="18" y2="15" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="18" y1="17" x2="14.5" y2="14" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="14" cy="13.5" r="1.2" fill="#67e8f9"/>
      <line x1="18" y1="16" x2="21.5" y2="13.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="22" cy="13" r="1.2" fill="#e879f9"/>
      <line x1="18" y1="15" x2="18" y2="11" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="16" cy="10" r="1.2" fill="#a5f3fc"/>
      <line x1="18" y1="11" x2="20" y2="9.5" stroke="white" stroke-width="1" stroke-linecap="round"/>
      <circle cx="20.5" cy="9" r="1.1" fill="#f0abfc"/>
      <!-- Polygon facets (subtle) -->
      <line x1="18" y1="6" x2="14" y2="20.5" stroke="white" stroke-width="0.6" stroke-opacity="0.25"/>
      <line x1="18" y1="6" x2="22" y2="20.5" stroke="white" stroke-width="0.6" stroke-opacity="0.25"/>
      <line x1="10" y1="11" x2="26" y2="16" stroke="white" stroke-width="0.5" stroke-opacity="0.2"/>
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
    background: transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    width: auto !important;
    height: auto !important;
  }
  .nav-logo:hover .nav-logo-icon { transform: scale(1.08); }
  .nav-logo-text-wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .nav-logo-text {
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: var(--t1);
    white-space: nowrap;
    line-height: 1;
  }
  .nav-logo-tag {
    font-size: 10px;
    font-weight: 500;
    color: var(--t3);
    letter-spacing: 0.01em;
    line-height: 1;
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
      <div class="nav-logo-text-wrap">
        <div class="nav-logo-text">LearnSEO <em>Hub</em></div>
        <div class="nav-logo-tag">SEO tools, resources &amp; expert help</div>
      </div>
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
        <a href="${root('services')}">Services</a>
        <a href="${root('privacy')}">Privacy Policy</a>
        <a href="${root('cookies')}">Cookie Policy</a>
        <a href="${root('terms')}">Terms & Conditions</a>
      </div>
    </div>
    <div class="ft-bottom">
      <span>© 2026 Dina Palamarciuc · LearnSEO Hub</span>
      <span style="display:flex;gap:16px;flex-wrap:wrap;">
        <a href="${root('privacy')}" style="font-size:12px;color:var(--t3);text-decoration:none;">Privacy Policy</a>
        <a href="${root('cookies')}" style="font-size:12px;color:var(--t3);text-decoration:none;">Cookie Policy</a>
        <a href="${root('terms')}" style="font-size:12px;color:var(--t3);text-decoration:none;">Terms & Conditions</a>
      </span>
      <span>Built for the AI Search Era 🚀</span>
        <span style="font-size:12px; color:var(--t3)"><a href="#" onclick="this.href='mai'+'lto:'+'palamarciuc.dina2'+'@gmail.com';return true;" style="color:var(--t3);text-decoration:none;">palamarciuc.dina2&#64;gmail.com</a></span>
        <button onclick="window.lshCookieOpen && window.lshCookieOpen()" style="background:none;border:none;color:var(--t3);font-size:12px;cursor:pointer;font-family:inherit;padding:0;text-decoration:underline;">⚙ Cookie Settings</button>
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
