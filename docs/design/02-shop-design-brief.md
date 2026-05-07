# Design-Brief — Online-Shop

> **Zweck dieser Datei:** Vollständiger Briefing-Text für ein Design-Tool / Design-Agent,
> um daraus visuelles Design (Mockups, hi-fi Designs, Figma) auszuarbeiten.
> Diese Datei ist self-contained — alles, was zum Shop besprochen wurde, ist hier.

---

## 1 — Kontext

**Projekt:** Webseite + integrierter Online-Shop für die **Euro-Döner Pizzeria**, Adolph-Roemer-Straße 7, 38678 Clausthal-Zellerfeld. Das Restaurant existiert seit über 10 Jahren, bietet ~200 Gerichte (Pizza, Döner, Burger, Pasta, Schnitzel, Aufläufe), liefert + Vor-Ort-Service.

**Diese Datei deckt ab:** Den **Online-Shop-Bereich** unter URL-Prefix `/shop/...`. Alle Bestell-, Cart- und Checkout-Screens. **Nicht** die Marketing-Webseite — die hat einen eigenen Brief (`01-startseite-design-brief.md`).

**Stimmung:** Komplett anders als die Webseite — **App-artig, fokussiert, schnell**. Kein „Restaurant-Atmosphäre"-Auftritt, sondern eine effiziente Bestell-Maschine. Wenn die Webseite ein Schaufenster ist, ist der Shop die Kasse: aufgeräumt, klare Schritte, keine Ablenkung.

**Zielgruppe:**
- Bestehende Kunden, die schnell und mobil bestellen wollen
- Neue Kunden, die von der Webseite überspringen, mit Bestellabsicht
- Stammkunden, die in 60–90 Sekunden Standard-Bestellung wiederholen wollen

**Nutzungs-Schwerpunkt:** ~80 % Mobile, ~20 % Desktop. Mobile-first ist hier kein Lippenbekenntnis sondern Realität.

---

## 2 — Top-Level-Entscheidungen (verbindlich)

1. **Shop hat eigene Layout-Identität** — eigener farbiger Header (Blau-Akzent), keine Marketing-Top-Bar/Footer. Über Next.js Route Groups technisch getrennt vom Webseiten-Layout
2. **Item-Detail erscheint als zentriertes Pop-up** auf **beiden** Plattformen (PC und Handy). **Kein Bottom-Sheet** auf Mobile (bewusste Entscheidung — soll überall gleich aussehen)
3. **Cart immer sichtbar:** Desktop als persistente Sidebar rechts, Mobile als Sticky-Bar unten
4. **Item-Karten zeigen den Preis der Standard-Variante** — kein „ab"-Präfix
5. **Kein Login, nur Gastbestellung** — Name + Telefon + ggf. Adresse pro Bestellung neu (Browser merkt sich die letzte Eingabe)
6. **Online-Vorkasse only** — keine Bar-Zahlung. PayPal + Karte (Stripe).
7. **Bei Abholung:** Sicherheits-Code (z. B. `EUR-A4F7`) wird vergeben. Kunde zeigt ihn beim Abholen
8. **3-Schritt-Checkout** (Lieferart → Daten → Zahlung) als getrennte Screens mit klarem Progress
9. **PWA-fähig** — als „App" auf Home-Screen installierbar

---

## 3 — Screens-Inventar

Der Shop besteht aus diesen Hauptscreens (in Bestell-Reihenfolge):

| URL | Inhalt |
|---|---|
| `/shop` | Item-Übersicht mit Kategorie-Filter |
| `/shop/warenkorb` | Cart-Review-Seite (auf Desktop optional, da Sidebar persistent) |
| `/shop/checkout/lieferart` | Schritt 1 — Lieferung oder Abholung, Zeit |
| `/shop/checkout/daten` | Schritt 2 — Adresse / Name |
| `/shop/checkout/zahlung` | Schritt 3 — Zahlung |
| `/shop/bestellung/[code]` | Bestätigungsseite mit Status-Stepper |

Plus interaktive Overlays (keine eigene URL):
- **Item-Detail-Modal** (zentriertes Pop-up)
- **Bild-Lightbox** (Vollbild-Bildansicht)

---

## 4 — Shop-Header (auf allen Shop-Screens)

Der Shop-Header ist **das wichtigste Erkennungssignal**, dass der Nutzer im Bestell-Modus ist.

- **Höhe:** ~56 px Desktop, ~48 px Mobile
- **Hintergrund:** **Marken-Blau (#1976d2)** — vollflächig
- **Text-Farbe:** weiß
- **Inhalt links:**
  - **„←" Zurück-Knopf** (führt auf vorherige Seite oder zurück auf Webseite-Startseite)
  - **„Bestellen"** als kurzer Titel oder kontextueller Titel (z. B. „Warenkorb" auf Cart-Seite, „Schritt 2 von 3" im Checkout)
- **Inhalt rechts (auf `/shop`-Übersicht):**
  - **Lieferung/Abholung-Toggle** mit 2 Buttons:
    - „🚴 Lieferung" (aktiv = etwas dunklerer Hintergrund mit weißem Text + leichter Border)
    - „🛍 Abholung" (inaktiv = nur Text)
  - Toggle wechselt sofort, der Cart bleibt gleich, aber Liefergebühren werden neu berechnet
- **Inhalt rechts (auf Checkout-Screens):** Schritt-Indikator (siehe Checkout-Section)

**Kein Logo** im Shop-Header — bewusst minimal. Der Nutzer ist hier für eine Aktion, nicht für Branding.

---

## 5 — Screen 1: `/shop` — Item-Übersicht

### 5.1 Layout-Aufbau

**Desktop (≥ 768 px):** 2-Spalten-Layout
- Linke Spalte (flex-1): Items
- Rechte Spalte (220 px fest): persistente Cart-Sidebar

**Mobile (< 768 px):** 1-Spalten-Layout
- Items füllen volle Breite
- Sticky-Cart-Bar unten am Bildschirmrand
- Bottom-Tab-Navigation darunter

### 5.2 Kategorie-Pills (sticky)

Direkt unter dem Shop-Header, weißer Hintergrund mit dünnem unterem Border.

- **Pills:** *Pizza · Döner · Burger · Pasta · Schnitzel · Getränke · Drehspieß · …*
- **Aktive Pill:** Marken-Blau-Hintergrund, weißer Text, fett
- **Inaktive Pills:** Hellgrau (#eee) Hintergrund, dunkler Text
- **Padding pro Pill:** 6–8 px vertikal × 14 px horizontal
- **Rounded:** 14–16 px (Pill-Form)
- **Sticky-Verhalten:** bleibt beim Scrollen oben kleben (unter dem Shop-Header)
- **Mobile:** horizontal scrollbar, mit fade-out an den Rändern für Indikation
- Klick auf Pill → smooth-scroll zum Kategorie-Anker, Pill wird aktiv

### 5.3 Item-Grid

Hintergrund #fafafa für leichte Abgrenzung von Header/Pills.

- **Desktop:** 3 Spalten, 16 px Gap
- **Tablet (640–767 px):** 2 Spalten
- **Mobile (< 640 px):** entweder 2 Spalten oder Listen-Variante (zu evaluieren — Default: 2 Spalten)

**Item-Karte (Bauplan):**

```
┌──────────────────────┐
│                      │
│   [Foto]   ⤢ Lupe   │  ← Foto klickbar = Lightbox
│                      │
├──────────────────────┤
│ Pizza Hawaii         │
│ Schinken, Ananas     │
│ Standard: Groß 32 cm │  ← klein, grau, nur bei mehreren Varianten
│                      │
│  10,50 €      ⊕      │  ← Preis links, „+" Knopf rechts
└──────────────────────┘
```

- **Foto:** Höhe ~140 px Desktop / ~120 px Mobile, gerundete Ecken oben
- **Foto-Lightbox-Indikator:** kleines ⤢ Icon unten rechts auf Foto, halb-transparent
- **Klick auf Foto** → öffnet Bild-Lightbox (Vollbild, schwarzer Hintergrund, ✕ zum Schließen)
- **Klick auf „+"-Button oder die Item-Karte (außerhalb Foto)** → öffnet Item-Detail-Modal
- **Name:** fett, 14–16 px
- **Beschreibung:** 12–13 px, grau (#666), 1 Zeile mit Ellipsis bei Überlauf
- **„Standard:"-Hinweis:** nur sichtbar wenn das Item mehr als 1 Variante hat. Sehr klein (10–11 px), grau (#999)
- **Preis:** Marken-Rot, 14–16 px, fett. **Kein „ab"-Präfix.** Preis ist die Standard-Variante (z. B. „Groß 32 cm")
- **„+"-Button:** rund 26–28 px, Marken-Blau-Hintergrund, weißes „+", leichter Schatten

### 5.4 Cart-Sidebar (Desktop)

Rechte Spalte, 220 px breit, persistent. Hintergrund #f5f5f5.

- **Header:** „🛒 Dein Warenkorb" + Item-Count rechts in Grau
- **Cart-Item-Zeile:**
  - Bild-Thumbnail (40×40 px, Rounded 4 px) — hilft schnellem Wiedererkennen
  - Item-Name fett, gewählte Variante drunter klein/grau, ggf. Extras drunter
  - Preis rechts oben, Mengen-Stepper rechts unten oder unter dem Preis
  - „×"-Knopf zum Entfernen (rechts oben oder als kleiner Link drunter)
- **Footer der Sidebar (sticky-bottom innerhalb der Sidebar):**
  - Zwischensumme
  - Liefergebühr (mit Hinweis bei „Abholung" auf 0,00 €)
  - **Summe** (fett)
  - Großer „**Zur Kasse →**"-Button, volle Breite, Marken-Blau, Bold

### 5.5 Sticky-Cart-Bar (Mobile)

Statt Sidebar: ein blauer Streifen am unteren Bildschirmrand, klebt während des Scrollens.

- **Höhe:** ~52 px
- **Hintergrund:** Marken-Blau
- **Inhalt:** Links Item-Count („🛒 3 Items"), rechts Summe + „→" („17,00 € →")
- **Klick** → führt zur `/shop/warenkorb`-Seite oder direkt zu `/shop/checkout/lieferart`
- **Animation:** wenn ein Item hinzugefügt wird, kurzer Pulse + Badge-Bump
- **Wenn Cart leer:** Bar wird ausgeblendet (Slide-down)

### 5.6 Bottom-Tabs (Mobile)

Direkt unter Sticky-Cart-Bar. Klassische App-artige Navigation.

- 4 Tabs:
  - 🛒 **Shop** (aktiv auf Shop-Übersicht)
  - 🛍 **Abholen** (Toggle für Abholung)
  - 🚴 **Liefern** (Toggle für Lieferung)
  - ← **Webseite** (führt zurück zur Marketing-Seite)
- **Höhe:** ~52 px, weißer Hintergrund, oberer Border
- **Aktiver Tab:** Icon + Label in Marken-Blau, fett
- **Inaktive Tabs:** in Grau (#999)
- **Tap-Targets:** mindestens 44 px hoch

---

## 6 — Item-Detail-Modal (zentriertes Pop-up)

Erscheint **modal über der Übersicht** wenn Nutzer „+" oder Item-Karte (nicht Foto) klickt.

### 6.1 Verhalten

- **Backdrop:** halbtransparent dunkel (`rgba(0,0,0,0.5)`), Klick darauf schließt
- **Pop-up-Position:** zentriert (sowohl horizontal als auch vertikal) auf **beiden** Plattformen
- **Schließen via:** Backdrop-Klick, ✕ oben rechts im Pop-up, Escape-Taste
- **Keine Slide-up-Animation von unten** — fade-in + leichtes scale (0.95 → 1.0) in 200 ms
- **Body-Scroll wird blockiert** solange Modal offen

### 6.2 Pop-up-Struktur

**Desktop (≥ 640 px):** Pop-up ~600 px breit, max. 90 % Viewport-Höhe. Wenn Inhalt länger → scrollbar.

**Mobile (< 640 px):** Pop-up ~92 % Viewport-Breite, max. 88 % Viewport-Höhe. Inhalt scrollbar wenn nötig.

**Inhalt von oben nach unten (oder Desktop: zweispaltig mit Bild links):**

1. **Header-Zeile:** Item-Name (fett, 18–20 px) links, ✕ Schließen-Knopf rechts
2. **Hauptbild** (auf Mobile: oben, Höhe ~180 px / Desktop: linke Spalte ~200 px breit, Höhe ~160 px). Klickbar → Lightbox
3. **Beschreibung:** Zutaten-Text, ~13–14 px, grau
4. **Allergene/Zusatzstoffe-Box:** gelblicher Hintergrund (#fff8e1), Padding 6–8 px, Rounded 4 px, Text in dunkelbraun (#5d4037), Format „⚠ Allergene: Gluten, Milch · Zusatzstoffe: 1, 2"
5. **Größe wählen** (nur bei `variants.length > 1`):
   - Header „Größe wählen *" fett
   - 3-Button-Reihe gleich breit (oder 2 / 4 je nach Item)
   - Pro Button: Größen-Label (z. B. „Klein"), cm-Angabe (z. B. „26 cm"), Preis darunter
   - **Standard-Variante:** mit kleinem Badge oben („STANDARD" als Capsule), Border 2 px Marken-Blau, Hintergrund #e3f2fd
   - **Andere Varianten:** Border 1 px #ddd, neutraler Hintergrund
   - Klick wechselt Auswahl; Preis-Anzeige im „In Warenkorb"-Button updated live
6. **Extras (optional)** — nur wenn `extras.length > 0`:
   - Header „Extras (optional)"
   - Liste von Checkboxen mit Label + Preis (z. B. „☐ Extra Käse +1,50 €")
   - 2-spaltig auf Desktop, 1-spaltig auf Mobile
7. **Sonderwunsch an die Küche:**
   - Header „Sonderwunsch"
   - Textarea (3–4 Zeilen Höhe), Placeholder „z. B. ohne Zwiebeln, gut durchgebacken, Boden dünn…"
8. **Bottom-Action-Zeile:**
   - **Mengen-Stepper** links: Border, „−" + Zahl + „+", Padding sodass Tap-Targets ≥ 44 px
   - **„In den Warenkorb · 10,50 €"-Button** rechts (flex: 1), Marken-Blau, weiß, Bold, mit Live-Preis (Variante × Menge + Extras)

### 6.3 Items ohne Größenwahl

Wenn `variants.length === 1` (z. B. Burger, Schnitzel, einfache Getränke):
- Größen-Block wird **komplett ausgelassen**
- Direkt von Beschreibung/Allergenen → Extras → Sonderwunsch → Action

---

## 7 — Bild-Lightbox

Vollbild-Bildansicht für Item- und Restaurant-Fotos.

- **Hintergrund:** Schwarz (oder sehr dunkler Overlay rgba(0,0,0,0.95))
- **Bild zentriert**, contained (höchstens 90 % Viewport-Breite, 90 % Viewport-Höhe)
- **✕-Schließen** oben rechts
- **‹/›-Navigation** wenn Item mehrere Bilder hat (für später, bei nur 1 Bild ausblenden)
- **Wisch-Geste auf Mobile** für Wechsel
- **Doppel-Tap** zoomt rein (optional, nice-to-have)
- Schließbar via ✕, Escape, Klick auf Hintergrund (außerhalb Bild)

---

## 8 — Screen 2: `/shop/warenkorb` — Cart-Seite

Hauptsächlich für Mobile relevant, Desktop hat Cart als Sidebar.

- **Header:** Shop-Header mit „←" + „Warenkorb (3)"
- **Item-Liste:**
  - Pro Item: Karte mit hellem Hintergrund (#f5f5f5), Padding 12 px, Rounded 6 px
  - Innen: Bild-Thumbnail links (48–60 px), Inhalt mittig, Preis rechts oben
  - Inhalt: Item-Name (fett), gewählte Variante (z. B. „Groß 32 cm"), Extras (z. B. „+ Extra Käse"), Sonderwunsch-Notiz (italic, falls vorhanden)
  - Aktion-Zeile unten in der Karte: Mengen-Stepper links, „entfernen"-Link rechts (in Marken-Rot)
- **Trennlinie** (gestrichelt) vor Summen-Block
- **Summen-Block:**
  - Zwischensumme
  - Liefergebühr (mit kleinem Info-Icon, Hover/Tap zeigt: „1,50 € basierend auf PLZ")
  - **Gesamt** (fett, größere Schrift)
- **„Weiter zur Bestellung →"-Button** unten, volle Breite, Marken-Blau, Bold

**Wenn Cart leer:**
- Großes Icon (z. B. 🛒) in der Mitte
- Headline: „Dein Warenkorb ist leer"
- Untertext: „Stöber in der Speisekarte und füg was hinzu!"
- Button: „Zurück zum Shop" → `/shop`

---

## 9 — Checkout (3 Schritte)

Konsistente Layout-Struktur über alle 3 Screens:

- **Shop-Header:** „←" + „Bestellung" + ✕-Knopf rechts (führt zurück zum Cart, mit Bestätigung „Bestellung verwerfen?")
- **Progress-Indikator** direkt unter dem Header:
  - Horizontaler Balken (3 px hoch, hellgrau Hintergrund), gefüllt zu 33 % / 66 % / 100 % je nach Schritt, Marken-Blau
  - Darunter: Schritt-Labels „1. Lieferart · 2. Daten · 3. Zahlung". Aktueller Schritt fett + Marken-Blau, abgeschlossene mit ✓-Präfix, kommende grau

### 9.1 Schritt 1 — Lieferart (`/shop/checkout/lieferart`)

- **Headline:** „Wie möchtest du bestellen?"
- **2 große Wahl-Karten:**
  - 🚴 **Lieferung** — „~ 30–45 Min · ab 1,50 € Liefergebühr"
  - 🛍 **Abholung** — „~ 20 Min · keine Gebühr"
  - Aktive Karte: Border 2 px Marken-Blau, Hintergrund #e3f2fd
  - Inaktive: Border 1 px #ddd
- **Headline 2:** „Wann?"
- **2 Wahl-Karten:**
  - ⚡ **„Sobald wie möglich"** (Default ausgewählt)
  - 📅 **„Zeit wählen…"** — Klick öffnet Time-Picker (15-Min-Slots, max. 2 Tage im Voraus, nur innerhalb Öffnungszeit)
- **„Weiter →"-Button** unten, Marken-Blau

### 9.2 Schritt 2 — Daten (`/shop/checkout/daten`)

Inhalt unterscheidet sich je nach Schritt-1-Auswahl:

**Bei Lieferung:**
- Hinweis-Box oben: „🚴 Lieferung — wir liefern an deine Adresse"
- **PLZ-Live-Banner** (dynamisch, oben prominent):
  - Wenn keine PLZ eingegeben: leer
  - Wenn PLZ im Liefergebiet: grünes Banner „✓ PLZ 38678 — wir liefern! Liefergebühr: 1,50 €"
  - Wenn PLZ nicht im Gebiet: rotes Banner „❌ Diese PLZ liegt außerhalb unseres Liefergebiets. Bitte ruf uns an: 0 53 23 / 84 02 30"
- **Felder (in Reihenfolge):**
  - Vor- und Nachname (Pflicht)
  - Telefon (Pflicht, mit Format-Validation)
  - Straße + Hausnummer (Pflicht)
  - PLZ (Pflicht, kurz, 30 % Breite) + Ort (70 %, Auto-Fill je nach PLZ)
  - E-Mail (für Bestätigung — optional aber empfohlen)
  - Notiz (optional, „z. B. 3. Stock, bitte klingeln")

**Bei Abholung:**
- Hinweis-Box oben: „🛍 Abholung im Restaurant"
- **Felder:**
  - Vor- und Nachname (Pflicht)
  - Telefon (Pflicht)
  - E-Mail (für Bestätigung)
- **Sicherheits-Code-Hinweis-Box:**
  - Hintergrund #e3f2fd, Border-left Marken-Blau
  - Inhalt: „🔒 **Sicherheit beim Abholen** — du bekommst nach Bestellung einen Code wie:" + großer Code-Mock („EUR-A4F7") + „Zeig den Code beim Abholen — so verwechselt niemand die Bestellung."
- Notiz-Feld (optional)

**Felder-Styling (für beide):**
- Volle Breite, Höhe ~44 px (Tap-Target)
- Border 1 px #ddd, Rounded 4 px, Padding 8–10 px
- Focus-State: Border Marken-Blau, leichter Outline-Ring
- Validation: rote Border + Fehler-Text drunter bei invalid
- Auto-Fill aus localStorage wenn Kunde wiederkommt

### 9.3 Schritt 3 — Zahlung (`/shop/checkout/zahlung`)

- **Headline:** „Zahlungsart"
- **3 Wahl-Karten** (alle mit gleichem Styling, aktive Marken-Blau-Border + Hintergrund):
  1. **PayPal** (mit PayPal-Logo)
  2. **Karte / Apple Pay / Google Pay** (mit Visa/MC-Icons + Apple/Google-Pay-Logos rechts)
  3. *Bewusst entfernt:* keine Bar-Zahlung (siehe Top-Level-Entscheidungen)
- **Zusammenfassungs-Box** in #f5f5f5:
  - Item-Anzahl + Zwischensumme
  - Liefergebühr (oder „Abholung — kostenlos")
  - **Gesamt** (fett, größer)
- **„Mit PayPal zahlen"-Button** (oder „Mit Karte zahlen") unten, Marken-Blau, Bold
- **Hinweis-Text** klein darunter: „Mit Klick auf Zahlen akzeptierst du AGB &amp; Datenschutz"
- **Hinweis-Box** sehr dezent (kann auch in einem ⓘ Tooltip sein): „Wir bieten Online-Zahlung an, weil sie uns gegen Fake-Bestellungen schützt — danke für dein Verständnis."

**Nach Klick:** PayPal-Smart-Buttons / Stripe-Element wird inline geladen; Kunde bestätigt Zahlung beim Provider; danach Redirect auf Bestätigungsseite.

---

## 10 — Screen: Bestätigungsseite `/shop/bestellung/[code]`

Erscheint nach erfolgreicher Zahlung.

- **Großes ✅** zentriert, ~64 px
- **Headline:** „Bestellung erhalten — danke!"
- **Untertext:** „Wir bereiten alles für dich vor."
- **Code-Box** (auffällig, Hintergrund #f5f5f5, padding 20 px, zentriert, rounded 8 px):
  - Kleines Caps-Label „DEIN CODE"
  - Großer Code: ~28 px, Bold, Marken-Rot, letter-spacing 2px (z. B. „EUR-A4F7")
  - Kleiner Hint darunter: bei Abholung „Bei Abholung diesen Code zeigen", bei Lieferung „Den Code haben wir auch per E-Mail geschickt"
- **Status-Stepper** (Hauptelement der Seite):
  - Header: „Status"
  - Horizontale Linie mit 4 Knotenpunkten (3 bei Abholung):
    1. **Bezahlt** (✓ in Marken-Blau-Kreis bei Erreichen)
    2. **Vorbereitung** (📦) — pulsiert wenn aktueller Status
    3. **Unterwegs** (🚴) — nur bei Lieferung
    4. **Geliefert** / **Abgeholt** (✓)
  - Progress-Linie zwischen Knoten füllt sich mit Marken-Blau bei Fortschritt
  - Aktiver Schritt fett + farbig, kommende grau
  - Polling alle 15 Sekunden für Live-Update
- **Info-Box** (Hintergrund #fff8e1):
  - ⏱ Geschätzte Lieferzeit: 30–45 Min (oder Abholzeit)
  - 📍 Lieferadresse / Abholort
  - 💳 Bezahlt mit: [Methode] · [Betrag]
- **Restaurant-Telefonnummer prominent unten:** „Bei Fragen: 📞 0 53 23 / 84 02 30" (klickbar via tel:-Link)

---

## 11 — Design-Tokens

### 11.1 Farben

| Token | Wert | Verwendung |
|---|---|---|
| `--color-shop-primary` | `#1976d2` | Shop-Header, Primary-Buttons, Active-States |
| `--color-shop-primary-dark` | `#0d47a1` | Hover für Primary-Blue |
| `--color-shop-primary-soft` | `#e3f2fd` | Active-Card-Hintergründe (z. B. ausgewählte Variante) |
| `--color-brand-red` | `#bf360c` / `#c62828` | Preis-Anzeige, Marken-Akzent |
| `--color-warning-bg` | `#fff8e1` | Allergene-Box, Info-Boxen |
| `--color-warning-text` | `#5d4037` | Text auf Warnung-Hintergründen |
| `--color-success` | `#2e7d32` | „PLZ wird beliefert", erfolgreiche States |
| `--color-error` | `#d32f2f` | „PLZ außerhalb", Validation-Errors |
| `--color-bg-soft` | `#fafafa` | Item-Grid-Hintergrund |
| `--color-cart-bg` | `#f5f5f5` | Cart-Sidebar Hintergrund |
| `--color-text` | `#1a1a1a` | Default-Text |
| `--color-text-muted` | `#666` | Sekundär-Text, Beschreibungen |
| `--color-border` | `#e0e0e0` | Karten-Border |

### 11.2 Typografie

- **Schriftfamilie:** Gleiche wie Webseite (System-Font-Stack), aber **kein Display-Font** im Shop — durchgängig pragmatisch
- **Skala:**
  - Item-Name: 14–16 px, Bold
  - Item-Beschreibung: 12–13 px, regular, muted
  - Item-Preis: 14–16 px, Bold, Brand-Red
  - Modal-Headline: 18–20 px, Bold
  - Buttons: 14–16 px, Bold
  - Body / Form-Labels: 14 px
  - Small / Hints: 11–12 px, muted
- **Mindestgröße auf Mobile: 14 px** für lesbaren Text

### 11.3 Abstände

- **Grid-Gap zwischen Items:** 8 px Mobile, 16 px Desktop
- **Padding in Cards:** 8–12 px Mobile, 12–16 px Desktop
- **Modal-Padding:** 16 px Mobile, 24 px Desktop
- **Button-Padding:** 10–12 px vertical × 16–20 px horizontal
- **Section-Trennung:** ~24 px

### 11.4 Border-Radius

- Buttons: 4–6 px
- Karten: 6–8 px
- Modal: 10 px
- Pills: 14–16 px (Pill-Form)
- Avatar/Thumbnail: 4 px

### 11.5 Schatten

- Cart-Sidebar: keinen Schatten, nur Border
- Sticky-Cart-Bar (Mobile): `0 -2px 8px rgba(0,0,0,0.08)` nach oben
- Modal: `0 12px 32px rgba(0,0,0,0.4)`
- Bottom-Tab-Bar: `0 -1px 4px rgba(0,0,0,0.06)`

---

## 12 — Komponenten-Inventar

Diese Komponenten werden für den Shop gebraucht (zum Designen):

1. **ShopHeader** — Blauer Header mit Zurück-Knopf + Titel + ggf. Toggle/Schritt-Indikator
2. **CategoryPills** — sticky horizontale Pill-Reihe, scrollbar
3. **ItemCard** — Foto + Name + Beschreibung + „Standard:"-Hint + Preis + „+"-Button
4. **CartSidebar** — Desktop: persistente rechte Spalte mit Items + Summe + Action
5. **CartStickyBar** — Mobile: blauer Streifen unten mit Anzahl + Summe + Pfeil
6. **BottomTabBar** — Mobile: 4-Tab-Navigation am unteren Rand
7. **ItemModal** — zentriertes Pop-up mit Bild, Beschreibung, Allergenen, Variants, Extras, Notiz, Action
8. **VariantPicker** — Größenauswahl-Buttons mit „STANDARD"-Badge
9. **ExtrasList** — Checkbox-Liste für Extras
10. **NoteTextarea** — mehrzeiliges Textfeld für Sonderwünsche
11. **QuantityStepper** — −/Zahl/+ mit Tap-Target ≥ 44 px
12. **AllergenBox** — gelbliche Hinweis-Box mit Allergen-Liste
13. **Lightbox** — Vollbild-Bildansicht
14. **ProgressIndicator** — 3-Schritt-Bar mit Schritt-Labels
15. **PLZBanner** — dynamisches Erfolg/Fehler-Banner für PLZ-Validation
16. **PaymentMethodCard** — Wahl-Karte für Zahlungsart mit Logo
17. **OrderConfirmation** — komplette Bestätigungsseite (Code, Status-Stepper, Info-Box)
18. **StatusStepper** — horizontaler Stepper mit aktiv/erledigt/kommend Knoten
19. **EmptyCart** — Empty-State für leeren Cart

---

## 13 — Verhalten &amp; States

### 13.1 Optimistic UI

- **„+"-Klick auf Item:** Cart updated **sofort** (lokal), kein Warten auf Server. Kleines Pulse-Feedback auf Cart-Bar/Sidebar
- **Mengen-Stepper:** sofort ändern, kein Server-Round-Trip
- **Rollback:** falls Server doch ablehnt (selten — z. B. Item ausverkauft), Toast-Message + Undo

### 13.2 Loading-States

- **Shop-Übersicht:** Skelett-Karten (graue Rechtecke mit Shimmer), bis Bilder + Daten geladen
- **Bilder:** Low-Quality-Image-Placeholder (LQIP) → scharf
- **Modal beim Öffnen:** kein Spinner — Inhalt ist sofort da (Item-Daten sind statisch)
- **Checkout-Submit:** Button-Text ändert auf „Wird verarbeitet…", Button disabled, Spinner-Icon
- **Bestätigungsseite:** Polling alle 15 s für Status-Updates (kein voller Reload)

### 13.3 Error-States

- **Item nicht verfügbar (zur Bestellzeit):** Ausgegrautes Item-Karte mit Overlay „Heute nicht verfügbar"
- **Außerhalb Öffnungszeit:** Großer Banner oben in `/shop`: „Wir haben gerade geschlossen. Öffnungszeiten: Mo–So 11–23 Uhr." + großer Telefon-Button als Alternative
- **PLZ nicht im Liefergebiet:** rotes Banner mit Telefon-Fallback
- **Zahlungsfehler:** Inline-Fehler bei Stripe/PayPal-Element, „Zahlung fehlgeschlagen — versuch's nochmal oder wähle andere Methode"
- **Webhook-Verzögerung:** Bestätigungsseite zeigt initial „Zahlung wird verarbeitet…" für maximal 10 s, dann Status

### 13.4 Animationen

- **Modal-Open:** Fade-in + Scale 0.95 → 1.0, 200 ms ease-out
- **Modal-Close:** umgekehrt, 150 ms
- **Sticky-Cart-Bar erscheint:** Slide-up 200 ms
- **Sticky-Cart-Bar Pulse beim Add:** scale 1.0 → 1.03 → 1.0 in 300 ms
- **Status-Stepper Update:** smoother fill der Linie zwischen Knoten, 600 ms
- **Respektiere `prefers-reduced-motion`** — Animationen kürzer / aus

### 13.5 Accessibility

- **Modal:** Focus-Trap, Escape schließt, Body-Scroll-Lock
- **ARIA-Labels** für alle Icon-Only-Buttons (z. B. „×" → `aria-label="Schließen"`)
- **Live-Regions** für PLZ-Banner, Status-Updates, Cart-Anzahl
- **Tastatur-Navigation:** alle Buttons via Tab erreichbar, Pfeiltasten in Variant-Picker
- **Form-Labels** korrekt mit Inputs verknüpft (`<label for="...">`)
- **Kontrast:** WCAG AA, mindestens 4.5 : 1
- **Tap-Targets:** mindestens 44×44 px

---

## 14 — PWA-Aspekte

Auch wenn primär Design-Brief: hier zur Berücksichtigung.

- **App-Icon** im Web-App-Manifest (z. B. 192×192 + 512×512). Auf Basis des Logos
- **Splash-Screen:** Logo zentriert auf weißem oder rotem Hintergrund
- **App-Name:** „Euro-Döner" (kurz, auf Handy als Icon-Label)
- **Installations-Prompt:** dezent, erst beim 2. Besuch, als unauffälliger Banner unten — nicht als Modal
- **Vollbild-Modus** nach Install — kein Browser-Chrome
- **Speisekarte offline lesbar** (Service Worker cached `menu.json` + Bilder)
- **Cart bleibt offline** (localStorage-Backup)

---

## 15 — Inhaltlicher Tonus

- **Sprache:** Deutsch primär, Englisch sekundär
- **Anrede:** „Du"
- **Texte:** kurz, klar, instruktiv. Keine Marketing-Floskeln, keine Werbe-Sprache
- **Fehler-Texte:** freundlich, lösungsorientiert („Nicht im Liefergebiet — ruf uns an: 0 53 23 / 84 02 30") statt technisch („Error 400")
- **Bestätigungs-Texte:** warm und konkret („Wir bereiten alles für dich vor"), nicht generisch („Order received")

---

## 16 — Bild-Anforderungen

| Slot | Anzahl | Format | Auflösung |
|---|---|---|---|
| Item-Foto pro Gericht | ~200 | JPG/WebP | min. 600 × 400, ideal quadratisch oder 4:3 |
| Restaurant-Logo (App-Icon Basis) | 1 | SVG bevorzugt + PNG-Variante | min. 512 × 512 |

Alle Bilder werden via `next/image` automatisch optimiert (AVIF/WebP, srcset, lazy load).

---

## 17 — Was nicht in den Shop gehört

- ❌ **Kein klassischer Header/Footer der Webseite** — Shop hat eigenen blauen Header und keine Marketing-Links
- ❌ **Kein Login-Flow** — Konzept ist Gastbestellung
- ❌ **Keine Bar-Zahlung-Option** — wurde explizit verworfen
- ❌ **Keine ausführlichen Beschreibungstexte** in Karten — kurz und prägnant
- ❌ **Kein Newsletter-Signup** im Shop-Flow — gehört auf Webseite-Footer falls überhaupt
- ❌ **Kein Cookie-Banner-Inhalt** in dieser Datei (Cookie-Banner ist eigene Komponente)

---

## 18 — Edge-Cases zum Bedenken

- **Cart wird älter als 24 h** (Item-Preise könnten veraltet sein) → Re-Validation beim Checkout-Eintritt
- **Speisekarten-Item gelöscht** zwischen Cart-Add und Checkout → Server lehnt ab, Toast „[Item] ist nicht mehr verfügbar — wurde aus dem Warenkorb entfernt"
- **Doppel-Klick auf „Bestellen"-Button** → Idempotenz-Key, Button disabled nach erstem Klick
- **Browser-Back während Checkout** → Cart-Daten bleiben, kann zurück und vor wechseln ohne Verlust
- **Tab schließen während Zahlung** → Order bleibt auf `pending_payment`, Webhook bringt sie auf `paid` wenn Zahlung erfolgreich
- **Sehr langer Sonderwunsch-Text** → Soft-Limit ~200 Zeichen, dann nur noch lesbar
- **Mehrere Items, wenig Geld** → Cart-Summe in Echtzeit, kein „falscher" Eindruck
- **Großes Display (4K)** → Container max. 1100 px, zentriert mit Padding

---

## 19 — Liefer-Checkliste

Was soll am Ende vorliegen:

- [ ] **Mockups Mobile (~ 375–414 px):**
  - [ ] Shop-Übersicht mit Cart-Sticky-Bar
  - [ ] Item-Modal offen
  - [ ] Cart-Seite (volle Liste)
  - [ ] Checkout Schritt 1 / 2 (Lieferung) / 2 (Abholung) / 3
  - [ ] Bestätigungsseite mit Status-Stepper
- [ ] **Mockups Desktop (~ 1280 px):**
  - [ ] Shop-Übersicht mit Sidebar-Cart
  - [ ] Item-Modal offen
  - [ ] Checkout (alle 3 Schritte)
  - [ ] Bestätigungsseite
- [ ] **Components-Bibliothek** mit allen wiederverwendeten Bausteinen aus Section 12
- [ ] **Color-Token-Sheet** (Section 11.1)
- [ ] **Typografie-Sheet** (Section 11.2)
- [ ] **State-Variationen** für interaktive Komponenten (default / hover / active / disabled / error)
- [ ] **Empty-States** (leerer Cart, geschlossen, etc.)
- [ ] **Error-States** (PLZ außerhalb, Zahlungsfehler)

---

## 20 — Inspiration / Referenzen

Tonus-Vorbilder (zur App-Stimmungs-Ausrichtung):
- **Wolt** App — sehr saubere Kategorie-Pills, gute Item-Karten
- **DoorDash** App — gute Cart-Sidebar auf Web
- **McDonald's** Web-Bestellung — guter 3-Schritt-Checkout, klare Buttons

**Nicht** als Vorbild: überfrachtete Lieferando-Restaurantseiten mit zu vielen Werbe-Bannern.

---

## 21 — Dateien zur Querreferenz

- `docs/superpowers/specs/2026-05-07-eurodoener-design.md` — vollständige technische Spec (Datenmodell, API, Sicherheit)
- `docs/design/01-startseite-design-brief.md` — Design-Brief für die Webseiten-Startseite
- `docs/praesentation/eurodoener-konzept.html` — visuelle Mockup-Präsentation mit Alternativen
- `Infos/design_relevante_infos/speisekarte1.jpg` — Original-Speisekarte
