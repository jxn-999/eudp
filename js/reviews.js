/**
 * Reviews-Rotator — wechselt zwischen 3 statisch im DOM hinterlegten
 * Google-Bewertungen via horizontaler Slide-Animation.
 *
 * Markup-Vertrag (siehe standort.html):
 *   .standort-rating
 *   ├── .standort-rating__quote-wrap   (overflow: hidden)
 *   │   └── [data-rotate-track]        (display: flex, transform: translateX)
 *   │       └── .standort-rating__quote × N   (flex: 0 0 100%)
 *   └── .standort-rating__dots
 *       └── [data-rotate-dot] × N
 *
 * Verhalten:
 *   - Auto-Rotate alle 8 Sekunden (Slide nach links → nächster Slide rein von rechts)
 *   - Pause beim Hover, beim Tab-Verlust und nach manueller Auswahl
 *   - Manuelle Steuerung über die Pagination-Dots
 *   - Reduced-Motion: kein Auto-Rotate, manuelles Klicken bleibt
 *
 * Keine Datenladung — alle Bewertungen liegen direkt im Markup
 * (DSGVO + SEO + funktioniert auch ohne Server / file://).
 */

const ROTATE_MS = 8000;

export function initReviews() {
  const card  = document.querySelector('.standort-rating');
  if (!card) return;

  const track = card.querySelector('[data-rotate-track]');
  const slides = track ? Array.from(track.children) : [];
  const dots = Array.from(card.querySelectorAll('[data-rotate-dot]'));

  if (!track || slides.length < 2 || dots.length < 2) return;

  let current = 0;
  let timerId = null;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setIndex(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
  }

  function next() {
    setIndex(current + 1);
  }

  function start() {
    if (reduceMotion) return;
    stop();
    timerId = window.setInterval(next, ROTATE_MS);
  }

  function stop() {
    if (timerId) { window.clearInterval(timerId); timerId = null; }
  }

  // Initialer Snap zu Index 0 ohne Animation
  track.style.transition = 'none';
  setIndex(0);
  // Im nächsten Frame Transition wieder anschalten
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { track.style.transition = ''; });
  });

  // Manuelle Steuerung
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.index || 0);
      setIndex(idx);
      // Nach Klick: Auto-Rotation neu starten, sonst springt der
      // gerade gewählte Slide möglicherweise sofort weiter.
      start();
    });
  });

  // Hover pausiert
  card.addEventListener('mouseenter', stop);
  card.addEventListener('mouseleave', start);

  // Tab-Wechsel pausiert
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  start();
}
