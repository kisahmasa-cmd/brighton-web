// types/business-unit-types.ts

interface Province {
  ClassName?: string;
  LastEdited?: string;
  Created?: string;
  Title: string;
  URLSegment?: string;
  RumahComCode?: string;
  Rumah123ID?: string;
  DoverID?: string;
  UrbanindoTitle?: string;
  LamudiTitle?: string;
  Overseas?: string;
  SimpleTitle?: string;
  CountryID?: string;
  ID: number;
  RecordClassName?: string;
}

interface Photo {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP?: string;
  MediumWebP?: string;
  OriginalWebP?: string;
}

interface Location {
  ClassName?: string;
  LastEdited?: string;
  Created?: string;
  ID: number;
  Title: string;
  RumahComCode?: string;
  RumahComParentCode?: string;
  Rumah123District?: string;
  Rumah123City?: string;
  Rumah123Province?: string;
  Rumah123ID?: string;
  DoverCityID?: string;
  UrbanindoTitle?: string;
  LamudiTitle?: string;
  URLSegment?: string;
  Overseas?: string;
  SimpleTitle?: string;
  ProvinceID?: string;
  PhotoID?: string;
  RecordClassName?: string;
  Province?: Province;
  Photo?: Photo;
  ProvinceName?: string;
}

interface Logo {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
}

// Office/Hub Unit - can be OfficeData or OfficeHubData
export interface Unit {
  ClassName: string; // "OfficeData" or "OfficeHubData"
  LastEdited: string;
  Created: string;
  ID: number;
  Name: string;
  Address: string;
  Email?: string;
  Phone?: string;
  Sort?: string;
  Code?: string;
  City: string;
  Salt?: string;
  BirthdayDate?: string;
  Latitude?: string;
  Longitude?: string;
  Alias?: string;
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
  Logo?: Logo;
  URLSegment?: string;
  Path?: string;
  Location?: Location;
  ProgressStatus?: string;
  Link?: string;
  getOfficeLabel?: string;
  getOfficeLabelNew?: string;
  getOfficeLabelCityLocation?: string;
  LocationAndProvince?: string;
  OfficeAlias?: string;
  ProvinceName?: string;
  CityName?: string;
  // Additional fields for OfficeHubData
  Status?: string;
  CreateByID?: string;
  UpdateByID?: string;
  BirthdayCardID?: string;
  Title?: string;
  MapURL?: string | null;
  PostalCode?: string | null;
}

// City Data - grouped by city
export interface CityData {
  ID: number;
  Title: string;
  RumahComCode?: string | null;
  RumahComParentCode?: string | null;
  Rumah123District?: string | null;
  Rumah123City?: string | null;
  Rumah123Province?: string | null;
  ProvinceID?: string;
  URLSegment?: string;
  Path?: string;
  Province: Province;
  Photo?: Photo;
  Units: Unit[]; // All offices/hubs in this city
}

// Business Unit Data - grouped by business unit name
export interface BusinessUnitData {
  ClassName: string; // Should be "OfficeData"
  LastEdited: string;
  Created: string;
  ID: number;
  Name: string; // Main office name
  Address: string;
  Email?: string;
  Phone?: string;
  Sort?: string;
  Code?: string;
  City: string;
  Salt?: string;
  BirthdayDate?: string;
  Latitude?: string;
  Longitude?: string;
  Alias?: string; // Business unit alias (e.g., "Brighton Ace")
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
  Logo?: Logo;
  URLSegment?: string;
  Path?: string;
  Location?: Location;
  Subs?: Unit[]; // Sub-offices under this business unit
  ProgressStatus?: string;
  Link?: string;
  getOfficeLabel?: string;
  getOfficeLabelNew?: string;
  getOfficeLabelCityLocation?: string;
  LocationAndProvince?: string;
  OfficeAlias?: string;
  ProvinceName?: string;
  CityName?: string;
  MapURL?: string;
}

export interface BusinessUnitUrlParams {
  Keyword?: string;
  OrderBy?: number;
  OrderByUnit?: number;
  LocationID?: number;
}
