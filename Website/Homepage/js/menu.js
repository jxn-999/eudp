/**
 * Mobile-Menu — Toggle für die Top-Nav auf kleinen Bildschirmen
 *
 * Aktiviert sich erst, wenn der Hamburger-Button sichtbar ist (Mobile).
 * Schaltet die Top-Nav als Overlay-Drawer um.
 */
export function initMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('.nav');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const open = nav.dataset.open === '1';

    if (open) {
      nav.removeAttribute('style');
      nav.dataset.open = '0';
    } else {
      Object.assign(nav.style, {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        inset: '62px 0 auto 0',
        background: 'rgba(13, 10, 7, .98)',
        padding: '24px 28px',
        gap: '18px',
        zIndex: '40',
        borderBottom: '1px solid rgba(246, 239, 225, .08)',
        letterSpacing: '.18em',
      });
      nav.dataset.open = '1';
    }
  });
}
