"use server";

import { cookies } from "next/headers";

const COOKIE_KEY = "unique_code";
const CODE_LENGTH = 10;

function createRandomCode(length = CODE_LENGTH) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function generateCodeWA() {
  // MUST await cookies()
  const cookieStore = await cookies();

  const existing = cookieStore.get(COOKIE_KEY)?.value;
  if (existing) return existing;

  const newCode = createRandomCode();

  cookieStore.set(COOKIE_KEY, newCode, {
    httpOnly: true,
    path: "/",
  });

  return newCode;
}
