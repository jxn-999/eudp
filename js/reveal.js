/**
 * Reveal-on-Scroll — fügt Elementen mit [data-reveal] eine
 * `.is-visible`-Klasse hinzu, sobald sie in den Viewport eintreten.
 *
 * Variant via Attribut-Wert:
 *   data-reveal="up"     → leicht von unten einblenden (default)
 *   data-reveal="left"   → von links
 *   data-reveal="right"  → von rechts
 *   data-reveal="fade"   → reines Fading (kein Translate)
 *   data-reveal="scale"  → leichter Scale-Up
 *
 * Stagger: Eltern-Element bekommt data-reveal-stagger, Kinder mit
 * data-reveal werden automatisch verzögert (Stagger × index).
 *
 * Reduced-Motion respektiert: Bei `prefers-reduced-motion: reduce`
 * werden alle Elemente sofort sichtbar markiert (kein Fade, keine
 * Transition).
 */
export function initReveal() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  // Reduced-Motion: alle sofort sichtbar, kein Observer nötig.
  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Stagger-Delays über Inline-Custom-Property setzen, damit CSS
  // transition-delay konsumieren kann.
  document.querySelectorAll('[data-reveal-stagger]').forEach((parent) => {
    const stepMs = parseInt(parent.dataset.revealStagger, 10) || 80;
    const children = parent.querySelectorAll(':scope > [data-reveal]');
    children.forEach((child, i) => {
      child.style.setProperty('--reveal-delay', `${i * stepMs}ms`);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    {
      // Start animation slightly before the element fully enters —
      // wirkt natürlicher als Trigger erst bei 100 % Sichtbarkeit.
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.08,
    }
  );

  items.forEach((el) => io.observe(el));
}
