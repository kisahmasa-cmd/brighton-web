"use server"

import { cookies } from "next/headers";

export async function getCookieServer(key: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

export async function setCookieServer(key: string, value: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function removeCookieServer(key: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}
