สื่อการเรียนรู้ เรื่อง การสถาปนาอาณาจักรอยุธยา (ม.2) + บล็อกพร้อมหลังบ้าน
สอนโดย พระมหาเจตพล วระวิชา · โรงเรียนมังกรกมลาวาสวิทยาลัย
==========================================================================

หน้าบล็อก ........ blog.html (ดึงบทความจาก content/blog.json)
หน้าหลังบ้าน ..... /admin/   (เขียน แก้ ลบ บทความ และอัปโหลดรูป โดยไม่ต้องแก้โค้ด)

หลังบ้านต้องใช้ GitHub เก็บไฟล์เว็บ ตั้งค่าครั้งเดียว 4 ขั้น (ประมาณ 20 นาที)
--------------------------------------------------------------------------

ขั้นที่ 1  เอาไฟล์ขึ้น GitHub
  1. สมัคร https://github.com (ใช้อีเมลเดิมได้)
  2. กดปุ่ม + มุมขวาบน > New repository
     - Repository name: ayutthaya-lesson
     - เลือก Public แล้วกด Create repository
  3. กดลิงก์ "uploading an existing file"
  4. เปิดโฟลเดอร์ ayutthaya-lesson ในเครื่อง เลือกไฟล์และโฟลเดอร์ "ทั้งหมดข้างใน"
     (admin, content, css, images, js, ไฟล์ .html, .jpg, netlify.toml) ลากไปวาง
  5. รออัปโหลดเสร็จ แล้วกด Commit changes

ขั้นที่ 2  (ทำให้แล้ว) ไฟล์ admin/config.yml ตั้งเป็น buddhist365/ayutthaya-lesson

ขั้นที่ 3  ให้ Netlify ดึงเว็บจาก GitHub
  1. เข้า https://app.netlify.com > Add new project > Import an existing project
  2. เลือก GitHub > อนุญาตการเข้าถึง > เลือก ayutthaya-lesson
  3. ไม่ต้องแก้ค่าอะไร กด Deploy
  4. ตั้งชื่อลิงก์: Project configuration > General > Change project name
     (ต่อไปเมื่อมีการแก้ไฟล์ใน GitHub เว็บจะอัปเดตเองภายใน 1–2 นาที)

ขั้นที่ 4  เปิดให้ล็อกอินหลังบ้านด้วย GitHub
  ก. สร้าง OAuth App ใน GitHub
     1. GitHub > รูปโปรไฟล์ > Settings > Developer settings > OAuth Apps > New OAuth App
     2. กรอก
        Application name ............ Ayutthaya CMS
        Homepage URL ................ https://ชื่อเว็บของคุณ.netlify.app
        Authorization callback URL .. https://api.netlify.com/auth/done
     3. กด Register application
     4. คัดลอก Client ID เก็บไว้
     5. กด Generate a new client secret แล้วคัดลอกรหัสเก็บไว้ (จะเห็นครั้งเดียว)
  ข. ใส่รหัสใน Netlify
     1. Netlify > เลือกโปรเจกต์ > Project configuration > Access & security > OAuth
     2. ในหัวข้อ Authentication providers กด Install provider > เลือก GitHub
     3. วาง Client ID และ Client secret แล้วกด Install

วิธีเขียนบทความ
--------------------------------------------------------------------------
  1. เปิด https://ชื่อเว็บของคุณ.netlify.app/admin/
  2. กด Login with GitHub
  3. เลือก บล็อก > บทความทั้งหมด > กด "เพิ่ม บทความ"
  4. ใส่หัวข้อ ชื่อลิงก์ (อังกฤษ เช่น week-1) วันที่ หมวด ภาพปก คำโปรย และเนื้อหา
  5. กด Publish (เผยแพร่) รอ 1–2 นาที บทความจะขึ้นที่หน้า บล็อก
  - ติ๊ก "ฉบับร่าง" ไว้ถ้ายังไม่อยากให้แสดง
  - ลากเรียงลำดับ หรือกดถังขยะเพื่อลบบทความได้

จะแก้ส่วนอื่น แก้ที่ไฟล์ไหน (แก้ใน GitHub ด้วยไอคอนดินสอ แล้ว Commit)
--------------------------------------------------------------------------
  เพิ่ม/ลบ/สลับหน้า, ส่วนท้าย, ชื่อผู้สอน ......... js/main.js
  ข้อสอบ และลิงก์ Google Form ส่งคะแนน ............ js/quiz.js (QUIZ และ GFORM)
  ลิงก์คลิป YouTube และเครดิต ...................... js/media.js
  สีทั้งเว็บ ......................................... css/style.css (บล็อก "ธีมสว่าง")
  ภาพยินดีต้อนรับ ................................... welcome.jpg, welcome-sm.jpg
  เนื้อหาแต่ละบท ...................................... lesson1.html – lesson5.html
  ตัวเลือกหมวดบทความ ................................. admin/config.yml (บรรทัด category)
