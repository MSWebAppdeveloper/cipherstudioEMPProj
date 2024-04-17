import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  //   // Get user role from request headers

  const token: any = await getToken({
    req: request,
    secret: process.env.SECRET,
  });
  const userRole = token?.userRole;

  //   // Define routes that require admin access
  const adminRoutes = ["/admin/dashboard", "/admin/users", "/admin/reports"];
  //   // Define routes that require employee access
  const employeeRoutes = ["/employee/dashboard"];
  //   // Redirect to login if not authenticated
  if (
    !userRole &&
    (pathname.startsWith("/admin/") || pathname.startsWith("/employee/"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userRole !== "Management" && adminRoutes.includes(pathname))  {
    return NextResponse.redirect(new URL("/employee/dashboard", request.url));
  } else if (userRole !== "Employee" && employeeRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/admin/reports", request.url));
  }

  return NextResponse.next();
}

// Mock function to get user role from request headers
// function getUserRole(request: NextRequest): string | null {
//   const userRole: any = request.cookies.get("userRole");
//   return userRole || null;
// }
