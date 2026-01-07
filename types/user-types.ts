export interface UserData {
  UserID: string;
  Name: string;
  Email: string;
  Phone: string;
  Address?: string;
  IsVerified: boolean;
  UserType: "MEMBER" | "AGEN";
  ExternalID: number;
}

export interface UserInfo {
  ID: number;
  ClassName: string;
  LastEdited: string;
  Created: string;
  Name: string;
  Address: string | null;
  Email: string;
  Phone: string | null;
  Username: string;
  Password: string;
  Salt: string;
  LoginCount: number;
  ChangePasswordCount: number;
  OTP: number;
  OTPCode: number;
  PhotoID: number;
  Telephone: string;
  Gender: string | null;
  OTPDueTime: string;
  ForgotPassCode: string | null;
  IsBlock: number;
  AgentAccID: number;
  GoogleID: string | null;
  FacebookID: string | null;
  AppleID: string | null;
  ReferrerNotes: string | null;
  Latitude: number | null;
  Longitude: number | null;
  VoucherCode: string | null;
}

export interface Profile {
  _id?: string;
  VisitorID?: number;
  Name: string;
  Email: string;
  Telephone: string;
  Address?: string;
}

export interface ChangePassword {
  OldPassword: string;
  NewPassword: string;
}

