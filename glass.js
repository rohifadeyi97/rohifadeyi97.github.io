/* Glass Studio interactions — accessible, static-site friendly, motion optional. */
(() => {
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.glass-header');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const progress = document.querySelector('.reading-progress');
  const sceneIndicator = document.querySelector('.scene-indicator');
  const sceneLabel = document.querySelector('.scene-indicator-label');
  const sceneNames = {'home':'Overview','routes':'Two paths','selected':'Selected projects','about':'About','systems-hero':'Systems & Analytics','systems-feature':'Music Ops','systems-work':'Case studies','creative-hero':'Creative work','creative-film':'Commercial film','creative-events':'Event campaigns','creative-close':'Approach','case-intro':'Case study','case-media':'Project visual','case-reading':'Process','case-reading-alt':'Implementation','case-reading-soft':'Findings','case-end':'More projects'};

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      links.classList.toggle('open', open);
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .075, rootMargin: '0px 0px -15px 0px' });
    reveals.forEach((element) => revealObserver.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('visible'));
  }

  const scenes = [...document.querySelectorAll('main .scene-panel[data-scene], footer[data-scene]')];
  let ticking = false;
  function updatePageState() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (progress) {
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.width = `${Math.min(100, Math.max(0, y / total * 100))}%`;
    }
    const marker = window.innerHeight * .48;
    let active = scenes[0]?.dataset.scene || 'home';
    for (const scene of scenes) {
      if (scene.getBoundingClientRect().top <= marker) active = scene.dataset.scene;
    }
    if (body.dataset.scene !== active) body.dataset.scene = active;
    if (sceneLabel) sceneLabel.textContent = sceneNames[active] || 'Selected work';
    if (sceneIndicator) sceneIndicator.classList.toggle('is-active', y > 400);
    ticking = false;
  }
  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updatePageState);
    }
  }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  updatePageState();

  const caseLinks = [...document.querySelectorAll('.case-index-bar a[href^="#"]')];
  if (caseLinks.length && 'IntersectionObserver' in window) {
    const sectionLinks = new Map(caseLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        caseLinks.forEach(a => a.classList.remove('active'));
        sectionLinks.get(entry.target.id)?.classList.add('active');
      });
    }, { rootMargin: '-23% 0px -58% 0px' });
    sectionLinks.forEach((link, id) => {
      const target = document.getElementById(id);
      if (target) activeObserver.observe(target);
    });
  }

  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    for (const el of document.querySelectorAll('[data-spotlight]')) {
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      }, { passive: true });
    }
  }

  // Leave one video playing at a time. Native controls remain usable.
  const videos = [...document.querySelectorAll('video')];
  videos.forEach(v => v.addEventListener('play', () => {
    videos.forEach(other => { if (other !== v && !other.paused) other.pause(); });
  }));
})();
