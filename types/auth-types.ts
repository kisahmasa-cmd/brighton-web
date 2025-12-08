export interface LoginRequestBody {
  User: string;
  Password: string;
}

export interface LoginResponseData {
  _id: string;
  Name: string;
  Email: string;
  Phone: string;
}

export interface RegisterRequestBody {
  Name: string;
  Email: string;
  Password: string;
  Phone: string;
}

export interface RegisterResponseData {
  _id: string;
  Name: string;
  Email: string;
  Phone: string;
}

export interface ForgotPasswordRequestBody {
  Email: string;
}

export interface RepairPasswordRequestBody {
  Token: string;
  Password: string;
}
