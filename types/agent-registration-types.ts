export interface AgentRegistrationRequest {
  IsAgree: string;
  Name2: string;
  Phone: string;
  Email: string;
  AddressDomisili: string;
  IDCard: File | undefined;
  InstagramAccount: string;
  LangEn: string;
  LangCn: string;
  LangOther: string;
  UsedWorkAtBank: string;
  UsedWorkAtBankName: string;
  MengenalBrighton: string;
  ReferenceCode: string;
  EventReference: string;
  IsPunyaPasangan: string;
  NamaPasangan: string;
  LastEducation: string;
  LatestEmployement: string;
  ExperienceCompany: string;
  ExperienceDuration: string;
  IsPunyaSaudara: string;
  IsPunyaSaudaraOffice: string;
  FamilyIsBrighton: string;
  SumberInput: string;
  HistoryWorkDataID: string;
  "g-recaptcha-response": string;
  "signature_text": string;
  signature: File | undefined;
}

export interface AgentRegistrationResponse {
  Code: string;
  Message: string;
  URL?: string;
  AgentName?: string;
}
