const toggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navLinks');

if (toggle && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) closeMenu();
  });
}

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 })
  : null;

document.querySelectorAll('.reveal').forEach(element => {
  if (observer) observer.observe(element);
  else element.classList.add('visible');
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Set this to your real business email to enable mailto submission.
const CONTACT_EMAIL = '';
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById('formStatus');
    if (!form.reportValidity()) return;

    if (!CONTACT_EMAIL) {
      if (status) status.textContent = 'Demo mode: please configure CONTACT_EMAIL in script.js before receiving enquiries.';
      return;
    }

    const data = new FormData(form);
    const subject = `Techno Solutions enquiry: ${data.get('service')}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = 'Your email application should open with the message prepared. Please send it there.';
  });
}
