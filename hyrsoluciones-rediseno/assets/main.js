(function(){
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var navEl = document.getElementById('siteNav');
  if (navEl) {
    window.addEventListener('scroll', function(){
      navEl.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive:true });
  }

  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }

  try {
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.remove('reveal-pending'); io.unobserve(e.target); } });
      }, { threshold:.15 });
      revealEls.forEach(function(el){
        var rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.85) { el.classList.add('reveal-pending'); }
        io.observe(el);
      });
    }
  } catch(e) {}

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.masonry figure img').forEach(function(img){
      img.addEventListener('click', function(){
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    function closeLightbox(){ lightbox.classList.remove('open'); lightboxImg.src=''; }
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
    window.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLightbox(); });
  }
})();
