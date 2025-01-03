import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Check if we're in production or development
  const isProduction = process.env.NODE_ENV === "production";
  const vercel = process.env.VERCEL_DEV === "true";
  const pathname = request.nextUrl.pathname;

  // Extract the subdomain
  let subdomain;
  const splitHost = hostname.split(".");

  if (vercel && splitHost.length === 4) {
    subdomain = splitHost[0];
  }

  if (
    (!isProduction && splitHost.length === 2) ||
    (isProduction && splitHost.length === 4)
  ) {
    subdomain = splitHost[0];
  }

  // Check if the request is for a static asset
  const isStaticAsset =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js");

  // If it's a static asset, don't rewrite
  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Handle subdomains
  if (subdomain === "admin") {
    // Rewrite admin subdomain requests to /admin path
    return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
  }

  if (pathname.split("/")[1] === "api") {
    return NextResponse.next();
  }

  if (pathname.split("/")[1] !== "") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For requests to the base domain, continue normally
  return NextResponse.next();
}

// This configuration applies the middleware to all routes
export const config = {
  matcher: "/:path*",
};
