(function(){
  const toggle=document.querySelector('.menu-toggle');
  const links=document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click',()=>{
    const next=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(next));
    links.classList.toggle('open',next);
  });
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
})();
