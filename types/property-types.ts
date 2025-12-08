import { Photo } from "./api-types";
import { Agent } from "./agent-types";
import { City, District, Province } from "./location-types";

export interface Property {
  // ===== Shared / General Fields =====
  ID: number;
  Link: string;
  Type: string;
  Title: string;
  Photos?: Photo[];
  Agent: Agent | Agent[];
  Agent2?: Agent;
  Location: City;
  Latitude?: string | number;
  Longitude?: string | number;
  Created?: string | Date;
  LastEdited?: string | Date;

  // ===== Secondary Property (PropertyData) =====
  _id?: number;
  IDCode?: string;
  Status?: number;
  StatusBranch?: string;
  IsNew?: number;
  View?: string;
  Transaction?: string;
  Code?: string;
  PropertyDate?: string;
  Address?: string;
  AddressNumber?: string;
  Price?: number;
  Price2?: number;
  PricePerMeter?: number;
  PricePerMeter2?: number;
  Dimension?: string;
  LT?: string;
  LB?: string | null;
  Hadap?: string;
  KT?: string;
  KM?: string;
  Facility?: string;
  Listrik?: string;
  Air?: string;
  Telepon?: string;
  Certificate?: string;
  IsIMB?: string;
  IsBlueprint?: string;
  Other?: string;
  BolehBanner?: string;
  SurveyLokasi?: string;
  JaminanBank?: string;
  Tingkat?: string;
  LineTelepon?: string;
  Komisi?: number;
  OwnershipType?: string;
  BisaKPR?: string;
  KeteranganStatus?: string;
  TitleCustom?: string;
  IsExpired?: boolean;
  IsSold?: boolean;
  OriginalID?: string;
  Hashtag?: string;
  PremierListingDate?: string;
  FeatureListingDate?: string;
  Priority?: number;
  AgentEditCount?: string;
  IsCopyPrimary?: boolean;
  RejectReason?: string;
  IsBookmark?: boolean;
  Memo?: string;
  IsRoomTour?: string;
  ListingHistories?: ListingHistory[];
  Province?: Province;
  Area?: District;
  IsGOH?: boolean;
  Openhouses?: string;
  OpenhouseData?: string;
  Video?: string;
  AdditionalData?: AdditionalData;
  PrimaryID?: string;
  NearbyLocations?: NearbyLocations[];
  BukuBuyerNote?: string;
  Impressions?: number;
  LeadsCount?: number;
  ViewActivity?: number;
  ViewNum?: number;
  SortingPoint?: number;
  IsPremierListing?: boolean;
  IsFeatureListing?: boolean;
  ExpiredDate?: string;

  // ===== Primary Property (Property) =====
  ClassName?: string;
  Title2?: string;
  Label?: string | null;
  Content?: string;
  Keunggulan?: string | null;
  PriceMin?: string;
  PriceMax?: string;
  Price2Min?: string;
  Price2Max?: string;
  ForeignCurrency?: string;
  ShortContent?: string;
  URLSegment?: string;
  Developer?: Developer;
  Photo?: Photo;
  Files?: string[];
  Videos?: string[] | null;
  VirtualTours?: string[] | null;
  Facilities?: string[] | null;
  Features?: string[] | null;
  PrimaryType?: PrimaryType[];
  DeveloperDescription?: string | null;
  FacilityDescription?: string | null;
  PayDescription?: string | null;
  PurchaseDescription?: string | null;
  SpecificationDescription?: string | null;
  BroadcastContent?: string | null;
  BentukKerjasama?: string;
  PriceFormat?: string;
  Logo?: string | null;
  IsOpenHouse?: string;
  MapUrl?: string;
  GMapUrl?: string;
}

export interface PrimaryType {
  ID: number;
  ClassName: string;
  Created: string | Date;
  LastEdited: string | Date;
  Title: string;
  ShortDescription: string;
  LT: string;
  LB: string;
  KM: string;
  KT: string;
  Price: string;
  Photo: Photo;
}

export interface PropertyParams {
  start?: number;
  limit?: number;
  total?: number;
  page?: number;
  show?: "local" | "overseas";
  Keyword?: string;
  ProvinceID?: number;
  ProvinceTitle?: string;
  ProvinceSlug?: string;
  LocationID?: number;
  LocationTitle?: string;
  LocationSlug?: string;
  AreaID?: number;
  AreaTitle?: string;
  AreaSlug?: string;
  Certificate?: string;
  ClientID?: string;
  Count?: number;
  Dimension?: number;
  Floor?: number;
  Furnish?: string;
  Hadap?: string;
  IsSold?: boolean;
  KM?: number;
  KT?: number;
  LBMax?: number;
  LBMin?: number;
  LTMax?: number;
  LTMin?: number;
  PriceMax?: number;
  PriceMin?: number;
  PropertyWidthMax?: number;
  PropertyWidthMin?: number;
  SortField?: string;
  Latitude?: number;
  Longitude?: number;
  SortOrder?: string;
  Start?: number;
  Transaction?: string;
  Type?: string;
  Category?: string;
  DeveloperID?: number;
  AgentID?: number;
  Overseas?: number;
  URLSegment?: string;
  IsNewWeb?: boolean;
}

export interface PropertyInfo {
  MaximalCountGarage: number;
  Type: PropertyBasicInfo[];
  Transaction: PropertyBasicInfo[];
  Hadap: PropertyBasicInfo[];
  Other: PropertyBasicInfo[];
  TypeCooperate: PropertyBasicInfo[];
  MainGroup: PropertyBasicInfo[];
  Air: PropertyBasicInfo[];
  Certificate: PropertyBasicInfo[];
  ListingAggreement: PropertyBasicInfo[];
  TypeNearbyLocation: TypeNearbyLocation[];
}

export interface PropertyBasicInfo {
  label: string;
  value: string;
}

export interface ListingHistory {
  Created: string;
  Price: number;
  Notes: string;
  UpdateDate: string;
  IDCode: string;
  OriginalID: string;
  ArchivePropertyDataID: string;
  ID: number;
}

export interface AdditionalData {
  ClassName: string;
  LastEdited: string;
  Created: string;
  StatusFurnish: string;
  DiningRoom: string;
  SittingRoom: string;
  Floor: string;
  Garage: string;
  MainGroup: string;
  ListingScore: string;
  PropertyWidth: string;
  PropertyLength: string;
  MaxCountGarage: string;
  CopiedFromPrimaryID: string;
  PropertyDataID: string;
  CountryID: string;
  CheckByID: string;
  ID: number;
  RecordClassName: string;
  PropertyWidthNum: number;
  PropertyLengthNum: number;
}

interface TypeNearbyLocation {
  ID: number;
  Title: string;
  Icon: Icon;
}

interface Icon {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP: string;
  MediumWebP: string;
  OriginalWebP: string;
}

export interface HintInfo {
  _id: number | string;
  title?: string;
  index?: number;
  ID?: number;
  Title: string;
  URLSegment?: string;
  Type?: string;
  Location?: string;
  Sort?: number;
  Address?: string;
  Price?: number;
  Link?: string;
  Area?: HintArea;
  Photos?: HintPhoto[];
}

export interface HintArea {
  ID: number;
  Title: string;
  URLSegment: null;
  LocationID: string;
  Location: City;
}

export interface HintPhoto {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP: string;
  MediumWebP: string;
  OriginalWebP: string;
}

export interface Developer {
  ID: number;
  Nama: string;
  Nama2?: string | null;
  Alamat?: string | null;
  ContactPerson?: string | null;
  Telp?: string | null;
  Telp2?: string | null;
  HP?: string | null;
  Fax?: string | null;
  IsPTKP?: string;
  LogoID?: string;
  TotalPrimary?: number;
}

export interface NearbyLocations {
  Category: string;
  AverageDuration: string;
  Locations: Location[];
}

export interface Location {
  Name: string;
  Duration: string;
}
