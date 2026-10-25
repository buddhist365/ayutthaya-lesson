/* =========================================================
   คลังวิดีโอของบทเรียน — ครูแก้ไขที่ไฟล์นี้ไฟล์เดียว
   ---------------------------------------------------------
   วิธีใส่คลิป: คัดลอกลิงก์ YouTube มาวางใน youtube: "..."
   ใช้ได้ทั้งแบบ https://www.youtube.com/watch?v=xxxx
             และ https://youtu.be/xxxx
   ถ้าเว้นว่างไว้ ระบบจะแสดงปุ่มค้นหาคลิปบน YouTube ให้แทน
   เครดิต: ใส่ชื่อช่องใน channel: "..." ทุกครั้งที่ใส่คลิป
           ระบบจะแสดง "ที่มา" ใต้คลิป และในหน้าเครดิตสื่อให้อัตโนมัติ
   ========================================================= */

const VIDEOS = [
  {
    key: "lesson1",
    title: "อาณาจักรในลุ่มแม่น้ำเจ้าพระยาก่อนสมัยอยุธยา",
    note: "ละโว้ สุพรรณภูมิ และชุมชนอโยธยา",
    youtube: "",
    channel: "",      // ชื่อช่อง/เจ้าของคลิป เช่น "DLTV" หรือ "ทรูปลูกปัญญา"
    channelUrl: "",   // ลิงก์หน้าช่อง YouTube (ไม่บังคับ)
    search: "แคว้นละโว้ สุพรรณภูมิ อโยธยา ก่อนสถาปนาอยุธยา"
  },
  {
    key: "lesson2",
    title: "การสถาปนาอาณาจักรอยุธยา",
    note: "พระเจ้าอู่ทองสถาปนากรุงศรีอยุธยา พ.ศ. 1893",
    youtube: "",
    channel: "",      // ชื่อช่อง/เจ้าของคลิป เช่น "DLTV" หรือ "ทรูปลูกปัญญา"
    channelUrl: "",   // ลิงก์หน้าช่อง YouTube (ไม่บังคับ)
    search: "การสถาปนาอาณาจักรอยุธยา ม.2"
  },
  {
    key: "lesson3",
    title: "พระเจ้าอู่ทองมาจากไหน",
    note: "แนวคิดเรื่องที่มาของปฐมกษัตริย์แห่งอยุธยา",
    youtube: "",
    channel: "",      // ชื่อช่อง/เจ้าของคลิป เช่น "DLTV" หรือ "ทรูปลูกปัญญา"
    channelUrl: "",   // ลิงก์หน้าช่อง YouTube (ไม่บังคับ)
    search: "พระเจ้าอู่ทอง มาจากไหน แนวคิด ประวัติศาสตร์"
  },
  {
    key: "lesson4",
    title: "ปัจจัยการสถาปนาและความเจริญของอยุธยา",
    note: "ภูมิศาสตร์ การเมือง เศรษฐกิจ",
    youtube: "",
    channel: "",      // ชื่อช่อง/เจ้าของคลิป เช่น "DLTV" หรือ "ทรูปลูกปัญญา"
    channelUrl: "",   // ลิงก์หน้าช่อง YouTube (ไม่บังคับ)
    search: "ปัจจัยการสถาปนาอาณาจักรอยุธยา ภูมิศาสตร์ การเมือง เศรษฐกิจ"
  },
  {
    key: "lesson5",
    title: "ราชวงศ์ที่ปกครองอาณาจักรอยุธยา",
    note: "5 ราชวงศ์ 33 พระมหากษัตริย์",
    youtube: "",
    channel: "",      // ชื่อช่อง/เจ้าของคลิป เช่น "DLTV" หรือ "ทรูปลูกปัญญา"
    channelUrl: "",   // ลิงก์หน้าช่อง YouTube (ไม่บังคับ)
    search: "5 ราชวงศ์ อยุธยา 33 พระองค์"
  }
];

/* ---------- ส่วนแสดงผล (ไม่ต้องแก้) ---------- */

/* ดึงรหัสคลิป 11 ตัวอักษรจากลิงก์ YouTube */
function youtubeId(text) {
  if (!text) return "";
  const m = text.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(text.trim()) ? text.trim() : "";
}

/* ฝังคลิปในหน้าได้เมื่อเปิดผ่านเว็บไซต์จริง (เช่น GitHub Pages)
   ส่วนลิงก์ตัวอย่างบน claude.ai และการเปิดไฟล์จากเครื่อง จะเปิดคลิปในแท็บใหม่แทน */
const CAN_EMBED = /^https?:$/.test(location.protocol) && !/claude/i.test(location.hostname);

const PLAY_ICON = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="none" stroke="#d4a843" stroke-width="2.5"/><path d="M26 20 L46 32 L26 44 Z" fill="#d4a843"/></svg>`;

function renderVideo(slot, v) {
  const id = youtubeId(v.youtube);
  slot.classList.add("video");
  if (!id) {
    const q = encodeURIComponent(v.search || v.title);
    slot.classList.add("empty");
    slot.innerHTML = `
      <div class="video-empty">
        <span class="video-label">วิดีโอประกอบบทเรียน</span>
        <b>${v.title}</b>
        <small>${v.note || ""}</small>
        <a class="btn gold" href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">ค้นหาคลิปบน YouTube ↗</a>
        <small class="video-hint">ครู: วางลิงก์คลิปที่เลือกแล้วในไฟล์ js/media.js เพื่อแสดงคลิปตรงนี้</small>
      </div>`;
    return;
  }
  const watch = `https://www.youtube.com/watch?v=${id}`;
  const credit = creditHtml(v, watch);
  const poster = `
    <span class="video-label">วิดีโอประกอบบทเรียน</span>
    <span class="video-play">${PLAY_ICON}</span>
    <b>${v.title}</b>
    <small>${CAN_EMBED ? "กดเพื่อเล่นคลิป" : "กดเพื่อเปิดดูบน YouTube ↗"}</small>`;
  if (CAN_EMBED) {
    slot.innerHTML = `<button class="video-poster" type="button" aria-label="เล่นคลิป ${v.title}">${poster}</button>${credit}`;
    slot.querySelector("button").addEventListener("click", () => {
      slot.innerHTML = `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
        title="${v.title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>${credit}`;
    });
  } else {
    slot.innerHTML = `<a class="video-poster" href="${watch}" target="_blank" rel="noopener">${poster}</a>${credit}`;
  }
}

/* บรรทัดเครดิตใต้คลิป */
function creditHtml(v, watch) {
  const who = v.channel
    ? (v.channelUrl ? `<a href="${v.channelUrl}" target="_blank" rel="noopener">${v.channel}</a>` : v.channel)
    : `<span class="credit-missing">ยังไม่ได้ระบุชื่อช่อง (ใส่ใน js/media.js)</span>`;
  return `<p class="video-credit">ที่มา: ${who} · <a href="${watch}" target="_blank" rel="noopener">YouTube ↗</a></p>`;
}

/* รายการเครดิตทั้งหมด (หน้า media.html) */
function renderCredits(el) {
  const used = VIDEOS.map(v => ({ v, id: youtubeId(v.youtube) })).filter(x => x.id);
  if (!used.length) {
    el.innerHTML = `<p class="credit-empty">ยังไม่มีคลิปในบทเรียน เมื่อครูใส่ลิงก์คลิปและชื่อช่องใน <code>js/media.js</code> รายการเครดิตจะแสดงที่นี่อัตโนมัติ</p>`;
    return;
  }
  el.innerHTML = `<div class="table-wrap"><table>
    <thead><tr><th>บทเรียน</th><th>ชื่อคลิป</th><th>เจ้าของคลิป / ช่อง</th><th>ลิงก์</th></tr></thead>
    <tbody>${used.map(({ v, id }) => `<tr>
      <td>${chapterLabel(v.key)}</td><td>${v.title}</td>
      <td>${v.channel ? (v.channelUrl ? `<a href="${v.channelUrl}" target="_blank" rel="noopener">${v.channel}</a>` : v.channel) : "—"}</td>
      <td><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">youtu.be/${id}</a></td></tr>`).join("")}
    </tbody></table></div>`;
}

function chapterLabel(key) { return "บทที่ " + key.replace("lesson", ""); }

/* ใส่คลิปลงทุก <div data-video="..."> ในหน้า
   และ <div data-video-list> แสดงคลิปทั้งหมด (หน้า media.html) */
(function () {
  document.querySelectorAll("[data-video]").forEach(slot => {
    const v = VIDEOS.find(x => x.key === slot.dataset.video);
    if (v) renderVideo(slot, v);
  });
  document.querySelectorAll("[data-video-list]").forEach(list => {
    list.innerHTML = VIDEOS.map(v => `
      <figure class="video-item">
        <div data-key="${v.key}"></div>
        <figcaption><span class="video-label">${chapterLabel(v.key)}</span>${v.title}</figcaption>
      </figure>`).join("");
    list.querySelectorAll("[data-key]").forEach(slot =>
      renderVideo(slot, VIDEOS.find(x => x.key === slot.dataset.key)));
  });
  document.querySelectorAll("[data-video-credits]").forEach(renderCredits);
})();
