import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";
import { Property, Developer, HintInfo, PropertyInfo, PropertyParams } from "../../types/property-types";

export type TypeResponse = ApiResponse<PropertyInfo>;
export type SearchHintResponse = ApiResponse<HintInfo[]>;
export type DeveloperResponse = ApiResponse<Developer[]>;

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || process.env.CLIENT_ID!;
const CLIENT_ID_EXPRESSJS = process.env.NEXT_PUBLIC_CLIENT_ID_EXPRESSJS || process.env.CLIENT_ID_EXPRESSJS!;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;

export type PropertyPrimaryResponse = ApiResponse<Property[]>;
export type PropertyPrimaryDetailResponse = ApiResponse<Property>;
export type PropertySecondaryDetailResponse = ApiResponse<Property>;

export const getPropertyPrimary = (params?: PropertyParams) => {
  const defaultParams: PropertyParams = {
    IsSold: false,
    Count: 12,
    Start: 0,
    ClientID: CLIENT_ID,
    IsNewWeb: true,
  };

  const mergedParams = { ...defaultParams, ...params };

  return apiFetch<PropertyPrimaryResponse>(`/property-api/searchprimary`, {
    base: "old",
    body: JSON.stringify(mergedParams),
    method: "POST",
    withClientId: false,
    formData: true,
  });
};

export const getPropertyPrimaryDetail = (urlSegment: string) => {
  return apiFetch<PropertyPrimaryDetailResponse>(`/property-api/viewprimary/${urlSegment}`, {
    base: "old",
    method: "GET",
    params: { IsNewWeb: true },
  });
};

export const getType = () =>
  apiFetch<TypeResponse>(`/api/staticinfo`, {
    base: "old",
    body: JSON.stringify({
      Language: "id_ID",
      Type: "filterproperty",
      ClientID: CLIENT_ID,
      // AccessToken: ACCESS_TOKEN,
    }),
    method: "POST",
    withClientId: false,
    formData: true,
  });

export const searchHint = (keyword?: string) =>
  apiFetch<SearchHintResponse>(`/property-hint/v1/search/show`, {
    base: "api",
    body: JSON.stringify({ Keyword: keyword, ClientID: CLIENT_ID_EXPRESSJS }),
    method: "POST",
    withClientId: false,
  });

export const searchHintPrimary = (keyword?: string) =>
  apiFetch<ApiResponse<[]>>(`/primary/autocomplete`, {
    base: "api",
    body: JSON.stringify({ params: { phrase: keyword } }),
    method: "POST",
    withClientId: false,
  });

export const getDeveloper = () =>
  apiFetch<DeveloperResponse>(`/property/searchdeveloper`, {
    base: "api",
    method: "GET",
    withClientId: false,
  });

export const getDetailPropertySecondary = (slug: string) =>
  apiFetch<PropertySecondaryDetailResponse>(`/property-api/view/${slug}`, {
    base: "old",
    method: "GET",
    params: { IsNewWeb: true },
  });

export const getRelatedSecondaryProperties = (urlSegment: string) => {
  return apiFetch<Property[]>("/home/getrelated", {
    params: { total: 10, urlSegment, IsNewWeb: true },
  });
};
