/* ============================================================
   la marinella — script globale
   1. Menu mobile   2. Nav scroll   3. Reveal on scroll
   4. Filtri menu   5. Form prenotazione -> WhatsApp
   ============================================================ */

/* --- Numero WhatsApp del locale (formato internazionale, senza + né spazi) --- */
const WHATSAPP = '393516420126';

/* Il browser tende a ripristinare la posizione di scorrimento precedente:
   una pagina nuova deve aprirsi in cima, non a metà o in fondo. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

document.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) window.scrollTo(0, 0);
  window.addEventListener('load', () => { if (!location.hash) window.scrollTo(0, 0); });

  /* 1. Menu mobile ------------------------------------------------ */
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', document.body.classList.contains('menu-open'));
    });
    document.querySelectorAll('.nav__menu a').forEach(a =>
      a.addEventListener('click', () => document.body.classList.remove('menu-open'))
    );
    /* Esc chiude il pannello, come ci si aspetta da tastiera. */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* 2. Nav che si compatta allo scroll ---------------------------- */
  const nav = document.querySelector('.nav');
  if (nav && nav.classList.contains('nav--trasparente')) {
    const onScroll = () => nav.classList.toggle('nav--solid', window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* 3. Comparsa progressiva dei blocchi ---------------------------- */
  const blocchi = document.querySelectorAll('.rivela');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((voci) => {
      voci.forEach(v => {
        if (v.isIntersecting) { v.target.classList.add('visibile'); io.unobserve(v.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px 200px 0px' });
    blocchi.forEach((b, i) => { b.style.transitionDelay = (i % 3) * 60 + 'ms'; io.observe(b); });
  } else {
    blocchi.forEach(b => b.classList.add('visibile'));
  }

  /* 4. Filtri del menu -------------------------------------------- */
  const filtri = document.querySelectorAll('.filtro');
  if (filtri.length) {
    filtri.forEach(f => f.addEventListener('click', () => {
      filtri.forEach(x => x.classList.remove('attivo'));
      f.classList.add('attivo');
      const scelta = f.dataset.filtro;
      document.querySelectorAll('.menu-blocco').forEach(blocco => {
        let visibili = 0;
        blocco.querySelectorAll('.portata').forEach(p => {
          const ok = scelta === 'tutto' || (p.dataset.tag || '').split(' ').includes(scelta);
          p.style.display = ok ? '' : 'none';
          if (ok) visibili++;
        });
        blocco.style.display = visibili ? '' : 'none';
      });
    }));
  }

  /* 5. Prenotazione: invio su WhatsApp ----------------------------- */
  const form = document.querySelector('#form-prenotazione');
  if (form) {
    /* La data arriva da tre tendine: giorno, mese, anno. */
    const gg = form.querySelector('[name="giorno"]');
    const mm = form.querySelector('[name="mese"]');
    const aa = form.querySelector('[name="anno"]');
    const avviso = form.querySelector('.errore-data');

    /* Vera data del calendario? (il 31 febbraio non esiste) e non già passata? */
    function dataScelta() {
      if (!gg || !mm || !aa || !gg.value || !mm.value || !aa.value) return null;
      const d = new Date(+aa.value, +mm.value - 1, +gg.value);
      if (d.getDate() !== +gg.value || d.getMonth() !== +mm.value - 1) return null;
      const oggi = new Date(); oggi.setHours(0, 0, 0, 0);
      return d < oggi ? null : d;
    }

    function controllaData() {
      const pieni = gg && mm && aa && gg.value && mm.value && aa.value;
      const ok = !pieni || dataScelta() !== null;
      if (avviso) avviso.hidden = ok;
      [gg, mm, aa].forEach(sel => {
        if (sel) sel.style.borderColor = ok ? '' : 'var(--corallo)';
      });
      return ok;
    }
    [gg, mm, aa].forEach(sel => sel && sel.addEventListener('change', controllaData));

    form.addEventListener('submit', e => {
      e.preventDefault();
      /* Controllo campi obbligatori (anche se il submit arriva da script) */
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
      if (!controllaData()) {
        if (avviso) avviso.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      const d = Object.fromEntries(new FormData(form).entries());
      const scelta = dataScelta();
      const dataIt = scelta
        ? scelta.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : '';
      const testo =
        `Buongiorno la marinella, vorrei prenotare un tavolo.\n\n` +
        `• Nome: ${d.nome || ''}\n` +
        `• Telefono: ${d.telefono || ''}\n` +
        `• Data: ${dataIt}\n` +
        `• Orario: ${d.orario || ''}\n` +
        `• Persone: ${d.persone || ''}\n` +
        `• Area: ${d.area || 'nessuna preferenza'}\n` +
        `• Occasione: ${d.occasione || '—'}\n` +
        (d.note ? `• Note: ${d.note}\n` : '') +
        `\nGrazie!`;
      const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(testo)}`;
      /* Su mobile alcuni browser bloccano window.open: in quel caso navighiamo. */
      const w = window.open(link, '_blank', 'noopener');
      if (!w) window.location.href = link;

      const esito = document.querySelector('#esito-prenotazione');
      if (esito) {
        esito.hidden = false;
        esito.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* 6. Video della hero -------------------------------------------- */
  const video = document.querySelector('.hero__video');
  if (video) {
    const fermo = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applica = () => {
      if (fermo.matches) { video.pause(); video.removeAttribute('autoplay'); }
      else { video.play().catch(() => {}); }
    };
    applica();
    fermo.addEventListener ? fermo.addEventListener('change', applica) : null;

    /* Se l'autoplay viene bloccato, resta il poster: nessun errore a schermo. */
    video.addEventListener('error', () => video.remove());

    /* Fuori schermo il video si mette in pausa: batteria e dati risparmiati. */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([v]) => {
        if (fermo.matches) return;
        v.isIntersecting ? video.play().catch(() => {}) : video.pause();
      }, { threshold: 0.05 }).observe(video);
    }
  }

  /* 6b. Video dentro gli slot foto ---------------------------------- */
  const clip = document.querySelectorAll('.foto video');
  if (clip.length) {
    const fermoClip = window.matchMedia('(prefers-reduced-motion: reduce)');
    clip.forEach(v => v.addEventListener('error', () => v.remove()));

    if ('IntersectionObserver' in window) {
      /* Primo osservatore: con 800px di anticipo comincia a scaricare, così
         quando il video arriva sotto gli occhi è già pronto a partire. */
      const ioCarica = new IntersectionObserver(voci => {
        voci.forEach(x => {
          if (!x.isIntersecting) return;
          x.target.preload = 'auto';
          x.target.load();
          ioCarica.unobserve(x.target);
        });
      }, { rootMargin: '800px 0px 800px 0px' });
      clip.forEach(v => ioCarica.observe(v));

      /* Secondo osservatore: appena si affaccia, parte. */
      const ioGioca = new IntersectionObserver(voci => {
        voci.forEach(x => {
          if (fermoClip.matches) return;
          x.isIntersecting ? x.target.play().catch(() => {}) : x.target.pause();
        });
      }, { threshold: 0.01 });
      clip.forEach(v => ioGioca.observe(v));
    } else {
      clip.forEach(v => { v.preload = 'auto'; v.play().catch(() => {}); });
    }
  }

  /* 6c. Un link dentro l'etichetta di una spunta apriva il link E
         spuntava la casella. Il clic sul link si ferma lì. */
  document.querySelectorAll('label a').forEach(a =>
    a.addEventListener('click', e => e.stopPropagation())
  );

  /* 7. Anno corrente nel footer ------------------------------------ */
  document.querySelectorAll('[data-anno]').forEach(el => el.textContent = new Date().getFullYear());
});
