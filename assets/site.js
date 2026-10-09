(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const onView = (node, fn, threshold = .25) => {
    if (!node) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.disconnect(); fn(); } }), { threshold });
    io.observe(node);
  };

  /* ── film: plays muted while in view, unless reduced motion ── */
  const film = document.getElementById('film-video');
  if (film && !reduce) {
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) film.play().catch(() => {}); else film.pause();
    }), { threshold: .5 }).observe(film);
  }
  const sound = document.getElementById('film-sound');
  if (film && sound) {
    const sync = () => { sound.setAttribute('aria-pressed', String(!film.muted)); sound.textContent = film.muted ? sound.dataset.off : sound.dataset.on; };
    let heard = false;
    sound.addEventListener('click', () => {
      film.muted = !film.muted;
      if (!film.muted && !heard) { heard = true; film.currentTime = 0; }
      if (!film.muted) film.play().catch(() => {});
    });
    film.addEventListener('volumechange', sync);
  }

  /* ── copy install ── */
  const copy = document.getElementById('copy');
  if (copy) {
    const label = copy.textContent;
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText('npm i -g @aqorin/cli'); copy.textContent = copy.dataset.done; }
      catch { copy.textContent = copy.dataset.fail; }
      setTimeout(() => copy.textContent = label, 1600);
    });
  }

  /* ── reveal ── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .1 });
  document.querySelectorAll('.rv').forEach(n => io.observe(n));

  /* ── event tape ── */
  const tape = document.getElementById('tape');
  if (tape) {
    const evs = ['run.created', 'run.plan_frozen', 'attempt.planned', 'attempt.started', 'handoff.created', 'attempt.completed',
      'validation.passed', 'review.needs_changes', 'attempt.started', 'validation.passed', 'review.approved', 'run.succeeded',
      'run.created', 'run.blocked', 'approval.requested', 'run.resumed', 'attempt.failed', 'run.failed'];
    let html = '';
    evs.forEach((e, i) => { html += `<span><i>${String(4201 + i).padStart(6, '0')}</i>${e}</span>`; });
    tape.innerHTML = html + html;
  }

  /* ── switchboard: role → runtime ── */
  const sw = document.getElementById('switchboard');
  if (sw) {
    const roles = ['specifier', 'developer', 'validator', 'reviewer'];
    const rts = ['opencode', 'pi', 'codex', 'claude-code', 'jcode'];
    const colors = ['#ff4f1a', '#f0eee6', '#23a55a', '#f2b21b'];
    const RX = 150, TX = 548, ry = i => 62 + i * 70, ty = i => 40 + i * 64;
    const svg = el('svg', { viewBox: '0 0 700 340', role: 'group', 'aria-label': sw.dataset.label }, sw);
    el('rect', { x: 118, y: 22, width: 64, height: 296, rx: 6, fill: '#1b1b19', stroke: '#2c2c29' }, svg);
    el('rect', { x: 516, y: 16, width: 64, height: 308, rx: 6, fill: '#1b1b19', stroke: '#2c2c29' }, svg);
    const cableG = el('g', {}, svg), jackG = el('g', {}, svg);
    const assign = roles.map(() => 2); // today: one runtime per Run
    const cur = assign.map((a) => ty(a));
    const cables = roles.map((_, i) => ({
      shadow: el('path', { fill: 'none', stroke: '#000', 'stroke-width': 9, 'stroke-linecap': 'round', opacity: .45 }, cableG),
      wire: el('path', { fill: 'none', stroke: colors[i], 'stroke-width': 5, 'stroke-linecap': 'round' }, cableG),
      p1: el('rect', { width: 22, height: 12, rx: 3, fill: colors[i] }, cableG),
      p2: el('rect', { width: 22, height: 12, rx: 3, fill: colors[i] }, cableG),
    }));
    const draw = i => {
      const y1 = ry(i), y2 = cur[i], x1 = RX + 12, x2 = TX - 12, sag = 46 + Math.abs(y2 - y1) * .3;
      const d = `M${x1} ${y1} C${x1 + 120} ${y1 + sag},${x2 - 120} ${y2 + sag},${x2} ${y2}`;
      cables[i].wire.setAttribute('d', d);
      cables[i].shadow.setAttribute('d', d);
      cables[i].shadow.setAttribute('transform', 'translate(0 5)');
      cables[i].p1.setAttribute('x', x1 - 8); cables[i].p1.setAttribute('y', y1 - 6);
      cables[i].p2.setAttribute('x', x2 - 14); cables[i].p2.setAttribute('y', y2 - 6);
    };
    const jack = (x, y, label, anchor, kind, idx) => {
      const g = el('g', { class: 'jack', tabindex: 0, role: 'button', 'aria-label': `${kind} ${label}` }, jackG);
      el('circle', { class: 'ring', cx: x, cy: y, r: 13 }, g);
      el('circle', { cx: x, cy: y, r: 5, fill: '#000' }, g);
      const t = el('text', { x: anchor === 'end' ? x - 42 : x + 42, y: y + 4, 'text-anchor': anchor, fill: '#f0eee6', 'font-size': 13 }, g);
      t.textContent = label;
      g.addEventListener('click', () => pick(kind, idx, g));
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(kind, idx, g); } });
      return g;
    };
    const headL = el('text', { x: 150, y: 12, 'text-anchor': 'middle', fill: '#9b988f', 'font-size': 10, 'letter-spacing': 1.5 }, svg); headL.textContent = 'ROLE';
    const headR = el('text', { x: 548, y: 8, 'text-anchor': 'middle', fill: '#9b988f', 'font-size': 10, 'letter-spacing': 1.5 }, svg); headR.textContent = 'RUNTIME';
    const roleJacks = roles.map((r, i) => jack(RX, ry(i), r, 'end', 'role', i));
    rts.forEach((r, i) => jack(TX, ty(i), r, 'start', 'runtime', i));
    roles.forEach((_, i) => draw(i));

    const out = document.getElementById('assign');
    const render = hot => {
      out.innerHTML = roles.map((r, i) => {
        const line = `${r.padEnd(10)} <span class="k">→</span> ${rts[assign[i]]}`;
        return i === hot ? `<span class="hot">${line}</span>` : line;
      }).join('\n');
      const mixed = new Set(assign).size > 1;
      document.getElementById('mode').textContent = mixed ? sw.dataset.mixed : sw.dataset.single;
    };
    render(-1);

    const tween = (i, to) => new Promise(res => {
      const from = cur[i], t0 = performance.now(), dur = reduce ? 1 : 650;
      (function f(now) {
        const t = Math.max(0, Math.min(1, (now - t0) / dur));
        cur[i] = from + (to - from) * ease(t); draw(i);
        t < 1 ? requestAnimationFrame(f) : res();
      })(t0);
    });
    const patch = async (i, rt) => {
      if (assign[i] === rt) return;
      assign[i] = rt; render(i);
      await tween(i, ty(rt));
      setTimeout(() => render(-1), 900);
    };

    let sel = null, touched = 0;
    function pick(kind, idx, g) {
      touched = Date.now();
      if (kind === 'role') {
        roleJacks.forEach(j => j.classList.remove('sel'));
        sel = sel === idx ? null : idx;
        if (sel !== null) g.classList.add('sel');
      } else if (sel !== null) {
        patch(sel, idx);
        roleJacks[sel].classList.remove('sel'); sel = null;
      }
    }
    const demo = [[1, 1], [3, 3], [2, 0], [0, 4], [1, 2], [3, 1], [2, 2], [0, 2], [3, 2], [1, 1], [0, 3]];
    let k = 0;
    onView(sw, () => {
      if (reduce) return;
      setInterval(() => {
        if (Date.now() - touched < 9000 || sel !== null) return;
        const [r, t] = demo[k++ % demo.length]; patch(r, t);
      }, 2200);
    });
  }

  /* ── metro line: an illustrative Run and the engine's interlocking ── */
  const metro = document.getElementById('metro');
  if (metro) {
    const svg = el('svg', { viewBox: '0 0 900 330', role: 'img', 'aria-label': metro.dataset.label }, metro);
    const Y = 170, X = { specify: 80, implement: 290, validate: 500, review: 710, done: 850 };
    const roleOf = { specify: 'specifier', implement: 'developer', validate: 'validator', review: 'reviewer', done: '' };
    const runtimes = ['codex', 'opencode', 'pi', 'claude-code', 'jcode'], roleTags = [], rtHead = document.getElementById('metro-rt');
    let runNo = 0;
    for (const s in X) {
      const label = el('text', { x: X[s], y: 40, 'text-anchor': 'middle', fill: '#f0eee6', 'font-size': 13, 'letter-spacing': 1 }, svg); label.textContent = s.toUpperCase();
      if (roleOf[s]) { const r = el('text', { x: X[s], y: 60, 'text-anchor': 'middle', fill: '#9b988f', 'font-size': 11 }, svg); roleTags.push([r, roleOf[s]]); }
      el('line', { x1: X[s], y1: 74, x2: X[s], y2: Y - 16, stroke: '#3a3935', 'stroke-width': 1, 'stroke-dasharray': '2 4' }, svg);
    }
    const shortcut = el('path', { d: `M${X.implement} ${Y} C${X.implement + 60} 96,${X.done - 60} 96,${X.done} ${Y}`, fill: 'none', stroke: '#e0352b', 'stroke-width': 2, 'stroke-dasharray': '5 6', opacity: .22 }, svg);
    const xMark = el('text', { x: 570, y: 125, 'text-anchor': 'middle', fill: '#e0352b', 'font-size': 26, opacity: 0 }, svg); xMark.textContent = '✕';
    const loop = el('path', { d: `M${X.review} ${Y} C${X.review} 300,${X.implement} 300,${X.implement} ${Y}`, fill: 'none', stroke: '#f2b21b', 'stroke-width': 3, 'stroke-dasharray': '2 7', 'stroke-linecap': 'round' }, svg);
    const loopT = el('text', { x: 500, y: 290, 'text-anchor': 'middle', fill: '#f2b21b', 'font-size': 11 }, svg); loopT.textContent = 'review.needs_changes · review_cycles ≤ 3';
    el('line', { x1: X.specify, y1: Y, x2: X.done, y2: Y, stroke: '#f0eee6', 'stroke-width': 6, 'stroke-linecap': 'round' }, svg);
    const stn = {};
    for (const s in X) stn[s] = el('circle', { cx: X[s], cy: Y, r: s === 'done' ? 13 : 11, fill: '#141413', stroke: '#f0eee6', 'stroke-width': 3 }, svg);
    const train = el('rect', { width: 30, height: 14, rx: 3, fill: '#ff4f1a', x: X.specify - 15, y: Y - 7, opacity: 0 }, svg);
    const at = (x, y) => { train.setAttribute('x', x - 15); train.setAttribute('y', y - 7); };
    const light = (s, on) => { stn[s].setAttribute('fill', on ? '#ff4f1a' : '#141413'); stn[s].setAttribute('stroke', on ? '#ff4f1a' : '#f0eee6'); };
    const run = (from, to, dur = 1100) => new Promise(res => {
      const t0 = performance.now(), d = reduce ? 1 : dur;
      (function f(now) { const t = Math.max(0, Math.min(1, (now - t0) / d)); at(from + (to - from) * ease(t), Y); t < 1 ? requestAnimationFrame(f) : res(); })(t0);
    });
    const along = (path, dur = 1500) => new Promise(res => {
      const L = path.getTotalLength(), t0 = performance.now(), d = reduce ? 1 : dur;
      (function f(now) { const t = Math.max(0, Math.min(1, (now - t0) / d)), p = path.getPointAtLength(L * ease(t)); at(p.x, p.y); t < 1 ? requestAnimationFrame(f) : res(); })(t0);
    });

    const logEl = document.getElementById('log');
    let seq = 0;
    const log = (ev, cls = 'ev') => {
      const d = document.createElement('div');
      d.innerHTML = `<span class="seq">${String(++seq).padStart(4, '0')}</span><span class="${cls}">${ev}</span>`;
      logEl.appendChild(d);
      while (logEl.children.length > 16) logEl.firstChild.remove();
    };
    const lk = id => document.getElementById(id);
    const setLock = (id, c) => { lk(id).classList.remove('g', 'r', 'a'); if (c) lk(id).classList.add(c); };
    const budget = n => { lk('lk-budget').querySelector('b').textContent = `${n}/3`; };

    async function cycle() {
      const rt = runtimes[runNo++ % runtimes.length]; // one runtime per Run, a different one each Run
      roleTags.forEach(([t, role]) => { t.textContent = `${role} · ${rt}`; });
      rtHead.textContent = `runtime: ${rt}`;
      seq = 0; logEl.innerHTML = ''; ['lk-trans', 'lk-valid', 'lk-review', 'lk-budget'].forEach(i => setLock(i));
      budget(0); for (const s in X) light(s, false);
      at(X.specify, Y); train.setAttribute('opacity', 1);
      log('run.created'); await sleep(350); log(`run.plan_frozen <span class="seq">feature@1 · ${rt}</span>`); setLock('lk-trans', 'g'); setLock('lk-budget', 'g');
      light('specify', true); log('attempt.started specify'); await sleep(700); log('handoff.created spec.md', 'good');
      await run(X.specify, X.implement); light('implement', true);
      log('attempt.started implement'); await sleep(700); log('attempt.completed');
      await sleep(400);
      shortcut.setAttribute('opacity', 1); xMark.setAttribute('opacity', 1); setLock('lk-trans', 'r');
      log('✕ implement → done  rejected', 'bad'); log('  guard: required_validations_passed', 'bad');
      await sleep(1500); shortcut.setAttribute('opacity', .22); xMark.setAttribute('opacity', 0); setLock('lk-trans', 'g');
      await run(X.implement, X.validate); light('validate', true); log('validation.passed', 'good'); setLock('lk-valid', 'g');
      await run(X.validate, X.review); light('review', true); log('attempt.started review'); await sleep(700);
      log('review.needs_changes', 'warn'); setLock('lk-review', 'a'); budget(1); setLock('lk-budget', 'a'); setLock('lk-valid');
      await along(loop); log('attempt.started implement <span class="seq">fix 1</span>'); await sleep(600);
      await run(X.implement, X.validate); log('validation.passed', 'good'); setLock('lk-valid', 'g');
      await run(X.validate, X.review); log('attempt.started review'); await sleep(700);
      log('review.approved', 'good'); setLock('lk-review', 'g'); setLock('lk-budget', 'g');
      await run(X.review, X.done, 800); light('done', true); log('run.succeeded', 'good');
      await sleep(4200);
      if (!reduce) cycle();
    }
    onView(metro, cycle, .35);
  }

  /* ── capability signals ── */
  const sigRows = [...document.querySelectorAll('.sig-row[data-k]')];
  if (sigRows.length) {
    const kinds = ['native', 'emulated', 'degraded', 'rejected'];
    let tick = 0;
    const paint = () => {
      sigRows.forEach((r, i) => {
        const base = kinds.indexOf(r.dataset.k);
        const pick = kinds[tick === 0 ? base : (base + tick + i) % 4];
        r.querySelectorAll('.sig').forEach(s => s.classList.toggle('on', s.classList.contains(pick)));
      });
      tick = (tick + 1) % 4;
    };
    paint();
    if (!reduce) setInterval(paint, 2400);
  }

  /* ── split-flap board ── */
  const board = document.getElementById('flapboard');
  if (board) {
    const flaps = [...board.querySelectorAll('.flap')];
    flaps.forEach(f => {
      const txt = f.dataset.text.padEnd(+f.dataset.len || f.dataset.text.length, ' ');
      f.setAttribute('aria-label', f.dataset.text);
      f.innerHTML = [...txt].map(() => '<i aria-hidden="true"> </i>').join('');
    });
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·';
    onView(board, () => {
      flaps.forEach((f, fi) => {
        const txt = f.dataset.text.padEnd(+f.dataset.len || f.dataset.text.length, ' ');
        [...f.children].forEach((c, ci) => {
          const target = txt[ci], steps = reduce ? 0 : 6 + ci + (fi % 6) * 2;
          let n = 0;
          const t = setInterval(() => {
            if (n++ >= steps) { c.textContent = target; clearInterval(t); return; }
            c.textContent = chars[(Math.random() * chars.length) | 0];
          }, 42);
        });
      });
    }, .3);
  }
})();
