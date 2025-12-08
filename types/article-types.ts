import { AdsData } from "./ads-types";
import { Photo } from "./api-types";

export type OrderByArticleFilterType = "Z-A" | "A-Z" | "latest" | "oldest" | "";

export interface ArticlesFilterParams {
  OrderBy?: OrderByArticleFilterType;
  Category?: string | null;
  Tags?: string[];
  Keyword?: string;
  Count?: number;
  Start?: number;
  Page?: number;
}

export interface ArticleItem {
  ID: number;
  ClassName: string;
  Created: string;
  CreatedNice: string;
  DateLabelArtikel: string;
  LastEdited: string;
  URLSegment: string;
  Link: string;
  Title: string;
  Author: string;
  Content: string;
  Photo: Photo;
  Category?: ArticleCategory;
  Tags?: ArticleTag[];
  Ads: ArticleAds;
}

export interface ArticleAds {
  Top: AdsData,
  Middle: AdsData,
  Bottom: AdsData,
}

export interface ArticleCategory {
  ID: number;
  ClassName: string;
  Created: string;
  LastEdited: string;
  Name: string;
  Description: string;
  IsActive: number;
  URLSegment: string;
  NameEN: string;
}

export interface ArticleTag {
  ID: number;
  ClassName: string;
  Created: string;
  LastEdited: string;
  URLSegment: string;
  Name: string;
  Description: string;
}
