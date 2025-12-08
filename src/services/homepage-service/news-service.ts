// use article-service instead

// import { ApiResponse } from "../../../utils/apiResponse";
// import { apiFetch } from "../api";

// export interface NewsItem {
//   ID: number;
//   ClassName: string;
//   Created: string;
//   CreatedNice: string;
//   DateLabelArtikel: string;
//   LastEdited: string;
//   URLSegment: string;
//   Link: string;
//   Title: string;
//   Author: string;
//   Content: string;
//   Photo: NewsPhoto;
//   Category: NewsCategory;
// }

// export interface NewsPhoto {
//   ID: number;
//   Title: string;
//   Small: string;
//   Medium: string;
//   Original: string;
//   SmallWebP: string;
//   MediumWebP: string;
//   OriginalWebP: string;
// }

// export interface NewsCategory {
//   ID: number;
//   ClassName: string;
//   Created: string;
//   LastEdited: string;
//   Name: string;
//   Description: string;
//   IsActive: number;
//   URLSegment: string;
//   NameEN: string;
// }

// export type NewsResponse = ApiResponse<NewsItem[]>;

// export const getNews = () => {
//   return apiFetch<NewsResponse>(`/articles`, { params: { Start: 0, Count: 10 } });
// };
