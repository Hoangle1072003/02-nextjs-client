import { NextResponse } from "next/server";

export { auth as middleware } from "@/auth";
export const config = {
  //   matcher: [
  //     "/((?!auth).*)(.+)|/verify",
  //     "/((?!api|_next/static|_next/image|favicon.ico|/|/auth).*)",
  //     "/((?!api|_next/static|_next/image|favicon.ico|auth|verify|$).*)",
  //     "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  //   ],
  matcher: [
    "/((?!auth|verify|api|_next/static|_next/image|favicon.ico|$||product(?:/.*)?).*)",
  ],
};
export default function middleware(request) {
  // Logic của middleware ở đây
  return NextResponse.next();
}
