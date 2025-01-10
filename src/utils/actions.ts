"use server";
// import { signIn } from "@/auth";
//
// export async function authenticate(username: string, password: string) {
//     try {
//         const r = await signIn("credentials", {
//             username: username,
//             password: password,
//             redirect: false,
//         });
//
//         return r;
//     } catch (error) {
//         if ((error as any).name === "InvalidEmailPasswordError") {
//             return { error: error.type as any, code: 1 };
//         } else if ((error as any).name === "InActiveAccountError") {
//             return { error: error.type as any, code: 2 };
//         } else {
//             return {
//                 error: "Internal Server Error",
//                 code: 3,
//             };
//         }
//     }
// }

import {sendRequest} from "@/utils/api";

export async function ProductDetailsById(productId: string) {
    const temp = productId.replace(".html", "");

    const parts = temp.split("-");

    const id = parts.at(-1);

    const res = await sendRequest({
        url: `http://localhost:8083/api/v1/products/${id}`,
        method: "GET",
    })

    return res;
}
