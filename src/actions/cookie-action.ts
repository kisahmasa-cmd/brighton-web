"use server";

import { cookies } from "next/headers";

export async function getCookieServer(
  key: string,
): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function setCookieServer(
  key: string,
  value: string,
): Promise<void> {
  const cookieStore = await cookies();

  // Domain yang aktif (berasal dari .env.development atau .env.production)
  const domainEnv = process.env.COOKIE_DOMAIN || "";

  // Domain app
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "";

  // Jika menjalankan localhost
  const isLocalhost =
    appDomain.includes("localhost") || appDomain.includes("127.0.0.1");

  // Pilih domain cookie
  const cookieDomain = isLocalhost ? "localhost" : domainEnv;

  // Atur secure & sameSite
  const secure = process.env.NODE_ENV === "production"

  cookieStore.set(key, value, {
    path: "/",
    httpOnly: true,
    secure,
    domain: cookieDomain,
  });
}

export async function removeCookieServer(key: string): Promise<void> {
  const cookieStore = await cookies();

    const domainEnv = process.env.COOKIE_DOMAIN!;
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "";

    // Deteksi localhost
    const isLocalhost =
      appDomain.includes("localhost") || appDomain.includes("127.0.0.1");

    const cookieDomain = isLocalhost ? "localhost" : domainEnv;

    cookieStore.delete({
      name: key,
      path: "/",
      domain: cookieDomain,     // wajib sama persis seperti waktu set
    });
}
