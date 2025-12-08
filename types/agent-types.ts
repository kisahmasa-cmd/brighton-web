import { Photo } from "./api-types";

export interface CityData {
  ID: number;
  Title: string;
  RumahComCode: string;
  RumahComParentCode: string;
  Rumah123District: string | null;
  Rumah123City: string;
  Rumah123Province: string;
  ProvinceID: string;
  URLSegment: string;
  Province: ProvinceData;
  Photo: Photo;
}

export interface ProvinceData {
  ClassName: string;
  LastEdited: string;
  Created: string;
  Title: string;
  URLSegment: string;
  RumahComCode: string;
  Rumah123ID: string;
  DoverID: string;
  UrbanindoTitle: string;
  LamudiTitle: string;
  Overseas: string;
  CountryID: string;
  ID: number;
  RecordClassName: string;
}

export interface AgentParams {
  Start?: number;
  Count?: number;
  IsSold?: boolean;
  page?: number;
  Keyword?: string;
  ClientID?: string;
  LocationID?: string | number;
  SortField?: string;
  SortOrder?: string;
  CityID?: string | number;
  Terdekat?: boolean | string;
  Nearby?: boolean;
  Latitude?: number;
  Longitude?: number; 
  OfficeID?: string | number;
  CitySlug?: string;
  OfficeSlug?: string;
  IsNewWeb?: boolean;  
}



export interface AgentRecommendationParams {
  AccessToken?: string;
  AgentOfficeCity?: string;
  LocationID?: number;
  Transaction?: string;
  Type?: string;
  ClientID?: string;
  Skip?: number;
  Keyword?: string;
  Limit?: number;
}

export interface Agent {
  ID: number;
  Telephone?: string;
  WAPhone: string;
  WAPhone2: string | null;
  Name: string;
  Address: string;
  Email?: string;
  Phone: string;
  PhoneWeChat?: string | null;
  PhoneCDMA: string | null;
  PhoneOther?: string | null;
  Status?: string;
  Code?: string;
  Name2?: string;
  Gender?: string | null;
  BirthCity?: string | null;
  BirthDate?: string | Date | null;
  ContactPerson?: string | null;
  NPWP?: string | null;
  NPWPEditCounter?: number;
  BankName?: string | null;
  BankBranch?: string | null;
  AccName?: string | null;
  Position: string | null;
  BBM?: string | null;
  Username?: string | null;
  DoverID?: string | null;
  UrbanIndoUsername?: string | null;
  EmailLamudi?: string | null;
  URLSegment?: string;
  Level?: string | null;
  GradeLevel?: string | null;
  PrivateNotes?: string | null;
  NPWPName?: string | null;
  NPWPAddress?: string | null;
  NamaBuktiPotong?: string | null;
  Latitude?: string | null;
  Longitude?: string | null;
  PIN?: string;
  EncryptedPIN?: string;
  IsHide?: string;
  Up?: string | null;
  GoogleID?: string | null;
  FacebookID?: string | null;
  RecruitmentType?: string | null;
  RecruitmentMOU?: string | null;
  RecruitmentPositionType?: string | null;
  PoinRecruitment?: string | null;
  RecruitmentDescription?: string | null;
  ShowLocation: boolean;
  LastOnline: string | Date | null;
  Caption?: string | null;
  ReferrerNotes?: string | null;
  Jabatan?: string | null;
  EmailTax?: string | null;
  LastUpdateNPWP?: string | Date | null;
  DateApproved?: string | Date | null;
  StatusClosing?: string | null;
  DateStatusChanged?: string | Date | null;
  Rumah123Total?: string | null;
  RumahComTotal?: string | null;
  Rumah123TotalUpdate?: string | Date | null;
  RumahComTotalUpdate?: string | Date | null;
  IsHideListing?: boolean;
  FacebookAccount?: string | null;
  InstagramAccount?: string | null;
  NonActiveCause?: string | null;
  ClosingCase?: string | null;
  LastUpdateClosingCase?: string | Date | null;
  CertificateName?: string | null;
  AlternateLabelOffice?: string | null;
  KodeUnit?: string | null;
  ForcePassBrightOn?: string | null;
  IsCRA?: string | null;
  NameCRA?: string | null;
  IsPopUpLimitBaru?: string | null;
  IsSuspended?: string | boolean | null;
  TokenEditPin?: string | null;
  ClassName: string;
  OutDate?: string | Date | null;
  MOUDate?: string | Date | null;
  BankNumber?: string | null;
  LimitListing?: number;
  TransparentPhoto?: string | null;
  PhotoURL?: string;
  PhotoAlt?: string;
  OfficeName?: string;
  LocationAndProvince?: string;
  Photo: Photo;
  LanguageAgent?: string | null;
  Office?: Office;
  TotalOffices?: number;
  BarcodeImageURL?: string | null;
  Link: string;
  Badge?: Badge[] | BadgeTypes[] | [];
  TotalListing?: number;
  TotalSell?: number;
  TotalRent?: number;
  TotalPrimary?: number;
  TotalSecondary?: number;
  TotalNonActive?: number;
  TotalLeaders?: number;
  TotalCurrentSundul?: number;
  TotalListingExpired?: number;
  Online: boolean;
  AgentRecruiterID?: string | null;
  LeaderID?: number | null;
  LeaderName?: string | null;
  LeaderLevel?: string | null;
  Certificates?: AgentCertificate[] | { [key: string]: null | string }[];
  InternalLevel?: string | null;
  Families?: Family[];
  TotalPoint?: number;
  IsReadyFitProperTest?: boolean;
  ShowPengajuanPrimary?: boolean;
}

export interface BadgeTypes {
  ID: string;
  Title: string;
  Tahun: string;
  Photo: OfficeLogo;
}

export interface OfficeLogo {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
}

export interface LocationData {
  ClassName: string;
  LastEdited: string;
  Created: string;
  Title: string;
  RumahComCode: string;
  RumahComParentCode: string;
  Rumah123City: string;
  Rumah123Province: string;
  Rumah123ID: string;
  DoverCityID: string;
  UrbanindoTitle: string;
  LamudiTitle: string;
  URLSegment: string;
  Overseas: string;
  ProvinceID: string;
  PhotoID: string;
  ID: number;
  RecordClassName: string;
}

export interface AgentCertificate {
  Title: string;
  TitleFull: string;
  EventStartDate: string;
  EventEndDate: string;
  EventStartDateReal: string;
  EventEndDateReal: string;
  LocationEvent: string;
  Topic: string | null;
  Category: string;
  OfficeID: string;
  Sesi: string;
  Modul: string | null;
  CertificateLink: string;
}

export interface Badge {
  ID: number;
  Title: null | string;
  Tahun: string;
  Photo: Photo;
}

export interface Family {
  Name: string;
  Hubungan: string;
  AgentID: string;
  AgentFamilyID: string;
  StartDate: string | Date;
  EndDate: null;
}

export interface Office {
  ClassName: string;
  LastEdited?: string | Date;
  Created?: string | Date;
  Name: string;
  Address: string;
  Email: string;
  Phone: string;
  Sort?: string;
  Code: string;
  City: string;
  Baris1Iklan?: string;
  Salt?: string;
  BirthdayDate?: string | Date;
  Latitude?: string;
  Longitude?: string;
  Alias: string;
  BcaAlias?: string;
  Wilayah?: string;
  HierarchyCode?: string;
  KodeUnit?: string;
  DirectorID?: string;
  LocationID?: string;
  ProvinceID?: string;
  ParentID?: string;
  InventoryAreaID?: string;
  PtID?: string;
  PhotoID?: string;
  OfficeHubID?: string;
  ID: number;
  Logo?: Photo;
  URLSegment?: string;
  Location?: OfficeLocation;
  ProgressStatus?: string;
  Link?: string;
  getOfficeLabel?: string;
  getOfficeLabelNew?: string;
  getOfficeLabelCityLocation?: string;
  LocationAndProvince: string;
  OfficeAlias?: string;
  Path?: string;
}

export interface OfficeLocation {
  ClassName: string;
  LastEdited: string | Date;
  Created: string | Date;
  Title: string;
  RumahComCode: string;
  RumahComParentCode: string;
  Rumah123City: string;
  Rumah123Province: string;
  Rumah123ID: string;
  DoverCityID: string;
  UrbanindoTitle: string;
  LamudiTitle: string;
  URLSegment: string;
  Overseas: string;
  ProvinceID: string;
  PhotoID: string;
  ID: number;
  RecordClassName: string;
}
