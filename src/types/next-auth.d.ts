import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { UserRole } from "@/lib/roles";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserRole;
  }
}
