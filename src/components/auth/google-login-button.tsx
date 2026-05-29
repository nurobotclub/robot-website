"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface GoogleLoginButtonProps {
  callbackUrl?: string;
  className?: string;
}

/**
 * Premium, production-ready Google login button for the NU Robot Club Equipment Borrowing System.
 * Focuses on rich aesthetics, smooth animations, and active state loading feed.
 */
export default function GoogleLoginButton({
  callbackUrl = "/",
  className = "",
}: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // Mark that a login is in progress so SessionGuard doesn't
      // mistake this for a "returning after tab close" scenario
      sessionStorage.setItem("nu-robot-login-initiated", "true");
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      sessionStorage.removeItem("nu-robot-login-initiated");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className={`w-full inline-flex items-center justify-center gap-3.5 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-base font-bold text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none disabled:bg-gray-50 cursor-pointer ${className}`}
    >
      {isLoading ? (
        // Loading Spinner
        <svg
          className="animate-spin h-5 w-5 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        // Google Colored G Icon
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
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
      )}
      <span>
        {isLoading ? "กำลังลงชื่อเข้าใช้งาน..." : "ลงชื่อเข้าใช้งานด้วย Google Account"}
      </span>
    </button>
  );
}
