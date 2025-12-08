export interface OtpSendCodeParams {
  UserID?: string;
  Name?: string;
  Phone: string;
}

export interface OtpSendCodeData {
  UserID: string;
}

export interface OtpVerifyCodeParams {
  UserID: string;
  OTP: string;
}

export interface OtpVerifyCodeData {
  _id: string;
  Phone: string;
  IsVerified: boolean;
}
