"use server";

import { UserData } from "../../types/user-types";
import { safeJsonParse } from "../../utils/safeJsonParse";
import { getCookieServer } from "./cookie-action";

export const checkLogin = async () => {
  const userInfoRaw = await getCookieServer("user_info");
  const userInfo = safeJsonParse<UserData>(userInfoRaw);

  return !!userInfo;
}

export const checkLoginAndVerified = async () => {
  const userInfoRaw = await getCookieServer("user_info");
  const userInfo = safeJsonParse<UserData>(userInfoRaw);

  return !!userInfo && userInfo.IsVerified;
}
