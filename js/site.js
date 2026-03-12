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

    /* Logo — canvas animat */
    + '<a href="/" class="logo" id="lsh-logo-link" style="display:flex;align-items:center;gap:3px;text-decoration:none">'
    + '<span id="lsh-logo-se" style="font-family:Syne,system-ui,sans-serif;font-weight:900;font-size:22px;letter-spacing:-.03em;line-height:1;color:#dcd7cc;transition:color .2s">SE</span>'
    + '<canvas id="lsh-logo-canvas" width="28" height="28" style="display:block"></canvas>'
    + '</a>'

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

/* ── LOGO ANIMAT — adăugat automat ─────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('lsh-logo-canvas');
  var seEl   = document.getElementById('lsh-logo-se');
  var link   = document.getElementById('lsh-logo-link');
  if (!canvas) return;

  var ctx=canvas.getContext('2d');
  var S=28,cx=S/2,cy=S/2-S*.02,R=S*.355,lw=S*.072;
  var C1='#dcd7cc',C2='#e8e2d4';
  var CG=function(a){return 'rgba(220,215,204,'+a+')';};
  var t=0,hovered=false,arrowMult=1,scaleNow=1,scaleTarget=1,particles=[];

  link.addEventListener('mouseenter',function(){hovered=true;scaleTarget=1.1;if(seEl)seEl.style.color='#fff';});
  link.addEventListener('mouseleave',function(){hovered=false;scaleTarget=1;arrowMult=1;if(seEl)seEl.style.color='#dcd7cc';});
  link.addEventListener('mousemove', function(){if(hovered)arrowMult=3.5;});
  link.addEventListener('click',     function(e){
    e.preventDefault();
    for(var i=0;i<20;i++){var a=Math.random()*Math.PI*2,spd=1.2+Math.random()*3;particles.push({x:cx,y:cy,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,r:.8+Math.random()*1.8,life:1,decay:.03+Math.random()*.03});}
    setTimeout(function(){window.location.href='/';},340);
  });

  function frame(){
    ctx.clearRect(0,0,S,S);
    t+=.02*arrowMult;
    if(!hovered)arrowMult+=(1-arrowMult)*.06;
    scaleNow+=(scaleTarget-scaleNow)*.1;
    var p=Math.sin(t*.85)*.5+.5;

    ctx.save();ctx.translate(cx,cy);ctx.scale(scaleNow,scaleNow);ctx.translate(-cx,-cy);

    var grd=ctx.createRadialGradient(cx,cy,R-2,cx,cy,R+7+p*4);
    grd.addColorStop(0,CG(hovered?.2:.06+p*.06));grd.addColorStop(1,'transparent');
    ctx.fillStyle=grd;ctx.beginPath();ctx.arc(cx,cy,R+7+p*4,0,Math.PI*2);ctx.fill();

    ctx.beginPath();ctx.arc(cx,cy,R+1+p*3,0,Math.PI*2);
    ctx.strokeStyle=CG(.05+p*.07);ctx.lineWidth=.7;ctx.stroke();

    ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);
    ctx.strokeStyle=hovered?C2:C1;ctx.lineWidth=lw;ctx.lineCap='round';
    if(hovered){ctx.shadowColor=C1;ctx.shadowBlur=12;}ctx.stroke();ctx.shadowBlur=0;

    var ha=Math.PI*.72,hx1=cx+Math.cos(ha)*R,hy1=cy+Math.sin(ha)*R;
    ctx.beginPath();ctx.moveTo(hx1,hy1);ctx.lineTo(hx1+Math.cos(ha)*R*.55,hy1+Math.sin(ha)*R*.55);
    ctx.strokeStyle=hovered?C2:C1;ctx.lineWidth=lw;ctx.lineCap='round';
    if(hovered){ctx.shadowColor=C1;ctx.shadowBlur=10;}ctx.stroke();ctx.shadowBlur=0;

    var ir=R*.56,pts=[
      {x:cx-ir*.8, y:cy+ir*.28+Math.sin(t)*(S*.016)},
      {x:cx-ir*.22,y:cy+      Math.sin(t+.7)*(S*.016)},
      {x:cx+ir*.26,y:cy-ir*.26+Math.sin(t+1.4)*(S*.016)},
    ];
    var lg=ctx.createLinearGradient(pts[0].x,pts[0].y,pts[2].x,pts[2].y);
    lg.addColorStop(0,CG(.25));lg.addColorStop(1,CG(.85));
    ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);
    pts.slice(1).forEach(function(q){ctx.lineTo(q.x,q.y);});
    ctx.strokeStyle=lg;ctx.lineWidth=lw*.65;ctx.lineCap='round';ctx.lineJoin='round';
    if(hovered){ctx.shadowColor=C1;ctx.shadowBlur=6;}ctx.stroke();ctx.shadowBlur=0;

    var tip=pts[2],tx=tip.x+S*.08,ty=tip.y-S*.15,aa=Math.atan2(ty-tip.y,tx-tip.x),as=S*.085+p*S*.01;
    ctx.beginPath();ctx.moveTo(tip.x,tip.y);ctx.lineTo(tx,ty);
    ctx.strokeStyle=C2;ctx.lineWidth=lw*.65;ctx.lineCap='round';
    if(hovered){ctx.shadowColor=C1;ctx.shadowBlur=8;}ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tx,ty);ctx.lineTo(tx-as*Math.cos(aa-.5),ty-as*Math.sin(aa-.5));
    ctx.moveTo(tx,ty);ctx.lineTo(tx-as*Math.cos(aa+.5),ty-as*Math.sin(aa+.5));
    ctx.strokeStyle=C2;ctx.lineWidth=lw*.6;ctx.lineCap='round';ctx.stroke();ctx.shadowBlur=0;

    var dg=ctx.createRadialGradient(tx,ty,0,tx,ty,3+p*2);
    dg.addColorStop(0,CG(.8));dg.addColorStop(1,'transparent');
    ctx.fillStyle=dg;ctx.beginPath();ctx.arc(tx,ty,3+p*2,0,Math.PI*2);ctx.fill();
    ctx.restore();

    particles=particles.filter(function(q){return q.life>0;});
    particles.forEach(function(q){
      q.x+=q.vx;q.y+=q.vy;q.vx*=.9;q.vy*=.9;q.life-=q.decay;
      ctx.beginPath();ctx.arc(q.x,q.y,q.r*q.life,0,Math.PI*2);
      ctx.fillStyle=CG(q.life.toFixed(2));ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
});
