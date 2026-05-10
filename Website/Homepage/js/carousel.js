/**
 * Carousel — Bilder-Karussell „Unser Restaurant"
 *
 * Features:
 *  - 3 sichtbare Slides ab 1080 px, 2 zwischen 680–1079 px, 1 darunter
 *  - Pfeil-Buttons (prev/next)
 *  - Punkte-Indikator (Klick springt zur Seite)
 *  - Auto-Rotation alle 5 s, pausiert bei Mouse-Hover
 *  - Touch-Swipe auf Mobile
 *  - Resize-resilient (rechnet sichtbare Anzahl neu)
 */
export function initCarousel() {
  const track   = document.getElementById('track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsEl  = document.getElementById('dots');
  const carousel = document.getElementById('carousel');

  if (!track || !prevBtn || !nextBtn || !dotsEl || !carousel) return;

  const slides = track.children;
  const total  = slides.length;
  const GAP    = 14;
  const AUTO_INTERVAL_MS = 5000;

  let idx = 0;
  let timer;

  /** Wie viele Slides sind aktuell sichtbar? */
  const visible = () => {
    if (window.innerWidth < 680)  return 1;
    if (window.innerWidth < 1080) return 2;
    return 3;
  };

  /** Punkte-Indikator neu rendern (passt sich an Anzahl Pages an) */
  const renderDots = () => {
    dotsEl.innerHTML = '';
    const pages = Math.max(1, total - visible() + 1);
    for (let i = 0; i < pages; i++) {
      const d = document.createElement('span');
      d.className = 'dot' + (i === idx ? ' active' : '');
      d.addEventListener('click', () => { idx = i; update(); });
      dotsEl.appendChild(d);
    }
  };

  /** Track-Position + aktive Slides aktualisieren */
  const update = () => {
    const v = visible();
    const max = Math.max(0, total - v);
    if (idx > max) idx = max;

    /* offsetWidth statt getBoundingClientRect, weil die Slides per
       Polaroid-Effekt leicht rotiert sind — getBoundingClientRect
       würde die rotierte AABB liefern und das Layout verschieben. */
    const slideW = slides[0].offsetWidth;
    track.style.transform = `translateX(-${idx * (slideW + GAP)}px)`;

    /* Markiere die mittlere sichtbare Slide als is-focus, damit CSS die
       äußeren Slides leicht in den Hintergrund treten lassen kann. */
    const focusIdx = idx + Math.floor(v / 2);
    [...slides].forEach((s, i) => {
      const visible = i >= idx && i < idx + v;
      s.classList.toggle('is-active', visible);
      s.classList.toggle('is-focus', visible && i === focusIdx);
    });

    renderDots();
  };

  const next = () => {
    const pages = Math.max(1, total - visible() + 1);
    idx = (idx + 1) % pages;
    update();
  };

  const prev = () => {
    const max = total - visible();
    idx = (idx - 1 + max + 1) % (max + 1);
    update();
  };

  /* Auto-Rotation */
  const startTimer = () => { timer = setInterval(next, AUTO_INTERVAL_MS); };
  const stopTimer  = () => clearInterval(timer);
  const resetTimer = () => { stopTimer(); startTimer(); };

  /* Event-Bindings */
  prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
  nextBtn.addEventListener('click', () => { next(); resetTimer(); });
  window.addEventListener('resize', update);
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);

  /* Touch-Swipe */
  let touchX = 0;
  track.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
      resetTimer();
    }
  });

  /* Initialisieren */
  update();
  startTimer();
}
