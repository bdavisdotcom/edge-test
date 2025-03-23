import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/lib/session";

export default async function middleware(req: NextRequest) {
    const isAPIRoute = req.nextUrl.pathname.startsWith("/api");

    if (!isAPIRoute) {
        return NextResponse.next();
    }

    console.log("Middleware call...");
    console.log(req.nextUrl.href);

    const token = getToken(req.cookies.toString());
    const requestHeaders = new Headers(req.headers);
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    const path = req.nextUrl.href.split("/api").pop();

    
    req.nextUrl.href = `${process.env.API_URL}${path}`;

    console.log(req.nextUrl.href);

    return NextResponse.rewrite(req.nextUrl, {
      request: {
        headers: requestHeaders,
      },
    });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
