/* Final interactions. Native elements, keyboard support, no framework. */
(() => {
  const home = document.querySelector('.hiring-home');
  if (!home) return;
  const buttons = Array.from(document.querySelectorAll('.lens-button[data-lens]'));
  const mode = document.querySelector('meta[name="theme-color"]');
  const hero = document.querySelector('.portfolio-home-hero');
  const root = document.body;
  function syncTheme() {
    const creative = root.dataset.homeFocus === 'creative';
    if (mode) mode.setAttribute('content', creative ? '#191524' : '#ecf2f8');
    if (hero) hero.setAttribute('aria-labelledby', creative ? 'home-title-creative' : 'home-title');
    for (const h of document.querySelectorAll('.mode-headline')) {
      h.setAttribute('aria-hidden', String(creative ? h.classList.contains('mode-systems') : h.classList.contains('mode-creative')));
    }
    document.documentElement.style.colorScheme = creative ? 'dark' : 'light';
  }
  // The existing tab controller updates data-home-focus. Observe just that one
  // attribute so the document-level theme and accessibility labels stay aligned.
  const observer = new MutationObserver(syncTheme);
  observer.observe(root, {attributes:true,attributeFilter:['data-home-focus']});
  buttons.forEach(b=>b.addEventListener('click',syncTheme));
  syncTheme();
})();
