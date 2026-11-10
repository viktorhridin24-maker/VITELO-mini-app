// Банка (копилка): блок «банки» внутри вкладки «кашолка».
// Подключать в index.html ПОСЛЕ extra.js. Стили берёт из extra.js (.box .bar .mini .xin .ovl .gbox).
(function () {
  const baseRender = render;
  render = function () {
    baseRender();
    if (tab !== "wallet") return;
    const nav = document.querySelector("nav");
    const body = nav && nav.nextElementSibling;
    if (!body) return;
    const host = document.createElement("div");
    host.id = "jars";
    body.appendChild(host);
    loadJars(host);
  };

  async function loadJars(host) {
    try {
      const r = await api("/api/jars");
      if (!host.isConnected) return;
      paint(host, r);
    } catch (e) {
      if (host.isConnected) host.innerHTML = `<div class="h">банки</div><div class="s">${esc(e.message)}</div>`;
    }
  }

  function card(j) {
    const pct = Math.min(100, Math.round((j.saved / j.goal) * 100));
    return `<div class="box">
      <div class="t">🫙 ${esc(j.name)} <span class="s">#${j.id}</span></div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="s">${fmt(j.saved)} из ${fmt(j.goal)} в. (${pct}%)${j.saved >= j.goal ? " · цель достигнута 🎉" : ""}</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="mini" data-dep="${j.id}" ${state.is_banned ? "disabled" : ""}>положить</button>
        <button class="mini alt" data-brk="${j.id}" ${state.is_banned ? "disabled" : ""}>разбить</button>
      </div></div>`;
  }

  function paint(host, r) {
    const list = r.jars;
    host.innerHTML = `<div class="h">банки</div>` +
      (list.length ? list.map(card).join("") : `<div class="s" style="margin:6px 0 10px">банок пока нет. создай и копи на что-нибудь.</div>`) +
      `<button class="send" id="jnew" ${state.is_banned || list.length >= r.max ? "disabled" : ""}>+ создать банку</button>` +
      (list.length >= r.max ? `<div class="s">максимум ${r.max} банок</div>` : "");
    host.querySelector("#jnew").onclick = openCreate;
    host.querySelectorAll("[data-dep]").forEach(b => b.onclick = () => {
      const j = list.find(x => x.id === Number(b.dataset.dep));
      if (j) openDeposit(j);
    });
    host.querySelectorAll("[data-brk]").forEach(b => b.onclick = () => {
      const j = list.find(x => x.id === Number(b.dataset.brk));
      if (j) askBreak(j);
    });
  }

  function overlay(inner) {
    const m = document.createElement("div");
    m.className = "ovl";
    m.innerHTML = `<div class="gbox">${inner}</div>`;
    document.body.appendChild(m);
    m.onclick = e => { if (e.target === m) m.remove(); };
    return m;
  }

  const num = s => parseFloat(String(s || "").replace(",", "."));
  const ok = () => tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");

  function openCreate() {
    const m = overlay(`<div class="t">🫙 новая банка</div>
      <input class="xin" id="jn" maxlength="30" placeholder="на что копим?" autocomplete="off">
      <input class="xin" id="jg" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="цель, виткоинов">
      <button class="send" id="jok" style="margin-top:6px" disabled>создать</button>
      <button class="back" id="jno">отмена</button>`);
    const check = () => { m.querySelector("#jok").disabled = !(m.querySelector("#jn").value.trim() && num(m.querySelector("#jg").value) >= 0.01); };
    m.querySelector("#jn").oninput = check;
    m.querySelector("#jg").oninput = check;
    m.querySelector("#jno").onclick = () => m.remove();
    m.querySelector("#jok").onclick = async () => {
      m.querySelector("#jok").disabled = true;
      try {
        await api("/api/jars/create", {name: m.querySelector("#jn").value.trim(), goal: num(m.querySelector("#jg").value)});
        m.remove(); ok(); await load();
      } catch (e) { m.querySelector("#jok").disabled = false; tg.showAlert(e.message); }
    };
  }

  function openDeposit(j) {
    const m = overlay(`<div class="t">положить в «${esc(j.name)}»</div>
      <div class="s">на кошельке: ${fmt(state.balance)} в. · осталось до цели: ${fmt(Math.max(0, j.goal - j.saved))} в.</div>
      <input class="xin" id="ja" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сколько виткоинов">
      <button class="send" id="jok" style="margin-top:6px" disabled>положить</button>
      <button class="back" id="jno">отмена</button>`);
    m.querySelector("#ja").oninput = () => {
      const a = num(m.querySelector("#ja").value);
      m.querySelector("#jok").disabled = !(a >= 0.01 && a <= state.balance);
    };
    m.querySelector("#jno").onclick = () => m.remove();
    m.querySelector("#jok").onclick = async () => {
      m.querySelector("#jok").disabled = true;
      try {
        const r = await api("/api/jars/deposit", {id: j.id, amount: num(m.querySelector("#ja").value)});
        m.remove(); ok(); await load();
        tg.showAlert(r.reached ? "цель достигнута! 🎉 можешь разбить банку и забрать виткоины." : `положено! в банке ${fmt(r.saved)} из ${fmt(r.goal)} в.`);
      } catch (e) { m.querySelector("#jok").disabled = false; tg.showAlert(e.message); }
    };
  }

  function askBreak(j) {
    const text = `Разбить банку «${j.name}»? ${fmt(j.saved)} в. вернутся в кошелёк.`;
    const go = async yes => {
      if (!yes) return;
      try {
        const r = await api("/api/jars/break", {id: j.id});
        ok(); await load();
        tg.showAlert(`банка разбита, ${fmt(r.returned)} в. вернулись в кошелёк.`);
      } catch (e) { tg.showAlert(e.message); }
    };
    if (tg.showConfirm) tg.showConfirm(text, go); else go(window.confirm(text));
  }

  // если кошелёк уже нарисован до загрузки этого файла, дорисовываем банки
  if (state) render();
})();
