"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/providers/CartProvider";

export default function NavbarAuth() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  if (status === "loading") {
    return (
      <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-xl bg-gray-900 hover:bg-orange-500 px-6 py-2.5 text-base font-bold text-white shadow-md shadow-gray-900/10 transition-all duration-300 hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
      >
        เข้าสู่ระบบ
      </Link>
    );
  }

  const { name, email, image, role } = session.user;
  const isAdmin = role === "admin";

  return (
    <div className="flex items-center gap-4 relative z-50">
      {/* Premium Cart Button */}
      <Link
        href="/cart"
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200/80 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer active:scale-95 group"
        title="ตะกร้ายืมอุปกรณ์"
      >
        <span className="text-xl leading-none">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white shadow-md shadow-orange-500/30 animate-pulse">
            {cartCount}
          </span>
        )}
      </Link>

      {/* User Trigger */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="flex items-center gap-2.5 rounded-xl border border-gray-200/80 bg-white p-1.5 pr-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer active:scale-98"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-orange-100 border border-orange-200">
            {image ? (
              <Image
                src={image}
                alt={name || "User Profile"}
                fill
                className="object-cover"
                sizes="32px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-bold text-orange-500 uppercase">
                {name ? name.charAt(0) : "U"}
              </div>
            )}
          </div>
          <div className="hidden flex-col items-start text-left sm:flex">
            <span className="text-sm font-bold text-gray-800 line-clamp-1 max-w-[120px]">
              {name || "สมาชิก"}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">
              {isAdmin ? "ผู้ดูแลระบบ" : "สมาชิกชมรม"}
            </span>
          </div>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Premium Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2.5 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header Info */}
            <div className="px-3.5 py-3 border-b border-gray-50 flex flex-col">
              <span className="text-sm font-bold text-gray-800 truncate">
                {name}
              </span>
              <span className="text-xs text-gray-400 truncate">
                {email}
              </span>
            </div>

            {/* Links */}
            <div className="mt-1.5 flex flex-col gap-0.5">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  แผงผู้ดูแลระบบ
                </Link>
              )}

              <Link
                href="/equipment"
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                ยืมอุปกรณ์อิเล็กทรอนิกส์
              </Link>

              <Link
                href="/borrow/history"
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ประวัติการยืม-คืน
              </Link>
            </div>

            {/* Action Sign Out */}
            <div className="mt-1.5 border-t border-gray-50 pt-1.5">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                ออกจากระบบ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
