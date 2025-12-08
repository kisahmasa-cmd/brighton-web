import {
  CharitiesParams,
  CharityCategoryData,
  CharityData,
} from "../../types/charity-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type CharityCategoriesResponse = ApiResponse<CharityCategoryData[]>;
export type CharitiesResponse = ApiResponse<CharityData[]>;
export type CharityDetailResponse = ApiResponse<CharityData>;

export const getCharityCategories = () => {
  return apiFetch<CharityCategoriesResponse>(`/charities/getcategories`);
};

export const getCharities = (params: CharitiesParams) => {
  return apiFetch<CharitiesResponse>(`/charities`, {
    params: { ...params },
  });
};

export const getCharityDetail = (slug: string) => {
  return apiFetch<CharityDetailResponse>(`/charities/${slug}`);
};
