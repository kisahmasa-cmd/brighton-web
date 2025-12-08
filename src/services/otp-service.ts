import {
  OtpSendCodeData,
  OtpSendCodeParams,
  OtpVerifyCodeData,
  OtpVerifyCodeParams,
} from "../../types/otp-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type OtpSendCodeResponse = ApiResponse<OtpSendCodeData>;
export type OtpVerifyCodeResponse = ApiResponse<OtpVerifyCodeData>;

export const sendOTPCode = async (params: OtpSendCodeParams) => {
  return apiFetch<OtpSendCodeResponse>("/auth/sendotpvisitor", {
    method: "GET",
    params: { ...params },
    withClientId: false,
  });
};

export const verifyOTPCode = async (params: OtpVerifyCodeParams) => {
  const result = await apiFetch<OtpVerifyCodeResponse>("/auth/otpverify", {
    method: "POST",
    body: JSON.stringify(params),
    withClientId: false,
  });

  return result;
};
