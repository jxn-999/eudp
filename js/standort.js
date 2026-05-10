/**
 * Standort-Seite — Initialisiert Topbar, Reveal-Animationen und Leaflet-Karte.
 *
 * Wird via <script type="module" src="js/standort.js"> aus standort.html
 * geladen. Leaflet selbst wird in standort.html als klassisches <script>
 * vor diesem Modul eingebunden, daher steht das globale `L`-Objekt zur
 * Verfügung.
 */
import { initTopbar }  from './topbar.js';
import { initReveal }  from './reveal.js';
import { initMenu }    from './menu.js';
import { initReviews } from './reviews.js';

const RESTAURANT = {
  name: 'Euro Döner',
  lat: 51.8049868,
  lng: 10.3337994,
  zoom: 17,
  address: 'Adolph-Roemer-Straße 7',
  city: '38678 Clausthal-Zellerfeld',
  phone: '0 53 23 / 84 02 30',
  phoneTel: '+495323840230',
  hours: 'Mo – So · 11 – 23 Uhr',
};

/**
 * Custom Marker-Icon: SVG-Pin in Marken-Farbe (Tomato + Gold).
 * Wird über Leaflets DivIcon als HTML-Element eingehängt — kein PNG nötig.
 */
function createMarkerIcon() {
  const html = `
    <svg class="standort-marker__pin" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 0C7.2 0 0 7.2 0 16c0 12 16 26 16 26s16-14 16-26C32 7.2 24.8 0 16 0z" fill="#c0301e"/>
      <circle cx="16" cy="16" r="6" fill="#d4a52a"/>
      <circle cx="16" cy="16" r="2.4" fill="#0d0a07"/>
    </svg>
  `;
  return L.divIcon({
    html,
    className: 'standort-marker',
    iconSize:   [32, 42],
    iconAnchor: [16, 42],
    popupAnchor:[0, -36],
  });
}

/**
 * Leaflet-Karte aufbauen. Tiles kommen direkt von OSM —
 * Attribution rendern wir selbst über CSS, damit der Look
 * zum Site-Stil passt (siehe .standort-map__attr).
 */
function initMap() {
  const container = document.getElementById('standort-leaflet');
  if (!container || typeof L === 'undefined') return;

  const map = L.map(container, {
    center: [RESTAURANT.lat, RESTAURANT.lng],
    zoom: RESTAURANT.zoom,
    minZoom: 14,
    maxZoom: 19,
    zoomControl: true,
    attributionControl: false,
    // Wheel-Zoom blockt sich gegen Page-Scroll → erst nach Klick aktivieren.
    scrollWheelZoom: false,
    // Tap-Hold öffnet auf Mobile sonst eine Auswahl, das wollen wir nicht.
    tap: true,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    // Leere Attribution — wir rendern sie eigenständig, müssen aber
    // den Tile-Layer-Default unterbinden, damit nichts doppelt erscheint.
    attribution: '',
  }).addTo(map);

  // Marker + Popup. Popup öffnet sich direkt beim Laden der Karte
  // und bleibt offen (autoClose: false) — wirkt wie ein dauerhaftes
  // Info-Label am Marker. Bewusst kompakt: nur Foto + Name + Adresse.
  const popupHtml = `
    <div class="standort-popup">
      <div class="standort-popup__media">
        <img src="assets/restaurant-aussen.jpg" alt="" width="56" height="56" loading="lazy">
      </div>
      <div class="standort-popup__body">
        <div class="standort-popup__name">${RESTAURANT.name}</div>
        <div class="standort-popup__addr">${RESTAURANT.address}<br>${RESTAURANT.city}</div>
      </div>
    </div>
  `;

  L.marker([RESTAURANT.lat, RESTAURANT.lng], {
    icon: createMarkerIcon(),
    title: RESTAURANT.name,
    alt: `Standort von ${RESTAURANT.name}`,
  })
    .bindPopup(popupHtml, {
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      className: 'standort-popup-wrap',
      offset: [0, -38],
      maxWidth: 240,
      minWidth: 200,
    })
    .addTo(map)
    .openPopup();

  // Wheel-Zoom erst nach Karten-Klick aktivieren — verhindert,
  // dass User beim Page-Scrollen versehentlich in die Karte zoomen.
  container.addEventListener('click', () => map.scrollWheelZoom.enable(), { once: true });
  container.addEventListener('mouseleave', () => map.scrollWheelZoom.disable());

  // Bei Resize ggf. Tiles neu rendern, falls die Karte initial in einem
  // hidden-Bereich saß (kommt selten vor, aber kostet nichts).
  window.addEventListener('load', () => map.invalidateSize());
}

/**
 * „Route planen"-Button: Auf Mobile-Geräten mit Touch-Input öffnen
 * wir das geo:-Schema (System wählt Karten-App), auf Desktop bleibt
 * der OSM-Routing-Link in einem neuen Tab — das ist bereits der
 * default-href im HTML.
 */
function initRouteButton() {
  const btn = document.getElementById('standort-route');
  if (!btn) return;

  const isCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (!isCoarsePointer) return;

  const geoHref = `geo:${RESTAURANT.lat},${RESTAURANT.lng}?q=${encodeURIComponent(RESTAURANT.name)}`;
  btn.href = geoHref;
  // System-Karten-App öffnet im selben Kontext, kein neues Tab nötig.
  btn.removeAttribute('target');
  btn.removeAttribute('rel');
}

document.addEventListener('DOMContentLoaded', () => {
  initTopbar();
  initMenu();
  initReveal();
  initMap();
  initRouteButton();
  initReviews();
});
