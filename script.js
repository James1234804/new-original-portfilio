 document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
function setNav(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}
toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const ownerWhatsApp = '263781968103';

form.addEventListener('submit', e => {
  if (!form.checkValidity()) {
    e.preventDefault();
    status.textContent = 'Fill in your name, email and project details.';
    return;
  }
  submitBtn.disabled = true;
  status.textContent = 'Sending. A confirmation page opens in a new tab.';
});

document.getElementById('whatsapp-btn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim() || 'Not given';
  const email = document.getElementById('email').value.trim() || 'Not given';
  const msg = document.getElementById('message').value.trim();
  if (!msg) {
    status.textContent = 'Write your project details first.';
    return;
  }
  const text = `New message from portfolio\nName: ${name}\nEmail: ${email}\n\n${msg}`;
  window.open(`https://api.whatsapp.com/send?phone=${ownerWhatsApp}&text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

// Scroll reveals (skipped if the visitor prefers reduced motion)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll('.facts > div, .block > h2, .prose, .project, .skills > div, .timeline li, .contact > *');
if (reduce || !('IntersectionObserver' in window)) {
  targets.forEach(el => el.classList.add('in'));
} else {
  const seen = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      obs.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach(el => {
    el.setAttribute('data-reveal', '');
    const sibs = [...el.parentElement.children].filter(s => s.matches('[data-reveal]') || s === el);
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 3) * 0.08 + 's');
    seen.observe(el);
  });
}

// Header shadow and active section link
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 8), { passive: true });
const links = [...document.querySelectorAll('.site-nav a:not(.nav-cta)')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));
