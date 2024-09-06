import { JWT } from "@auth/core/jwt";
import { type DefaultSession } from "next-auth";

declare module "@auth/core" {
  interface Session {
    user: { id: string; email: string; userRole?: string } & DefaultSession["user"];
  }
  interface User {
    id: string;
    email: string;
    userRole?: string;
  }
  interface JWT {
    id: string;
    email: string;
    userRole?: string;
  }
}