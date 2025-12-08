import { BusinessUnitData, CityData } from "../../types/business-unit-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

interface BusinessUnitParams {
  Start?: number;
  Count?: number;
  ClientID?: string;
  Keyword?: string;
  OrderBy?:number;
  OrderByUnit?: number;
  LocationID?: number;
}

export type BusinessUnitResponse = ApiResponse<BusinessUnitData[]>;
export type BusinessUnitDetailResponse = ApiResponse<BusinessUnitData>;
export type BusinessCityResponse = ApiResponse<CityData[]>;
export type OfficeCitiesResponse = ApiResponse<CityData[]>;

export const getBusinessUnit = (params?: BusinessUnitParams) => {
  const defaultParams: BusinessUnitParams = {
    Start: 0,
    Count: 100,
  };
  return apiFetch<BusinessUnitResponse>(`/office-api/group/unit`, {
    base: "old",
    params: { ...defaultParams, ...params },
  });
};

export const getBusinessCity = (params?: BusinessUnitParams) => {
  const defaultParams: BusinessUnitParams = {
    Start: 0,
    Count: 100,
  };
  return apiFetch<BusinessCityResponse>(`/office-api/group/city`, {
    base: "old",
    params: { ...defaultParams, ...params },
  });
};

export const getBusinessUnitBySlug = (slug: string) => {
  return apiFetch<BusinessUnitDetailResponse>(`/offices/${slug}`);
};

export const getOfficeCities = () => {
  return apiFetch<OfficeCitiesResponse>(`/office-api/cities`, {
    base: "old",
  });
}
