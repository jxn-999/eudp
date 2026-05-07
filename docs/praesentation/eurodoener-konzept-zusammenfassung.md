# Euro-Döner Pizzeria — Aufbau & Features (Beratungs-Stand)

**Stand:** Mai 2026
**Restaurant:** Euro-Döner Pizzeria, Adolph-Roemer-Straße 7, 38678 Clausthal-Zellerfeld

> Begleit-Dokument zur Präsentation. Die volle visuelle Version mit allen
> Mockups + Alternativen liegt in `eurodoener-konzept.html`.

---

## Konzept in einem Satz

Eine Domain (z. B. `eurodoener.de`) — zwei klar getrennte Bereiche:
**Webseite** (Marketing/Information, klassisches Restaurant-Gefühl) +
**Shop** (App-artig, fokussiert, schnell).

---

## Aufbau der Webseite

### Startseite — gewählte Variante: kompakte Landing-Page

- Top-Bar mit Logo + Navigation (PC) bzw. ≡ Hamburger (Handy)
- Hero über dem Fold mit Lifestyle-Bild + 2 großen Buttons:
  - 📖 *Zur Speisekarte* (sekundär)
  - 🛒 *Jetzt bestellen* (primär)
- Drei-Spalten-Block: Karte / Kontakt / Öffnungszeiten
- Bild-Karussell „Unser Restaurant" (3 Bilder Desktop, 1 Mobile mit Peek)
- Top-Seller-Reihe (4 Items mit Bild)
- Kurze Story + ggf. Aktion (z. B. Pizza-Hour)
- 4-spaltiger Footer

**Diskutiert:** Onepager-Variante (alles auf einer langen Seite) und Splash-Variante
(nur Hero + 1 Knopf) als Alternativen.

### Tiefen-Seiten
- `/speisekarte` — Lese-Version, kein Bestell-Button
- `/ueber-uns` — Geschichte und Charakter
- `/standort` — Karte, Adresse, Anfahrt, Öffnungszeiten
- `/galerie` — alle Restaurant-Fotos
- `/kontakt` — Telefon, E-Mail, Formular
- `/impressum`, `/datenschutz`, `/agb`, `/widerrufsrecht`

### Navigation — gewählte Variante: Hybrid
- Desktop: alle Links direkt in der Top-Bar sichtbar
- Mobile: ≡ Knopf öffnet seitlichen Drawer mit allen Links + großem
  „🛒 Jetzt bestellen"-CTA unten

**Diskutiert:** „Hamburger überall" und „Bottom-Tab-Bar wie App" als Alternativen.

---

## Aufbau des Shops

### Item-Übersicht — gewählte Variante: Grid-Karten
- Eigener blauer Header (signalisiert „Bestell-Modus")
- Lieferung/Abholung-Toggle oben rechts
- Sticky Kategorie-Filter (Pizza, Döner, Burger, …)
- Item-Karten als Grid: Bild oben, Name + Beschreibung, Preis + „+"-Knopf

**Diskutiert:** Listen-Layout (mehr Items pro Bildschirm) als Alternative.

### Item-Detail — gewählte Variante: zentriertes Pop-up
- Auf Desktop UND Mobile als Pop-up in der Mitte (kein Bottom-Sheet)
- Bild, Beschreibung, Allergene, Größenwahl (mit cm-Angabe), Extras,
  Sonderwunsch-Feld, Mengen-Stepper, „In Warenkorb"-Knopf
- Größenwahl wird nur eingeblendet, wenn das Item Größen hat (Pizza ja, Burger nein)

**Diskutiert:** Bottom-Sheet auf Mobile / eigene Detail-Seite als Alternativen.

### Warenkorb — gewählte Variante: persistent
- Desktop: Cart als rechte Sidebar dauerhaft sichtbar
- Mobile: Sticky-Cart-Bar unten („🛒 3 Items · 17,00 € →")
- Items mit Bild-Thumbnail, Mengen-Stepper, Entfernen-Knopf

**Diskutiert:** Cart-Icon mit Drawer / klassische Cart-Seite als Alternativen.

### Checkout — 3 Schritte
1. **Lieferart:** Lieferung oder Abholung, sofort oder Wunschzeit
2. **Daten:** Name, Telefon, E-Mail, ggf. Adresse mit PLZ-Live-Prüfung,
   bei Abholung Sicherheits-Code
3. **Zahlung:** PayPal / Karte / Apple/Google Pay — keine Bar-Zahlung

### Bestätigungsseite
- Großes ✅ + Sicherheits-Code prominent (z. B. `EUR-A4F7`)
- Status-Stepper: Bezahlt → Vorbereitung → Unterwegs → Geliefert
- Polling alle 15 s für Live-Updates
- Geschätzte Zeit, Adresse, Bezahlt-mit-Info

---

## Restaurant-Workflow

- WLAN-Bondrucker im Restaurant druckt Bestellungen automatisch
- Drucker pollt Server alle 3–5 s — kein VPN, kein Port-Forwarding
- Backup-E-Mail bei Drucker-Ausfall (nach 2 Min ohne Druck-Bestätigung)
- Internes Bestell-Panel zum Bestätigen + Status-Setzen

---

## Features im Überblick

**Webseite:**
- Mobile-first responsives Design · Schnelle Ladezeiten · Deutsch/Englisch ·
  OpenStreetMap (kein Google) · Cookie-Banner mit echter Wahl · SEO-fertig ·
  Direkt-Anruf · Bild-Karussell

**Shop:**
- Lieferung mit PLZ-Check · Abholung mit Sicherheits-Code · Sofort/Wunschzeit ·
  Größen + Extras + Sonderwunsch · Allergene/Zusatzstoffe · Online-Zahlung ·
  Live-Status · E-Mail-Bestätigung · Adress-Memory · Nur in Öffnungszeit

**App-Gefühl:**
- Als „App" installierbar (PWA) · Eigenes Icon auf Home-Screen ·
  Speisekarte offline lesbar · Smooth Übergänge

---

## Was vor dem Bauen zu klären ist

- **Hero-Stimmung:** welches Foto/Look soll auf die Startseite?
- **Speisen-Fotos:** Profi-Shoot, Smartphone, oder AI-Bilder als Start?
- **Über-uns-Text:** wer schreibt was?
- **PLZ-Liste + Liefergebühren** je PLZ
- **Allergene + Zusatzstoffe** pro Gericht (LMIV-Pflicht)
- **Domain-Wunsch** + Logo in hoher Auflösung
- **Sprachen:** Englisch von Anfang an oder später?
- **Aktionen** (Pizza-Hour, Mittagsangebote) — relevant?

Eine vollständige Checkliste mit allem, was wir brauchen, liegt in
`fehlende_infos/infos.txt`.

---

## Volle technische Spezifikation

`docs/superpowers/specs/2026-05-07-eurodoener-design.md`
