/* KHS site — shared behaviour across all pages */

/* ---- nav / drawer / scroll ---- */
var burger = document.getElementById('burger');
if (burger) burger.onclick = function () {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('scrim').classList.add('show');
};
function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('scrim').classList.remove('show');
}
window.addEventListener('scroll', function(){
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

/* smooth-scroll only for same-page #anchors; normal links behave normally */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var id = a.getAttribute('href');
    if (id.length < 2 || id === '#') return;
    var t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 78, behavior: 'smooth' });
  });
});

/* ---- whatsapp float ---- */
var waFloat = document.getElementById('waFloat');
if (waFloat) {
  waFloat.href = 'https://wa.me/918805101188?text=' +
    encodeURIComponent('Hello KHS, I would like to enquire about your pest control / facility services.');
}

/* ---- booking modal ---- */
function openBooking(preselect){
  var b = document.getElementById('svcSelect2');
  if (preselect && b) {
    for (var i = 0; i < b.options.length; i++) {
      if (b.options[i].value === preselect) { b.selectedIndex = i; break; }
    }
  }
  openModal('bookModal');
}
function closeBooking(){ closeModal('bookModal'); }
function openModal(id){ document.getElementById(id).classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal(id){ document.getElementById(id).classList.remove('open'); document.body.style.overflow = ''; }

function submitBooking(e, email){
  e.preventDefault();
  var f = e.target.closest('form');
  var g = function(n){ var el = f.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
  if (!g('name') || !g('mobile') || !g('location')) { alert('Please fill Name, Mobile and Location.'); return false; }
  var L = [['Name', g('name')], ['Mobile', g('mobile')], ['Email', g('email')], ['Location', g('location')],
    ['Property Type', g('property')], ['Service', g('service')], ['Preferred Date', g('date')],
    ['Preferred Time', g('time')], ['Message', g('message')]];
  var lines = L.filter(function(x){ return x[1]; }).map(function(x){ return x[0] + ': ' + x[1]; });
  if (email) {
    var body = encodeURIComponent('New service enquiry from the KHS website:\n\n' + lines.join('\n'));
    window.location.href = 'mailto:kesarhospitality@gmail.com?subject=' +
      encodeURIComponent('Service Enquiry \u2014 ' + g('name')) + '&body=' + body;
  } else {
    var txt = encodeURIComponent('*New Enquiry \u2014 Secure My Home*\n' + lines.join('\n'));
    window.open('https://wa.me/918805101188?text=' + txt, '_blank');
  }
  return false;
}

/* ---- lightbox (gallery page) ---- */
var lbIndex = 0;
function galImgs(){ return document.querySelectorAll('.gal .g img'); }
function openLB(gEl){
  var imgs = Array.prototype.slice.call(galImgs());
  var img = gEl.querySelector('img');
  lbIndex = imgs.indexOf(img);
  setLB();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function setLB(){ var imgs = galImgs(); if (imgs[lbIndex]) document.getElementById('lbImg').src = imgs[lbIndex].src; }
function lbStep(d){ var n = galImgs().length; lbIndex = (lbIndex + d + n) % n; setLB(); }
function closeLB(){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow = ''; }
function openLBsrc(src){
  document.getElementById('lbImg').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
document.addEventListener('keydown', function(e){
  var lb = document.getElementById('lightbox');
  if (lb && lb.classList.contains('open')) {
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight') lbStep(1);
    if (e.key === 'ArrowLeft') lbStep(-1);
  }
  if (e.key === 'Escape') { closeModal('svcModal'); closeModal('bookModal'); }
});

/* certificate view buttons -> open the cert image full-size */
document.querySelectorAll('[data-doc]').forEach(function(a){
  a.addEventListener('click', function(e){
    var img = document.querySelector('[data-cert="' + a.getAttribute('data-doc') + '"]');
    if (img) { e.preventDefault(); openLBsrc(img.src); }
  });
});

/* ---- reveal-on-scroll ---- */
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(n){ io.observe(n); });

var yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
