"use server";

import { UserData } from "../../types/user-types";
import { safeJsonParse } from "../../utils/safeJsonParse";
import {
  getCookieServer,
  removeCookieServer,
  setCookieServer,
} from "./cookie-action";
import { removeServerToken } from "./token-action";

const USER_INFO_KEY = "user_info";

export async function manageUserInfoCookie(user: UserData | null) {
  if (!user) {
    await removeCookieServer(USER_INFO_KEY);
    await removeServerToken();
    return;
  }

  await setCookieServer(USER_INFO_KEY, JSON.stringify(user));
}

export async function getUserInfo() {
  const userRaw = await getCookieServer(USER_INFO_KEY);
  const user = safeJsonParse<UserData>(userRaw);

  return user;
}

export async function removeUserInfoCookie() {
  await removeCookieServer(USER_INFO_KEY);
}
