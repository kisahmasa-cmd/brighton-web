import { apiFetch } from "@/services/api";
import {
  FAQCategoriesParams,
  FAQCategoryData,
  FAQData,
  FAQListParams,
} from "../../types/faq-types";
import { ApiResponse } from "../../utils/apiResponse";

export type FAQListResponse = ApiResponse<FAQData[]>;
export type FAQCategoriesResponse = ApiResponse<FAQCategoryData[]>;
export type FAQSearchFaqsResponse = ApiResponse<FAQCategoryData[]>;
export type FAQDetailResponse = ApiResponse<FAQData>;

export const getFAQList = (params?: FAQListParams) =>
  apiFetch<FAQListResponse>(`/faqs`, {
    params: { ...params },
  });

export const getFAQCategories = (params?: FAQCategoriesParams) => {
  return apiFetch<FAQCategoriesResponse>(`/faqs/categories`, {
    params: { ...params },
  });
};

export const getSearchFAQList = (params?: FAQListParams) => {
  return apiFetch<FAQSearchFaqsResponse>(`/faqs`, {
    params: { ...params },
  });
};

export const getFAQDetail = (urlSegment: string) =>
  apiFetch<FAQDetailResponse>(`/faqs/${urlSegment}`);
