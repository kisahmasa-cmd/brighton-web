import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";
import { ChangePassword, Profile } from "../../types/user-types";

export type EditResponse = ApiResponse<Profile>;

export const edit = async (request: Profile) => {
  return await apiFetch<EditResponse>("testing", {
    method: "POST",
    body: JSON.stringify(request),
    withClientId: false,
  });
};

export const changePassword = async (request: ChangePassword) => {
  return await apiFetch<EditResponse>("testing", {
    method: "POST",
    body: JSON.stringify(request),
    withClientId: false,
  });
};