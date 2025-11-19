import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard") || 
                       nextUrl.pathname.startsWith("/billing") ||
                       nextUrl.pathname.startsWith("/content-generator") ||
                       nextUrl.pathname.startsWith("/thumbnail-generator") ||
                       nextUrl.pathname.startsWith("/thumbnail-search") ||
                       nextUrl.pathname.startsWith("/trending-keywords") ||
                       nextUrl.pathname.startsWith("/outlier-videos")

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

