import NextAuth from "next-auth"
import {sendRequest} from "@/utils/api";
import Credentials from "@auth/core/providers/credentials";
import {IUser} from "@/types/next-auth";
import {InvalidEmailPasswordError} from "@/utils/errors";

export const {handlers, signIn, signOut, auth} = NextAuth({
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
    ],
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.user = user as IUser;
            }
            return token;
        },

        session({session, token}) {
            (session.user as IUser) = token.user;

            return session;
        },
        authorized: async ({auth}) => {
            return !!auth;
        },
    },
    pages: {
        signIn: "/auth/login",
        // error: "/auth/error",
    },
})