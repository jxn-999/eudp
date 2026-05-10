/**
 * Main Entry Point — initialisiert alle interaktiven Module der Startseite.
 *
 * Wird via <script type="module" src="js/main.js"> aus index.html geladen.
 * ES Modules funktionieren ohne Build-Step direkt im Browser.
 */
import { initTopbar }     from './topbar.js';
import { initCarousel }   from './carousel.js';
import { initMenu }       from './menu.js';
import { initReveal }     from './reveal.js';
import { initReviews }    from './reviews.js';
import { initHoursToday } from './hours.js';

document.addEventListener('DOMContentLoaded', () => {
  initTopbar();
  initCarousel();
  initMenu();
  initReveal();
  initReviews();
  initHoursToday();
});
