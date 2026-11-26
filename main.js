/* =========================================================
   สคริปต์กลาง: สร้างเมนู แถบความคืบหน้า และปุ่มก่อนหน้า/ถัดไป
   ต้องการเพิ่ม/ลบ/สลับหน้า แก้ที่รายการ PAGES ด้านล่างที่เดียว
   ========================================================= */

const PAGES = [
  { file: "index.html",      title: "หน้าแรก" },
  { file: "guide.html",      title: "คู่มือการใช้สื่อ" },
  { file: "intro.html",      title: "บทนำและจุดประสงค์" },
  { file: "pretest.html",    title: "แบบทดสอบก่อนเรียน" },
  { file: "lesson1.html",    title: "บริเวณนี้ก่อนมีอยุธยา" },
  { file: "lesson2.html",    title: "การสถาปนาอาณาจักร" },
  { file: "lesson3.html",    title: "ที่มาของพระเจ้าอู่ทอง" },
  { file: "lesson4.html",    title: "ปัจจัยการสถาปนา" },
  { file: "lesson5.html",    title: "ราชวงศ์ที่ปกครองอยุธยา" },
  { file: "media.html",      title: "สื่อวิดีโอ" },
  { file: "activities.html", title: "กิจกรรมเชิงโต้ตอบ" },
  { file: "posttest.html",   title: "แบบทดสอบหลังเรียน" },
  { file: "survey.html",     title: "แบบประเมินความพึงพอใจ" },
  { file: "resources.html",  title: "แหล่งเรียนรู้เพิ่มเติม" },
  { file: "blog.html",       title: "บล็อก" },
  { file: "teacher.html",    title: "สำหรับครู" },
  { file: "about.html",      title: "ผู้จัดทำ" }
];

/* อ่าน/เขียน localStorage อย่างปลอดภัย (บางเบราว์เซอร์ปิดไว้) */
function storeGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch (e) { return fallback; }
}
function storeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ไม่เป็นไร */ }
}

/* เลขอารบิก → เลขไทย */
/* ใช้เลขอารบิกทั้งเว็บ (ถ้าต้องการเลขไทย เปลี่ยน USE_THAI_DIGITS เป็น true) */
const USE_THAI_DIGITS = false;
function thaiNum(n) { return USE_THAI_DIGITS ? String(n).replace(/\d/g, d => "๐๑๒๓๔๕๖๗๘๙"[d]) : String(n); }

/* โลโก้: ดอกประจำยามสีทอง */
const BRAND_MARK = `<svg width="30" height="30" viewBox="0 0 56 56" aria-hidden="true">
  <g fill="none" stroke="#d4a843" stroke-width="3">
    <path d="M28 3 L53 28 L28 53 L3 28 Z"/>
    <path d="M28 11 C34 19 34 23 28 28 C22 23 22 19 28 11Z M45 28 C37 34 33 34 28 28 C33 22 37 22 45 28Z M28 45 C22 37 22 33 28 28 C34 33 34 37 28 45Z M11 28 C19 22 23 22 28 28 C23 34 19 34 11 28Z"/>
  </g><circle cx="28" cy="28" r="3.5" fill="#d4a843"/></svg>`;

(function () {
  const current = decodeURIComponent(location.pathname.split("/").pop()) || "index.html";
  const idx = Math.max(0, PAGES.findIndex(p => p.file === current));

  // บันทึกว่าเปิดหน้านี้แล้ว
  const seen = storeGet("ayt-seen", []);
  if (!seen.includes(current)) { seen.push(current); storeSet("ayt-seen", seen); }

  // ส่วนหัว + เมนู
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    const items = PAGES.map((p, i) => `
      <li><a href="${p.file}" class="${i === idx ? "current" : ""}">
        <span class="num">${thaiNum(i)}</span>${p.title}
        ${seen.includes(p.file) ? '<span class="seen" aria-label="เปิดแล้ว">✓</span>' : ""}
      </a></li>`).join("");
    const pct = Math.round((idx / (PAGES.length - 1)) * 100);
    header.innerHTML = `
      <div class="bar">
        <button class="menu-btn" aria-expanded="false" aria-controls="menu-panel">
          <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span><span>สารบัญ</span>
        </button>
        <a class="brand" href="index.html">${BRAND_MARK}<span>การสถาปนาอาณาจักรอยุธยา</span></a>
        <span class="head-pct" title="ความคืบหน้าในบทเรียน">${pct}%</span>
      </div>
      <div class="menu-backdrop" hidden></div>
      <nav class="menu-panel" id="menu-panel" aria-label="สารบัญ">
        <div class="menu-head"><b>สารบัญบทเรียน</b><button type="button" class="menu-close" aria-label="ปิดสารบัญ">✕</button></div>
        <ol>${items}</ol>
      </nav>
      <div class="progress" title="ความคืบหน้า ${pct}%"><span style="width:${pct}%"></span></div>`;
    const btn = header.querySelector(".menu-btn");
    const panel = header.querySelector(".menu-panel");
    const backdrop = header.querySelector(".menu-backdrop");
    // ย้ายลิ้นชักไปไว้ใต้ body เพื่อให้ลอยเต็มจอ (ส่วนหัวมีเอฟเฟกต์เบลอที่จำกัดตำแหน่ง)
    document.body.append(backdrop, panel);
    const setOpen = open => {
      panel.classList.toggle("open", open);
      backdrop.hidden = !open;
      btn.setAttribute("aria-expanded", open);
      document.body.classList.toggle("menu-open", open);
      if (open) panel.querySelector("a.current, a")?.focus(); else btn.focus();
    };
    btn.addEventListener("click", () => setOpen(!panel.classList.contains("open")));
    backdrop.addEventListener("click", () => setOpen(false));
    panel.querySelector(".menu-close").addEventListener("click", () => setOpen(false));
    addEventListener("keydown", e => { if (e.key === "Escape" && panel.classList.contains("open")) setOpen(false); });
  }

  // ปุ่มก่อนหน้า / ถัดไป
  const pager = document.getElementById("pager");
  if (pager) {
    pager.className = "pager";
    const prev = PAGES[idx - 1], next = PAGES[idx + 1];
    pager.innerHTML =
      (prev ? `<a class="prev" href="${prev.file}"><small>← ก่อนหน้า</small>${prev.title}</a>` : "<span></span>") +
      (next ? `<a class="next" href="${next.file}"><small>ถัดไป →</small>${next.title}</a>` : "");
  }

  // ส่วนท้าย
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-banner">
        <img src="banner-footer.jpg" srcset="banner-footer-sm.jpg 960w, banner-footer.jpg 1920w" sizes="(min-width: 1100px) 1100px, 100vw" width="1920" height="640" loading="lazy"
          alt="สอนโดย พระมหาเจตพล วระวิชา โรงเรียนมังกรกมลาวาสวิทยาลัย · สื่อการเรียนรู้ประวัติศาสตร์ ชั้นมัธยมศึกษาปีที่ 2 เรื่อง การสถาปนาอาณาจักรอยุธยา">
        <a class="footer-credit-hit" href="media.html#credits" aria-label="เครดิตสื่อ"></a>
      </div>`;
  }

  // หน้าแรก: ติดป้าย "เรียนแล้ว" ที่บทที่เปิดแล้ว และสรุปความคืบหน้า
  const chapterLinks = document.querySelectorAll(".chapters a");
  if (chapterLinks.length) {
    let done = 0;
    chapterLinks.forEach(a => {
      if (seen.includes(a.getAttribute("href"))) { a.classList.add("done"); done++; }
    });
    const p = document.createElement("p");
    p.className = "hero-progress";
    p.innerHTML = done === 0
      ? "เริ่มจากบทที่ 1 ได้เลย ระบบจะติดป้ายบทที่เรียนแล้วให้อัตโนมัติ"
      : `เรียนแล้ว <b>${thaiNum(done)} จาก ${thaiNum(chapterLinks.length)} บท</b>${done === chapterLinks.length ? " ครบแล้ว ไปทำแบบทดสอบหลังเรียนกัน!" : ""}`;
    document.querySelector(".chapters").before(p);
  }

  // แยกประเภทกล่องข้อความตามหัวข้อ (ไอคอนและลวดลายต่างกัน)
  document.querySelectorAll(".callout").forEach(c => {
    const t = (c.querySelector("strong")?.textContent || "");
    if (/รู้หรือไม่/.test(t)) c.classList.add("is-know");
    else if (/หลักฐาน/.test(t)) c.classList.add("is-evidence");
    else if (/คำถาม|คิด/.test(t)) c.classList.add("is-think");
    else c.classList.add("is-howto");
  });

  // การ์ดที่กดเปิดดูได้ (ใช้ในบทที่ 3)
  document.querySelectorAll(".reveal-card [data-toggle]").forEach(b => {
    b.addEventListener("click", () => {
      const card = b.closest(".reveal-card");
      const open = card.classList.toggle("open");
      b.textContent = open ? "ซ่อนหลักฐาน" : "ดูหลักฐาน";
    });
  });

  // แท็บ (ใช้ในบทที่ 4)
  document.querySelectorAll(".tabs").forEach(tabs => {
    const buttons = tabs.querySelectorAll("button");
    buttons.forEach(b => b.addEventListener("click", () => {
      buttons.forEach(x => {
        x.setAttribute("aria-selected", x === b);
        document.getElementById(x.dataset.tab).classList.toggle("active", x === b);
      });
    }));
  });
})();

/* =========================================================
   ลูกเล่นเพิ่มเติม: แถบเครื่องมือลอย (ธีมมืด/สว่าง ขนาดตัวอักษร ฟังบทเรียน กลับขึ้นบน)
   เรียนต่อจากที่ค้างไว้ · ปุ่มลูกศรเปลี่ยนหน้า · ตัวเลขนับขึ้น
   ========================================================= */
(function () {
  const root = document.documentElement;
  const page = decodeURIComponent(location.pathname.split("/").pop()) || "index.html";
  const idx = PAGES.findIndex(p => p.file === page);

  // ธีมและขนาดตัวอักษรที่เลือกไว้
  const savedTheme = storeGet("ayt-theme", null);
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  const sizes = [15, 17, 19, 21];
  let sizeIdx = storeGet("ayt-size", 1);
  const applySize = () => { document.body.style.fontSize = sizes[sizeIdx] + "px"; };
  applySize();

  // จำบทที่เรียนล่าสุด
  if (/^(lesson\d|activities|pretest|posttest)\.html$/.test(page)) storeSet("ayt-last", page);

  const ICON = {
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    speak: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
  };
  const isDark = () => root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);

  const dock = document.createElement("div");
  dock.className = "dock";
  dock.setAttribute("role", "toolbar");
  dock.setAttribute("aria-label", "เครื่องมือ");
  const canSpeak = "speechSynthesis" in window && document.querySelector("main") && /^(lesson\d|intro|guide)\.html$/.test(page);
  dock.innerHTML = `
    <button type="button" data-act="theme" title="สลับโหมดมืด/สว่าง"></button>
    <button type="button" data-act="smaller" title="ตัวอักษรเล็กลง" class="txt">ก-</button>
    <button type="button" data-act="bigger" title="ตัวอักษรใหญ่ขึ้น" class="txt">ก+</button>
    ${canSpeak ? `<button type="button" data-act="speak" title="ฟังบทเรียน">${ICON.speak}</button>` : ""}
    <button type="button" data-act="top" title="กลับขึ้นบนสุด" class="to-top">${ICON.up}</button>`;
  document.body.appendChild(dock);
  const themeBtn = dock.querySelector('[data-act="theme"]');
  const drawTheme = () => { themeBtn.innerHTML = isDark() ? ICON.sun : ICON.moon; themeBtn.setAttribute("aria-label", isDark() ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"); };
  drawTheme();
  dock.querySelectorAll("button").forEach(b => { if (!b.getAttribute("aria-label")) b.setAttribute("aria-label", b.title); });

  let speaking = false;
  function stopSpeak() { speechSynthesis.cancel(); speaking = false; const b = dock.querySelector('[data-act="speak"]'); if (b) { b.innerHTML = ICON.speak; b.classList.remove("on"); } }
  dock.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const act = b.dataset.act;
    if (act === "theme") {
      const next = isDark() ? "light" : "dark";
      const go = () => { root.setAttribute("data-theme", next); storeSet("ayt-theme", next); drawTheme(); };
      document.startViewTransition ? document.startViewTransition(go) : go();
    } else if (act === "smaller" || act === "bigger") {
      sizeIdx = Math.max(0, Math.min(sizes.length - 1, sizeIdx + (act === "bigger" ? 1 : -1)));
      storeSet("ayt-size", sizeIdx); applySize();
    } else if (act === "top") {
      scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    } else if (act === "speak") {
      if (speaking) { stopSpeak(); return; }
      const main = document.querySelector("main").cloneNode(true);
      main.querySelectorAll("script, svg, button, .video, details:not([open]) > p, .act-progress").forEach(n => n.remove());
      const text = main.innerText.replace(/\s+/g, " ").trim();
      const chunks = text.match(/.{1,180}(\s|$)/g) || [text];
      speechSynthesis.cancel();
      const th = speechSynthesis.getVoices().find(v => /^th/i.test(v.lang));
      chunks.forEach((c, i) => {
        const u = new SpeechSynthesisUtterance(c);
        u.lang = "th-TH"; if (th) u.voice = th; u.rate = 0.95;
        if (i === chunks.length - 1) u.onend = stopSpeak;
        speechSynthesis.speak(u);
      });
      speaking = true; b.innerHTML = ICON.stop; b.classList.add("on"); b.setAttribute("aria-label", "หยุดอ่าน");
    }
  });
  addEventListener("pagehide", () => { if (speaking) speechSynthesis.cancel(); });

  // ปุ่มกลับขึ้นบน แสดงเมื่อเลื่อนลงมา
  const onScroll = () => dock.classList.toggle("scrolled", scrollY > 500);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ปุ่มลูกศร ← → เปลี่ยนหน้า
  addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable) return;
    if (e.key === "ArrowRight" && PAGES[idx + 1]) location.href = PAGES[idx + 1].file;
    if (e.key === "ArrowLeft" && idx > 0) location.href = PAGES[idx - 1].file;
  });

  // หน้าแรก: ปุ่มเรียนต่อจากที่ค้างไว้
  const last = storeGet("ayt-last", null);
  const actions = document.querySelector(".welcome .actions, .hero .actions");
  if (actions && last) {
    const p = PAGES.find(x => x.file === last);
    if (p) {
      const a = document.createElement("a");
      a.className = "btn resume"; a.href = p.file;
      a.innerHTML = `<small>เรียนต่อจากที่ค้างไว้</small>${p.title} →`;
      actions.prepend(a);
    }
  }

  // ตัวเลขในกล่องตัวเลขเด่น นับขึ้นเมื่อเลื่อนมาเห็น
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const els = [...document.querySelectorAll(".keyfact b")].filter(b => /\d/.test(b.textContent));
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target, final = el.textContent, m = final.match(/\d+/);
      const target = +m[0], start = performance.now(), dur = 1100, from = target > 1000 ? target - 120 : 0;
      const tick = t => {
        const k = Math.min(1, (t - start) / dur), v = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
        el.textContent = final.replace(m[0], v);
        if (k < 1) requestAnimationFrame(tick); else el.textContent = final;
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    els.forEach(b => io.observe(b));
  }
})();
