const toggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, {threshold: .1}) : null;
document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));
document.getElementById('year').textContent = new Date().getFullYear();
// Set this to your real business email to enable mailto submission.
const CONTACT_EMAIL = '';
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById('formStatus');
  if (!form.reportValidity()) return;
  if (!CONTACT_EMAIL) {
    status.textContent = 'Demo mode: please configure CONTACT_EMAIL in script.js before receiving enquiries.';
    return;
  }
  const data = new FormData(form);
  const subject = `Techno Solutions enquiry: ${data.get('service')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Your email application should open with the message prepared. Please send it there.';
});
