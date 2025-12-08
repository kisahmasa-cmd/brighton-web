export interface FAQData {
  ID: number;
  Title: string;
  Description: string;
  FAQCategoryID: number;
  URLSegment: string;
  Category?: FAQCategoryData;
}

export interface FAQListParams {
  Keyword?: string;
  CategoryID?: number;
}

export interface FAQCategoryData {
  ID: number;
  Title: string;
  Description: string;
  URLSegment: string;
  ParentID: number;
  ParentCategory?: FAQCategoryData;
  Icon?: IconData;
  Faqs?: FAQData[];
}

interface IconData {
  Small?: string;
}

export interface FAQCategoriesParams {
  Keyword?: string;
  ParentID?: number;
  URLSegment?: string;
}
