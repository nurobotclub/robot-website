"use client";

import { SessionProvider } from "next-auth/react";
import SessionGuard from "@/components/auth/SessionGuard";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app with NextAuth's SessionProvider so that
 * `useSession()` and `signIn()` / `signOut()` work client-side.
 * 
 * Also includes SessionGuard which automatically signs out the user
 * when they close the browser tab or browser window and reopen later.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <SessionGuard />
      {children}
    </SessionProvider>
  );
}

