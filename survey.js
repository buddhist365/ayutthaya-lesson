/* =========================================================
   แบบประเมินความพึงพอใจต่อสื่อ (มาตราส่วนประมาณค่า 5 ระดับ)
   ครูแก้ข้อคำถามได้ที่ SURVEY
   ถ้าสร้าง Google Form สำหรับเก็บผลแล้ว ใส่ลิงก์ใน SURVEY_FORM_URL
   ========================================================= */
const SURVEY_FORM_URL = "";

const SURVEY = [
  ["ด้านเนื้อหา", [
    "เนื้อหาถูกต้อง ตรงตามจุดประสงค์การเรียนรู้",
    "เนื้อหาเรียงลำดับเข้าใจง่าย",
    "ภาษาที่ใช้เหมาะสมกับระดับชั้น",
    "แบบทดสอบสอดคล้องกับเนื้อหา"
  ]],
  ["ด้านการออกแบบ", [
    "สีและลวดลายสวยงาม เหมาะกับเรื่องประวัติศาสตร์",
    "ตัวอักษรอ่านง่าย ขนาดเหมาะสม",
    "แผนที่ เส้นเวลา และภาพประกอบช่วยให้เข้าใจ"
  ]],
  ["ด้านการใช้งาน", [
    "เมนูและปุ่มใช้งานง่าย ไม่หลงหน้า",
    "ใช้งานบนมือถือหรือแท็บเล็ตได้สะดวก",
    "กิจกรรมเชิงโต้ตอบน่าสนใจและสนุก"
  ]],
  ["ด้านประโยชน์", [
    "ช่วยให้เข้าใจเรื่องการสถาปนาอาณาจักรอยุธยามากขึ้น",
    "อยากเรียนเรื่องอื่นด้วยสื่อแบบนี้"
  ]]
];
const LEVELS = ["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"];
function levelOf(m) {
  return m >= 4.51 ? "มากที่สุด" : m >= 3.51 ? "มาก" : m >= 2.51 ? "ปานกลาง" : m >= 1.51 ? "น้อย" : "น้อยที่สุด";
}

(function () {
  const form = document.getElementById("survey");
  const out = document.getElementById("survey-result");
  if (!form) return;
  let n = 0;
  form.innerHTML = SURVEY.map(([sec, items]) => `
    <fieldset class="sv-sec">
      <legend>${sec}</legend>
      ${items.map(q => { const i = n++; return `
        <div class="sv-row" id="sv${i}">
          <p class="sv-q">${i + 1}. ${q}</p>
          <div class="sv-scale" role="radiogroup" aria-label="${q}">
            ${[5, 4, 3, 2, 1].map(v => `
              <label><input type="radio" name="sv${i}" value="${v}"><span><b>${v}</b><small>${LEVELS[v - 1]}</small></span></label>`).join("")}
          </div>
        </div>`; }).join("")}
    </fieldset>`).join("") + `
    <label class="sv-comment" for="sv-text">ข้อเสนอแนะเพิ่มเติม (ไม่บังคับ)</label>
    <textarea id="sv-text" rows="3"></textarea>
    <p class="quiz-msg" aria-live="polite"></p>
    <p style="text-align:center;max-width:none"><button class="btn" type="submit">ดูผลการประเมิน</button></p>`;
  const total = n;

  form.addEventListener("change", e => e.target.closest(".sv-row")?.classList.remove("missing"));
  form.addEventListener("submit", e => {
    e.preventDefault();
    const vals = [], miss = [];
    for (let i = 0; i < total; i++) {
      const c = form.querySelector(`input[name=sv${i}]:checked`);
      if (c) vals[i] = +c.value; else miss.push(i);
      document.getElementById("sv" + i).classList.toggle("missing", !c);
    }
    const msg = form.querySelector(".quiz-msg");
    if (miss.length) {
      msg.textContent = `ยังไม่ได้ตอบข้อ ${miss.map(i => i + 1).join(", ")}`;
      document.getElementById("sv" + miss[0]).scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    msg.textContent = "";
    let k = 0;
    const rows = SURVEY.map(([sec, items]) => {
      const v = items.map(() => vals[k++]);
      const m = v.reduce((a, b) => a + b, 0) / v.length;
      return [sec, m];
    });
    const all = vals.reduce((a, b) => a + b, 0) / total;
    const text = rows.map(([s, m]) => `${s}: ${m.toFixed(2)} (${levelOf(m)})`).join("\n") +
      `\nภาพรวม: ${all.toFixed(2)} (${levelOf(all)})` +
      (form.querySelector("#sv-text").value.trim() ? `\nข้อเสนอแนะ: ${form.querySelector("#sv-text").value.trim()}` : "");
    out.hidden = false;
    out.innerHTML = `
      <h2>ผลการประเมินของคุณ</h2>
      <div class="sv-total"><b>${all.toFixed(2)}</b><span>ความพึงพอใจภาพรวมระดับ <strong>${levelOf(all)}</strong></span></div>
      <div class="sv-bars">${rows.map(([s, m]) => `
        <div class="sv-bar"><span>${s}</span><span class="sv-track"><span style="width:${(m / 5 * 100).toFixed(0)}%"></span></span><b>${m.toFixed(2)}</b></div>`).join("")}
      </div>
      <p class="caption">เกณฑ์: 4.51–5.00 มากที่สุด · 3.51–4.50 มาก · 2.51–3.50 ปานกลาง · 1.51–2.50 น้อย · 1.00–1.50 น้อยที่สุด</p>
      <p style="text-align:center;max-width:none">
        <button class="btn ghost" type="button" id="sv-copy">คัดลอกผลการประเมิน</button>
        ${SURVEY_FORM_URL ? `<a class="btn" href="${SURVEY_FORM_URL}" target="_blank" rel="noopener">ส่งผลให้ครู ↗</a>` : ""}
      </p>
      <p class="sv-thanks">ขอบคุณที่ช่วยประเมินสื่อการเรียนรู้</p>`;
    out.querySelector("#sv-copy").addEventListener("click", ev => {
      const b = ev.currentTarget;
      navigator.clipboard?.writeText(text).then(() => { b.textContent = "คัดลอกแล้ว ✓"; }, () => { b.textContent = "คัดลอกไม่ได้"; });
    });
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
