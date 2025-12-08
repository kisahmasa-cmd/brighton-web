import { ForgotPasswordRequestBody, LoginRequestBody, LoginResponseData, RegisterRequestBody, RepairPasswordRequestBody } from "../../types/auth-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type LoginResponse = ApiResponse<LoginResponseData>;

export const login = async (request: LoginRequestBody) => {
  const result = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
    withClientId: false,
  });

  return result;
};

export const register = (request: RegisterRequestBody) => {
  return apiFetch<ApiResponse<null>>("/users/register", {
    method: "POST",
    body: JSON.stringify(request),
    withClientId: false,
  });
};

export const logout = async (token: string) => {
  const result = await apiFetch<ApiResponse<null>>("/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withClientId: false,
  });

  return result;
};

export const forgotPassword = (request: ForgotPasswordRequestBody) => {
  return apiFetch<ApiResponse<null>>("/auth/forgotpassword", {
    method: "POST",
    body: JSON.stringify(request),
    withClientId: false,
  });
};

export const repairPassword = (request: RepairPasswordRequestBody) => {
  return apiFetch<ApiResponse<null>>("/auth/repairpassword", {
    method: "POST",
    body: JSON.stringify(request),
    withClientId: false,
  });
};
