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

export interface Profile {
  _id?: string;
  Name: string;
  Email: string;
  Phone: string;
  Address?: string;
}

export interface ChangePassword {
  OldPassword: string;
  NewPassword: string;
}

