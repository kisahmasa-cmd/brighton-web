export interface CharitiesParams {
  Keyword?: string;
  Category?: string;
  Count: number;
  Start?: number;
  Page?: number;
}

export interface CharityCategoryData {
  ID: number;
  ClassName: string;
  LastEdited: string;
  Created: string;
  Title: string;
  SubTitle: string;
  URLSegment: string;
  IsShow: number;
  IconID: number;
  Unit: string;
  Count: number;
  Icon: CharityCategoryIconData;
}

export interface CharityData {
  ID: number;
  Title: string;
  URLSegment: string;
  Status: string;
  Content: string;
  Category: CharityCategoryData;
  Photo: CharityPhotoData;
}

export interface CharityPhotoData {
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP: string;
  MediumWebP: string;
  OriginalWebP: string;
}

export interface CharityCategoryIconData {
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP: string;
  MediumWebP: string;
  OriginalWebP: string;
}
