import {Agent} from "./agent-types";

export interface Photo {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP?: string | null;
  MediumWebP?: string | null;
  OriginalWebP?: string | null;
}

export interface CategoriesAchievement {
  ID: number;
  Title: string;
  Sort: number;
  URLSegment: string;
  Count: number;
}

export interface AchievementItem {
  ID: number;
  ClassName: string;
  Created: string;
  LastEdited: string;
  Sort: number;
  Keterangan: string;
  AgentDataID: number;
  PageID: number;
  CustomName: string;
  CustomPhotoID: number;
  CustomKodeUnit: string;
  AwardDetailID: number;
  DataType: string;
  DataTypeAward: string;
  Photo: Photo | null;
  Type: string;
  Agent: { ID: number; Name: string; Office: { ID: number; Title: string } } | null;
}

export interface CtaContactAgent {
  agent?: Agent;
  isWA: boolean;
}
