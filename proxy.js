import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("token") !== undefined) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: '/((?!api/auth|admin|static|login|_next|favicon.ico|sitemap.xml|robots.txt).*)',
};
