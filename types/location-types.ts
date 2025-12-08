export interface Country {
  Created: Date;
  Title: string;
  URLSegment: string;
  Overseas: string;
  FlagImageID: string;
  ID: number;
  RecordClassName: string;
}

export interface Province {
  ClassName: string;
  LastEdited: string | Date;
  Created: string | Date;
  Title: string;
  URLSegment: string;
  RumahComCode: string | null;
  Rumah123ID: string | null;
  DoverID: string | null;
  UrbanindoTitle: string | null;
  LamudiTitle: string | null;
  Overseas: string | null;
  CountryID: string;
  ID: number;
  RecordClassName: string;
  Country?: Country | null;
}

export interface City {
  ClassName?: string;
  LastEdited?: Date;
  Created?: Date;
  Title: string;
  LowerTitle?: string | null;
  RumahComCode?: string | null;
  RumahComParentCode?: string | null;
  Rumah123District?: string | null;
  Rumah123City?: string | null;
  Rumah123Province?: string | null;
  Rumah123ID?: string | null;
  DoverCityID?: string | null;
  UrbanindoTitle?: string | null;
  LamudiTitle?: string | null;
  URLSegment: string;
  Overseas?: string;
  ProvinceID: string;
  PhotoID?: string;
  ID: number;
  RecordClassName?: string;
  Province?: Province;
  Photo?: CityPhoto;
}

export interface CityPhoto {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP: string;
  MediumWebP: string;
  OriginalWebP: string;
}

export interface District {
  ID: number;
  Title: string;
  URLSegment: string | null;
  LocationID: string;
  Location: City;
}