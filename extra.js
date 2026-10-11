// Вкладки «ещё»: что нового, ивенты, долги, статистика, предложка.
// Подключается к index.html отдельным файлом или вставкой кода в конец страницы (см. инструкцию).
(function () {
  const css = `
  .mcard{display:flex;align-items:center;gap:12px;width:100%;font:inherit;text-align:left;color:var(--text);background:var(--card);border:2px solid var(--line);border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer}
  .mcard .ic{font-size:26px;width:36px;text-align:center}
  .back{font:inherit;background:transparent;border:0;color:var(--dim);font-size:15px;padding:4px 0 10px;cursor:pointer}
  .xin{width:100%;font:inherit;font-size:16px;padding:10px 12px;margin:6px 0;color:var(--text);background:var(--deep);border:2px solid var(--line);border-radius:10px}
  .xin:focus{outline:3px solid var(--gold)}
  textarea.xin{resize:none;font-size:15px}
  .box{background:var(--deep);border:2px solid var(--line);border-radius:14px;padding:14px;margin-bottom:10px}
  .box .t{font-size:17px;margin-bottom:4px}
  .bar{height:8px;background:var(--bg);border-radius:6px;overflow:hidden;margin:4px 0 8px}
  .bar i{display:block;height:100%;background:var(--gold)}
  .cm2{font-size:13px;margin-top:3px;white-space:pre-wrap;word-break:break-word;color:var(--dim)}
  .mini{font:inherit;font-size:13px;padding:6px 10px;border:0;border-radius:8px;background:var(--gold);color:#3a0000;font-weight:bold;cursor:pointer}
  .mini.alt{background:transparent;color:var(--text);border:2px solid var(--line)}
  .ovl{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:60;display:flex;align-items:center;justify-content:center;padding:16px}
  .ovl.full{background:var(--bg);align-items:flex-start;overflow:auto}
  .gbox{width:100%;max-width:440px;background:var(--deep);border:2px solid var(--line);border-radius:16px;padding:16px;margin:auto}
  .mc{aspect-ratio:1;font:inherit;font-size:18px;border:2px solid var(--line);border-radius:8px;background:var(--card);color:var(--text);cursor:pointer;padding:0}
  .mc.open{background:var(--bg);border-color:transparent}
  .codebig{font-size:22px;letter-spacing:1px;margin:8px 0;word-break:break-all}
  `;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  // ---- сессия (вход по приватному коду) и защита ----
  const SKEY = "vitelo_session";
  const getSess = () => { try { return localStorage.getItem(SKEY) || ""; } catch (e) { return ""; } };
  const setSess = t => { try { localStorage.setItem(SKEY, t); } catch (e) {} };
  const origFetch = window.fetch.bind(window);
  let unlockPromise = null, gateEl = null;
  const copyText = async text => {
    try { await navigator.clipboard.writeText(text); tg.showAlert("скопировано"); }
    catch (e) { tg.showAlert(text); }
  };

  window.fetch = async function (url, opts) {
    if (typeof url !== "string" || !url.startsWith(API_URL)) return origFetch(url, opts);
    const withSess = o => { o = Object.assign({}, o); o.headers = Object.assign({}, o.headers, {"X-Wallet-Session": getSess()}); return o; };
    const r = await origFetch(url, withSess(opts));
    if (r.status === 403 && !url.includes("/api/gate/")) {
      const j = await r.clone().json().catch(() => ({}));
      if (j.need === "unlock") { if (await askUnlock()) return origFetch(url, withSess(opts)); }
      else if (j.need === "register") { showGate(); }
    }
    return r;
  };

  function askUnlock() {
    if (unlockPromise) return unlockPromise;
    unlockPromise = new Promise(resolve => {
      const m = document.createElement("div");
      m.className = "ovl";
      m.innerHTML = `<div class="gbox"><div class="t">🔒 разблокируй кошелёк</div>
        <div class="s" style="margin:6px 0">введи свой приватный код (12 цифр), чтобы менять данные кошелька на этом устройстве.</div>
        <input class="xin" id="ulc" inputmode="numeric" maxlength="20" placeholder="приватный код" autocomplete="off">
        <div class="s" id="ule" style="color:#ffb0b0"></div>
        <button class="send" id="ulok" style="margin-top:6px">разблокировать</button>
        <button class="back" id="ulno">отмена</button>
        <div class="s">потерял код? напиши Витьку, он сбросит.</div></div>`;
      document.body.appendChild(m);
      const done = ok => { m.remove(); unlockPromise = null; resolve(ok); };
      m.querySelector("#ulno").onclick = () => done(false);
      m.querySelector("#ulok").onclick = async () => {
        m.querySelector("#ulok").disabled = true;
        try { const r = await api("/api/gate/unlock", {code: m.querySelector("#ulc").value}); setSess(r.session); done(true); }
        catch (e) { m.querySelector("#ule").textContent = e.message; m.querySelector("#ulok").disabled = false; }
      };
    });
    return unlockPromise;
  }

  // ---- регистрация кошелька: код в личку → сапёр → приватный код ----
  async function showGate() {
    if (gateEl) return;
    gateEl = document.createElement("div");
    gateEl.className = "ovl full";
    document.body.appendChild(gateEl);
    await gateStep();
  }

  async function gateStep() {
    let s;
    try { s = await api("/api/gate/status"); }
    catch (e) { gateEl.innerHTML = `<div class="gbox"><div class="empty">${esc(e.message)}</div></div>`; return; }
    if (!s.need) { gateEl.remove(); gateEl = null; load(); return; }
    if (s.step === "dm") stepDm(s); else if (s.step === "human") stepHuman(s); else stepPin(s);
  }

  function stepDm(s) {
    gateEl.innerHTML = `<div class="gbox"><div class="s">шаг 1 из 3</div><div class="t">🔐 регистрация кошелька</div>
      <div class="s" style="margin:6px 0">чтобы пользоваться кошельком, нужно подтвердить, что ты настоящий человек. сначала напиши боту в личку (если ещё не писал), потом нажми «отправить код»: бот пришлёт 12-значный код.</div>
      <button class="mini alt" id="gbot">открыть бота</button>
      <button class="send" id="gsend" style="margin-top:8px">отправить код</button>
      <div id="gcode" style="display:none"><input class="xin" id="gin" inputmode="numeric" maxlength="20" placeholder="код из личных сообщений" autocomplete="off"><button class="send" id="gok">подтвердить</button></div>
      <div class="s" id="gerr" style="color:#ffb0b0;margin-top:6px"></div></div>`;
    const err = m => { gateEl.querySelector("#gerr").textContent = m; };
    gateEl.querySelector("#gbot").onclick = () => tg.openTelegramLink ? tg.openTelegramLink("https://t.me/" + s.bot) : window.open("https://t.me/" + s.bot);
    gateEl.querySelector("#gsend").onclick = async () => {
      err("");
      try { await api("/api/gate/send_code", {}); gateEl.querySelector("#gcode").style.display = "block"; err("код отправлен тебе в личку от бота"); }
      catch (e) { err(e.message); }
    };
    gateEl.querySelector("#gok").onclick = async () => {
      err("");
      try { await api("/api/gate/verify_code", {code: gateEl.querySelector("#gin").value}); gateStep(); }
      catch (e) { err(e.message); }
    };
  }

  function stepHuman(s) {
    const W = s.mines.w, Hh = s.mines.h, N = s.mines.n;
    gateEl.innerHTML = `<div class="gbox"><div class="s">шаг 2 из 3</div><div class="t">💣 докажи, что ты человек</div>
      <div class="s" style="margin:6px 0">открой все клетки без мин (мин: ${N}). первая клетка всегда безопасна.</div>
      <div id="mgrid" style="display:grid;grid-template-columns:repeat(${W},1fr);gap:4px;margin:10px 0"></div>
      <div class="s" id="mmsg"></div></div>`;
    const grid = gateEl.querySelector("#mgrid"), msg = t => { gateEl.querySelector("#mmsg").textContent = t; };
    let locked = true;
    const cell = (x, y) => grid.children[y * W + x];
    async function startGame() {
      try { await api("/api/gate/mines/start", {}); } catch (e) { msg(e.message); return; }
      grid.innerHTML = "";
      for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
        const b = document.createElement("button");
        b.className = "mc"; b.onclick = () => reveal(x, y); grid.appendChild(b);
      }
      msg(""); locked = false;
    }
    async function reveal(x, y) {
      if (locked) return;
      locked = true;
      try {
        const r = await api("/api/gate/mines/reveal", {x, y});
        r.cells.forEach(([cx, cy, n]) => { const b = cell(cx, cy); b.className = "mc open"; b.textContent = n || ""; b.disabled = true; });
        if (r.status === "lost" || r.status === "too_fast") {
          (r.mines || []).forEach(([mx, my]) => { cell(mx, my).textContent = "💥"; });
          msg(r.status === "lost" ? "бум! попробуй ещё раз" : "слишком быстро, ты точно человек? попробуй ещё раз");
          setTimeout(startGame, 1800); return;
        }
        if (r.status === "won") { msg("готово!"); setTimeout(gateStep, 600); return; }
      } catch (e) { msg(e.message); }
      locked = false;
    }
    startGame();
  }

  function stepPin(s) {
    gateEl.innerHTML = `<div class="gbox"><div class="s">шаг 3 из 3</div><div class="t">🔑 твои коды кошелька</div>
      <div class="s" style="margin:6px 0">сейчас тебе выдадут два кода. <b>общественный</b> можно давать всем: по нему тебе могут перекинуть виткоины. <b>приватный</b> нельзя никому давать, он нужен для входа. показывается один раз!</div>
      <button class="send" id="gmk">создать мои коды</button>
      <div id="gres"></div><div class="s" id="gerr" style="color:#ffb0b0"></div></div>`;
    gateEl.querySelector("#gmk").onclick = async () => {
      gateEl.querySelector("#gmk").disabled = true;
      try {
        const r = await api("/api/gate/pin/create", {});
        setSess(r.session);
        gateEl.querySelector("#gmk").style.display = "none";
        gateEl.querySelector("#gres").innerHTML = `
          <div class="s">общественный код (можно делиться):</div><div class="codebig">${esc(r.public_code)}</div>
          <div class="s">приватный код (никому, запиши сейчас):</div><div class="codebig" style="color:var(--gold)">${esc(r.private_code)}</div>
          <button class="mini alt" id="gcp">скопировать приватный</button>
          <button class="send" id="gdone" style="margin-top:10px">я записал(а), войти</button>`;
        gateEl.querySelector("#gcp").onclick = () => copyText(r.private_code);
        gateEl.querySelector("#gdone").onclick = gateStep;
      } catch (e) { gateEl.querySelector("#gerr").textContent = e.message; gateEl.querySelector("#gmk").disabled = false; }
    };
  }

  let sub = null;
  const date = d => new Date(d + "T00:00:00Z").toLocaleDateString("ru-RU");
  const alive = box => box.isConnected;
  const err = (box, e) => { if (alive(box)) box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; };

  // ---- подмена render: добавляем кнопку «ещё» и содержимое вкладки ----
  const baseRender = render;
  render = function () {
    baseRender();
    const nav = document.querySelector("nav");
    if (!nav) return;
    const b = document.createElement("button");
    b.textContent = "ещё";
    b.className = tab === "more" ? "on" : "";
    b.onclick = () => { tab = "more"; sub = null; render(); };
    nav.appendChild(b);
    if (tab === "more") showMore(nav.nextElementSibling);
  };

  function showMore(div) {
    if (!sub) {
      div.innerHTML = `
        <button class="mcard" data-s="news"><span class="ic">📰</span><span><div class="t">что нового</div><div class="s">последние обновления бота</div></span></button>
        <button class="mcard" data-s="events"><span class="ic">🎃</span><span><div class="t">ивенты</div><div class="s">конкурсы и призы</div></span></button>
        <button class="mcard" data-s="debts"><span class="ic">🧾</span><span><div class="t">долги</div><div class="s">кто кому должен, с комментариями</div></span></button>
        <button class="mcard" data-s="code"><span class="ic">🪪</span><span><div class="t">перекинуть по коду кошелька</div><div class="s">твой общественный код, чаевые и донаты</div></span></button>
        <button class="mcard" data-s="stats"><span class="ic">📊</span><span><div class="t">статистика</div><div class="s">сколько людей в боте и как давно он работает</div></span></button>
        <button class="mcard" data-s="suggest"><span class="ic">💡</span><span><div class="t">предложка</div><div class="s">идея для бота? напиши Витьку</div></span></button>`;
      div.querySelectorAll(".mcard").forEach(c => c.onclick = () => { sub = c.dataset.s; render(); });
      return;
    }
    div.innerHTML = `<button class="back">← назад</button><div id="sub"><div class="empty">загружаю…</div></div>`;
    div.querySelector(".back").onclick = () => { sub = null; render(); };
    const box = div.querySelector("#sub");
    ({news: viewNews, events: viewEvents, debts: viewDebts, code: viewCode, stats: viewStats, suggest: viewSuggest})[sub](box);
  }

  // ---- что нового ----
  async function viewNews(box) {
    try {
      const info = await api("/api/info");
      if (!alive(box)) return;
      box.innerHTML = info.updates.map(u => `
        <div class="box"><div class="t">${esc(u.title)}</div><div class="s">${esc(date(u.date))}</div>
        <div class="cm2" style="color:var(--text)">${esc(u.text)}</div></div>`).join("");
    } catch (e) { err(box, e); }
  }

  // ---- ивенты ----
  async function viewEvents(box) {
    try {
      const info = await api("/api/info");
      if (!alive(box)) return;
      box.innerHTML = info.events.map(ev => {
        const rows = [["roulette", "сыграть в русскую рулетку"], ["transfers", "перевести виткоины кому-то"]].map(([k, label]) => {
          const need = ev.need[k], have = Math.min(ev.progress[k], need);
          return `<div class="s">${label}: ${have}/${need}</div><div class="bar"><i style="width:${Math.round(have / need * 100)}%"></i></div>`;
        }).join("");
        const ready = ev.progress.roulette >= ev.need.roulette && ev.progress.transfers >= ev.need.transfers;
        let btn;
        if (ev.joined) btn = `<div class="t">ты участвуешь</div>`;
        else if (ev.ended) btn = `<div class="s">ивент закончился</div>`;
        else btn = `<button class="send" data-j="${esc(ev.id)}" ${ready ? "" : "disabled"}>${ready ? "участвовать" : "выполни условия"}</button>`;
        const wins = ev.winners.length ? `<div class="h">победители</div><div class="s">${ev.winners.map(esc).join(", ")}</div>` : "";
        return `<div class="box"><div class="t">${esc(ev.title)}</div>
          <div class="s">${esc(ev.desc)}</div>
          <div class="s">приз: ${esc(ev.prize)}</div>
          <div class="s">${esc(date(ev.start))} — ${esc(date(ev.end))} · участников: ${ev.participants}</div>
          <div class="h">условия</div>${rows}${btn}${wins}</div>`;
      }).join("") || `<div class="empty">пока ивентов нет</div>`;
      box.querySelectorAll("[data-j]").forEach(b => b.onclick = async () => {
        b.disabled = true;
        try {
          await api("/api/events/join", {event_id: b.dataset.j});
          tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
          tg.showAlert("ты в игре! удачи в розыгрыше");
          viewEvents(box);
        } catch (e) { b.disabled = false; tg.showAlert(e.message); }
      });
    } catch (e) { err(box, e); }
  }

  // ---- долги ----
  async function viewDebts(box) {
    try {
      const d = await api("/api/debts");
      if (!alive(box)) return;
      const item = (x, mine) => `
        <div class="row"><div class="grow"><div class="t">${esc(x.name)} · ${fmt(x.amount)} в.</div>
        ${x.comment ? `<div class="cm2">${esc(x.comment)}</div>` : ""}
        <div class="s">${new Date(x.ts * 1000).toLocaleDateString("ru-RU")}</div></div>
        <button class="mini ${mine ? "alt" : ""}" data-${mine ? "f" : "p"}="${x.id}">${mine ? "простить" : "погасить"}</button></div>`;
      box.innerHTML = `
        <div class="h">мне должны</div>${d.owed_to_me.map(x => item(x, true)).join("") || `<div class="s">никто ничего не должен</div>`}
        <div class="h">я должен</div>${d.i_owe.map(x => item(x, false)).join("") || `<div class="s">ты чист как слеза</div>`}
        <div class="h">записать долг</div>
        <input class="xin" id="dq" placeholder="кто должен? найти по нику…" autocomplete="off">
        <div id="dlist" class="mlist"></div>
        <input class="xin" id="damt" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сколько виткоинов">
        <textarea class="xin" id="dnote" rows="2" maxlength="200" placeholder="за что? (комментарий)"></textarea>
        <div class="s" id="dsel">выбери должника</div>
        <button class="send" id="dok" disabled style="margin-top:8px">записать долг</button>`;

      box.querySelectorAll("[data-p]").forEach(b => b.onclick = () => ask("погасить этот долг? виткоины спишутся сразу.", async () => {
        await api("/api/debts/pay", {id: Number(b.dataset.p)}); done("долг погашен"); }));
      box.querySelectorAll("[data-f]").forEach(b => b.onclick = () => ask("простить долг? он исчезнет.", async () => {
        await api("/api/debts/forgive", {id: Number(b.dataset.f)}); done("долг прощён"); }));

      let picked = null, timer = null, sid = 0;
      const ready = () => {
        const a = parseFloat(($("#damt").value || "").replace(",", "."));
        $("#dok").disabled = !(picked && a >= 0.01);
      };
      async function find() {
        const my = ++sid, q = $("#dq").value.trim();
        try {
          const r = await api("/api/contacts?q=" + encodeURIComponent(q));
          if (my !== sid || !alive(box)) return;
          $("#dlist").innerHTML = r.contacts.length
            ? r.contacts.map(c => `<button class="ct${picked && picked.id === c.id ? " on" : ""}" data-id="${c.id}" data-name="${esc(c.name)}">${esc(c.name)}</button>`).join("")
            : `<div class="s">${r.searching ? "никого не нашёл" : "начни вводить ник"}</div>`;
          $("#dlist").querySelectorAll(".ct").forEach(b => b.onclick = () => {
            picked = {id: Number(b.dataset.id), name: b.dataset.name};
            $("#dlist").querySelectorAll(".ct").forEach(x => x.classList.toggle("on", x === b));
            $("#dsel").textContent = "должник: " + picked.name; ready();
          });
        } catch (e) { $("#dlist").innerHTML = `<div class="s">${esc(e.message)}</div>`; }
      }
      $("#dq").oninput = () => { clearTimeout(timer); timer = setTimeout(find, 300); };
      $("#damt").oninput = ready;
      find();
      $("#dok").onclick = async () => {
        $("#dok").disabled = true;
        try {
          const amount = Math.round(parseFloat($("#damt").value.replace(",", ".")) * 100) / 100;
          await api("/api/debts", {debtor: picked.id, amount, comment: $("#dnote").value.trim()});
          done("долг записан, должнику ушло уведомление");
        } catch (e) { $("#dok").disabled = false; tg.showAlert(e.message); }
      };
    } catch (e) { err(box, e); }

    function ask(text, fn) {
      const go = async ok => { if (!ok) return; try { await fn(); } catch (e) { tg.showAlert(e.message); } };
      if (tg.showConfirm) tg.showConfirm(text, go); else go(window.confirm(text));
    }
    async function done(msg) {
      tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
      try { state = await api("/api/me"); } catch (e) {}
      tg.showAlert(msg);
      render();
    }
  }


  // ---- статистика ----
  const dur = sec => {
    sec = Math.floor(sec || 0);
    const d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60);
    return (d ? d + "д " : "") + (h || d ? h + "ч " : "") + m + "м";
  };
  async function viewStats(box) {
    try {
      const s = await api("/api/stats");
      if (!alive(box)) return;
      const max = Math.max(1, ...s.hourly.map(x => x.n));
      const bars = s.hourly.map(x => `<div title="${x.n}" style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:80px"><div style="height:${Math.max(2, Math.round(x.n / max * 80))}px;background:var(--gold);border-radius:3px 3px 0 0"></div></div>`).join("");
      const labels = s.hourly.map((x, i) => `<div style="flex:1;text-align:center;font-size:10px;color:var(--dim)">${i % 6 === 0 ? new Date(x.h * 1000).getHours() : ""}</div>`).join("");
      const status = s.online
        ? `бот в сети уже ${dur(s.uptime)}`
        : `бот сейчас не в сети${s.last_online ? ", последний раз был " + new Date(s.last_online * 1000).toLocaleString("ru-RU") : ""}`;
      box.innerHTML = `
        <div class="box"><div class="t">${esc(status)}</div>
          <div class="s">всего проработал: ${dur(s.uptime_total)}</div></div>
        <div class="box">
          <div class="row"><div class="grow t">всего пользователей</div><div class="cnt">${s.total_users}</div></div>
          <div class="row"><div class="grow t">активны за 24 часа</div><div class="cnt">${s.active_24h}</div></div>
          <div class="row"><div class="grow t">активны за 7 дней</div><div class="cnt">${s.active_7d}</div></div>
          <div class="row"><div class="grow t">действий за 24 часа</div><div class="cnt">${s.events_24h}</div></div>
        </div>
        <div class="box"><div class="t">активность по часам</div>
          <div class="s">последние 24 часа, твоё время</div>
          <div style="display:flex;gap:2px;margin-top:8px">${bars}</div>
          <div style="display:flex;gap:2px">${labels}</div></div>`;
    } catch (e) { err(box, e); }
  }


  // ---- перекинуть по коду кошелька ----
  async function viewCode(box) {
    try {
      const w = await api("/api/wallet");
      if (!alive(box)) return;
      box.innerHTML = `
        <div class="box"><div class="t">твой общественный код</div>
          <div class="s">его можно отправить другу, кинуть в канал или в чат: по нему тебе могут перекинуть виткоины (на чай, в долг, в поддержку). списать с кошелька по нему ничего нельзя.</div>
          <div class="codebig">${esc(w.public_code)}</div>
          <button class="mini" id="cpy">скопировать</button>
          <div class="s" style="margin-top:8px">приватный код (его показали при регистрации) никому не давай: он нужен только для входа.</div></div>
        <div class="box"><div class="t">перекинуть по коду</div>
          <input class="xin" id="cc" inputmode="numeric" maxlength="20" placeholder="код получателя (12 цифр)" autocomplete="off">
          <div class="s" id="cwho">введи 12 цифр</div>
          <input class="xin" id="ca" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сколько виткоинов">
          <textarea class="xin" id="cn" rows="2" maxlength="200" placeholder="комментарий (необязательно)"></textarea>
          <button class="send" id="cok" disabled style="margin-top:6px">отправить</button></div>`;
      $("#cpy").onclick = () => copyText(w.public_code);
      let who = null, timer = null, sid = 0;
      const ready = () => { const a = parseFloat(($("#ca").value || "").replace(",", ".")); $("#cok").disabled = !(who && a >= 0.01); };
      async function lookup() {
        const my = ++sid, digits = $("#cc").value.replace(/\D/g, "");
        who = null; ready();
        if (digits.length !== 12) { $("#cwho").textContent = "введи 12 цифр"; return; }
        try {
          const r = await api("/api/wallet/lookup?code=" + digits);
          if (my !== sid || !alive(box)) return;
          if (r.self) { $("#cwho").textContent = "это твой собственный код"; return; }
          who = {code: digits, name: r.name}; $("#cwho").textContent = "получатель: " + r.name; ready();
        } catch (e) { if (my === sid && alive(box)) $("#cwho").textContent = e.message; }
      }
      $("#cc").oninput = () => { clearTimeout(timer); timer = setTimeout(lookup, 300); };
      $("#ca").oninput = ready;
      $("#cok").onclick = () => {
        const amount = Math.round(parseFloat($("#ca").value.replace(",", ".")) * 100) / 100;
        const text = `перекинуть ${fmt(amount)} в. игроку ${who.name}?`;
        const go = async ok => {
          if (!ok) return;
          $("#cok").disabled = true;
          try {
            await api("/api/transfer_code", {code: who.code, amount, comment: $("#cn").value.trim()});
            tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
            try { state = await api("/api/me"); } catch (e) {}
            tg.showAlert(`готово! ${fmt(amount)} в. переданы игроку ${who.name}`);
            render();
          } catch (e) { $("#cok").disabled = false; tg.showAlert(e.message); }
        };
        if (tg.showConfirm) tg.showConfirm(text, go); else go(window.confirm(text));
      };
    } catch (e) { err(box, e); }
  }

  // ---- предложка ----
  function viewSuggest(box) {
    box.innerHTML = `
      <div class="box"><div class="t">💡 предложка</div>
      <div class="s">напиши идею, баг или что хочешь добавить. сообщение придёт Витьку в личку.</div>
      <textarea class="xin" id="sg" rows="5" maxlength="500" placeholder="например: хочу дуэли на ставку…"></textarea>
      <div class="s" id="sgc" style="text-align:right">0/500</div>
      <button class="send" id="sgok" disabled style="margin-top:8px">отправить</button></div>`;
    $("#sg").oninput = () => { $("#sgc").textContent = $("#sg").value.length + "/500"; $("#sgok").disabled = $("#sg").value.trim().length < 5; };
    $("#sgok").onclick = async () => {
      $("#sgok").disabled = true;
      try {
        await api("/api/suggest", {text: $("#sg").value.trim()});
        tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
        $("#sg").value = ""; $("#sgc").textContent = "0/500";
        tg.showAlert("отправлено! спасибо");
      } catch (e) { $("#sgok").disabled = false; tg.showAlert(e.message); }
    };
  }

  // при запуске узнаём, нужна ли регистрация кошелька
  (async function () {
    try {
      const s = await api("/api/gate/status");
      if (s.need === "register") showGate(); else if (!state) load();
    } catch (e) {}
  })();
})();
