"use server";
import { signIn } from "@/auth";
import { sendRequest } from "@/utils/api";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (r?.error) {
      console.error("Login Error:", r);
    }

    return r;
  } catch (error) {
    console.error("Catch Error:", error);

    if (error?.message?.includes("User is not activated")) {
      return { error: "Tài khoản chưa được kích hoạt", code: 2 };
    }

    if (error?.message?.includes("Bad credentials")) {
      return { error: "Email or mật khẩu không đúng", code: 1 };
    }

    return {
      error: "Internal Server Error",
      code: 3,
    };
  }
}

export async function ProductDetailsById(productId: string) {
  const temp = productId.replace(".html", "");

  const parts = temp.split("-");

  const id = parts.at(-1);

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/products/${id}`,
    method: "GET",
  });

  return res;
}

// category list
export async function CategoryList() {
  const res = await sendRequest<IBackendRes<ICategory[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}product-service/api/v1/category`,
    method: "GET",
  });

  return res;
}
