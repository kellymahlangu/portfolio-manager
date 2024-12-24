import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Check if we're in production or development
  const isProduction = process.env.NODE_ENV === "production";
  const vercel = process.env.VERCEL_DEV === "true";
  //   const baseDomain = isProduction ? process.env.BASE_DOMAIN : "localhost:3000";

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
    subdomain = splitHost[1];
    console.log(subdomain);
  }

  // Check if the request is for a static asset
  const isStaticAsset =
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/static/") ||
    request.nextUrl.pathname.endsWith(".css") ||
    request.nextUrl.pathname.endsWith(".js");

  // If it's a static asset, don't rewrite
  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Handle subdomains
  if (subdomain === "admin") {
    // Rewrite admin subdomain requests to /admin path
    return NextResponse.rewrite(
      new URL(`/admin${request.nextUrl.pathname}`, request.url)
    );
  } else if (subdomain) {
    return NextResponse.error();
  }

  // For requests to the base domain, continue normally
  return NextResponse.next();
}

// This configuration applies the middleware to all routes
export const config = {
  matcher: "/:path*",
};
