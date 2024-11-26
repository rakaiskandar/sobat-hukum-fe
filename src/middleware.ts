// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Handle no-user and not-private route
  if(!token && (pathname === "/" || pathname === "/login")) return NextResponse.next()
  
  // Handle user and not-private route
  if(token && (pathname === "/" || pathname === "/login")) return NextResponse.redirect(new URL("/dashboard", request.url))

  if(pathname === "/dashboard"){
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    const url = new URL(`/dashboard/${token.role}/home`, request.url)
    return NextResponse.redirect(url)
  }
  return NextResponse.next();
}