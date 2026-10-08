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
  `;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

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
        <button class="mcard" data-s="news"><span class="ic"></span><span><div class="t">что нового</div><div class="s">последние обновления бота</div></span></button>
        <button class="mcard" data-s="events"><span class="ic"></span><span><div class="t">ивенты</div><div class="s">конкурсы и призы</div></span></button>
        <button class="mcard" data-s="debts"><span class="ic"></span><span><div class="t">долги</div><div class="s">кто кому должен, с комментариями</div></span></button>
        <button class="mcard" data-s="stats"><span class="ic"></span><span><div class="t">статистика</div><div class="s">сколько людей в боте и как давно он работает</div></span></button>
        <button class="mcard" data-s="suggest"><span class="ic"></span><span><div class="t">предложка</div><div class="s">идея для бота? напиши Витьку</div></span></button>`;
      div.querySelectorAll(".mcard").forEach(c => c.onclick = () => { sub = c.dataset.s; render(); });
      return;
    }
    div.innerHTML = `<button class="back">← назад</button><div id="sub"><div class="empty">загружаю…</div></div>`;
    div.querySelector(".back").onclick = () => { sub = null; render(); };
    const box = div.querySelector("#sub");
    ({news: viewNews, events: viewEvents, debts: viewDebts, stats: viewStats, suggest: viewSuggest})[sub](box);
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

  // ---- предложка ----
  function viewSuggest(box) {
    box.innerHTML = `
      <div class="box"><div class="t">предложка</div>
      <div class="s">напиши идею, баг или что хочешь добавить. сообщение придёт витьку в личку.</div>
      <textarea class="xin" id="sg" rows="5" maxlength="500" placeholder="например: хочу много чего но не знаю чего…"></textarea>
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
})();
