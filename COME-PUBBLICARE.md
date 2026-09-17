# Mettere online il sito — guida completa

Questa cartella è già un sito pronto: `index.html` sta nella radice, non serve
nessuna compilazione. Quello che segue funziona con GitHub Pages, che è
gratuito e per un sito così è più che sufficiente.

---

## PRIMA DI TUTTO: ricomporre la cartella

Il sito ti è arrivato in **quattro archivi** perché i video pesano.
Estraili **tutti e quattro nella stessa posizione**: hanno dentro la stessa
cartella `la-marinella/` e si sovrappongono da soli.

Alla fine devi avere questa struttura:

```
la-marinella/
├── index.html
├── location.html
├── menu.html
├── aperitivi.html
├── eventi.html
├── contatti.html
├── README.md
├── COME-PUBBLICARE.md
├── .gitignore          (file nascosto)
├── .nojekyll           (file nascosto, vuoto)
└── assets/
    ├── style.css
    ├── script.js
    ├── img/     → 4 file .jpg
    └── video/   → 5 file .mp4 + 5 poster .jpg
```

**Controllo rapido:** dentro `assets/video/` devono esserci **cinque** file
`.mp4`. Se ne trovi meno, non hai estratto tutti gli archivi.

---

# QUALE STRADA SCEGLIERE

| | GitHub Desktop | Dal sito di GitHub | Da terminale |
|---|---|---|---|
| Da installare | il programma | niente | git |
| Password/token | no, entri col browser | no | sì, serve un token |
| File nascosti | li prende da solo | devi renderli visibili | li prende da solo |
| 29 MB di video | nessun problema | può interrompersi | nessun problema |
| Aggiornare dopo | tre clic | ricaricare a mano | tre comandi |

**Per il tuo caso consiglio GitHub Desktop.** Sono cinque file video per 29 MB
al primo caricamento, e soprattutto questo sito lo aggiornerai ancora — quando
arriveranno i video originali dal titolare vorrai sostituirli senza rifare
tutto da capo. Con Desktop è trascinare i file nella cartella e premere un
pulsante.

---

# STRADA A — GitHub Desktop (consigliata)

### 1. Installa ed entra

Scarica da **desktop.github.com**, installa, apri.
Al primo avvio ti chiede di entrare: **Sign in to GitHub.com** — si apre il
browser, accetti, e torni nel programma. Niente password da ricordare, niente
token da generare.

Poi ti chiede nome ed email per firmare le modifiche: metti quelli che vuoi,
servono solo come etichetta.

### 2. Trasforma la cartella in un repository

Menu **File → Add local repository...**
Con **Choose...** seleziona la cartella `la-marinella` (quella che hai ottenuto
estraendo i quattro archivi).

Ti dirà che non è un repository e ti offrirà un link tipo
**"create a repository"**: cliccalo.

Nella finestra che si apre:
- **Name:** `la-marinella` (già compilato)
- **Git ignore:** lascia *None* — il file ce l'hai già dentro
- **License:** *None*
- **Create repository**

### 3. Primo salvataggio

Nella colonna di sinistra vedi comparire tutti i file. In basso a sinistra,
nel campo **Summary**, scrivi `Sito la marinella` e clicca
**Commit to main**.

È istantaneo: sta solo salvando in locale, non sta ancora caricando niente.

### 4. Pubblica

In alto clicca **Publish repository**.

- **Name:** `la-marinella`
- **Keep this code private:** ⚠️ **TOGLI LA SPUNTA**
  Su GitHub gratuito, Pages funziona solo con repository pubblici.
- **Publish repository**

Adesso carica per davvero. I video ci mettono qualche minuto: in alto vedi la
barra di avanzamento. Se la connessione cade riprende da dove si era fermato,
non ricomincia da zero.

### 5. Accendi GitHub Pages

Questo passaggio si fa solo dal sito. In GitHub Desktop, menu
**Repository → View on GitHub**: si apre il browser sulla pagina giusta.

- **Settings** (in alto) → **Pages** (menu di sinistra)
- *Source:* **Deploy from a branch**
- *Branch:* **main**, cartella **/ (root)** → **Save**

Aspetta due o tre minuti, ricarica la pagina, e in cima compare l'indirizzo:

```
https://TUO-UTENTE.github.io/la-marinella/
```

Quello è il link da aprire sul telefono e da mandare al titolare.

---

# STRADA B — dal sito di GitHub, senza installare niente

Va bene se non vuoi installare il programma.

### 1. Crea il repository

**github.com/new**
- **Repository name:** `la-marinella`
- **Public**
- **NON** spuntare "Add a README file" né gli altri: i file ce li hai già
- **Create repository**

### 2. Carica i file

Clicca **uploading an existing file**.

Attenzione a una cosa sola: trascina **il CONTENUTO** della cartella
`la-marinella`, non la cartella. Aprila, seleziona i sei file `.html`,
i due `.md` e la cartella `assets`, e trascina quelli.

Se trascini la cartella intera il sito finisce a
`tuonome.github.io/la-marinella/la-marinella/`.

**I file nascosti** `.gitignore` e `.nojekyll` non compaiono finché non attivi
la visualizzazione dei file nascosti:
- **Windows:** Esplora file → *Visualizza* → spunta *Elementi nascosti*
- **Mac:** nel Finder premi `Cmd + Shift + .`

Se non riesci a prenderli non è grave: il sito funziona lo stesso.

### 3. Conferma e accendi Pages

Messaggio `Sito la marinella` → **Commit changes**.
Poi il punto **5** della strada A.

---

# STRADA C — da terminale

Se git ce l'hai già configurato:

```bash
cd percorso/della/cartella/la-marinella
git init
git add .
git commit -m "Sito la marinella"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/la-marinella.git
git push -u origin main
```

Poi il punto **5** della strada A.

**Se il push chiede la password e la rifiuta:** GitHub non accetta più la
password dell'account, vuole un token.
github.com → *Settings* → in fondo *Developer settings* →
*Personal access tokens* → *Tokens (classic)* → *Generate new token (classic)* →
spunta **repo** → genera e **copia subito** la stringa.
Quando il terminale chiede *Username* metti il nome utente, quando chiede
*Password* incolla il token.

---

## Aggiornare il sito più avanti

**Con GitHub Desktop** (il modo più comodo): modifica o sostituisci i file
nella cartella sul tuo computer — per esempio metti i video nuovi in
`assets/video/` con gli stessi nomi. Apri GitHub Desktop: vede da solo cosa è
cambiato. Scrivi due parole nel campo *Summary*, **Commit to main**, poi
**Push origin** in alto. Fatto.

**Da browser:** nel repository, vai sul file, matita in alto a destra,
modifica, *Commit changes*. Per sostituire una foto o un video:
*Add file → Upload files*, carica il nuovo con lo stesso nome.

**Da terminale:**

```bash
git add .
git commit -m "Aggiornato il menu"
git push
```

GitHub ripubblica da solo entro un minuto. Se non vedi il cambiamento,
ricarica tenendo premuto `Ctrl+F5` (`Cmd+Shift+R` su Mac): è la cache.

---

## Collegare un dominio vero

Quando il cliente compra il dominio, per esempio `lamarinella.it`:

1. Crea nella radice del repository un file chiamato **`CNAME`** (senza
   estensione) che contenga una sola riga: `www.lamarinella.it`
2. Dal pannello di chi gli ha venduto il dominio, crea un record **CNAME** per
   `www` che punta a `TUO-UTENTE.github.io`
3. Su GitHub: **Settings → Pages → Custom domain**, scrivi lo stesso indirizzo,
   salva e spunta **Enforce HTTPS** (compare dopo qualche minuto)

Poi nei sei file HTML aggiorna i tag `<link rel="canonical">` e `og:url`,
che adesso puntano a `https://www.lamarinella.it/`: se il dominio è diverso,
cambialo lì.

---

## Problemi tipici

**Vedo una pagina bianca, o il testo senza grafica.**
`index.html` non è nella radice del repository. Guarda in alto nella pagina del
repository: devi vedere subito `index.html`, `assets`, `menu.html`. Se invece
vedi una cartella `la-marinella`, hai caricato la cartella invece del suo
contenuto: entra, seleziona tutto, e spostalo su di un livello — oppure
ricomincia cancellando il repository e ricaricando.

**Le immagini non si vedono.**
Manca la cartella `assets`, o è stata caricata a metà. Controlla che dentro
`assets/img/` ci siano quattro `.jpg` e dentro `assets/video/` cinque `.mp4`.

**I video non partono.**
Se sono più leggeri del dovuto il caricamento si è interrotto. Ricaricali uno
per volta: `assets/video/` → *Add file → Upload files*.

**Pages non compare nelle impostazioni.**
Il repository è privato e sei su un piano gratuito. Rendilo pubblico:
*Settings → General → in fondo → Change visibility*.

**Ho caricato ma il sito non c'è.**
Il primo rilascio può metterci fino a dieci minuti. In *Settings → Pages* e
nella scheda *Actions* vedi a che punto è.
