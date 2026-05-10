# Euro-Döner Pizzeria — Homepage

Statische Webseiten-Startseite. Reines HTML/CSS/JS, kein Build-Schritt nötig — direkt deployment-fähig auf jedem statischen Hoster.

## Struktur

```
Homepage/
├── index.html              ← Einstiegs-HTML, lädt CSS + JS-Module
├── README.md               ← diese Datei
│
├── assets/                 ← Bilder, Schriften, Favicon
│   └── hero-doener.jpg     ← Hero-Hintergrundfoto
│
├── css/                    ← Stylesheets (modular)
│   ├── tokens.css          ← Design-Variablen (Farben, Schriften, Schatten)
│   ├── base.css            ← Reset, Typografie, Utilities (.eyebrow, .ic)
│   ├── components.css      ← Wiederverwendbar: .wrap, Buttons, Cards
│   ├── topbar.css          ← Sticky-Header
│   ├── hero.css            ← Hero-Section mit Foto-Hintergrund
│   ├── marquee.css         ← Laufender Schrift-Trenner
│   ├── info.css            ← Standort/Kontakt/Öffnungszeiten-Block
│   ├── carousel.css        ← Bilder-Karussell „Unser Restaurant"
│   ├── sellers.css         ← Top-Seller-Karten
│   ├── story.css           ← Geschichte + Editorial-Bildstack
│   ├── footer.css          ← 4-Spalten-Footer
│   └── responsive.css      ← Cross-Cutting Media Queries
│
└── js/                     ← JavaScript (ES Modules, kein Bundler nötig)
    ├── main.js             ← Entry, importiert + initialisiert Module
    ├── topbar.js           ← Scroll-Schatten für Sticky-Header
    ├── carousel.js         ← Karussell-Logik (Auto, Pfeile, Punkte, Swipe)
    └── menu.js             ← Mobile-Menu-Drawer-Toggle
```

## Lokal anschauen

Öffne `index.html` in einem Browser. **Wichtig:** Wegen ES-Modules muss die Seite über einen lokalen Webserver geladen werden (kein `file://`-Protokoll), sonst blockiert der Browser die Module-Imports.

### Schnellster Weg

Mit Python (auf den meisten Systemen vorhanden):

```bash
cd Website/Homepage
python -m http.server 8080
```

Dann im Browser öffnen: <http://localhost:8080>

### Alternativ mit Node

```bash
npx serve Website/Homepage
```

### VS Code

Erweiterung „Live Server" installieren → Rechtsklick auf `index.html` → „Open with Live Server".

## Deployment

Da es eine reine statische Seite ist, kann der gesamte `Homepage/`-Ordner ohne Anpassungen auf jeden statischen Hoster geladen werden:

- **Vercel:** Drag-and-drop des Ordners auf <https://vercel.com/new> oder via Git
- **Netlify:** Drag-and-drop oder via Git
- **GitHub Pages:** Ordner committen + Pages aktivieren
- **Klassisches Webhosting (Strato, All-Inkl, Hetzner):** per FTP/SFTP hochladen

Domain einrichten und fertig. Keine Server-Konfiguration nötig.

## Design-Quelle

Das Design stammt aus `Design_homepage/startseite/Startseite v2.html` (Single-File-Version von Claude Design). Diese Implementierung übernimmt das Design **1:1** — die Aufteilung dient nur der Wartbarkeit. Alle visuellen Eigenschaften (Farben, Abstände, Animationen, Responsive-Breakpoints) sind identisch.

## Browser-Support

- Chrome / Edge / Firefox / Safari (jeweils aktuelle Version + 1 zurück)
- Mobile Safari iOS 14+, Chrome Android 90+
- ES-Modules werden flächendeckend unterstützt seit ~2018

## Bekannte offene Punkte

Diese Inhalte sind aktuell Platzhalter und müssen noch ersetzt werden — siehe `fehlende_infos/infos.txt` im Projektroot:

- Hero-Foto (aktuell `hero-doener.jpg` — eventuell durch echtes Foto ersetzen)
- Restaurant-Innenraum-Fotos für das Karussell (aktuell stilisierte Farb-Gradients als Platzhalter)
- Top-Seller-Fotos (ebenfalls Gradient-Platzhalter)
- Story-Bilder (ebenfalls Gradient-Platzhalter)
- Logo-Asset
- Favicon
- Geo-Koordinaten in `js/map.js` ggf. verfeinern (aktuell ungefähre Stadtmitte 51.80525, 10.33935)
- AGB- und Widerruf-Seite (kommen mit dem Online-Shop)
- Impressum- und Datenschutz-Inhalt: aktuell als Stub mit Platzhaltern für Inhaberin/Inhaber, USt-IdNr. und Aufsichtsbehörde — vor Live-Gang durch Generator (z.&nbsp;B. eRecht24) prüfen lassen

## Karte (statisch)

Die Karte ist ein **statisches Tile-Mosaik** aus 9 OpenStreetMap-Tiles
(Zoom 18, ~120 KB), abgelegt unter `assets/map-tiles/`. Es findet bei
Seitenaufruf **kein externer Karten-Server-Aufruf** statt — DSGVO-perfekt.

Tile-Quelle: `tile.openstreetmap.org` (Standard-OSM-Stil, internationaler
Look mit Parkplatz-Symbolen). Visuell um -45° gedreht
(`transform: rotate(-45deg)` in `css/map.css`), mit aufrechtem roten
Marker und Klick-zum-Öffnen-Verhalten: Klick aufs Bild → öffnet
`openstreetmap.org` mit Marker auf der Adresse in neuem Tab.

Pflicht-Attribution „© OpenStreetMap-Mitwirkende" ist klein in der Ecke
eingeblendet (ODbL-Lizenz).

**Andere Adresse / Zoom-Stufe?** Tile-Koordinaten neu berechnen via
Python (Slippy-Map-Formel siehe Code-Kommentare in `js/map.js`-History
oder <https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames>),
neue 9 PNGs herunterladen, Marker-Pixel-Position in `css/map.css`
(`transform-origin` und `left/top` der `.map-tiles`) anpassen.

**Andere Tile-Stile** (z. B. minimalistischer ohne Geschäftsnamen):
URL der `curl`-Loops in der Build-Doku ändern, z. B. auf
`tile.openstreetmap.fr/hot` (Humanitarian-Style, weniger POI-Labels).

## Schriften (Self-Hosted)

Die Webseite nutzt **kein Google Fonts CDN** — Schriften liegen lokal unter
`assets/fonts/` (DSGVO-konform, keine externe IP-Übertragung). Eingebunden
über `css/fonts.css`:

- **Inter** (Variable Font, eine Datei deckt alle Gewichte ab) — Body-Schrift
- **Cormorant Garamond** (statisch, Gewichte 400/500/600/700, Italic 400/500/600) — Display-Schrift

Beide unter SIL Open Font License lizenziert. Wenn neue Gewichte/Sprachen
gebraucht werden, von [fontsource](https://fontsource.org/) als WOFF2 holen
und in `assets/fonts/` ablegen + in `css/fonts.css` per `@font-face` eintragen.
