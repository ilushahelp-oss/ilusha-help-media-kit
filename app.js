'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
function setMenu(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (open) navigation.querySelector('a')?.focus();
}
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const section = document.querySelector(link.hash);
    if (section) { section.setAttribute('tabindex', '-1'); section.focus({ preventScroll: true }); }
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
  window.matchMedia('(max-width: 600px)').addEventListener('change', event => { if (!event.matches) setMenu(false); });
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.copy-status');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Email copied';
      status.textContent = 'Copied. Ready for your brief.';
    } catch (_) {
      status.textContent = 'Select the email address above to copy it, or click to open your email app.';
    }
  });
});
