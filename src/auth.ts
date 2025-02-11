import NextAuth from "next-auth";
import { sendRequest } from "@/utils/api";
import Credentials from "@auth/core/providers/credentials";
import { IUser } from "@/types/next-auth";
import Google from "next-auth/providers/google";
import {
  InActiveAccountError,
  InvalidEmailPasswordError,
} from "@/utils/errors";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = (await sendRequest({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/login`,
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        })) as IBackendRes<ILogin>;
        if (+res.statusCode === 500) {
          throw new InvalidEmailPasswordError(res.message);
        } else if (+res.statusCode === 403) {
          throw new InActiveAccountError(res.message);
        } else if (+res.statusCode === 200) {
          return {
            id: res.data?.user.id,
            name: res.data?.user.username,
            email: res.data?.user.email,
            status: res.data?.user.status,
            access_token: res.data?.access_token,
            role_id: res.data?.user.role.id,
            role_name: res.data?.user.role.name,
            role_status: res.data?.user.role.status,
          };
        }
        return user;
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user as IUser;
        console.log("user", user);
        console.log("token", token);
        console.log("account", account);
      }

      if (account && account?.provider === "google") {
        // token.user = user as IUser;
        // token.user.access_token = account?.id_token;
        const res = await sendRequest({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/create-new-user-google`,
          body: {
            email: user.email,
            name: user.name,
            picture: user.image,
            sub: profile?.sub,
          },
        });

        token.user = {
          id: res?.data?.id,
          access_token: account?.id_token,
          email: res?.data?.email,
          image: user.image,
        };

        if (!res.ok) {
          console.error("Failed to create new user:", res);
        }
      }
      if (account && account?.provider === "github") {
        const res = await sendRequest({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/create-new-user-github`,
          body: {
            email: user?.email,
            name: user?.name,
            picture: user?.image,
            sub: account?.providerAccountId,
          },
        });
        console.log("resData", res);

        // token.user = {
        //   id: res?.data?.id,
        //   access_token: account?.access_token,
        //   email: res?.data?.email,
        //   image: user.image,
        // };
        token.user = {
          id: res?.data?.id,
          email: res?.data?.email,
          image: user?.image,
          access_token: account?.access_token,
        };

        if (!res.ok) {
          console.error("Failed to create new user:", res);
        }
      }

      if (
        token?.user?.status === "DEACTIVATED" ||
        token?.user?.status === "SUSPENDED" ||
        token?.user?.status === "PENDING_ACTIVATION"
      ) {
        await signOut();
      }
      return token;
    },

    session({ session, token }) {
      (session.user as IUser) = token.user;
      // (session.user as IUser).access_token = token.user.access_token;

      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/auth/login",
    // error: "/auth/error",
  },
});
