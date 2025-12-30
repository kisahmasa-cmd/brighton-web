import { getServerToken } from "@/actions/token-action";
import { UserData } from "../../../types/user-types";
import { ApiResponse } from "../../../utils/apiResponse";
import { apiFetch } from "../api";

export type TokenVerifyResponse = ApiResponse<UserData>;

export const tokenVerify = async (): Promise<UserData | null> => {
  const token = await getServerToken();
  if (!token) {
    return null;
  }

  try {
    const res = await apiFetch<TokenVerifyResponse>("/auth/tokenverify", {
      method: "GET",
      withBearerToken: true,
      withClientId: false,
    });

    return res.Data;
  } catch (error) {
    console.error(`Error verifying token: ${error}`);
    return null;
  }
}
