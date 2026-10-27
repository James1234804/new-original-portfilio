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
