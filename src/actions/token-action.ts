"use server"

import { getCookieServer, setCookieServer, removeCookieServer } from "./cookie-action";


const TOKEN_KEY = "access_token";

export async function getServerToken(): Promise<string | undefined> {
  return await getCookieServer(TOKEN_KEY);
}

export async function setServerToken(token: string): Promise<void> {
  await setCookieServer(TOKEN_KEY, token);
}

export async function removeServerToken(): Promise<void> {
  await removeCookieServer(TOKEN_KEY);
}
