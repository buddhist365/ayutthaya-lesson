/* =========================================================
   บล็อก: อ่านบทความจาก content/blog.json
   ครูเขียน/แก้บทความได้ที่หน้าหลังบ้าน /admin/ (ไม่ต้องแก้ไฟล์นี้)
   ========================================================= */
(function () {
  const listEl = document.getElementById("blog-list");
  const postEl = document.getElementById("blog-post");
  const filterEl = document.getElementById("blog-filter");
  let posts = [];
  let category = "ทั้งหมด";

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  function thaiDate(iso) {
    const d = new Date(String(iso).slice(0, 10) + "T00:00:00");
    if (isNaN(d)) return "";
    return thaiNum(`${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`);
  }
  function md(text) {
    const html = window.marked ? marked.parse(text || "") : esc(text).replace(/\n/g, "<br>");
    return window.DOMPurify ? DOMPurify.sanitize(html) : html;
  }
  const imgSrc = p => (p.cover ? esc(p.cover) : "");

  function renderFilter() {
    const cats = ["ทั้งหมด", ...new Set(posts.map(p => p.category).filter(Boolean))];
    if (cats.length < 3) { filterEl.hidden = true; return; }
    filterEl.innerHTML = cats.map(c =>
      `<button type="button" role="tab" aria-selected="${c === category}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  }

  function renderList() {
    postEl.hidden = true; listEl.hidden = false; filterEl.hidden = false;
    renderFilter();
    const shown = posts.filter(p => category === "ทั้งหมด" || p.category === category);
    if (!shown.length) {
      listEl.innerHTML = `<p class="blog-empty">ยังไม่มีบทความ ครูเพิ่มบทความแรกได้ที่หน้าหลังบ้าน <code>/admin/</code></p>`;
      return;
    }
    listEl.innerHTML = shown.map((p, i) => `
      <a class="blog-card${i === 0 && category === "ทั้งหมด" ? " featured" : ""}" href="#${esc(p.slug)}">
        ${p.cover ? `<img src="${imgSrc(p)}" alt="" loading="lazy">` : `<span class="blog-noimg" aria-hidden="true"></span>`}
        <span class="blog-card-body">
          <span class="blog-meta">${p.category ? `<span class="blog-cat">${esc(p.category)}</span>` : ""}<time>${thaiDate(p.date)}</time></span>
          <b>${esc(p.title)}</b>
          <small>${esc(p.summary)}</small>
          <span class="blog-more">อ่านต่อ →</span>
        </span>
      </a>`).join("");
  }

  function renderPost(p) {
    listEl.hidden = true; filterEl.hidden = true; postEl.hidden = false;
    document.title = p.title + " · บล็อกประวัติศาสตร์";
    postEl.innerHTML = `
      <a class="blog-back" href="#">← บทความทั้งหมด</a>
      <span class="blog-meta">${p.category ? `<span class="blog-cat">${esc(p.category)}</span>` : ""}<time>${thaiDate(p.date)}</time></span>
      <h2 class="blog-title">${esc(p.title)}</h2>
      ${p.cover ? `<img class="blog-cover" src="${imgSrc(p)}" alt="">` : ""}
      <div class="blog-body">${md(p.body)}</div>
      <a class="btn ghost" href="#">← กลับไปหน้ารวมบทความ</a>`;
    window.scrollTo({ top: 0 });
  }

  function route() {
    const slug = decodeURIComponent(location.hash.slice(1));
    const p = slug && posts.find(x => x.slug === slug);
    if (p) renderPost(p); else { document.title = "บล็อกประวัติศาสตร์"; renderList(); }
  }

  filterEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-cat]");
    if (!b) return;
    category = b.dataset.cat;
    renderList();
  });
  window.addEventListener("hashchange", route);

  fetch("content/blog.json", { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      posts = (data.posts || [])
        .filter(p => !p.draft && p.title)
        .sort((a, b) => String(b.date).localeCompare(String(a.date)));
      route();
    })
    .catch(() => {
      listEl.innerHTML = `<p class="blog-empty">โหลดบทความไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง (ถ้าเปิดไฟล์จากเครื่องโดยตรง บทความจะไม่แสดง ต้องเปิดผ่านเว็บไซต์)</p>`;
    });
})();
