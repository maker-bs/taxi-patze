/* Taxi Patze – main.js */

// --- Mobile Navigation ---
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    if (open) {
      const firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Menü öffnen');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Menü öffnen');
      toggle.focus();
    }
  });
}

// --- Aktiven Nav-Link markieren ---
(function markActiveLink() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href === file || (file === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// --- Kontaktformular → mailto ---
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const val = id => (document.getElementById(id) || {}).value || '';
    const name    = val('name');
    const email   = val('email');
    const phone   = val('phone');
    const subject = val('subject') || 'Anfrage über Website';
    const message = val('message');

    const body = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      '',
      'Nachricht:',
      message,
    ].filter(l => l !== null).join('\n');

    window.location.href =
      `mailto:patze.taxi@icloud.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  });
}
