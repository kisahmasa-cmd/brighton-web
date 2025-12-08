import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookieServer } from "./actions/cookie-action";
import { UserData } from "../types/user-types";
import { safeJsonParse } from "../utils/safeJsonParse";
import { tokenVerify } from "./services/token-service/token-verify-service";
import { manageUserInfoCookie } from "./actions/user-action";

export async function middleware(request: NextRequest) {
  // ================================
  // 🔥 Inject canonical URL into headers
  // ================================
  const url = request.nextUrl;
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");

  const canonical = `${forwardedProto}://${forwardedHost}${url.pathname}${url.search}`;

  // Copy request headers (important!!)
  const incomingHeaders = new Headers(request.headers);
  incomingHeaders.set("x-url", canonical);

  // Prepare response with modified request headers
  const response = NextResponse.next({
    request: {
      headers: incomingHeaders,
    },
  });

  const { pathname } = url;

  // Skip static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || pathname.includes(".")) {
    return response;
  }

  // Read cookie
  const userInfoRaw = await getCookieServer("user_info");
  const userInfo = safeJsonParse<UserData>(userInfoRaw);
  const isLoggedIn = !!userInfo;

  const isVisitorRoute = pathname.startsWith("/visitor");
  const isVisitorAuthPage = pathname === "/visitor/login" || pathname === "/visitor/register" || pathname.startsWith("/visitor/login/") || pathname.startsWith("/visitor/register/") || pathname.startsWith("/visitor/repairpassword");
  const isVisitorVerificationPage = pathname.startsWith("/visitor/verification-phone");

  const isAgentRoute = pathname.startsWith("/agent");
  const isAgentLoginPage = pathname === "/agent/login" || pathname.startsWith("/agent/login/");
  const isAgentDashboard = pathname === "/agent/dashboard" || pathname.startsWith("/agent/dashboard/");

  // ======================================================
  // 🔥 NEW RULE 1 — Agent login cannot open /visitor/*
  // ======================================================
  if (isVisitorRoute && isLoggedIn && userInfo?.UserType === "AGEN") {
    return NextResponse.redirect(new URL("/agent/dashboard", request.url));
  }

  // ======================================================
  // 🔥 NEW RULE 2 — Visitor login cannot open /agent/*
  // ======================================================
  if ((isAgentDashboard || isAgentLoginPage) && isLoggedIn && userInfo?.UserType === "MEMBER") {
    return NextResponse.redirect(new URL("/visitor", request.url));
  }

  // ======================================================
  // VISITOR LOGIC
  // ======================================================
  if (isVisitorRoute) {
    if (isVisitorAuthPage) {
      if (isLoggedIn && userInfo?.UserType === "MEMBER") {
        return NextResponse.redirect(new URL("/visitor", request.url));
      }
      return response;
    }

    const user = await tokenVerify();
    await manageUserInfoCookie(user);

    if (!user || user?.UserType !== "MEMBER") {
      return NextResponse.redirect(new URL("/visitor/login", request.url));
    }

    if (isVisitorVerificationPage && user.IsVerified) {
      return NextResponse.redirect(new URL("/visitor", request.url));
    }

    if (!isVisitorVerificationPage && !user.IsVerified) {
      return NextResponse.redirect(new URL("/visitor/verification-phone", request.url));
    }

    return response;
  }

  // ======================================================
  // AGENT LOGIC
  // ======================================================
  if (isAgentRoute) {
    if (isAgentLoginPage) {
      if (isLoggedIn && userInfo?.UserType === "AGEN") {
        return NextResponse.redirect(new URL("/agent/dashboard", request.url));
      }
      return response;
    }

    if (isAgentDashboard) {
      const verified = await tokenVerify();
      await manageUserInfoCookie(verified);

      if (!verified || verified?.UserType !== "AGEN") {
        return NextResponse.redirect(new URL("/agent/login", request.url));
      }
      return response;
    }

    return response;
  }

  return response;
}
