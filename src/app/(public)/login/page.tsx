"use client"

import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // ในอนาคตเมื่อติดตั้ง NextAuth.js เรียบร้อยแล้ว ให้เรียกใช้:
    // signIn("google", { callbackUrl: "/dashboard" })
    console.log("Trigger Google Login Flow")
    alert("ระบบกำลังดำเนินการเข้าสู่ระบบด้วย Google Naresuan Mail (อยู่ระหว่างพัฒนาระบบหลังบ้าน)")
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative layout ambient blur behind card */}
      <div className="absolute top-1/3 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/40 blur-3xl"></div>

      {/* Main Premium Login Card */}
      <div className="w-full max-w-md rounded-3xl border border-gray-200/60 bg-white p-8 md:p-10 shadow-xl shadow-gray-900/5 flex flex-col items-center">

        {/* Brand/Logo Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-2 shadow-sm border border-gray-100 mb-5">
            <Image
              src="/Robot.png"
              alt="NU Robot Club Logo"
              width={80}
              height={80}
              className="rounded-xl object-contain"
            />
          </div>
          <h2 className="text-3xl font-black text-gray-900 leading-tight">
            NU <span className="text-orange-500">Robot</span> Club
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Faculty of Engineering  <br /> Naresuan University
          </p>
        </div>

        {/* Welcome Text */}
        <div className="w-full mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-800">
            เข้าสู่ระบบ
          </h3>
          <p className="text-xs md:text-sm text-gray-400 font-semibold mt-2 leading-relaxed">
            ลงชื่อเข้าใช้งานด้วยบัญชี <span className="text-orange-500 font-bold">Google</span> เพื่อดำเนินการต่อระบบสมาชิก
          </p>
        </div>

        {/* Auth Buttons Container */}
        <div className="w-full mt-8 flex flex-col gap-4">

          {/* Premium Google Sign-In Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full inline-flex items-center justify-center gap-3.5 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-base font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] cursor-pointer"
          >
            {/* Google Colored G Icon */}
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.86 3C6.4 7.5 9 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.6-.2-2.37H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2 3.7-4.96 3.7-8.61z"
              />
              <path
                fill="#FBBC05"
                d="M5.36 14.5c-.25-.75-.4-1.55-.4-2.5s.15-1.75.4-2.5L1.5 6.5C.54 8.5 0 10.2 0 12s.54 3.5 1.5 5.5l3.86-3z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.1.74-2.5 1.18-4.23 1.18-3 0-5.6-2.46-6.64-5.46L1.5 15.92C3.4 19.75 7.35 23 12 23z"
              />
            </svg>
            <span>ลงชื่อเข้าใช้งานด้วย Google Account</span>
          </button>

          {/* Secure Hint */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-semibold mt-2">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>ระบบนี้ใช้สำหรับสมาชิกชมรมและผู้ที่ต้องการยืมอุปกรณ์เท่านั้น</span>
          </div>

        </div>

        {/* Footer Link / Navigation */}
        <div className="mt-8 border-t border-gray-100 pt-6 w-full text-center">
          <Link
            href="/"
            className="text-sm font-bold text-gray-400 transition hover:text-orange-500 flex items-center justify-center gap-1"
          >
            <span>&larr;</span> กลับสู่หน้าหลักเว็บบล็อก
          </Link>
        </div>

      </div>
    </div>
  )
}
