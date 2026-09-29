(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* copy install */
  const copy = document.getElementById('copy'), copyL = document.getElementById('copy-l');
  const label = copyL.textContent;
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('npm i -g @aqorin/cli'); copyL.textContent = copyL.dataset.done; }
    catch { copyL.textContent = copyL.dataset.fail; }
    setTimeout(() => copyL.textContent = label, 1600);
  });

  /* reveal */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 70 + 'ms'; io.observe(el); });

  /* terminal */
  const term = document.getElementById('term');
  const script = [
    ['cmd', 'aqorin feature "sum() breaks on negative numbers" --runtime codex'],
    ['out', '<span class="t-d">run</span>    <span class="t-v">run_7f3a…c21</span>  created'],
    ['out', '<span class="t-d">plan</span>   frozen · workflow <span class="t-m">feature@1</span> · runtime <span class="t-m">codex</span>'],
    ['out', '<span class="t-d">budget</span> review_cycles <span class="t-m">0/3</span>'],
    ['gap'],
    ['step', 'specify',   'attempt.started',   'specifier'],
    ['out', '         <span class="t-ok">✓</span> handoff.created  <span class="t-d">spec.md</span>'],
    ['step', 'implement', 'attempt.started',   'developer'],
    ['out', '         <span class="t-ok">✓</span> attempt.completed <span class="t-d">src/sum.js +1 −1</span>'],
    ['step', 'validate',  'validation',        'validator'],
    ['out', '         <span class="t-ok">✓</span> validation.passed'],
    ['step', 'review',    'attempt.started',   'reviewer'],
    ['out', '         <span class="t-ok">✓</span> review.approved  <span class="t-d">independent</span>'],
    ['gap'],
    ['out', '<span class="t-ok">■ run.succeeded</span>  <span class="t-d">4 steps · 0 fix cycles · 308s</span>'],
    ['out', '<span class="t-d">  inspect it:</span> aqorin inspect run_7f3a…c21'],
  ];
  const line = h => { const d = document.createElement('div'); d.innerHTML = h; term.appendChild(d); return d; };
  const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
  async function play() {
    term.innerHTML = '';
    for (const s of script) {
      if (s[0] === 'cmd') {
        const d = line('<span class="t-p">❯</span> <span class="tx"></span><span class="caret"></span>');
        const tx = d.querySelector('.tx');
        for (const ch of s[1]) { tx.textContent += ch; await sleep(26 + Math.random() * 30); }
        await sleep(420); d.querySelector('.caret').remove();
      } else if (s[0] === 'gap') { line(' '); await sleep(160); }
      else if (s[0] === 'step') {
        const d = line(`<span class="t-w">▶</span> ${s[1].padEnd(9)} <span class="t-d">${s[3]}</span> <span class="t-w sp">⠋</span>`);
        const sp = d.querySelector('.sp'), fr = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
        for (let i = 0; i < (reduce ? 0 : 14); i++) { sp.textContent = fr[i % fr.length]; await sleep(70); }
        d.innerHTML = `<span class="t-ok">▶</span> ${s[1].padEnd(9)} <span class="t-d">${s[3]}</span>`;
      } else { line(s[1]); await sleep(230); }
    }
    line('<span class="t-p">❯</span> <span class="caret"></span>');
    if (!reduce) { await sleep(6000); play(); }
  }
  play();

  /* architecture packet */
  const packet = document.getElementById('packet'), glow = document.getElementById('packet-g');
  const paths = [0,1,2,3,4].map(i => document.getElementById('l' + i));
  const boxes = document.querySelectorAll('#adapters g');
  let k = 0;
  function route() {
    const i = k++ % 5, p = paths[i], len = p.getTotalLength(), t0 = performance.now(), dur = reduce ? 1 : 1100;
    paths.forEach((q, j) => q.setAttribute('stroke', j === i ? '#5fd4c0' : '#2a3a3f'));
    boxes.forEach((b, j) => b.querySelector('rect').setAttribute('stroke', j === i ? '#5fd4c0' : '#1f2b2f'));
    (function f(now) {
      const t = Math.min(1, (now - t0) / dur), pt = p.getPointAtLength(len * t);
      [packet, glow].forEach(c => { c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y); });
      if (t < 1) requestAnimationFrame(f); else setTimeout(route, reduce ? 99999 : 700);
    })(t0);
  }
  route();

  /* role ≠ runtime ≠ model shuffle */
  const rts = ['opencode','codex','pi','claude-code','jcode'], ms = ['model-a','model-b','model-c','model-d','model-e'];
  const rSlots = [...document.querySelectorAll('[data-r]')], mSlots = [...document.querySelectorAll('[data-m]')];
  function shuffle() {
    const set = (slots, pool) => { const s = slots[Math.floor(Math.random() * slots.length)];
      s.firstElementChild.textContent = pool[Math.floor(Math.random() * pool.length)];
      s.classList.add('flip'); setTimeout(() => s.classList.remove('flip'), 900); };
    Math.random() < .5 ? set(rSlots, rts) : set(mSlots, ms);
  }
  if (!reduce) setInterval(shuffle, 1300);

  /* capability matrix */
  const caps = [
    ['independent review', 'native'],
    ['session resume', 'emulated'],
    ['skill projection', 'degraded'],
    ['filesystem sandbox', 'rejected'],
    ['MCP selection', 'native'],
    ['turn interrupt', 'emulated'],
  ];
  const kinds = ['native','emulated','degraded','rejected'];
  const table = document.getElementById('caps');
  const rows = caps.map(([name]) => {
    const r = document.createElement('div'); r.className = 'row';
    r.innerHTML = `<div class="cap">${name}</div>` + kinds.map(k => `<div class="cell ${k}">·</div>`).join('');
    table.appendChild(r); return r;
  });
  let tick = 0;
  function negotiate() {
    rows.forEach((r, i) => {
      const pick = tick === 0 ? caps[i][1] : kinds[(kinds.indexOf(caps[i][1]) + tick + i) % 4];
      r.querySelectorAll('.cell').forEach((c, j) => {
        const on = kinds[j] === pick; c.classList.toggle('on', on); c.textContent = on ? pick : '·';
      });
    });
    tick = (tick + 1) % 4;
  }
  negotiate(); if (!reduce) setInterval(negotiate, 2600);

  /* progress bar */
  const bar = document.getElementById('bar');
  new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { bar.style.width = '25%'; o.disconnect(); } }), { threshold: .5 }).observe(bar);
})();
