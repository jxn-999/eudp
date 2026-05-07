# Design-Brief — Startseite (Webseite)

> **Zweck dieser Datei:** Vollständiger Briefing-Text für ein Design-Tool / Design-Agent,
> um daraus visuelles Design (Mockups, hi-fi Designs, Figma) auszuarbeiten.
> Diese Datei ist self-contained — alles, was zur Startseite besprochen wurde, ist hier.

---

## 1 — Kontext

**Projekt:** Webseite + integrierter Online-Shop für die **Euro-Döner Pizzeria**, Adolph-Roemer-Straße 7, 38678 Clausthal-Zellerfeld. Das Restaurant existiert seit über 10 Jahren, bietet ~200 Gerichte (Pizza, Döner, Burger, Pasta, Schnitzel, Aufläufe), liefert + Vor-Ort-Service.

**Diese Datei deckt ab:** Die **Startseite der Webseite** (URL `/`). Marketing-/Informations-Bereich. **Nicht** der Shop — der hat einen eigenen Brief (`02-shop-design-brief.md`).

**Stimmung:** Klassisches Restaurant-Gefühl. Warm, einladend, einen Hauch lebensbejahend. Soll vermitteln: „Hier ist es nett, hier wird's frisch zubereitet." Im Gegensatz zum Shop-Bereich (App-artig, fokussiert).

**Zielgruppen:**
- Lokale Stammkunden, die Telefonnummer / Öffnungszeiten suchen
- Touristen / Studenten, die Clausthal-Zellerfeld besuchen
- Lieferkunden, die zwischen „Anschauen" und „Bestellen" entscheiden

---

## 2 — Top-Level-Entscheidung (verbindlich)

Die Startseite ist **eine kompakte Landing-Page**, **nicht** ein Scrolling-Onepager mit allen Inhalten. Es gibt vom Header zum Footer ca. 3–4 Bildschirmlängen Inhalt — scrollbar, aber nicht endlos. Tiefere Inhalte (vollständige Speisekarte, Über-uns-Story, Galerie) leben auf eigenen Unterseiten und werden über die Navigation erreicht.

**Hauptaufgabe der Startseite:** Den Nutzer auf einen Blick orientieren und ihn zu einer von zwei Aktionen führen:
1. **„Zur Speisekarte"** (für Lese-Interessierte / Vor-Ort-Gäste)
2. **„Jetzt bestellen"** (führt in den Shop)

Sekundäres Ziel: Standort, Telefon und Öffnungszeiten direkt sichtbar machen, ohne Scrollen.

---

## 3 — Aufbau (Sections von oben nach unten)

### 3.1 Top-Bar (sticky)

- **Höhe:** ~64 px Desktop, ~56 px Mobile
- **Hintergrund:** weiß, dezenter unterer Border (1 px solide #eee)
- **Inhalt links:** Restaurant-Logo + Schriftzug „EURO-DÖNER PIZZERIA" (oder reines Logo wenn vorhanden)
- **Inhalt rechts (Desktop ≥ 1024 px):** Horizontale Nav-Links — *Speisekarte · Über uns · Standort · Galerie · Kontakt* — gefolgt von einem prominenten **„🛒 Bestellen"**-Button (Hintergrund: Blau-Akzent, weißer Text, Rounded 6 px)
- **Inhalt rechts (Mobile < 1024 px):** Nur ≡ Hamburger-Button (öffnet Side-Drawer) — keine Nav-Links sichtbar
- **Sticky-Verhalten:** Top-Bar bleibt beim Scrollen oben. Optional leichter Schatten beim Herunterscrollen
- **Kein Status-Element** im Header (bewusst entschieden — keine „Geöffnet bis 23:00"-Pille)

### 3.2 Hero (über dem Fold)

- **Höhe:** ~480 px Desktop, ~360 px Mobile
- **Hintergrund:** Lifestyle-Foto im Vollbreite-Format. Vorgeschlagene Motive: Steinofen mit Pizza, frisch zubereiteter Döner, Restaurant-Innenraum mit Atmosphäre. **Dunkles Overlay** (rgba(0,0,0,0.5–0.6)) für Lesbarkeit der Schrift
- **Inhalte mittig zentriert:**
  - **Slogan/Headline:** 2-zeilig, z. B. „Frisch &amp; lecker — seit über 10 Jahren". Display-Schrift, 36–48 px Desktop, 24–28 px Mobile, weiß
  - **Subline:** „Pizza · Döner · Burger · Pasta · Schnitzel" — 14–16 px, weiß mit 90 % Opacity
  - **Zwei Buttons** nebeneinander (auf Mobile darunter wenn nötig):
    - **„📖 Zur Speisekarte"** — Hintergrund weiß, Text in Marken-Rot. **Sekundär**, etwas weniger auffällig
    - **„🛒 Jetzt bestellen"** — Hintergrund Marken-Blau (#1976d2), Text weiß. **Primär**, leicht erhöht via Schatten (`0 4px 12px rgba(25,118,210,0.4)`)
  - Beide Buttons: Rounded 6 px, Padding 12–14 px vertikal × 24 px horizontal, Bold

**Wichtig:** Beide Hero-Buttons müssen **direkt über dem Fold** sichtbar sein, nicht nur mit Scroll. Das ist der zentrale Wertversprechen-Knoten der Seite.

### 3.3 Info-Block (3 Spalten Desktop, hybrid Mobile)

Direkt nach dem Hero, mit ~24 px Abstand. Hintergrund leicht grauer (#fafafa) damit Trennung vom Hero spürbar ist.

**Desktop-Layout (≥ 768 px):** 3 Karten nebeneinander, Spaltenbreite-Verhältnis 2 : 1 : 1

| Spalte | Inhalt |
|---|---|
| **Karte (breit)** | Eingebettete OpenStreetMap (Leaflet), interaktiv. Höhe ~200 px. Marker auf Adolph-Roemer-Straße 7. Darunter Adresse als Text |
| **Kontakt** | Header „Kontakt", Telefon (klickbar = `tel:`-Link), Mobil, E-Mail. Telefon-Icon vor jedem |
| **Öffnungszeiten** | Header „Öffnungszeiten", „Mo–So 11–23 Uhr", „Lieferung 11–23", optional Hinweis Pizza-Hour |

**Mobile-Layout (< 768 px):** 2 + 1 hybrid
- Map als breiter Streifen oben (volle Breite, ~140 px hoch)
- Darunter: Kontakt + Öffnungszeiten als 2-spaltiges Grid (jeweils halbe Breite)
- **Bewusst kein einspaltiges Stapeln** — Mobile soll nahe am Desktop bleiben

**Karten-Details:**
- Weißer Hintergrund, Border 1 px solid #eee, Rounded 6 px
- Padding ~16 px Desktop, ~10–12 px Mobile
- Header in Marken-Rot, fett, kleines Caps-Lettering (~12 px Desktop)

### 3.4 Bild-Karussell „Unser Restaurant"

Direkt nach dem Info-Block. Weißer Hintergrund, Padding ~24 px vertikal.

- **Header:** „Unser Restaurant" — wie ein Section-Titel, ~18 px, fett, links ausgerichtet
- **Karussell-Inhalt:**
  - **Desktop (≥ 768 px):** 3 Bilder gleichzeitig sichtbar, Abstand 8 px zwischen den Bildern, jeweils Höhe ~280 px, gerundete Ecken 6 px
  - **Mobile (< 768 px):** 1 Hauptbild voll sichtbar (~70 % Breite), links und rechts ~15–18 % Peek vom Nachbarbild abgedunkelt (`opacity: 0.5`). Erweckt den Eindruck, es gibt mehr zu sehen
- **Steuerelemente:**
  - Pfeile ‹/› auf Desktop (innerhalb des Karussells, halb-transparenter dunkler Kreis bei Hover)
  - Punkte-Indikator mittig unter dem Karussell (aktiver Punkt breiter + Marken-Rot)
  - Wisch-Geste auf Mobile (zwingend)
- **Auto-Rotation:** alle 5 Sekunden, **pausiert bei Hover** (Desktop) und beim Berühren (Mobile)
- **Bilder-Anzahl:** 3–6 Restaurant-Innenraum-Fotos. Mit Bildunterschrift wenn passend

### 3.5 Top-Seller-Reihe „Beliebt bei unseren Gästen"

Hintergrund leicht grauer (#fafafa) für Trennung. Padding ~24 px vertikal.

- **Header:** „Beliebt bei unseren Gästen"
- **Inhalt:**
  - **Desktop:** 4 Items als Grid (gleich breit), z. B. *Pizza Margherita / Döner / Dürüm / Cheeseburger*
  - **Mobile:** 2 Items als Grid (zwei Spalten), oder horizontal scrollbar mit 2,5 sichtbaren Items
- **Item-Karte:** Bild oben (Höhe ~140 px), darunter Name + Preis. **Klick** auf eine Karte führt direkt in den Shop, scrollt dort zum entsprechenden Item (Anker-Link `/shop#item-id`)
- Alle Item-Karten teilen das **gleiche Karten-Design wie im Shop** (visuelle Konsistenz). Aber **kein „+"-Button** auf der Webseite — der Klick führt zum Shop.

### 3.6 Story- + Aktion-Block (zweispaltig Desktop, gestapelt Mobile)

Weißer Hintergrund, Padding ~32 px vertikal. **Desktop:** 2 Spalten im Verhältnis 2 : 1, **Mobile:** Story-Block oben, Aktion darunter.

| Spalte | Inhalt |
|---|---|
| **Story (breiter, links)** | 1–2 Absätze über das Restaurant. Fett: „Hausgemacht. Frisch. Schnell." Darunter z. B. *„Unsere Pizzen kommen aus dem Steinofen, der Drehspieß läuft den ganzen Tag, und die Soßen rühren wir selbst. Vor-Ort-Plätze, Lieferung im gesamten Raum Clausthal-Zellerfeld und natürlich Abholung."* |
| **Aktion (schmaler, rechts)** | Highlight-Box mit aktueller Aktion, z. B. „PIZZA-HOUR — ab 9,00 € — große Pizzen 21–23 Uhr". Hintergrund Akzent-Gelb (Linear-Gradient #ffeb3b → #fbc02d), Padding 16 px, Rounded 6 px, Text in dunklem Braun (#5d4037) für Lesbarkeit |

Aktion-Block ist optional und nur sichtbar, wenn aktuelle Aktion läuft (steuerbar via `data/config.json`).

### 3.7 Footer

Hintergrund #222 (sehr dunkel), Text in #bbb. Padding ~32 px vertikal.

- **Desktop (≥ 768 px):** 4 Spalten, Verhältnis 2 : 1 : 1 : 1
  - **Spalte 1 (breit):** Restaurant-Identität: „EURO-DÖNER PIZZERIA" als weiße Headline, darunter Adresse, Telefon
  - **Spalte 2:** „Restaurant" → Über uns · Standort · Galerie
  - **Spalte 3:** „Bestellen" → Speisekarte · Shop · Allergene
  - **Spalte 4:** „Rechtliches" → Impressum · Datenschutz · AGB · Widerrufsrecht
- **Mobile (< 768 px):** 2 Spalten — Spalte 1 wird Spalte für sich (volle Breite), dann Restaurant + Bestellen + Rechtliches als 2-spaltiges Grid
- **Footer-Bottom:** dezente Trennlinie, dann zentriert „© 2026 Euro-Döner Pizzeria · Alle Rechte vorbehalten" in noch dezenterem Grau (#666)
- **Spalten-Header:** weiß, fett, ~12 px, Caps-Lettering oder Title-Case
- **Links:** #bbb, ohne Unterstreichung; Hover → weiß

---

## 4 — Side-Drawer-Navigation (Mobile)

Aktiviert durch Tap auf ≡ Hamburger-Button in der Top-Bar.

- **Animation:** Slide-in von rechts, ~300 ms ease-out. Backdrop fadet parallel ein
- **Breite:** ~75 % vom Viewport, max. 320 px
- **Hintergrund:** weiß, kein Schatten innen, aber Box-Shadow nach links auf Inhalt darunter
- **Schließen:** Tap auf Backdrop, Wisch nach rechts, oder ✕ oben rechts im Drawer
- **Inhalt von oben nach unten:**
  1. Header mit Logo
  2. Nav-Links als Liste, je 44 px Höhe (Tap-Target):
     - 🏠 Startseite (aktiv markiert wenn auf `/`)
     - 📖 Speisekarte
     - ℹ Über uns
     - 📍 Standort
     - 📷 Galerie
     - ✉ Kontakt
  3. Spacer
  4. Großer „🛒 Jetzt bestellen"-CTA, volle Drawer-Breite minus Padding, Marken-Blau
  5. Mini-Footer mit Impressum / Datenschutz / AGB als kleine Text-Links

**Wichtig:** Drawer-Inhalt scrollbar wenn nötig, aber bei normaler Inhaltsmenge fit ohne Scroll.

**Auf Desktop ab 1024 px:** Drawer wird zur klassischen Top-Nav umgewandelt — alle Links direkt in der Top-Bar sichtbar, Hamburger entfällt komplett.

---

## 5 — Design-Tokens

### 5.1 Farben

| Token | Wert | Verwendung |
|---|---|---|
| `--color-brand-red` | `#c62828` (oder #d32f2f) | Logo-Schrift, Headers, Marken-Akzente |
| `--color-brand-orange` | `#e65100` / `#ff6f00` | Hero-Gradient-Endfarbe, Aktion-Highlights |
| `--color-action-blue` | `#1976d2` | Primär-Button „Bestellen", Shop-Bereich, Akzent-Aktionen |
| `--color-action-blue-dark` | `#0d47a1` | Hover für Action-Blau |
| `--color-success` | `#2e7d32` | Status-Hinweise (z. B. „PLZ wird beliefert") |
| `--color-warning` | `#f57c00` | Aktion-Banner |
| `--color-text` | `#1a1a1a` | Default-Text |
| `--color-text-muted` | `#666` | Sekundär-Text |
| `--color-bg` | `#ffffff` | Default-Hintergrund |
| `--color-bg-soft` | `#fafafa` | Section-Trennung-Hintergrund |
| `--color-border` | `#e8e8e8` | Karten-Border |
| `--color-footer-bg` | `#222222` | Footer |
| `--color-footer-text` | `#bbb` | Footer-Text |

### 5.2 Typografie

- **Schriftfamilie:** System-Font-Stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`. Optional: eine Display-Schrift für den Hero-Slogan (z. B. *Playfair Display* oder *Montserrat Bold*) — der Restaurant-Charakter erlaubt etwas Persönlichkeit
- **Skala:**
  - Hero-Headline: 36–48 px Desktop / 24–28 px Mobile, Bold, Line-Height 1.2
  - H2 (Section-Header): 24–28 px / 20 px, Bold
  - H3: 18–20 px, Semibold
  - Body: 16 px (Mindestlesbarkeit), Line-Height 1.6
  - Small/Caption: 13–14 px (Footer 12 px ist OK)
  - **Mindest-Schriftgröße auf Mobile: 14 px**, Buttons 16 px
- **Gewichtungen:** 400 (regular), 600 (semibold), 700 (bold)
- **Letter-Spacing:** Caps-Header gerne mit `letter-spacing: 1px`

### 5.3 Abstände &amp; Layout

- **Container-Max-Breite:** 1100–1200 px, zentriert
- **Section-Padding:** 64 px vertikal Desktop, 32 px Mobile
- **Inter-Element-Abstand:** 16 / 24 / 32 / 48 / 64 px (8-Punkt-Raster)
- **Border-Radius:** 4 px (klein), 6 px (Karten/Buttons), 10 px (Modals)
- **Tap-Targets:** Mindestens 44×44 px (WCAG)

### 5.4 Schatten

- **Karten:** keine oder sehr subtil (`0 1px 3px rgba(0,0,0,0.04)`)
- **Hero-Button (primary):** `0 4px 12px rgba(25,118,210,0.4)`
- **Drawer:** `2px 0 8px rgba(0,0,0,0.2)`
- **Sticky-Top-Bar bei Scroll:** `0 2px 8px rgba(0,0,0,0.05)`

---

## 6 — Komponenten-Inventar

Diese Komponenten werden für die Startseite gebraucht (zum Designen):

1. **TopBar** — sticky, mit Logo, Nav-Links (Desktop) / Hamburger (Mobile), Bestellen-Button
2. **Hero** — Vollbreite-Section mit Hintergrundbild, Overlay, Slogan, 2 CTAs
3. **InfoCard** — generisch für die 3-Spalten-Block-Karten (Map / Kontakt / Öffnungszeiten)
4. **MapEmbed** — OpenStreetMap-Wrapper mit Marker, Höhe konfigurierbar
5. **PhoneLink** — Telefon-Icon + klickbare Nummer mit `tel:`-Link
6. **ImageCarousel** — Karussell mit Auto-Rotation, Pfeile (Desktop), Wisch-Geste (Mobile), Punkte-Indikator
7. **ItemCard** (read-only Variante) — Bild + Name + Preis, klickbar zur Speisekarten-Anker
8. **AktionsBox** — Highlight-Banner für Pizza-Hour / Tagesangebot
9. **Footer** — 4-spaltig Desktop / 2-spaltig Mobile, mit Bottom-Copy
10. **SideDrawer** — Slide-in-Nav für Mobile, mit Backdrop, Schließ-Wisch
11. **Button** — Primary (blau) / Secondary (weiß / outline) Varianten

---

## 7 — Verhalten &amp; States

### 7.1 Loading-States

- **Initiale Seite:** kein Spinner — alles statisch generiert (SSG/SSR), HTML kommt vor JS
- **Map:** lädt asynchron, Skelett-Placeholder (graue Box mit „🗺 Lädt Karte…")
- **Karussell-Bilder:** Skelett-Placeholder (gleiche Größe, Shimmer-Animation), bis Bild geladen
- **Hero-Bild:** als Low-Quality-Image-Placeholder (LQIP) zuerst, dann scharf

### 7.2 Hover-States (Desktop)

- **Buttons:** leichte Helligkeit-Steigerung oder Schatten-Vergrößerung
- **Karussell-Pfeile:** erscheinen bei Hover über Karussell, sonst verstecken
- **Nav-Links:** Underline animation + Akzent-Farbe

### 7.3 Active-/Focus-States

- **Aktive Nav-Link** (auf der jeweiligen Seite): Marken-Rot, fett, oder Underline darunter
- **Focus-Outline:** 2 px solid Marken-Blau für Tastatur-Navigation, 4 px Offset

### 7.4 Empty-/Error-States

- **Karten-Embedding fehlgeschlagen:** Statisches Fallback-Bild der Region + Text „Karte konnte nicht geladen werden — Adresse: Adolph-Roemer-Straße 7"
- **Bilder fehlen:** Kategorie-Platzhalter (z. B. einfache farbige Box mit Icon „📷")

### 7.5 Animationen

Sparsam einsetzen, alle ≤ 300 ms:
- Drawer Slide-in: 300 ms ease-out
- Karussell-Wechsel: 400 ms ease-in-out
- Hover-Effekte: 150 ms
- Section-Entry beim Scroll (optional): leichtes Fade-up für Karten, 400 ms

**Respektiere `prefers-reduced-motion`** — wenn aktiv, alle Animationen unter 50 ms oder deaktiviert.

---

## 8 — Responsive-Breakpoints

| Breakpoint | Verhalten |
|---|---|
| `< 480 px` | Single-Column für stark gestapelte Inhalte. Aber: Info-Block bleibt 2-spaltig, Top-Seller bleibt 2-spaltig |
| `480–767 px` | „Mobile-Mid". Karussell zeigt 1 Hauptbild + Peek |
| `768–1023 px` | „Tablet". 3-Spalten-Info-Block aktiv. Hamburger-Nav noch aktiv |
| `≥ 1024 px` | „Desktop". Top-Nav direkt sichtbar (kein Hamburger). Karussell zeigt 3 Bilder |
| `≥ 1280 px` | „Desktop-XL". Container max. 1100 px, zentriert |

---

## 9 — Inhaltlicher Tonus &amp; Texte

- **Sprache:** Deutsch (primär), Englisch als Sekundär-Sprache (Toggle in Top-Bar oder Footer)
- **Anrede:** „Du" (informell — passt zu Pizzeria-Charakter)
- **Headlines:** kurz, einprägsam, leicht emotional — „Frisch &amp; lecker"; „Hausgemacht. Frisch. Schnell."
- **Texte:** kein Marketing-Sprech, einfach was das Restaurant ausmacht — Steinofen, Drehspieß, Familie, lokal

---

## 10 — Bild-Anforderungen

| Slot | Anzahl | Format | Auflösung |
|---|---|---|---|
| Hero-Hintergrund | 1 | JPG/WebP | 2400 × 1200 (mindestens 1920 × 960) |
| Karussell „Unser Restaurant" | 3–6 | JPG/WebP | 1200 × 800 (mindestens) |
| Top-Seller (4 Items) | 4 | JPG/WebP | 600 × 400 (16:9-ähnlich) |
| Logo | 1 | SVG (bevorzugt) oder PNG mit Transparenz | min. 256 × 256 |

Alle Fotos werden via `next/image` automatisch in AVIF/WebP optimiert + responsive srcset.

---

## 11 — Zugänglichkeit (Accessibility)

- **Alt-Text** für alle Bilder (Hero, Galerie, Top-Seller). Bei dekorativen Bildern: leeres Alt
- **Kontrast:** WCAG AA, mindestens 4.5 : 1 für normalen Text, 3 : 1 für große Texte
- **Tastatur-Navigation:** alle interaktiven Elemente erreichbar via Tab
- **Skip-Link „Zum Inhalt springen"** für Screen-Reader
- **Overlay-Drawer:** focus trap aktiv solange offen, Escape-Taste schließt
- **Karussell:** pausierbar (auch via Tastatur), Slide-Wechsel für Screen-Reader announced

---

## 12 — Was nicht auf die Startseite gehört

Damit keine Verwechslung entsteht:

- ❌ **Kein „+"-Button** auf Items (das ist nur im Shop)
- ❌ **Kein Warenkorb** sichtbar
- ❌ **Keine Checkout-Felder**
- ❌ **Keine vollständige Speisekarte** (200 Items) — die hat eine eigene Seite `/speisekarte`
- ❌ **Keine ausführliche Über-uns-Story** — nur Snippet/Teaser, volle Story auf `/ueber-uns`
- ❌ **Kein Login / kein Konto** (Konzept ist Gastbestellung)
- ❌ **Kein Cookie-Banner-Inhalt** in dieser Datei (Cookie-Banner ist eigene Komponente, brieft separat)
- ❌ **Keine Zahlungs-Logos** im Footer (gehört zum Shop)

---

## 13 — Inspirationen / Referenzen

Tonus-Vorbilder (zur Stimmungs-Ausrichtung):
- **L'Osteria** (Restaurant-Kette) — warm, foto-fokussiert, klare CTAs
- **Hans im Glück** — kompakte Hero mit großen Buttons
- **Vapiano** — gute Mischung aus Design-Anspruch und Restaurant-Pragmatik

**Nicht** als Vorbild: generische Lieferando-/Just-Eat-Restaurantseiten (zu sehr auf Bestellung allein optimiert, ohne Charakter).

---

## 14 — Liefer-Checkliste

Was soll am Ende vorliegen:

- [ ] Desktop-Mockup (≥ 1280 px) vollständig
- [ ] Tablet-Mockup (~ 800 px)
- [ ] Mobile-Mockup (~ 375–414 px)
- [ ] Mobile-Drawer (offen) gesondert
- [ ] Komponenten-Bibliothek mit allen wiederverwendeten Bausteinen
- [ ] Color-Token-Sheet
- [ ] Typografie-Sheet
- [ ] Hover/Focus-States für interaktive Elemente
- [ ] Beispiel-Bild-Auswahl (kann Stock/AI sein für Design-Phase, später echte Fotos)

---

## 15 — Dateien zur Querreferenz

- `docs/superpowers/specs/2026-05-07-eurodoener-design.md` — vollständige technische Spec
- `docs/design/02-shop-design-brief.md` — Design-Brief für den Shop-Bereich
- `docs/praesentation/eurodoener-konzept.html` — visuelle Mockup-Präsentation mit Alternativen
- `Infos/design_relevante_infos/speisekarte1.jpg` — Original-Speisekarte (für Marken-Farbe und Inhalts-Referenz)
