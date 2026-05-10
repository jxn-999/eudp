/**
 * Topbar — Sticky-Header bekommt beim Scrollen einen leichten Schatten
 * und festere Hintergrundfarbe.
 */
export function initTopbar() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // Initial-State (falls Seite mit Scroll-Position geladen wird)
  onScroll();
}
