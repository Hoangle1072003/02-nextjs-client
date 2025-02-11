import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  id: string;
  username: string;
  email: string;
  status: string;
  access_token: string;
  image?: string;
  role: IRole;
  sub?: string;
}

interface IRole {
  id: string;
  name: string;
  status: boolean;
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: IUser;
    access_expire: number;
    error: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser;
    access_token: string;
    refresh_token: string;
    access_expire: number;
    error: string;
  }
}
