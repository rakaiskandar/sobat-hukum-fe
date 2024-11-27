import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request });

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register"];

  // Allow access to public routes regardless of authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect authenticated users trying to access the base dashboard path
  if (token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL(`/dashboard/${token.role}/home`, request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!token && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("unauthorized", "true"); // Add an unauthorized flag for the client
    return NextResponse.redirect(loginUrl);
  }

  // Ensure users only access their respective role-based dashboard
  if (pathname.startsWith("/dashboard")) {
    const [, , role] = pathname.split("/"); // Extract role from the URL
    if (role && role !== token?.role) {
      return NextResponse.redirect(new URL(`/dashboard/${token?.role}/home`, request.url));
    }
  }

  return NextResponse.next(); // Allow the request if it passes all checks
}
