(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ── the header gets its rule once the page moves ── */
  const top = document.querySelector('.top');
  if (top) {
    const onScroll = () => top.classList.toggle('scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── copy install ── */
  const copy = document.getElementById('copy');
  if (copy) {
    const label = copy.firstElementChild;
    const text = label.textContent;
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText('npm i -g @aqorin/cli'); label.textContent = copy.dataset.done; copy.classList.add('done'); }
      catch { label.textContent = copy.dataset.fail; }
      setTimeout(() => { label.textContent = text; copy.classList.remove('done'); }, 1800);
    });
  }

  /* ── the TUI's working glyph and elapsed time, as the TUI draws them (theme.ts FRAMES, a tick every 250 ms) ── */
  const FRAMES = ['◐', '◓', '◑', '◒'];
  let tick = 0;
  const clockText = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  if (!reduce) {
    setInterval(() => {
      tick += 1;
      document.querySelectorAll('.scr .spin').forEach(n => { n.textContent = FRAMES[tick % 4]; });
      if (tick % 4 === 0) document.querySelectorAll('.scr .clock').forEach(n => {
        n.dataset.s = String(Number(n.dataset.s) + 1);
        n.textContent = clockText(Number(n.dataset.s));
      });
    }, 250);
  } else {
    // with motion off the TUI's glyph stands still
    document.querySelectorAll('.scr .spin').forEach(n => { n.textContent = '◐'; });
  }

  /* ── reveals, and output that prints when it comes into view ── */
  const prints = [...document.querySelectorAll('[data-print]')];
  const paints = [...document.querySelectorAll('.paint')];
  if (!reduce) {
    prints.forEach(p => p.classList.add('armed'));
    paints.forEach(p => p.classList.add('armed'));
  }
  const print = pre => {
    const typed = pre.querySelector('.typed');
    const lines = [...pre.querySelectorAll('.l:not(.cmd), .ll')];
    const show = (start) => {
      if (pre.classList.contains('log')) {
        // the log keeps the Run's own rhythm: its events at 0 s, 28 s and 50 s, compressed
        const first = lines[0] && toSec(lines[0].dataset.t);
        let last = -1, n = 0;
        lines.forEach(l => {
          const s = toSec(l.dataset.t) - first;
          n = s === last ? n + 1 : 0; last = s;
          setTimeout(() => l.classList.add('on'), start + s * 42 + n * 55);
        });
      } else {
        lines.forEach((l, i) => setTimeout(() => l.classList.add('on'), start + i * 34));
      }
    };
    if (pre.querySelector('.cmd')) pre.querySelector('.cmd').classList.add('on');
    if (typed) {
      const full = typed.textContent;
      typed.textContent = '';
      typed.classList.add('on', 'caret');
      let i = 0;
      const step = () => {
        i = Math.min(full.length, i + 3);
        typed.textContent = full.slice(0, i);
        if (i < full.length) setTimeout(step, 22);
        else setTimeout(() => { typed.classList.remove('caret'); show(0); }, 260);
      };
      step();
    } else show(0);
    pre.classList.remove('armed');
  };
  const toSec = t => { const [h, m, s] = t.split(':').map(Number); return h * 3600 + m * 60 + s; };

  const seen = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const n = e.target;
    seen.unobserve(n);
    if (n.matches('[data-print]')) { if (n.classList.contains('armed')) print(n); return; }
    // a clipped screen never intersects: its window is watched, and it paints when that shows
    if (n.matches('.paints')) { n.querySelectorAll('.paint').forEach(p => { p.classList.remove('armed'); p.classList.add('on'); }); return; }
    n.classList.add(n.matches('.step') ? 'seen' : 'in');
  }), { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv, .rv-list, .step').forEach(n => seen.observe(n));
  if (!reduce) {
    prints.forEach(n => seen.observe(n));
    new Set(paints.map(p => p.closest('.term'))).forEach(t => { t.classList.add('paints'); seen.observe(t); });
  }

  /* ── the TUI screens: tabs, a timed rotation that stops when the reader chooses, the Run played back ── */
  const term = document.getElementById('term');
  if (!term) return;
  setTimeout(() => term.classList.add('booted'), 1400);
  const tabs = [...term.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
  const mark = term.querySelector('.tab-mark');
  const pause = document.getElementById('term-pause');
  let current = 0, stopped = reduce, hovering = false, visible = false, left = 0;

  const replay = { data: null, timer: 0 };
  const runTab = tabs.findIndex(t => t.dataset.replay);
  const msOf = i => {
    if (i === runTab) return replay.data ? replay.data[72].frames.length * replay.data[72].tick + 3200 : 12000;
    return Number(tabs[i].dataset.ms || 6000);
  };
  const loadReplay = () => {
    if (replay.data || replay.loading || runTab < 0) return replay.loading;
    const base = tabs[runTab].dataset.replay;
    replay.loading = Promise.all([72, 46].map(c => fetch(`${base}${c}.json`).then(r => r.json())))
      .then(([a, b]) => { replay.data = { 72: a, 46: b }; })
      .catch(() => {});
    return replay.loading;
  };
  const play = () => {
    clearInterval(replay.timer);
    if (reduce || !replay.data) return;
    const pres = { 72: panels[runTab].querySelector('.w72'), 46: panels[runTab].querySelector('.w46') };
    let f = 0;
    const draw = () => {
      for (const c of [72, 46]) {
        const d = replay.data[c], frame = d.frames[Math.min(f, d.frames.length - 1)];
        pres[c].innerHTML = frame.map(r => d.rows[r]).join('\n');
      }
      f += 1;
      if (f >= replay.data[72].frames.length) clearInterval(replay.timer);
    };
    draw();
    replay.timer = setInterval(draw, replay.data[72].tick);
  };

  const held = () => (pause && pause.getAttribute('aria-pressed') === 'true') || hovering || !visible || document.hidden || term.contains(document.activeElement);
  const placeMark = () => {
    const t = tabs[current], box = t.parentElement.getBoundingClientRect(), r = t.getBoundingClientRect();
    mark.style.transform = `translateX(${r.left - box.left + 10}px) scaleX(${r.width - 20})`;
  };
  const timeMark = () => {
    mark.classList.remove('timing');
    if (stopped) return;
    void mark.offsetWidth;
    mark.style.setProperty('--tab-ms', `${left}ms`);
    mark.classList.add('timing');
  };
  const select = (i, focus) => {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((t, k) => {
      const on = k === current;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[k].hidden = !on;
    });
    if (focus) tabs[current].focus();
    left = msOf(current);
    placeMark();
    timeMark();
    if (current === runTab) {
      if (replay.data) { play(); left = msOf(current); timeMark(); }
      else loadReplay()?.then(() => { if (current === runTab) { play(); left = msOf(current); timeMark(); } });
    } else clearInterval(replay.timer);
  };
  const stop = () => { stopped = true; mark.classList.remove('timing'); if (pause) pause.hidden = true; };

  tabs.forEach((t, k) => {
    t.addEventListener('click', () => { stop(); select(k); });
    t.addEventListener('keydown', e => {
      const to = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault(); stop(); select(to, true);
    });
  });
  addEventListener('resize', placeMark, { passive: true });
  document.fonts?.ready.then(placeMark);
  placeMark();
  if (reduce) return;

  loadReplay();
  if (pause) {
    pause.hidden = false;
    pause.addEventListener('click', () => {
      const paused = pause.getAttribute('aria-pressed') !== 'true';
      pause.setAttribute('aria-pressed', String(paused));
      pause.textContent = paused ? pause.dataset.play : pause.dataset.pause;
    });
  }
  term.addEventListener('mouseenter', () => hovering = true);
  term.addEventListener('mouseleave', () => hovering = false);
  new IntersectionObserver(es => es.forEach(e => visible = e.isIntersecting), { threshold: 0.4 }).observe(term);
  left = msOf(0);
  timeMark();
  setInterval(() => {
    const h = held();
    mark.classList.toggle('held', h);
    if (stopped || h) return;
    left -= 100;
    if (left <= 0) select(current + 1);
  }, 100);
})();
