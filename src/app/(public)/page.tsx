import Link from "next/link"

export default function HomePage() {
  // Mock data for Blog Posts & Club Announcements (Fully Tech & Community focused)
  const blogPosts = [
    {
      id: 1,
      title: "🚀 เริ่มต้นพัฒนา IoT ด้วย ESP32 และ MicroPython สำหรับผู้เริ่มต้น",
      date: "27 พฤษภาคม 2026",
      summary: "เรียนรู้วิธีการติดตั้งตัวแปลภาษา MicroPython ลงบนบอร์ดควบคุมสุดฮิตอย่าง ESP32 พร้อมเขียนโค้ดสั้นๆ ควบคุมไฟ LED และอ่านค่าโมดูลวัดอุณหภูมิความชื้นง่ายๆ ใน 5 นาที",
      category: "Embedded & IoT",
      author: "CPE Tech Team",
      readTime: "อ่าน 5 นาที",
    },
    {
      id: 2,
      title: "🎓 สรุปภาพรวมกิจกรรมอบรมสมองกลฝังตัว Embedded System 101 ประจำสัปดาห์",
      date: "15 พฤษภาคม 2026",
      summary: "เก็บตกบรรยากาศสุดอบอุ่นจากการอบรมพื้นฐานต่อวงจรและจับคู่คอมโพเนนต์อิเล็กทรอนิกส์ของนิสิตวิศวกรรมศาสตร์ชั้นปีที่ 1 ณ ห้องชมรมวิชาการชั้น 2",
      category: "กิจกรรมชมรม",
      author: "ประชาสัมพันธ์",
      readTime: "อ่าน 3 นาที",
    },
    {
      id: 3,
      title: "🛠 ส่องโปรเจกต์เด่น: ระบบเกษตรอัจฉริยะแบบประหยัดพลังงานด้วยเครือข่าย LoRaWAN",
      date: "10 พฤษภาคม 2026",
      summary: "เจาะลึกแนวคิดการเชื่อมต่อโหนดเซนเซอร์อัจฉริยะผ่านเทคโนโลยีสัญญาณวิทยุระยะไกล LoRaWAN ที่ถูกออกแบบและสร้างขึ้นจริงโดยฝีมือนิสิตในชมรมเพื่อแก้ปัญหาในท้องถิ่น",
      category: "Project Showcase",
      author: "NU Robot Dev",
      readTime: "อ่าน 7 นาที",
    },
  ]

  return (
    <div className="flex flex-col gap-24 pb-24">

      {/* 1. Hero Section (100% Focused on NU Robot Club Web Blog) */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8 text-center relative z-10 flex flex-col items-center">


          {/* Heading */}
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl max-w-5xl leading-tight">
            NU Robot Club <br className="hidden sm:inline" />
            <span className="text-orange-500">Web Blog</span> & News Update
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg md:text-xl font-medium text-gray-500 max-w-2xl leading-relaxed">
            บันทึกเรื่องราวการเรียนรู้ แชร์ไอเดียทำโปรเจกต์ และอัปเดตกิจกรรมสนุกๆ <br className="hidden sm:inline" />
            ของพวกเรานิสิตชมรมโรบอท คณะวิศวกรรมศาสตร์ มหาวิทยาลัยนเรศวร
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#blog-posts"
              className="w-full sm:w-auto rounded-2xl bg-gray-900 hover:bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-gray-900/10 hover:shadow-orange-500/20 transition-all duration-300 transform active:scale-98"
            >
              📰 อ่านบทความล่าสุด
            </a>

            <Link
              href="/about"
              className="w-full sm:w-auto rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 px-8 py-4 text-lg font-bold text-gray-700 shadow-sm transition-all duration-300 transform active:scale-98"
            >
              💡 ทำความรู้จักกับชมรม
            </Link>
          </div>
        </div>

        {/* Decorative subtle layout accent */}
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-100/30 blur-3xl"></div>
      </section>

      {/* 2. Blog Posts & Announcements Section */}
      <section id="blog-posts" className="mx-auto w-full max-w-7xl px-6 md:px-8 scroll-mt-24">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-6 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                📰 บทความ ข่าวสาร และกิจกรรมล่าสุด
              </h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                ร่วมศึกษาองค์ความรู้เทคโนโลยีทางวิศวกรรม ติดตามกิจกรรมอบรมความรู้ และโปรเจกต์นวัตกรรมจากชมรม
              </p>
            </div>
            <span className="text-xs text-gray-400 font-bold self-start sm:self-center bg-gray-100 px-3 py-1 rounded-full">
              อัปเดตล่าสุด: {blogPosts[0].date}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col justify-between p-8 rounded-2xl border border-gray-200 bg-white hover:border-orange-500/30 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-block text-xs font-bold bg-orange-50 border border-orange-200/50 text-orange-600 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-orange-500 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-4">
                    {post.summary}
                  </p>
                </div>

                <div className="border-t border-gray-50 pt-5 mt-8 flex items-center justify-between text-xs text-gray-400 font-semibold">
                  <div>✍️ โดย: <span className="text-gray-600">{post.author}</span></div>
                  <div>🗓 {post.date}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
