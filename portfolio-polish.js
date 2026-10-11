/* Small, purposeful interactions for the hiring edition. No dependencies. */
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lens = document.querySelector('.lens-console');
  const buttons = [...document.querySelectorAll('.lens-button[data-lens]')];
  const slides = [...document.querySelectorAll('.lens-slide[data-preview]')];
  const lensLabel = document.querySelector('.console-availability');
  if (lens && buttons.length && slides.length) {
    const selectLens = (mode) => {
      if (!['systems','creative'].includes(mode)) return;
      lens.dataset.current = mode;
      document.body.dataset.homeFocus = mode;
      buttons.forEach(btn => {
        const active = btn.dataset.lens === mode;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      slides.forEach(slide => {
        const active = slide.dataset.preview === mode;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.setAttribute('tabindex', active ? '0' : '-1');
      });
      if (lensLabel) lensLabel.textContent = mode === 'systems' ? 'Technical project preview' : 'Digital campaign preview';
    };
    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => selectLens(btn.dataset.lens));
      btn.addEventListener('keydown', event => {
        if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const next = buttons[(idx + (event.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length];
        next.focus();
        selectLens(next.dataset.lens);
      });
    });
    selectLens('systems');
  }

  const filterButtons = [...document.querySelectorAll('.filter-button[data-filter]')];
  const commercial = document.querySelector('[data-filter-group="commercial"]');
  const eventSection = document.querySelector('[data-filter-group="events"]');
  const campaigns = [...document.querySelectorAll('[data-categories]')];
  const filterSummary = document.getElementById('filter-summary');
  if (filterButtons.length && commercial && eventSection) {
    const counts = {
      all: 'Showing all six campaigns and eight video edits.',
      commercial: 'Showing the commercial brand advertisement.',
      events: 'Showing five event campaigns.',
      vertical: 'Showing two vertical-led projects.'
    };
    const setFilter = (type, scroll) => {
      commercial.hidden = !['all','commercial'].includes(type);
      eventSection.hidden = type === 'commercial';
      campaigns.forEach(card => {
        const categories = (card.dataset.categories || '').split(' ');
        card.hidden = !(type === 'all' || (type === 'events' ? categories.includes('events') : categories.includes(type)));
      });
      filterButtons.forEach(button => {
        const active = button.dataset.filter === type;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      if (filterSummary) filterSummary.textContent = counts[type] || counts.all;
      if (scroll) {
        const target = type === 'commercial' || type === 'all' ? commercial : eventSection;
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };
    filterButtons.forEach(button => button.addEventListener('click',() => setFilter(button.dataset.filter, true)));
    setFilter('all',false);
  }

  if (!reducedMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('[data-interactive-card]');
    cards.forEach(card => {
      card.addEventListener('pointermove',e => {
        const box = card.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width - .5;
        const y = (e.clientY - box.top) / box.height - .5;
        card.style.setProperty('--card-rotate-x',`${-y * 1.9}deg`);
        card.style.setProperty('--card-rotate-y',`${x * 1.9}deg`);
      },{passive:true});
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--card-rotate-x','0deg');
        card.style.setProperty('--card-rotate-y','0deg');
      });
    });
  }
})();
