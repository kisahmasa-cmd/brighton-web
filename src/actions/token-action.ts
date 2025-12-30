"use server";

import { AuthTokenData } from "../../types/token-types";
import { safeJsonParse } from "../../utils/safeJsonParse";
import { getCookieServer, setCookieServer, removeCookieServer } from "./cookie-action";

const TOKEN_KEY = "auth_token";

export async function getServerToken() {
  const authTokenRaw = await getCookieServer(TOKEN_KEY);
  const authToken = safeJsonParse<AuthTokenData>(authTokenRaw);
  return authToken;
}

export async function setServerToken(token: AuthTokenData) {
  await setCookieServer(TOKEN_KEY, JSON.stringify(token));
}

export async function removeServerToken() {
  await removeCookieServer(TOKEN_KEY);
}
