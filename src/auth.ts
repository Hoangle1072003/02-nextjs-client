import NextAuth from "next-auth";
import { sendRequest } from "@/utils/api";
import Credentials from "@auth/core/providers/credentials";
import { IUser } from "@/types/next-auth";
import Google from "next-auth/providers/google";
import {
  AccountDeletedError,
  AccountNotSuspensionError,
  InActiveAccountError,
  InvalidEmailPasswordError,
} from "@/utils/errors";
let refreshPromise: Promise<any> | null = null;

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: "mevlXBLRnm76NA+b/+PCwgCz98+JG3THScc8AHQ4DWk=",
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
          useCredentials: true,
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
        } else if (+res.statusCode === 410) {
          throw new AccountDeletedError(res.message);
        } else if (+res.statusCode === 423) {
          throw new AccountNotSuspensionError(res.message);
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
            refresh_token: res.data?.refresh_token,
            expires_at: res.data?.expires_at,
            provider: res.data?.user.provider,
          };
        }
        return user;
      },
    }),
    Google,
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user as IUser;
      }

      const currentTime = Date.now() / 1000;
      const tokenExpiration = token?.user?.expires_at || 0;

      if (tokenExpiration > currentTime) {
        console.log("Token is still valid, no need to refresh");

        return token;
      }

      if (token?.user?.refresh_token) {
        if (!refreshPromise) {
          refreshPromise = (async () => {
            try {
              console.log("Refreshing token...");
              const res = await sendRequest({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_API_URL}identity-service/api/v1/auth/refresh`,
                body: {
                  refresh_token: token?.user?.refresh_token,
                },
              });

              if (
                res?.data?.access_token &&
                res?.data?.refresh_token &&
                res?.data?.expires_at
              ) {
                return {
                  ...token.user,
                  access_token: res.data.access_token,
                  refresh_token: res.data.refresh_token,
                  expires_at: res.data.expires_at,
                };
              } else {
                console.error("Refresh token failed: Invalid response data");
                return { ...token.user, expires_at: 0 };
              }
            } catch (error) {
              console.error("Failed to refresh token:", error);
              return { ...token.user, expires_at: 0 };
            } finally {
              refreshPromise = null;
            }
          })();
        }

        token.user = await refreshPromise;
      }

      if (account && account?.provider === "google") {
        console.log("Creating new user with google account...");

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
          provider: "GOOGLE",
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

    // session({ session, token }) {
    //   (session.user as IUser) = token.user;
    //   return session;
    // },
    session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.user.access_token;
      session.expiresAt = token.user.expires_at;
      session.refreshToken = token.user.refresh_token;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/guest/auth/login",
  },
});
