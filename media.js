/* =========================================================
   คลังวิดีโอของบทเรียน — ครูแก้ไขที่ไฟล์นี้ไฟล์เดียว
   ---------------------------------------------------------
   youtube  : ลิงก์คลิป (https://www.youtube.com/watch?v=xxxx หรือ https://youtu.be/xxxx)
   source   : ชื่อคลิปตามต้นฉบับบน YouTube (ใช้ในเครดิต)
   channel  : ชื่อช่อง/ผู้สร้างคลิป  channelUrl: ลิงก์หน้าช่อง (ไม่บังคับ)
   ถ้าเว้น youtube ว่าง ระบบจะแสดงปุ่มค้นหาคลิปแทน
   ========================================================= */

const VIDEOS = [
  {
    key: "lesson1",
    title: "กำเนิดอาณาจักรอยุธยา",
    note: "ภาพรวมบ้านเมืองก่อนและช่วงกำเนิดกรุงศรีอยุธยา",
    youtube: "https://www.youtube.com/watch?v=atcIWY6JKGQ",
    source: "ซีรีส์มหากาพย์ราชบัลลังก์อยุธยา : กำเนิดอาณาจักรอยุธยา",
    channel: "ซีรีส์มหากาพย์ราชบัลลังก์อยุธยา",
    channelUrl: "",
    search: "กำเนิดอาณาจักรอยุธยา"
  },
  {
    key: "lesson2",
    title: "สถาปนาอาณาจักรอยุธยา (สังคมศึกษา ม.2)",
    note: "พระเจ้าอู่ทองสถาปนากรุงศรีอยุธยา พ.ศ. 1893",
    youtube: "https://www.youtube.com/watch?v=9EdSkNe1Ixk",
    source: "สังคมฯ ม.2 สถาปนาอาณาจักรอยุธยา ครูปนิตา ลือขจร",
    channel: "ครูปนิตา ลือขจร",
    channelUrl: "",
    search: "การสถาปนาอาณาจักรอยุธยา ม.2"
  },
  {
    key: "lesson3",
    title: "พระเจ้าอู่ทอง เป็นใครมาจากไหน?",
    note: "แนวคิดเรื่องที่มาของปฐมกษัตริย์แห่งอยุธยา",
    youtube: "https://www.youtube.com/watch?v=dCQR6MAVET8",
    source: "พระเจ้าอู่ทอง เป็นใครมาจากไหน ? : เก็บตกประวัติศาสตร์",
    channel: "รายการเก็บตกประวัติศาสตร์",
    channelUrl: "",
    search: "พระเจ้าอู่ทอง มาจากไหน"
  },
  {
    key: "lesson4",
    title: "ปัจจัยความมั่นคงและความเจริญรุ่งเรืองของอยุธยา",
    note: "ภูมิศาสตร์ การเมือง เศรษฐกิจ",
    youtube: "https://www.youtube.com/watch?v=PNxc4i1tGzE",
    source: "ตอนที่ 2 ปัจจัยความมั่นคงและความเจริญรุ่งเรืองของอยุธยา",
    channel: "",
    channelUrl: "",
    search: "ปัจจัยความมั่นคงและความเจริญรุ่งเรืองของอยุธยา"
  },
  {
    key: "lesson5",
    title: "5 ราชวงศ์ 33 พระมหากษัตริย์แห่งอยุธยา",
    note: "ประวัติพระมหากษัตริย์สมัยอยุธยา ช่วงก่อนเสียกรุงครั้งแรก",
    youtube: "https://www.youtube.com/watch?v=aUXtmNPOg-Y",
    source: "อาณาจักรอยุธยา[ตอนที่1] ประวัติกษัตริย์ 5ราชวงศ์ 33พระองค์ 34รัชกาล [ช่วงก่อนการเสียกรุงครั้งแรก]",
    channel: "",
    channelUrl: "",
    search: "5 ราชวงศ์ อยุธยา 33 พระองค์"
  }
];

/* คลิปแนะนำเพิ่มเติม (แสดงในหน้าสื่อวิดีโอ) */
const EXTRA_VIDEOS = [
  {
    key: "extra1",
    title: "อาณาจักรอยุธยา สรุปสั้น ๆ เข้าใจง่าย",
    note: "ทบทวนก่อนสอบ",
    youtube: "https://www.youtube.com/watch?v=o8uZHBw5GcI",
    source: "อาณาจักรอยุธยา สรุปสั้นๆเข้าใจง่าย l (ประวัติศาสตร์ม.2): By TeacherKingkaew",
    channel: "TeacherKingkaew",
    channelUrl: ""
  },
  {
    key: "extra2",
    title: "แรกสถาปนาอยุธยาราชธานี",
    note: "เล่าเรื่องแบบสารคดี",
    youtube: "https://www.youtube.com/watch?v=CQe9mllTJoc",
    source: "ตอนที่ 7 แรกสถาปนาอยุธยาราชธานี - เดอะไดอารี่ บันทึกประวัติศาสตร์ชาติไทย",
    channel: "เดอะไดอารี่ บันทึกประวัติศาสตร์ชาติไทย",
    channelUrl: ""
  },
  {
    key: "extra3",
    title: "พัฒนาการของอาณาจักรอยุธยา ตอน การสถาปนาอาณาจักร",
    note: "ประวัติศาสตร์ ม.2 EP1",
    youtube: "https://www.youtube.com/watch?v=ALk4laEJOvU",
    source: "EP1 ประวัติศาสตร์ ม.2 พัฒนาการของอาณาจักรอยุธยา ตอน การสถาปนาอาณาจักร",
    channel: "",
    channelUrl: ""
  }
];

/* ---------- ส่วนแสดงผล (ไม่ต้องแก้) ---------- */

function youtubeId(text) {
  if (!text) return "";
  const m = text.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(text.trim()) ? text.trim() : "";
}

/* เล่นในหน้าได้เมื่อเปิดผ่านเว็บไซต์จริง (เช่น Netlify) */
const CAN_EMBED = /^https?:$/.test(location.protocol) && !/claude/i.test(location.hostname);

const PLAY_ICON = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="rgba(29,18,16,.55)" stroke="#f3d27a" stroke-width="2.5"/><path d="M26 20 L46 32 L26 44 Z" fill="#f3d27a"/></svg>`;
const watched = new Set((() => { try { return JSON.parse(localStorage.getItem("ayt-watched") || "[]"); } catch (e) { return []; } })());
function markWatched(id) {
  watched.add(id);
  try { localStorage.setItem("ayt-watched", JSON.stringify([...watched])); } catch (e) {}
}

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
      </div>`;
    return;
  }
  const watch = `https://www.youtube.com/watch?v=${id}`;
  const credit = creditHtml(v, watch);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const poster = `
    <img class="video-thumb" src="${thumb}" alt="" loading="lazy" onerror="this.remove()">
    <span class="video-shade"></span>
    <span class="video-label">วิดีโอประกอบบทเรียน${watched.has(id) ? ' · <span class="video-seen">ดูแล้ว ✓</span>' : ""}</span>
    <span class="video-play">${PLAY_ICON}</span>
    <b>${v.title}</b>
    <small>${CAN_EMBED ? "กดเพื่อเล่นคลิป" : "กดเพื่อเปิดดูบน YouTube ↗"}</small>`;
  if (CAN_EMBED) {
    slot.innerHTML = `<button class="video-poster has-thumb" type="button" aria-label="เล่นคลิป ${v.title}">${poster}</button>${credit}`;
    slot.querySelector("button").addEventListener("click", () => {
      markWatched(id);
      slot.innerHTML = `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
        title="${v.title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>${credit}`;
    });
  } else {
    slot.innerHTML = `<a class="video-poster has-thumb" href="${watch}" target="_blank" rel="noopener">${poster}</a>${credit}`;
    slot.querySelector("a").addEventListener("click", () => markWatched(id));
  }
}

function whoHtml(v) {
  if (!v.channel) return "เจ้าของช่องบน YouTube";
  return v.channelUrl ? `<a href="${v.channelUrl}" target="_blank" rel="noopener">${v.channel}</a>` : v.channel;
}

/* บรรทัดเครดิตใต้คลิป */
function creditHtml(v, watch) {
  return `<p class="video-credit"><span class="thanks-mark" aria-hidden="true"></span>
    ขอขอบคุณ ${whoHtml(v)} เจ้าของคลิป “${v.source || v.title}” ·
    <a href="${watch}" target="_blank" rel="noopener">ดูต้นฉบับบน YouTube ↗</a></p>`;
}

/* รายการเครดิตทั้งหมด (หน้า media.html) */
function renderCredits(el) {
  const all = [...VIDEOS, ...EXTRA_VIDEOS].map(v => ({ v, id: youtubeId(v.youtube) })).filter(x => x.id);
  el.innerHTML = `
    <div class="thanks-card">
      <p><b>ขอขอบพระคุณเจ้าของผลงานวิดีโอทุกท่าน</b> ที่สร้างสรรค์สื่อความรู้ด้านประวัติศาสตร์ไทยและเผยแพร่ให้ผู้เรียนได้ศึกษา
      สื่อการเรียนรู้นี้นำคลิปมาใช้เพื่อการศึกษาเท่านั้น โดยเล่นจากต้นฉบับบน YouTube ไม่ได้ดาวน์โหลด ตัดต่อ หรืออัปโหลดซ้ำ
      ลิขสิทธิ์เป็นของเจ้าของผลงาน หากเจ้าของผลงานไม่ประสงค์ให้ใช้ โปรดติดต่อผู้จัดทำเพื่อนำออก</p>
    </div>
    <div class="table-wrap"><table>
    <thead><tr><th>ใช้ใน</th><th>ชื่อคลิปต้นฉบับ</th><th>เจ้าของผลงาน</th><th>ลิงก์</th></tr></thead>
    <tbody>${all.map(({ v, id }) => `<tr>
      <td>${chapterLabel(v.key)}</td><td>${v.source || v.title}</td>
      <td>${v.channel ? whoHtml(v) : "เจ้าของช่องบน YouTube"}</td>
      <td><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">youtu.be/${id}</a></td></tr>`).join("")}
    </tbody></table></div>`;
}

function chapterLabel(key) {
  return key.startsWith("lesson") ? "บทที่ " + key.replace("lesson", "") : "คลิปแนะนำ";
}

(function () {
  document.querySelectorAll("[data-video]").forEach(slot => {
    const v = VIDEOS.find(x => x.key === slot.dataset.video);
    if (v) renderVideo(slot, v);
  });
  document.querySelectorAll("[data-video-list]").forEach(list => {
    const items = [...VIDEOS, ...EXTRA_VIDEOS];
    list.innerHTML = items.map(v => `
      <figure class="video-item">
        <div data-key="${v.key}"></div>
        <figcaption><span class="video-label">${chapterLabel(v.key)}</span>${v.title}</figcaption>
      </figure>`).join("");
    list.querySelectorAll("[data-key]").forEach(slot =>
      renderVideo(slot, items.find(x => x.key === slot.dataset.key)));
  });
  document.querySelectorAll("[data-video-credits]").forEach(renderCredits);
})();
