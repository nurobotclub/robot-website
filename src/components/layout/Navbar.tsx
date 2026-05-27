// src/components/layout/Navbar.tsx

import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/90 py-10 px-6 md:px-8 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        {/* ก้อนที่ 1: โลโก้และชื่อเว็บ (ชิดซ้าย) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/Robot.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-xl shadow-sm transition duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p className="text-2xl font-black text-gray-900 leading-tight">
                NU <span className="text-orange-500">Robot</span> Club
              </p>
              <p className="text-lg font-semibold tracking-wider">
                Faculty of Engineering
              </p>
              <p className="text-lg font-semibold tracking-wider  ">
                Naresuan University
              </p>
            </div>
          </Link>
        </div>

        {/* ก้อนที่ 2: เมนูยืมอุปกรณ์ + ปุ่มเข้าสู่ระบบ (ชิดขวา) */}
        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-lg font-bold text-gray-600 transition-colors duration-200 hover:text-orange-500"
            >
              หน้าหลัก
            </Link>

            <Link
              href="/about"
              className="text-lg font-bold text-gray-600 transition-colors duration-200 hover:text-orange-500"
            >
              เกี่ยวกับ
            </Link>

            <Link
              href="/equipment"
              className="text-lg font-bold text-gray-600 transition-colors duration-200 hover:text-orange-500"
            >
              ยืมอุปกรณ์
            </Link>
          </nav>

          <Link
            href="/login"
            className="rounded-xl bg-gray-900 hover:bg-orange-500 px-6 py-2.5 text-base font-bold text-white shadow-md shadow-gray-900/10 transition-all duration-300 hover:shadow-orange-500/20 active:scale-95"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </header>
  )
}