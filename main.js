/* =========================================================
   สคริปต์กลาง: สร้างเมนู แถบความคืบหน้า และปุ่มก่อนหน้า/ถัดไป
   ต้องการเพิ่ม/ลบ/สลับหน้า แก้ที่รายการ PAGES ด้านล่างที่เดียว
   ========================================================= */

const PAGES = [
  { file: "index.html",      title: "หน้าแรก" },
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
  { file: "resources.html",  title: "แหล่งเรียนรู้เพิ่มเติม" },
  { file: "blog.html",       title: "บล็อก" },
  { file: "teacher.html",    title: "สำหรับครู" }
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
function thaiNum(n) { return String(n).replace(/\d/g, d => "๐๑๒๓๔๕๖๗๘๙"[d]); }

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
        <a class="brand" href="index.html">${BRAND_MARK}<span>การสถาปนาอาณาจักรอยุธยา</span></a>
        <button class="menu-btn" aria-expanded="false" aria-controls="menu-panel">สารบัญ</button>
      </div>
      <nav class="menu-panel" id="menu-panel" aria-label="สารบัญ"><ol>${items}</ol></nav>
      <div class="progress" title="ความคืบหน้า ${pct}%"><span style="width:${pct}%"></span></div>`;
    const btn = header.querySelector(".menu-btn");
    const panel = header.querySelector(".menu-panel");
    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
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
      <div class="footer-teacher">
        ${BRAND_MARK}
        <div>
          <span class="footer-label">สอนโดย</span>
          <b>พระมหาเจตพล วระวิชา</b>
          <span class="footer-school">โรงเรียนมังกรกมลาวาสวิทยาลัย</span>
        </div>
      </div>
      <p class="footer-meta">สื่อการเรียนรู้ประวัติศาสตร์ ชั้นมัธยมศึกษาปีที่ 2 · เรื่อง การสถาปนาอาณาจักรอยุธยา · <a href="media.html#credits">เครดิตสื่อ</a></p>`;
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
      ? "เริ่มจากบทที่ ๑ ได้เลย ระบบจะติดป้ายบทที่เรียนแล้วให้อัตโนมัติ"
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
