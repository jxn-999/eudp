# Euro-Döner Pizzeria — Webseite & Online-Shop · Design-Spezifikation

**Datum:** 2026-05-07
**Status:** Design abgeschlossen, bereit für Implementation Plan
**Restaurant:** Euro-Döner Pizzeria, Adolph-Roemer-Straße 7, 38678 Clausthal-Zellerfeld
**Telefon:** 0 53 23 / 84 02 30 · 0155 66 75 65 38

---

## 1 — Zielsetzung

Eigene Webseite mit integriertem Online-Bestellshop für die Euro-Döner Pizzeria. Zwei Welten unter einer Domain:

- **Marketing-Webseite** — repräsentativ, klassisches „Restaurant-Feeling", SEO-fähig, vermittelt Atmosphäre und liefert Kontaktinformationen
- **Online-Shop** — App-artig, mobile-first, fokussiert auf schnelle Bestellung mit Lieferung oder Abholung

Die Seite ersetzt den telefonbasierten Lieferservice nicht, sondern ergänzt ihn um einen direkten Online-Kanal (kein Lieferando — keine 30 % Provision).

---

## 2 — Operativer Kontext

| Aspekt | Entscheidung |
|---|---|
| Bestellumfang | Lieferung **und** Abholung |
| Bestelleingang Restaurant | **Bondrucker** (Star/Epson WLAN) via CloudPRNT-Polling |
| Zahlungsmethoden | PayPal, Karte (Stripe / Apple Pay / Google Pay) — **nur Online-Vorkasse** (keine Barzahlung, schützt gegen Fake-Bestellungen) |
| Speisekarten-Pflege | **Selten** (1–2× pro Jahr) → Speisekarte als JSON im Repo |
| Kundenkonten | **Nur Gastbestellung** — kein Login, keine Passwörter |
| Liefergebiet | **PLZ-Whitelist** mit individueller Liefergebühr pro PLZ |
| Mindestbestellwert | **Keiner** |
| Liefergebühr | Entfernungsabhängig, **mindestens 1,50 €** |
| Bilder | Vollständige Fotos für alle ~200 Items |
| Sprachen | Deutsch + Englisch |
| Externe Portale | Keine (Lieferando/Wolt/Uber Eats nicht genutzt) |
| Wartung | User selbst, mit AI-Hilfe |
| Bestellzeit | Nur während Öffnungszeit (täglich 11–23 Uhr) |
| Allergene | Vollständig pro Item (LMIV-Pflicht) |

---

## 3 — Technologie-Stack

| Schicht | Wahl | Grund |
|---|---|---|
| Framework | **Next.js (App Router)** mit TypeScript | Moderne React-DX, Server-Components, eingebauter Image-Optimizer, sehr viel AI-Trainingsmaterial |
| Styling | **Tailwind CSS** | Konsistent, kein CSS-Files-Salat |
| Internationalization | **next-intl** | Static i18n, build-time, kompatibel mit App Router |
| Datenbank | **Supabase (Postgres, Frankfurt)** | EU-Hosting, Free-Tier 500 MB, gute SDK-Unterstützung |
| Hosting | **Vercel (Frankfurt)** | Free-Tier 100 GB Traffic, native Next.js-Integration, Edge-CDN |
| Karten-Embedding | **OpenStreetMap (Leaflet)** | DSGVO-freundlich, keine Cookies, kein API-Key |
| Zahlungen | **Stripe + PayPal SDK** | Stripe deckt Karten + Apple/Google Pay; PayPal separat. **Nur Online-Vorkasse** (keine Bar-Option, schützt gegen Fake-Bestellungen) |
| E-Mail | **Resend (EU-Region)** | Free-Tier 3.000/Monat, gute Deliverability |
| Bondrucker | **Star/Epson via CloudPRNT** | Polling-basiert, kein Port-Forwarding nötig |
| PWA | **next-pwa** | Service-Worker + Manifest mit minimaler Konfiguration |

---

## 4 — Architektur

```
┌──────────────────────────────────────────────────────────┐
│ CLIENT (Browser, Mobile-first)                           │
│  ┌────────┐ ┌──────────┐ ┌──────┐ ┌──────────────┐     │
│  │Next.js │ │menu.json │ │ Cart │ │Service-Worker│     │
│  │App     │ │(static)  │ │store │ │(PWA, offline)│     │
│  └────────┘ └──────────┘ └──────┘ └──────────────┘     │
└────────────────────────┬─────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────┐
│ EDGE / SERVERLESS (Vercel Frankfurt)                     │
│  ┌────────┐ ┌──────────┐ ┌────────┐ ┌──────┐            │
│  │Edge CDN│ │API Routes│ │Webhooks│ │ Cron │            │
│  └────────┘ └──────────┘ └────────┘ └──────┘            │
└────────────────────────┬─────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────┐
│ DATEN + EXTERNE DIENSTE                                  │
│  ┌──────────┐ ┌──────┐ ┌──────┐ ┌────────┐              │
│  │ Supabase │ │Stripe│ │PayPal│ │ Resend │              │
│  │(Postgres)│ │      │ │      │ │(E-Mail)│              │
│  └──────────┘ └──────┘ └──────┘ └────────┘              │
└────────────────────────┬─────────────────────────────────┘
                         │ CloudPRNT (Polling)
┌────────────────────────▼─────────────────────────────────┐
│ RESTAURANT                                               │
│  ┌────────────────────────┐                              │
│  │ Star/Epson Bondrucker  │ ← pollt /api/print/next      │
│  └────────────────────────┘                              │
└──────────────────────────────────────────────────────────┘
```

### 4.1 Schlüsselentscheidungen

- **Speisekarte als JSON im Repo**: keine DB-Query, edge-cached, offline-fähig via SW. Build-time geladen.
- **Webhook = Quelle der Wahrheit** für Zahlungsstatus. Stripe/PayPal-Webhook ist signiert; Browser-„bestätigt" reicht nicht.
- **Idempotenz-Key** beim POST /api/orders gegen Doppel-Klicks und Netzwerk-Retries.
- **CloudPRNT-Polling**: Drucker fragt alle 3–5 s den Server „neuer Auftrag?". Kein Port-Forwarding, kein VPN. Funktioniert in jedem Restaurant-WLAN.
- **Drucker-Ausfall-Backup**: 2 Min ohne Druck-Bestätigung → E-Mail/SMS an Restaurant.
- **EU-Hosting für Datenresidenz**: Vercel Frankfurt + Supabase Frankfurt + Resend EU. Stripe/PayPal sind US, abgedeckt durch SCC + DPA.

---

## 5 — Datenmodell

### 5.1 Statisch (im Repo, Git-versioniert)

#### `data/menu.de.json` / `data/menu.en.json`

```jsonc
{
  "categories": [
    { "id": "pizza",    "name": "Pizza",            "icon": "🍕", "order": 1 },
    { "id": "doener",   "name": "Döner & Drehspieß", "icon": "🥙", "order": 2 },
    { "id": "burger",   "name": "Burger",           "icon": "🍔", "order": 3 }
    // ...
  ],
  "items": [
    {
      "id": "117",
      "categoryId": "pizza",
      "name": "Pizza Hawaii",
      "description": "Tomaten, Schinken, Ananas, Käse",
      "image": "/menu/pizza-hawaii.jpg",
      "variants": [
        { "id": "klein",  "label": "Klein 26 cm",  "price":  8.00 },
        { "id": "gross",  "label": "Groß 32 cm",   "price": 10.50, "default": true },
        { "id": "family", "label": "Family 40 cm", "price": 14.50 }
      ],
      "extras": [
        { "id": "kaese-extra", "label": "Extra Käse", "price": 1.50 },
        { "id": "pilze",       "label": "Pilze",      "price": 1.00 }
      ],
      "allergens": ["gluten", "milch"],
      "additives": ["1", "2"],
      "available": true,
      "popular": true
    }
  ]
}
```

**Variants-Logik (UI-Regel):** Items zeigen den Preis der Variante mit `default: true` auf der Übersichts-Karte (kein „ab"-Präfix). Im Item-Modal wird die Variants-Auswahl **nur angezeigt**, wenn `variants.length > 1`. Items ohne echte Größenwahl haben genau eine Variante.

#### `data/zones.json`

```jsonc
{
  "zones": [
    { "plz": "38678", "city": "Clausthal-Zellerfeld", "fee": 1.50 },
    { "plz": "38644", "city": "Buntenbock",           "fee": 2.50 },
    { "plz": "38640", "city": "Goslar",               "fee": 4.00 }
    // ...
  ]
}
```

#### `data/hours.json` + `data/config.json`

Öffnungszeiten, Steuersätze (7 % vor Ort, 19 % geliefert), Restaurant-Adresse, Kontaktdaten.

### 5.2 Dynamisch (Supabase Postgres)

```sql
CREATE TABLE orders (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code      text UNIQUE NOT NULL,           -- "EUR-A4F7"
  status          text NOT NULL,                  -- pending_payment | paid | preparing | ready | out_for_delivery | delivered | cancelled
  type            text NOT NULL,                  -- delivery | pickup
  customer_name   text NOT NULL,
  customer_phone  text NOT NULL,
  customer_email  text,
  delivery_addr   jsonb,                          -- {street, plz, city, notes} (NULL bei pickup)
  items_subtotal  numeric(10,2) NOT NULL,
  delivery_fee    numeric(10,2) NOT NULL,
  total           numeric(10,2) NOT NULL,
  payment_method  text NOT NULL,                  -- paypal | card
  payment_ref     text,                           -- Stripe-PI / PayPal-OrderID
  requested_for   timestamptz,                    -- NULL = sofort
  customer_note   text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  paid_at         timestamptz
);

CREATE TABLE order_items (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        uuid REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id    text NOT NULL,
  menu_item_name  text NOT NULL,                  -- Snapshot
  variant_id      text NOT NULL,
  variant_label   text NOT NULL,                  -- Snapshot
  extras          jsonb NOT NULL DEFAULT '[]'::jsonb,
  quantity        int NOT NULL,
  unit_price      numeric(10,2) NOT NULL,
  line_total      numeric(10,2) NOT NULL,
  item_note       text                            -- Sonderwunsch an Küche
);

CREATE TABLE print_jobs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        uuid REFERENCES orders(id),
  status          text NOT NULL,                  -- queued | printed | failed
  escpos_data     bytea NOT NULL,                 -- ESC/POS-Bytestream
  attempts        int NOT NULL DEFAULT 0,
  last_error      text,
  printed_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_status ON orders(status, created_at);
CREATE INDEX idx_print_jobs_queued ON print_jobs(status) WHERE status = 'queued';
```

**Snapshot-Prinzip:** `order_items` speichert Item-Name, Variant-Label und Preis als Snapshot. Wenn sich die menu.json später ändert, bleibt die historische Bestellung korrekt lesbar (Buchhaltung, Reklamationen).

### 5.3 Client-seitig (Browser)

- **Cart-Store** (Zustand, localStorage-Backup): items + selectedVariant + extras + note + quantity
- **Customer-Store** (localStorage): Name, Telefon, Adresse — vorausgefüllt bei nächstem Besuch (mit DSGVO-Hinweis im Cookie-Banner)

---

## 6 — Sitemap & UX-Konzept

Klare Trennung in zwei Layout-Welten via Next.js Route Groups:

```
app/
├── (site)/                  → klassischer Webseiten-Header + 4-Spalten-Footer
│   ├── page.tsx             → / (Startseite)
│   ├── speisekarte/page.tsx → Lese-Version, kein Cart
│   ├── ueber-uns/page.tsx
│   ├── standort/page.tsx
│   ├── galerie/page.tsx
│   ├── kontakt/page.tsx
│   ├── impressum/page.tsx
│   ├── datenschutz/page.tsx
│   ├── agb/page.tsx
│   └── widerrufsrecht/page.tsx
│
├── (shop)/                  → App-Layout (blauer Header, Sticky-Cart, Bottom-Tabs)
│   └── shop/
│       ├── page.tsx         → Item-Übersicht
│       ├── warenkorb/page.tsx
│       ├── checkout/...     → 3 Schritte
│       └── bestellung/[code]/page.tsx
│
└── api/
    ├── orders/...           → POST /create, GET /[id]/status
    ├── stripe/webhook
    ├── paypal/webhook
    └── print/next?printer=  → CloudPRNT-Endpunkt
```

### 6.1 Webseite — Startseite (Aufbau)

**Wichtig:** Kompakte Landing-Page mit klarem CTA-Fokus, **nicht** ein Scrolling-Onepager.

1. **Top-Bar** — Logo links, Nav-Links (Desktop) bzw. ≡ Hamburger (Mobile). Keine Status-Pille im Header.
2. **Hero (über dem Fold)** — Lifestyle-Bild im Hintergrund, kurzer Slogan, **2 große Buttons nebeneinander**:
   - 📖 *Zur Speisekarte* (sekundär, weißer Button) → `/speisekarte`
   - 🛒 *Jetzt bestellen* (primär, blauer Button) → `/shop`
3. **3-Spalten-Info-Block** (Mobile: 2-spaltig + Map als breiter Streifen oben)
   - OpenStreetMap-Einbettung mit Marker
   - Kontakt-Karte: Telefon, Mobil, E-Mail
   - Öffnungszeiten-Karte: Mo–So 11–23 Uhr · Lieferung · Pizza-Hour
4. **Bild-Karussell „Unser Restaurant"**:
   - **Desktop:** 3 Bilder gleichzeitig sichtbar, ‹/› Pfeile + Punkte-Indikator, Auto-Rotation alle 5 s (pausiert bei Hover)
   - **Mobile:** 1 Bild voll sichtbar, links/rechts ~18 % Peek vom Nachbarbild, Wisch-Geste zum Wechseln
5. **Top-Seller-Reihe** — 4 (Desktop) / 2 (Mobile) Items mit Bild + Name + Preis
6. **Story-Block + Pizza-Hour-Aktion-Box** (zweispaltig auf Desktop)
7. **Footer** — 4-spaltig auf Desktop (Restaurant-Info / Restaurant-Links / Bestell-Links / Rechtliches), 2-spaltig auf Mobile

### 6.2 Side-Drawer-Navigation

- Öffnet von rechts per ≡-Button. Schließbar per Tap auf abgedunkelten Hintergrund oder Wisch-Geste.
- Inhalte: 🏠 Startseite, 📖 Speisekarte, ℹ Über uns, 📍 Standort, 📷 Galerie, ✉ Kontakt
- Unten: großer „🛒 Jetzt bestellen"-CTA + Mini-Footer mit Impressum/Datenschutz
- Auf Desktop ab ≥1024 px wird der Drawer zur **persistenten Top-Nav** — Hamburger entfällt, alle Links sichtbar.

### 6.3 Shop — UI-Patterns

- **Eigener Shop-Header** in Akzentfarbe (blau) statt der weißen Marketing-Bar — sofort erkennbar „Bestell-Modus"
- **Lieferung/Abholung-Toggle** oben rechts immer sichtbar; Wechsel jederzeit möglich, Cart bleibt erhalten
- **Item-Übersicht**: Kategorie-Pills (sticky), Item-Karten als Grid
- **Item-Karte**:
  - Foto klickbar → Lightbox (Vollbild-Bildansicht)
  - Name + Beschreibung + „Standard: Groß 32 cm" (Hinweistext bei mehreren Varianten)
  - Preis der Default-Variante (kein „ab"-Präfix)
  - „+"-Button → öffnet Item-Modal
- **Item-Modal**: **zentriertes Pop-up auf Desktop UND Mobile** (kein Bottom-Sheet). Inhalt:
  - Bild (oben auf Mobile, links auf Desktop)
  - Titel + Beschreibung
  - Allergene + Zusatzstoffe-Box (gelb)
  - Größenauswahl mit cm-Angabe — nur bei `variants.length > 1`. „STANDARD"-Badge auf der Default-Variante
  - Extras (Checkboxen)
  - Sonderwunsch-Textarea
  - Mengen-Stepper + großer „In den Warenkorb"-Button mit Live-Preis
- **Cart**:
  - Items mit kleinem Bild-Thumbnail (32×32 px Mobile, 60×60 px Desktop)
  - Mengen-Stepper, Entfernen-Button
  - Notiz-Anzeige unter Item, falls vorhanden
  - Zwischensumme + Liefergebühr + Gesamt
- **Cart-Sichtbarkeit**:
  - **Desktop:** persistente Cart-Sidebar rechts (~220 px)
  - **Mobile:** Sticky-Cart-Bar unten (blau, fett: „🛒 3 Items · 17,00 € →"), darunter Bottom-Tabs

### 6.4 Checkout — 3 Schritte

**Schritt 1 — Lieferart:** Lieferung (1,50 €+ je nach PLZ) oder Abholung (kostenlos). Dann „Sobald wie möglich" oder Zeit-Slot wählen.

**Schritt 2a — Daten bei Lieferung:** Vor- und Nachname, Telefon, Straße + Hausnummer, PLZ + Ort (PLZ live geprüft → grüner Hinweis bei Match, roter mit Telefon-Fallback bei Mismatch), E-Mail, optionale Notiz.

**Schritt 2b — Daten bei Abholung:** Vor- und Nachname (Pflicht), Telefon (Pflicht), E-Mail (für Bestätigung), optionale Notiz. **Hinweis-Box:** „🔒 Sicherheit beim Abholen — du bekommst nach Bestellung einen Code wie `EUR-A4F7`. Zeig den Code beim Abholen, damit niemand die Bestellung verwechselt."

**Schritt 3 — Zahlung:** Nur Online-Vorkasse, identisch für Lieferung und Abholung:
- PayPal
- Karte / Apple Pay / Google Pay (via Stripe)

**Keine Barzahlung** — bewusste Entscheidung gegen Fake-Bestellungen. Wer per Online-Zahlung committet ist, erscheint zuverlässig zur Abholung bzw. nimmt die Lieferung an. Dies wird auf der Bestellseite kurz erklärt (z. B. „Online-Zahlung schützt uns gegen Fake-Bestellungen — danke für dein Verständnis"), damit Kunden, die Bar-Zahlung erwarten, nicht überrascht sind.

Zusammenfassung der Bestellung wird vor dem „Kostenpflichtig bestellen"-Button angezeigt (§312j BGB Button-Lösung).

### 6.5 Bestätigungsseite `/shop/bestellung/[code]`

- Großes ✅ + „Bestellung erhalten — danke!"
- Großer Code-Block mit Short-Code (`EUR-A4F7`) — bei Abholung Anweisung „Code nennen oder zeigen"
- **Status-Stepper** (4 Schritte): Bezahlt → Vorbereitung → Unterwegs (nur bei Lieferung) → Geliefert/Abgeholt
- Geschätzte Zeit, Adresse, Bezahlt-mit-Info
- Restaurant-Telefonnummer für Notfälle
- Polling alle 15 s für Status-Updates

---

## 7 — Bestellfluss (E2E)

```
1. Kunde klickt „+" auf Item-Karte
   → Item-Modal öffnet sich (zentriert, beide Plattformen)
2. Kunde wählt Variante + Extras + Menge + ggf. Sonderwunsch
   → „In den Warenkorb" → Cart-Update lokal (optimistic UI)
3. Kunde klickt „Zur Kasse"
   → Schritt 1: Lieferart wählen
   → Schritt 2: Daten eingeben (mit PLZ-Live-Validation bei Lieferung)
   → Schritt 3: Zahlungsart wählen
4. POST /api/orders
   → Server validiert Cart-Items GEGEN menu.json (Anti-Manipulation)
   → Preise neu berechnet, Liefergebühr aus zones.json
   → Idempotenz-Key gegen Doppel-Klicks
   → INSERT order (status=pending_payment)
   → Generiert Short-Code (EUR-XXXX)
   → Erstellt Stripe-PaymentIntent / PayPal-Order
   → Antwort an Client mit client_secret
5. Browser zeigt Stripe-Element / PayPal-Buttons
   → Kunde bestätigt Zahlung beim Provider
6. Stripe/PayPal Webhook trifft auf /api/{stripe|paypal}/webhook
   → Webhook-Signatur prüfen
   → UPDATE order SET status='paid', paid_at=now()
   → INSERT print_job (ESC/POS-Bytestream vorbereitet)
   → E-Mail an Kunde (Bestellbestätigung) + Restaurant (Backup)
7. Browser-Redirect → /shop/bestellung/[code]
   → Polling für Status-Updates
8. Bondrucker pollt /api/print/next?printer=ID alle 3–5 s
   → Wenn print_job vorhanden: liefert ESC/POS-Bytestream
   → Markiert print_job als „printed" nach Drucker-Ack
9. Restaurant bereitet vor → setzt Status im Admin-Panel
   → Kunden-Polling sieht Status-Update
10. (Lieferung) Status „out_for_delivery" durch Mitarbeiter
    → Status „delivered" nach Rückkehr / nach Zeit-Auto-Marker
```

### 7.1 Robustheit

- **Drucker-Ausfall:** wenn 2 Min keine Bestätigung → automatischer E-Mail/SMS-Versand an Restaurant + Hinweis im Admin-Panel
- **Webhook-Wiederholungen:** Idempotent durch payment_ref-Check
- **Server-Restart:** Print-Queue ist persistent in Postgres
- **Doppel-Klick:** Idempotenz-Key sorgt für eine einzige Order
- **Manipulationssicherheit:** Server berechnet Preise neu aus statischen Datenquellen — Client-Preisen wird nie vertraut

---

## 8 — Design-Prinzipien

### 8.1 Mobile-first ohne Mobile-Only

- **Kunden bestellen überwiegend mobil**, daher Mobile-first im CSS-/Layout-Schritt
- **Mobile soll dem Desktop ähnlich aussehen** — nicht radikal anders. Wo möglich, mehrspaltig statt einspaltig
- **Schriftgrößen:** Mindestens 14 px für Text, 16 px für Buttons (Mobile)
- **Tap-Targets:** Mindestens 44×44 px (WCAG)

### 8.2 App-Feel im Shop

- **Eigene Header-Bar** in Akzentfarbe
- **Bottom-Tab-Navigation** auf Mobile in Daumen-Reichweite
- **Sticky-Cart-Bar** als persistenter Anker
- **Optimistic UI:** „+"-Klick → Item sofort im Cart, kein Server-Roundtrip
- **Skeleton-Loader** statt Spinner — Inhalt fühlt sich „schon da" an
- **Smooth Transitions** zwischen Routen (View Transitions API wo unterstützt)

### 8.3 PWA

- Web-App-Manifest + Service Worker via `next-pwa`
- App-Icon, Splash-Screen, Vollbild-Modus
- Speisekarte offline-lesbar (cached menu.json + Bilder)
- Cart bleibt offline (Zahlung braucht Online)
- Install-Prompt erst nach 2. Besuch (nicht aufdringlich)

---

## 9 — Performance-Targets

- **Lighthouse-Score ≥ 90** auf allen 4 Achsen (Performance / Accessibility / Best Practices / SEO)
- **LCP < 2,5 s** auf 4G
- **INP < 200 ms**
- **CLS < 0,1**
- **Bundle-Size**: pro Seite < 100 kB JS (gzip)
- Bilder: `next/image` mit AVIF/WebP, srcset, lazy load. Foto-Originale werden im Build optimiert
- Schriften: `next/font` mit Subsetting auf DE/EN-Zeichen
- Speisekarten-JSON statisch, vor-rendered, edge-cached

---

## 10 — Compliance

### 10.1 DSGVO / TDDDG

- **Cookie-Banner** mit echter Wahl (Ablehnen mind. so prominent wie Annehmen). Nur essentielle Cookies vor Einwilligung.
- **Datenschutzerklärung** auf `/datenschutz` — listet alle Verarbeitungen: PayPal, Stripe, Vercel, Supabase, Resend, OpenStreetMap. Mit AVV-Hinweisen.
- **OpenStreetMap** statt Google Maps (DSGVO-freundlich, keine Cookies).
- **Speicherdauer Bestelldaten:** 10 Jahre (HGB §257). Im Datenmodell trennbar machen für Anonymisierung nach Ablauf.
- **Right-to-be-forgotten:** Admin-Endpunkt zur Anonymisierung personenbezogener Daten (Bestelldaten bleiben für Buchhaltung erhalten, nur ohne Name/Adresse).
- **EU-Hosting** für alle Datenpfade (Vercel Frankfurt, Supabase Frankfurt, Resend EU). Stripe + PayPal sind US, abgedeckt durch Standardvertragsklauseln + Auftragsverarbeitungsvertrag.

### 10.2 LMIV / LMIDV §44

- **14 Pflichtallergene** (Gluten, Krebstiere, Eier, Fisch, Erdnüsse, Soja, Milch, Nüsse, Sellerie, Senf, Sesam, Schwefeldioxid, Lupinen, Weichtiere) pro Item ausweisen
- **Zusatzstoffe** mit Codes („1 = Konservierungsstoff" etc.) pro Item
- Sammel-Erklärung der Codes auf eigener Allergene-Seite
- Sichtbarkeit **vor** dem „Kostenpflichtig bestellen"-Button

### 10.3 Pflichtseiten

- `/impressum` — TMG §5: vollständige Anschrift, vertretungsberechtigte Person, Telefon, E-Mail, USt-IdNr., zuständige Behörde, OS-Plattform-Link (EU)
- `/datenschutz` — DSGVO Art. 13
- `/agb` — Allgemeine Geschäftsbedingungen, Bestellprozess, Lieferung
- `/widerrufsrecht` — Hinweis: **frisch zubereitete Speisen sind vom Widerruf ausgeschlossen** (§312g Abs. 2 Nr. 4 BGB) — muss klar im Checkout erscheinen
- **§312j BGB Button-Lösung**: Lieferzeit, Versandkosten, Zahlungsmethoden, Gesamtpreis vor dem „Kostenpflichtig bestellen"-Button anzeigen

---

## 11 — Roadmap (Phasen)

### Phase 1 — MVP (1–2 Wochen)
**Ziel:** Restaurant ist online auffindbar, Speisekarte lesbar, Kontakt klar.

- Next.js-Setup + Tailwind + i18n-Grundgerüst (DE/EN)
- Statische Webseite: Startseite + `/speisekarte` (Lese-Version) + `/ueber-uns` + `/standort` + `/kontakt` + `/impressum` + `/datenschutz`
- `menu.json` mit allen ~200 Items, vorerst Platzhalter-Bilder pro Kategorie
- OpenStreetMap-Einbettung
- Side-Drawer-Nav, 4-spaltiger Footer
- Deploy auf Vercel mit Custom-Domain

### Phase 2 — Bilder + Shop-Skelett (2–3 Wochen)
**Ziel:** Shop sieht fertig aus, sammelt Bestellungen via Telefon-Notiz.

- Bilder-Pipeline: Foto-Shoot organisieren / AI-generieren, ins Repo, `next/image`
- `/shop`-Bereich mit Item-Grid, Item-Modal, lokalem Cart
- 3-Schritt-Checkout-Skelett ohne Zahlung („Bestellen via Anruf"-Fallback)
- PWA-Manifest + Service Worker

### Phase 3 — Echte Zahlung + Backend (2 Wochen)
**Ziel:** Bezahlte Online-Bestellungen funktionieren ende-zu-ende.

- Supabase-DB + `orders`/`order_items`/`print_jobs`-Tabellen
- Stripe-Integration (Karten + Apple/Google Pay)
- PayPal-Integration
- Bestellbestätigung per E-Mail (Resend)
- Bestätigungsseite mit Status-Stepper
- Cookie-Banner, vollständige Rechts-Seiten + AGB + Widerruf

### Phase 4 — Bondrucker + Admin-Panel (1–2 Wochen)
**Ziel:** Restaurant-Workflow ohne manuelle Schritte.

- Star/Epson WLAN-Bondrucker einrichten
- CloudPRNT-Endpoint im Server (`/api/print/next`)
- ESC/POS-Bon-Vorlage (Header, Items, Summe, Code, QR-Code für Status-Link)
- Admin-Panel mit Login: Order-Liste, Status setzen, Drucker-Status
- Drucker-Ausfall-Backup (E-Mail/SMS bei 2 Min ohne Print-Ack)

### Phase 5 — Optional / Später
- Vollständige englische Übersetzung
- Galerie-Seite mit Lightbox
- Pizza-Hour-Banner zeitgesteuert auf Startseite
- Tisch-Reservierung
- Bewertungen / Google-Reviews-Snippet
- A/B-Tests für CTAs
- Newsletter-Integration

---

## 12 — Offene Punkte für die Implementierung

1. **Foto-Beschaffung:** ~200 Items × Fotos. Optionen: professioneller Foto-Shoot (Kosten) vs. AI-generierte Bilder (rechtlich/qualitativ vertretbar?) vs. Mischform. Zu klären vor Phase 2.
2. **Menu-Inhalt:** Genaue Allergene + Zusatzstoffe pro Item. Speisekarten-Text liegt als JPG vor — muss strukturiert in JSON überführt werden (Initial-Pflege).
3. **PLZ-Liste + Liefergebühren:** konkrete Zone-Konfiguration mit dem Restaurant abstimmen.
4. **Bondrucker-Modell:** konkrete Hardware (Star mC-Print3 ist Vorschlag, Epson TM-m30 alternativ). Anschaffung vor Phase 4.
5. **Domain:** noch nicht festgelegt. Vorschläge: `eurodoener.de`, `eurodoener-clausthal.de`, `pizzeria-clausthal.de`.
6. **Logo-Asset:** existierendes Logo aus der Speisekarte (JPG) muss als SVG/PNG mit Transparenz beschafft oder neu gezeichnet werden.

---

## 13 — Außerhalb des Scopes (für jetzt)

- Native Mobile-App (iOS/Android) — PWA reicht für „App-Feel"
- Komplexes Loyalty-Programm / Punkte-System
- Live-Tracking des Lieferfahrers per GPS
- KI-basierte Empfehlungen / Personalisierung
- Multi-Filialen-Support (nur ein Standort)
- Tisch-Reservierung (kommt evtl. in Phase 5)
- Detailliertes Analytics-Dashboard (Plausible-Analytics light reicht)
