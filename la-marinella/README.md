# la marinella — sito web

Sito statico multi-pagina (HTML + CSS + JS, nessuna dipendenza, nessun build).
Si apre con doppio clic su `index.html` e si pubblica su qualsiasi hosting
(GitHub Pages, Netlify, Aruba, spazio web del cliente) caricando la cartella così com'è.

## Struttura

```
index.html        Home
location.html     Chi siamo / La location / La spiaggia
menu.html         Il menu del ristorante (con filtri)
aperitivi.html    Aperitivi & Lounge
eventi.html       Eventi & Private Parties (+ form richiesta)
contatti.html     Contatti, orari, mappa e form di prenotazione
assets/style.css  Tutto lo stile del sito
assets/script.js  Menu mobile, animazioni, filtri menu, invio prenotazione
```

## Le 5 cose da personalizzare prima di pubblicare

1. **Numero WhatsApp** — `assets/script.js`, prima riga:
   `const WHATSAPP = '393516420126';` (formato internazionale, senza `+` né spazi).
2. **Contatti, orari, P.IVA** — sono nel footer di ogni pagina: cercare
   `351 642 0126`, `info@lamarinella.it`, `P.IVA 00000000000`.
3. **Foto reali** — vedi sotto.
4. **Prezzi e piatti** — `menu.html` e `aperitivi.html`. I piatti sono una
   proposta realistica basata sulle categorie pubblicate dal locale: vanno
   confermati con il titolare.
5. **Privacy e cookie policy** — i link nel footer puntano a `#`: sostituire
   con le pagine reali (o un generatore tipo Iubenda).

## Foto e video: cosa c'è dentro

Tutto originale del locale: quattro fotografie scattate sul posto e cinque video
dell'attività. Nessun fermo immagine estratto dai video, nessuno stock.

**4 immagini** in `assets/img/` — `cala-di-notte.jpg`, `passeggiata.jpg`,
`pasta-del-mare.jpg`, `tartare.jpg` — ognuna usata in più punti del sito.
Sono quattro file soli, non quindici: prima la stessa foto era salvata con nomi
diversi e il browser la riscaricava ogni volta. Ora pesano **700 KB in tutto**
contro gli oltre 4 MB di prima, e restano in cache tra una pagina e l'altra.

**5 video** in `assets/video/`, tutti a 720×1280, senza audio, con `faststart`
e poster:

| File | Durata | Dove | Cosa mostra |
|---|---|---|---|
| `hero-marinella.mp4` | 26s | Home (sfondo hero), Location | la cala dall'alto, la barca, la scalinata |
| `pesto.mp4` | 26s | Home, Menu, Eventi | il basilico portato a mano e il pesto al mortaio |
| `serata.mp4` | 24s | Aperitivi (sfondo hero) | il barman, gli ospiti, il locale di sera |
| `imperiale.mp4` | 12s | Eventi | il tavolo lungo allestito al tramonto |
| `vendemmia.mp4` | 7s | Menu, sezione cantina | la vendemmia |

Ogni video parte da solo, muto e in loop, è `playsinline` (su iPhone resta
dentro la pagina) e si mette in pausa quando esce dallo schermo. Chi ha attivo
"riduci animazioni" nel sistema vede solo il poster.

### Perché i video si vedono così

Due sorgenti su cinque erano a 360×640, formato da storia Instagram. I browser
le ingrandirebbero con un filtro povero, quindi l'ingrandimento a 720p l'ho
fatto in fase di compressione con **lanczos**, più una pulizia del rumore e un
filo di nitidezza: sul telefono si vede sensibilmente meglio a parità di
sorgente. Ho anche accorciato gli spezzoni — un fondale non ha bisogno di un
minuto — così ogni fotogramma si prende più bit.

Resta il limite fisico: 360 pixel ingranditi restano 360 pixel di informazione.
**Se ottieni gli originali dal telefono del titolare** (li ha girati in 1080p o
4K, quello che hai è la copia compressa da Instagram) sostituiscili con lo
stesso nome e togli il blocco `@media(min-width:900px)` di `.hero__video` nel
CSS, che applica una leggera sfocatura per mascherare la sgranatura.

Per ricomprimere un video nuovo già in alta risoluzione:
`ffmpeg -i originale.mp4 -an -c:v libx264 -crf 23 -preset slow -movflags +faststart nome.mp4`

### Sostituire una foto

Stesso nome file, stessa cartella. JPG, lato lungo 1400–2000 px, sotto i 300 KB.
Se cambia il soggetto aggiorna anche l'attributo `alt` nell'HTML.

## Cosa il sito NON dice

la marinella è un bistrot con cocktail bar, **non uno stabilimento balneare**:
nel sito non si parla di lettini, ombrelloni o noleggio spiaggia. Se un giorno
il servizio ci sarà, si aggiunge; per ora non c'è e il testo non lo promette.

## Prenotazioni

Ci sono due strade, entrambe senza server e senza costi:

- il pulsante **Prenota** (barra in alto, barra in basso sul telefono, tutti i
  richiami nelle pagine) apre direttamente la chat WhatsApp del locale con una
  riga già scritta;
- il modulo di `contatti.html` compone un messaggio completo — data, orario,
  persone, area del tavolo, note sugli allergeni — e apre WhatsApp già pronto
  da inviare.
Se in futuro il cliente vuole un gestionale vero (conferme automatiche,
calendario, tavoli) si può collegare TheFork, Plateform o Zonzofox
sostituendo il `<form>` con il widget del servizio.

## SEO

- Title e meta description sono già scritti pagina per pagina.
- `contatti.html` contiene i dati strutturati Schema.org `Restaurant`
  (Google li usa per la scheda nei risultati): aggiornare telefono,
  coordinate e URL reali.
- Da fare dopo la pubblicazione: reclamare la scheda **Google Business Profile**,
  allineare NAP (nome, indirizzo, telefono) identico a quello del sito,
  caricare il sito su Google Search Console.

Parole chiave su cui è costruito il testo:
ristorante San Terenzo · ristorante di pesce Lerici · aperitivo vista mare
Golfo dei Poeti · dove mangiare a San Terenzo · ristorante sulla spiaggia Lerici ·
matrimonio sul mare Golfo dei Poeti · beach club San Terenzo.
