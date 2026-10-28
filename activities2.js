/* =========================================================
   กิจกรรมที่ 5–9 + แถบความคืบหน้ากิจกรรม
   ครูแก้ข้อมูลได้ที่ค่าคงที่ (TF_ITEMS, CARDS, FILL, SORT_ITEMS, PAIRS)
   ========================================================= */
(function () {
  const $ = s => document.querySelector(s);
  const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
  const TOTAL = 9;

  /* ---------- ความคืบหน้า ---------- */
  const done = new Set(storeGet("ayt-acts", []));
  function drawNav() {
    const nav = $("#act-nav");
    if (!nav) return;
    nav.querySelectorAll("a").forEach(a => a.classList.toggle("done", done.has(+a.dataset.n)));
    $("#act-count").textContent = thaiNum(done.size);
    $("#act-bar").style.width = (done.size / TOTAL * 100) + "%";
    const all = $("#act-all");
    if (all) all.hidden = done.size < TOTAL;
  }
  function markDone(n) { if (!done.has(n)) { done.add(n); storeSet("ayt-acts", [...done]); drawNav(); } }
  // กิจกรรม 1–4 เดิม: นับว่าทำสำเร็จเมื่อได้คำตอบถูก
  const FB_MAP = { "fb-river": 1, "fb-order": 2, "fb-site": 3, "fb-evidence": 4 };
  if (typeof window.showFeedback === "function") {
    const orig = window.showFeedback;
    window.showFeedback = function (id, ok, html) { orig(id, ok, html); if (ok && FB_MAP[id]) markDone(FB_MAP[id]); };
  }
  function fb(id, ok, html) {
    const el = document.getElementById(id);
    el.className = "feedback show " + (ok ? "ok" : "bad");
    el.innerHTML = html;
  }

  /* ---------- 5. ถูกหรือผิด ---------- */
  const TF_ITEMS = [
    ["อาณาจักรอยุธยาสถาปนาเมื่อ พ.ศ. 1893", true, "ถูก สมเด็จพระรามาธิบดีที่ 1 สถาปนาเมื่อ พ.ศ. 1893"],
    ["เกาะเมืองอยุธยามีแม่น้ำท่าจีนไหลล้อมรอบ", false, "ผิด แม่น้ำที่ล้อมรอบคือ เจ้าพระยา ป่าสัก และลพบุรี"],
    ["พระเจ้าพนัญเชิงสร้างขึ้นก่อนการสถาปนาอยุธยา", true, "ถูก สร้างเมื่อ พ.ศ. 1867 ก่อนสถาปนา 26 ปี"],
    ["จตุสดมภ์ประกอบด้วย เวียง วัง คลัง นา", true, "ถูก เป็นการปกครองส่วนกลาง 4 ฝ่าย"],
    ["อยุธยามีราชวงศ์ปกครองทั้งหมด 4 ราชวงศ์", false, "ผิด มี 5 ราชวงศ์ 33 พระมหากษัตริย์"],
    ["นักประวัติศาสตร์สรุปได้แน่ชัดแล้วว่าพระเจ้าอู่ทองมาจากเมืองอู่ทอง", false, "ผิด ยังไม่มีข้อยุติ มีอย่างน้อย 4 แนวคิด"]
  ];
  const tf = $("#tf-list");
  if (tf) {
    const answered = {};
    tf.innerHTML = TF_ITEMS.map(([q], i) => `
      <li class="tf-item" id="tf${i}">
        <span class="tf-q">${thaiNum(i + 1)}. ${q}</span>
        <span class="tf-btns">
          <button type="button" data-i="${i}" data-v="1" aria-label="ถูก">✓ ถูก</button>
          <button type="button" data-i="${i}" data-v="0" aria-label="ผิด">✗ ผิด</button>
        </span>
        <small class="tf-why" hidden></small>
      </li>`).join("");
    tf.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      const i = +b.dataset.i, [, ans, why] = TF_ITEMS[i];
      const ok = (b.dataset.v === "1") === ans;
      const li = document.getElementById("tf" + i);
      li.classList.remove("ok", "bad"); li.classList.add(ok ? "ok" : "bad");
      li.querySelectorAll("button").forEach(x => x.classList.toggle("picked", x === b));
      const w = li.querySelector(".tf-why"); w.hidden = false; w.textContent = (ok ? "✓ " : "✗ ") + why;
      answered[i] = ok;
      const n = Object.keys(answered).length, right = Object.values(answered).filter(Boolean).length;
      if (n === TF_ITEMS.length) {
        fb("fb-tf", right === n, right === n ? "✓ ถูกครบทุกข้อ! ยอดเยี่ยม" : `ถูก ${right} จาก ${n} ข้อ กดเปลี่ยนคำตอบข้อที่ผิดได้`);
        if (right === n) markDone(5);
      }
    });
  }

  /* ---------- 6. บัตรคำศัพท์ ---------- */
  const CARDS = [
    ["อโยธยา", "ชุมชนเมืองที่เจริญอยู่ก่อนสถาปนาอยุธยา"],
    ["สถาปนา", "ก่อตั้งขึ้นอย่างเป็นทางการ"],
    ["ราชธานี", "เมืองหลวงของอาณาจักร"],
    ["ปฐมกษัตริย์", "พระมหากษัตริย์พระองค์แรก"],
    ["จตุสดมภ์", "การปกครอง 4 ฝ่าย: เวียง วัง คลัง นา"],
    ["ฤดูน้ำหลาก", "ช่วงที่น้ำท่วมรอบเกาะ ข้าศึกล้อมเมืองยาก"],
    ["เมืองท่า", "เมืองที่เรือสินค้าแวะจอดค้าขาย"],
    ["พงศาวดาร", "บันทึกเหตุการณ์ของบ้านเมืองและพระมหากษัตริย์"]
  ];
  const fc = $("#flashcards");
  if (fc) {
    const flipped = new Set();
    fc.innerHTML = CARDS.map(([w, d], i) => `
      <button type="button" class="flash" data-i="${i}" aria-pressed="false" aria-label="บัตรคำ ${w} กดเพื่อพลิก">
        <span class="flash-in"><span class="flash-front">${w}</span><span class="flash-back">${d}</span></span>
      </button>`).join("");
    fc.addEventListener("click", e => {
      const b = e.target.closest(".flash"); if (!b) return;
      const on = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", on);
      flipped.add(+b.dataset.i);
      $("#fc-count").textContent = `พลิกแล้ว ${thaiNum(flipped.size)} จาก ${thaiNum(CARDS.length)} ใบ`;
      if (flipped.size === CARDS.length) { fb("fb-fc", true, "✓ อ่านครบทุกคำแล้ว ลองปิดบัตรแล้วทายความหมายอีกรอบ"); markDone(6); }
    });
  }

  /* ---------- 7. เติมคำในช่องว่าง ---------- */
  const FILL = {
    text: "สมเด็จพระรามาธิบดีที่ 1 สถาปนากรุงศรีอยุธยาเมื่อ พ.ศ. {0} ทรงสร้างพระราชวังที่ตำบล {1} ตัวเมืองตั้งอยู่บนเกาะที่มีแม่น้ำ {2} สายล้อมรอบ และทรงจัดการปกครองส่วนกลางแบบ {3}",
    answers: ["1893", "หนองโสน", "3", "จตุสดมภ์"],
    extra: ["2310", "4", "เทศาภิบาล"]
  };
  const fillText = $("#fill-text"), bank = $("#fill-bank");
  if (fillText) {
    let active = 0;
    fillText.innerHTML = FILL.text.replace(/\{(\d)\}/g, (_, n) =>
      `<button type="button" class="blank" data-n="${n}" aria-label="ช่องว่างที่ ${+n + 1}">_____</button>`);
    function drawBank() {
      const used = [...fillText.querySelectorAll(".blank")].map(b => b.dataset.v).filter(Boolean);
      bank.querySelectorAll("button").forEach(b => b.disabled = used.includes(b.dataset.w));
      fillText.querySelectorAll(".blank").forEach(b => b.classList.toggle("active", +b.dataset.n === active));
    }
    bank.innerHTML = shuffle([...FILL.answers, ...FILL.extra]).map(w => `<button type="button" class="word" data-w="${w}">${w}</button>`).join("");
    bank.addEventListener("click", e => {
      const w = e.target.closest(".word"); if (!w) return;
      const blank = fillText.querySelector(`.blank[data-n="${active}"]`);
      blank.dataset.v = w.dataset.w; blank.textContent = w.dataset.w; blank.classList.remove("ok", "bad");
      const next = [...fillText.querySelectorAll(".blank")].find(b => !b.dataset.v);
      active = next ? +next.dataset.n : active;
      drawBank();
    });
    fillText.addEventListener("click", e => {
      const b = e.target.closest(".blank"); if (!b) return;
      if (b.dataset.v) { delete b.dataset.v; b.textContent = "_____"; b.classList.remove("ok", "bad"); }
      active = +b.dataset.n; drawBank();
    });
    $("#check-fill").addEventListener("click", () => {
      const blanks = [...fillText.querySelectorAll(".blank")];
      let right = 0;
      blanks.forEach(b => { const ok = b.dataset.v === FILL.answers[+b.dataset.n]; if (ok) right++; b.classList.toggle("ok", ok); b.classList.toggle("bad", !!b.dataset.v && !ok); });
      const all = right === blanks.length;
      fb("fb-fill", all, all ? "✓ เติมถูกครบทุกช่อง!" : `ถูก ${right} จาก ${blanks.length} ช่อง กดที่ช่องสีแดงเพื่อเลือกคำใหม่`);
      if (all) markDone(7);
    });
    drawBank();
  }

  /* ---------- 8. จัดกลุ่มปัจจัย ---------- */
  const GROUPS = { geo: "ภูมิศาสตร์", pol: "การเมือง", eco: "เศรษฐกิจ" };
  const SORT_ITEMS = [
    ["มีแม่น้ำ 3 สายล้อมรอบเป็นเกาะ", "geo"],
    ["ดินตะกอนอุดมสมบูรณ์ เหมาะแก่การทำนา", "geo"],
    ["สุโขทัยและเขมรเสื่อมอำนาจ", "pol"],
    ["ละโว้และสุพรรณภูมิรวมกำลังกัน", "pol"],
    ["เรือสำเภาต่างชาติแล่นเข้ามาค้าขาย", "eco"],
    ["เป็นศูนย์รวมสินค้าของป่าจากหัวเมืองเหนือ", "eco"]
  ];
  const pool = $("#sort-pool"), bins = $("#sort-bins");
  if (pool) {
    let picked = null;
    const place = {};
    pool.innerHTML = shuffle(SORT_ITEMS.map((x, i) => i)).map(i =>
      `<button type="button" class="sort-chip" data-i="${i}">${SORT_ITEMS[i][0]}</button>`).join("");
    bins.innerHTML = Object.entries(GROUPS).map(([k, name]) => `
      <div class="sort-bin bin-${k}">
        <button type="button" class="bin-head" data-g="${k}">วางใน “${name}”</button>
        <div class="bin-items" data-g="${k}"></div>
      </div>`).join("");
    const chip = i => document.querySelector(`.sort-chip[data-i="${i}"]`);
    function select(i) {
      picked = picked === i ? null : i;
      document.querySelectorAll(".sort-chip").forEach(c => c.classList.toggle("picked", +c.dataset.i === picked));
      bins.classList.toggle("armed", picked !== null);
    }
    document.querySelector("#act-8").addEventListener("click", e => {
      const c = e.target.closest(".sort-chip");
      if (c) { select(+c.dataset.i); return; }
      const h = e.target.closest(".bin-head");
      if (h && picked !== null) {
        const g = h.dataset.g, el = chip(picked);
        bins.querySelector(`.bin-items[data-g="${g}"]`).appendChild(el);
        el.classList.remove("ok", "bad");
        place[picked] = g; select(picked);
      }
    });
    $("#check-sort").addEventListener("click", () => {
      let right = 0;
      SORT_ITEMS.forEach(([, g], i) => { const ok = place[i] === g; if (ok) right++; chip(i).classList.toggle("ok", ok); chip(i).classList.toggle("bad", !!place[i] && !ok); });
      const all = right === SORT_ITEMS.length;
      fb("fb-sort", all, all ? "✓ จัดกลุ่มถูกทั้งหมด! ปัจจัยทั้ง 3 ด้านช่วยเสริมกัน" :
        `ถูก ${right} จาก ${SORT_ITEMS.length} ข้อ ${Object.keys(place).length < SORT_ITEMS.length ? "(ยังวางไม่ครบ) " : ""}กดบัตรสีแดงแล้วย้ายไปกลุ่มใหม่`);
      if (all) markDone(8);
    });
  }

  /* ---------- 9. เกมจับคู่ความจำ ---------- */
  const PAIRS = [
    ["พ.ศ. 1867", "สร้างพระเจ้าพนัญเชิง"],
    ["พ.ศ. 1893", "สถาปนากรุงศรีอยุธยา"],
    ["พ.ศ. 2112", "เสียกรุงครั้งที่ 1"],
    ["พ.ศ. 2127", "ประกาศอิสรภาพ"],
    ["พ.ศ. 2199", "พระนารายณ์ครองราชย์"],
    ["พ.ศ. 2310", "เสียกรุงครั้งที่ 2"]
  ];
  const mem = $("#memory");
  if (mem) {
    let open = [], matched = 0, moves = 0, lock = false;
    function deal() {
      open = []; matched = 0; moves = 0; lock = false;
      const cards = shuffle(PAIRS.flatMap(([a, b], i) => [{ t: a, p: i, k: "year" }, { t: b, p: i, k: "event" }]));
      mem.innerHTML = cards.map((c, i) => `
        <button type="button" class="mem ${c.k}" data-p="${c.p}" aria-label="บัตรใบที่ ${i + 1}">
          <span class="mem-in"><span class="mem-front" aria-hidden="true"></span><span class="mem-back">${c.t}</span></span>
        </button>`).join("");
      $("#mem-status").textContent = "เปิดบัตรทีละ 2 ใบ หาคู่ปี พ.ศ. กับเหตุการณ์";
      document.getElementById("fb-mem").className = "feedback";
    }
    mem.addEventListener("click", e => {
      const b = e.target.closest(".mem");
      if (!b || lock || b.classList.contains("up")) return;
      b.classList.add("up"); open.push(b);
      if (open.length < 2) return;
      moves++;
      const [x, y] = open;
      if (x.dataset.p === y.dataset.p) {
        x.classList.add("got"); y.classList.add("got"); open = []; matched++;
        if (matched === PAIRS.length) { fb("fb-mem", true, `✓ จับคู่ครบใน ${thaiNum(moves)} ครั้ง!`); markDone(9); }
      } else {
        lock = true;
        setTimeout(() => { x.classList.remove("up"); y.classList.remove("up"); open = []; lock = false; }, 900);
      }
      $("#mem-status").textContent = `เปิดไป ${thaiNum(moves)} ครั้ง · จับคู่ได้ ${thaiNum(matched)} จาก ${thaiNum(PAIRS.length)} คู่`;
    });
    $("#mem-reset").addEventListener("click", deal);
    deal();
  }

  drawNav();
})();
