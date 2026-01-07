import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";
import { ChangePassword, Profile, UserInfo } from "../../types/user-types";

export type UserInfoResponse = ApiResponse<UserInfo>;
export type EditResponse = ApiResponse<Profile>;

export const info = async () => {
  return await apiFetch<UserInfoResponse>("/users/info", {
    method: "GET",
    withClientId: false,
    withBearerToken: true
  });
};

export const edit = async (request: Profile) => {
  const formData = new FormData();

  Object.entries(request).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return await apiFetch<EditResponse>("/visitor/profileajax", {
    method: "POST",
    withClientId: false,
    formData: true,
    formDataBody: formData
  });
};

export const changePassword = async (request: ChangePassword) => {
  return await apiFetch<EditResponse>("/users/changepassword", {
    method: "POST",
    body: JSON.stringify(request),
    withClientId: false,
    withBearerToken: true
  });
};