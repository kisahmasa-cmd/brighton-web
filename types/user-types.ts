export interface UserData {
  UserID: string;
  Name: string;
  Email: string;
  Phone: string;
  IsVerified: boolean;
  UserType: "MEMBER" | "AGEN";
}
