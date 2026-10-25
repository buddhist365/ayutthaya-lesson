สื่อการเรียนรู้ เรื่อง การสถาปนาอาณาจักรอยุธยา (ม.2) + บล็อกพร้อมหลังบ้าน
สอนโดย พระมหาเจตพล วระวิชา · โรงเรียนมังกรกมลาวาสวิทยาลัย
==========================================================================
ทุกไฟล์อยู่ชั้นเดียว ไม่มีโฟลเดอร์ย่อย อัปขึ้น GitHub ได้ง่าย
  หน้าบล็อก ......... blog.html  (บทความเก็บใน blog.json)
  หน้าหลังบ้าน ...... /admin.html  (ล็อกอินด้วย GitHub)
  รูปที่อัปจากหลังบ้าน เก็บในโฟลเดอร์ uploads (สร้างให้อัตโนมัติ)

ขั้นที่ 3  ให้ Netlify ดึงเว็บจาก GitHub
  1. https://app.netlify.com > Add new project > Import an existing project
  2. เลือก GitHub > อนุญาต > เลือก ayutthaya-lesson > Deploy
  3. ตั้งชื่อลิงก์: Project configuration > General > Change project name

ขั้นที่ 4  เปิดให้ล็อกอินหลังบ้าน
  ก. GitHub > รูปโปรไฟล์ > Settings > Developer settings > OAuth Apps > New OAuth App
       Application name ............ Ayutthaya CMS
       Homepage URL ................ https://ชื่อเว็บ.netlify.app
       Authorization callback URL .. https://api.netlify.com/auth/done
     Register > คัดลอก Client ID > Generate a new client secret > คัดลอก
  ข. Netlify > โปรเจกต์ > Project configuration > Access & security > OAuth
     > Install provider > GitHub > วาง Client ID และ Secret > Install

เขียนบทความ: เปิด https://ชื่อเว็บ.netlify.app/admin.html > Login with GitHub
  > บล็อก > บทความทั้งหมด > เพิ่ม บทความ > กรอก > Publish (ขึ้นเว็บใน 1–2 นาที)

แก้ส่วนอื่น (แก้ใน GitHub ด้วยไอคอนดินสอ แล้ว Commit)
  เมนู/หน้า/ชื่อผู้สอน ... main.js      ข้อสอบ/Google Form ... quiz.js
  คลิป YouTube .......... media.js     สีทั้งเว็บ ............ style.css
  หมวดบทความ ............ config.yml   ภาพหน้าแรก ........... welcome.jpg
