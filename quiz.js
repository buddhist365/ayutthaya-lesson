/* =========================================================
   คลังข้อสอบ (ใช้ร่วมกันทั้งก่อนเรียน หลังเรียน และเฉลยในหน้าครู)
   answer = ลำดับของตัวเลือกที่ถูก เริ่มนับจาก 0
   ========================================================= */

const QUIZ = [
  {
    q: "อาณาจักรอยุธยาได้รับการสถาปนาขึ้นในปีใด",
    choices: ["พ.ศ. 1792", "พ.ศ. 1893", "พ.ศ. 2112", "พ.ศ. 2310"],
    answer: 1,
    explain: "สมเด็จพระรามาธิบดีที่ 1 สถาปนากรุงศรีอยุธยาเมื่อ พ.ศ. 1893"
  },
  {
    q: "ผู้สถาปนาอาณาจักรอยุธยาคือใคร",
    choices: ["พ่อขุนรามคำแหงมหาราช", "สมเด็จพระนเรศวรมหาราช", "สมเด็จพระรามาธิบดีที่ 1 (พระเจ้าอู่ทอง)", "สมเด็จพระบรมไตรโลกนาถ"],
    answer: 2,
    explain: "สมเด็จพระรามาธิบดีที่ 1 หรือพระเจ้าอู่ทอง ทรงเป็นปฐมกษัตริย์ของอยุธยา"
  },
  {
    q: "แม่น้ำสายใดไม่ได้ไหลล้อมรอบเกาะเมืองอยุธยา",
    choices: ["แม่น้ำเจ้าพระยา", "แม่น้ำป่าสัก", "แม่น้ำลพบุรี", "แม่น้ำท่าจีน"],
    answer: 3,
    explain: "เกาะเมืองอยุธยามีแม่น้ำ 3 สายล้อมรอบ คือ เจ้าพระยา ป่าสัก และลพบุรี"
  },
  {
    q: "หลักฐานใดแสดงว่าบริเวณนี้มีชุมชนที่เจริญอยู่แล้วก่อน พ.ศ. 1893",
    choices: ["การสร้างพระเจ้าพนัญเชิง พ.ศ. 1867", "ศิลาจารึกหลักที่ 1", "การสร้างวัดไชยวัฒนาราม", "การสร้างพระราชวังบางปะอิน"],
    answer: 0,
    explain: "พงศาวดารบันทึกว่ามีการสร้างพระเจ้าพนัญเชิงเมื่อ พ.ศ. 1867 ก่อนสถาปนาอยุธยา 26 ปี แสดงว่ามีชุมชน “อโยธยา” อยู่ก่อนแล้ว"
  },
  {
    q: "ข้อใดเป็นปัจจัยทางการเมืองที่เอื้อต่อการสถาปนาอยุธยา",
    choices: ["มีแม่น้ำล้อมรอบ", "ดินตะกอนอุดมสมบูรณ์", "อาณาจักรสุโขทัยและเขมรกำลังเสื่อมอำนาจ", "อยู่ใกล้ปากอ่าวไทย"],
    answer: 2,
    explain: "เมื่อสุโขทัยและเขมรเสื่อมอำนาจ จึงไม่มีอำนาจใหญ่มาขัดขวางการตั้งอาณาจักรใหม่ ข้ออื่นเป็นปัจจัยทางภูมิศาสตร์และเศรษฐกิจ"
  },
  {
    q: "การที่ตัวเมืองอยุธยาตั้งอยู่บนเกาะส่งผลดีอย่างไรมากที่สุด",
    choices: ["ทำให้มีอากาศเย็นตลอดปี", "ช่วยป้องกันข้าศึก โดยเฉพาะในฤดูน้ำหลาก", "ทำให้ไม่ต้องทำการเกษตร", "ทำให้ไม่ต้องติดต่อกับต่างชาติ"],
    answer: 1,
    explain: "ในฤดูน้ำหลาก น้ำท่วมพื้นที่รอบเกาะ ข้าศึกตั้งทัพล้อมเมืองได้ยาก ต้องถอยกลับไป"
  },
  {
    q: "แคว้นใดที่รวมกำลังกันจนเป็นรากฐานสำคัญของอาณาจักรอยุธยา",
    choices: ["ละโว้และสุพรรณภูมิ", "สุโขทัยและล้านนา", "นครศรีธรรมราชและหริภุญชัย", "ล้านช้างและเขมร"],
    answer: 0,
    explain: "ละโว้และสุพรรณภูมิเป็นพันธมิตรกันทางเครือญาติ จึงรวมกำลังสนับสนุนการตั้งอยุธยาได้"
  },
  {
    q: "แนวคิดที่ว่าพระเจ้าอู่ทองอพยพมาจากเมืองอู่ทอง (สุพรรณบุรี) เป็นของผู้ใด",
    choices: ["ลาลูแบร์ ราชทูตฝรั่งเศส", "สมเด็จพระเจ้าบรมวงศ์เธอ กรมพระยาดำรงราชานุภาพ", "พ่อขุนรามคำแหงมหาราช", "วัน วลิต พ่อค้าชาวฮอลันดา"],
    answer: 1,
    explain: "สมเด็จฯ กรมพระยาดำรงราชานุภาพทรงเสนอว่าพระเจ้าอู่ทองย้ายมาจากเมืองอู่ทองเพราะเกิดโรคระบาด"
  },
  {
    q: "อาณาจักรอยุธยามีราชวงศ์ปกครองทั้งหมดกี่ราชวงศ์",
    choices: ["3 ราชวงศ์", "4 ราชวงศ์", "5 ราชวงศ์", "6 ราชวงศ์"],
    answer: 2,
    explain: "อู่ทอง สุพรรณภูมิ สุโขทัย ปราสาททอง และบ้านพลูหลวง รวม 5 ราชวงศ์ 33 พระองค์"
  },
  {
    q: "เหตุใดอยุธยาจึงเป็นศูนย์กลางการค้ากับต่างชาติได้",
    choices: ["อยู่บนภูเขาสูง มองเห็นเรือได้ไกล", "อยู่ไม่ไกลจากปากอ่าว เรือสำเภาแล่นเข้าถึงได้", "ห้ามคนต่างชาติเข้าเมือง", "ไม่มีแม่น้ำผ่าน จึงต้องค้าทางบก"],
    answer: 1,
    explain: "อยุธยาอยู่ไม่ไกลจากปากอ่าวไทย เรือสำเภาจึงแล่นตามแม่น้ำเจ้าพระยาเข้ามาค้าขายได้สะดวก"
  }
];

/* สร้างแบบทดสอบลงใน element ที่กำหนด
   storeKey = ชื่อสำหรับบันทึกคะแนน ("pre" หรือ "post") */
function renderQuiz(container, storeKey) {
  const form = document.createElement("form");
  form.innerHTML = QUIZ.map((item, i) => `
    <fieldset class="quiz-q" id="q${i}" style="margin-inline:0">
      <legend class="qtext">${i + 1}. ${item.q}</legend>
      ${item.choices.map((c, j) => `
        <label><input type="radio" name="q${i}" value="${j}"> <span>${"กขคง"[j]}. ${c}</span></label>`).join("")}
      <div class="explain"></div>
    </fieldset>`).join("") +
    `<p class="quiz-msg" aria-live="polite"></p>
     <p style="text-align:center;max-width:none"><button class="btn" type="submit">ส่งคำตอบ</button></p>
     <div class="result" hidden></div>`;
  container.appendChild(form);
  const msg = form.querySelector(".quiz-msg");
  form.addEventListener("change", e => {
    e.target.closest(".quiz-q")?.classList.remove("missing");
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const missing = QUIZ.map((_, i) => i).filter(i => !form.querySelector(`input[name=q${i}]:checked`));
    QUIZ.forEach((_, i) => document.getElementById("q" + i).classList.toggle("missing", missing.includes(i)));
    if (missing.length) {
      msg.textContent = `ยังไม่ได้ตอบข้อ ${missing.map(i => i + 1).join(", ")}`;
      document.getElementById("q" + missing[0]).scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    msg.textContent = "";
    let score = 0;
    QUIZ.forEach((item, i) => {
      const box = document.getElementById("q" + i);
      const chosen = Number(form.querySelector(`input[name=q${i}]:checked`).value);
      const ok = chosen === item.answer;
      if (ok) score++;
      box.classList.remove("correct", "wrong");
      box.classList.add(ok ? "correct" : "wrong");
      box.querySelector(".explain").innerHTML =
        (ok ? "✓ ถูกต้อง " : `✗ คำตอบที่ถูกคือ ${"กขคง"[item.answer]}. ${item.choices[item.answer]} — `) + item.explain;
    });
    storeSet("ayt-score-" + storeKey, score);

    const pct = Math.round(score / QUIZ.length * 100);
    const pass = pct >= 70;
    let compare = "";
    if (storeKey === "post") {
      const pre = storeGet("ayt-score-pre", null);
      if (pre !== null) {
        const diff = score - pre;
        compare = `<p>คะแนนก่อนเรียน ${pre} → หลังเรียน ${score} (${diff >= 0 ? "+" : ""}${diff} คะแนน)</p>`;
      }
    }
    const result = form.querySelector(".result");
    result.hidden = false;
    result.innerHTML = `
      <div>คะแนนของคุณ</div>
      <div class="score">${score} / ${QUIZ.length}</div>
      <p>${storeKey === "pre"
        ? "ไม่ต้องกังวลกับคะแนนก่อนเรียน มาเริ่มเรียนกันเลย!"
        : (pass ? "ผ่านเกณฑ์ร้อยละ 70 เยี่ยมมาก!" : "ยังไม่ผ่านเกณฑ์ร้อยละ 70 ลองทบทวนบทเรียนแล้วทำใหม่อีกครั้ง")}</p>
      ${compare}
      ${sendPanelHTML()}
      <button class="btn ghost" type="button" onclick="location.reload()">ทำใหม่</button>`;
    wireSendPanel(result, storeKey, score);
    if (pass) {   // กลีบดอกทองโปรยเมื่อได้ 7 คะแนนขึ้นไป
      for (let i = 0; i < 26; i++) {
        const s = document.createElement("span");
        s.className = "petal";
        s.style.left = Math.random() * 100 + "%";
        s.style.animationDelay = (Math.random() * 1.4).toFixed(2) + "s";
        s.style.scale = (0.6 + Math.random() * 0.8).toFixed(2);
        result.appendChild(s);
        setTimeout(() => s.remove(), 5000);
      }
    }
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* =========================================================
   ส่งคะแนนให้ครูผ่าน Google Form (คำตอบเข้า Google Sheets อัตโนมัติ)
   ถ้าเปลี่ยนฟอร์ม แก้ FORM_URL และรหัส entry ด้านล่าง
   ========================================================= */
const GFORM = {
  url: "https://docs.google.com/forms/d/e/1FAIpQLScleo2H2WBv6brCz_JliH3tHKoy_0VO0GjLlT12DPTJ6_1GXg/viewform",
  name: "entry.319139528",    // ชื่อ-สกุล
  number: "entry.1420059105", // เลขที่
  room: "entry.2051352182",   // ห้อง
  pre: "entry.751852502",     // คะแนนก่อนเรียน
  post: "entry.849249038"     // คะแนนหลังเรียน
};

function sendPanelHTML() {
  return `
    <div class="send-panel">
      <h3>ส่งคะแนนให้ครู</h3>
      <div class="send-fields">
        <label>ชื่อ-สกุล<input name="sp-name" autocomplete="name" placeholder="เช่น ด.ช.สมชาย ใจดี"></label>
        <label>เลขที่<input name="sp-number" inputmode="numeric" placeholder="เช่น 12"></label>
        <label>ห้อง<input name="sp-room" placeholder="เช่น ม.2/3"></label>
      </div>
      <p class="send-msg" aria-live="polite"></p>
      <a class="btn gold send-btn" target="_blank" rel="noopener" href="#">ส่งคะแนน →</a>
      <small class="send-note">จะเปิด Google Form ที่กรอกข้อมูลไว้ให้แล้ว ตรวจสอบแล้วกด “ส่ง” ในฟอร์มอีกครั้ง</small>
    </div>`;
}

function wireSendPanel(root, storeKey, score) {
  const f = k => root.querySelector(`input[name=sp-${k}]`);
  const saved = storeGet("ayt-student", {});
  ["name", "number", "room"].forEach(k => { f(k).value = saved[k] || ""; });
  const btn = root.querySelector(".send-btn");
  const msg = root.querySelector(".send-msg");

  const build = () => {
    const v = { name: f("name").value.trim(), number: f("number").value.trim(), room: f("room").value.trim() };
    storeSet("ayt-student", v);
    const p = new URLSearchParams({ usp: "pp_url" });
    p.set(GFORM.name, v.name);
    p.set(GFORM.number, v.number);
    p.set(GFORM.room, v.room);
    if (storeKey === "pre") {
      p.set(GFORM.pre, score);
    } else {
      const pre = storeGet("ayt-score-pre", null);
      if (pre !== null) p.set(GFORM.pre, pre);
      p.set(GFORM.post, score);
    }
    btn.href = GFORM.url + "?" + p.toString();
    return v;
  };
  root.querySelectorAll(".send-fields input").forEach(i => {
    i.addEventListener("input", () => { build(); msg.textContent = ""; });
    // กัน Enter ไปส่งแบบทดสอบซ้ำ
    i.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); btn.click(); } });
  });
  btn.addEventListener("click", e => {
    const v = build();
    const miss = [["name", "ชื่อ-สกุล"], ["number", "เลขที่"], ["room", "ห้อง"]].filter(([k]) => !v[k]);
    if (miss.length) {
      e.preventDefault();
      msg.textContent = "กรุณากรอก " + miss.map(m => m[1]).join(" ") + " ก่อนส่ง";
      f(miss[0][0]).focus();
    }
  });
  build();
}
