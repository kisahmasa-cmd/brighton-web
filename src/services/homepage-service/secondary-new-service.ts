import { Property } from "../../../types/property-types";
import { ApiResponse } from "../../../utils/apiResponse";
import { apiFetch } from "../api";
import { PropertyParams } from "../../../types/property-types";

export type PropertyResponse = ApiResponse<Property[]>;

export const getSecondaryNew = (NotCache: boolean = true) =>
  apiFetch<PropertyResponse>(`/property/search`, {
    base: "node",
    body: JSON.stringify({ IsSold: false, SortOrder: "DESC", SortField: "New", Count: 10, ClientID: "66cd8c4d1ab291cad13d928d", IsNewWeb: true }),
    method: "POST",
    withClientId: false,
    dynamic: NotCache,
  });
export const getSecondaryPopuler = (NotCache: boolean = true) =>
  apiFetch<PropertyResponse>(`/property/search`, {
    base: "node",
    body: JSON.stringify({ DayInterval: 30, IsSold: false, SortOrder: "DESC", SortField: "View", Count: 10, ClientID: "66cd8c4d1ab291cad13d928d", IsNewWeb: true }),
    method: "POST",
    withClientId: false,
    dynamic: NotCache,
  });

export const getPropertySecondary = (params?: PropertyParams) => {
  const defaultParams: PropertyParams = {
    IsSold: false,
    Count: 12,
    Start: 0,
    ClientID: "66cd8c4d1ab291cad13d928d",
    IsNewWeb: true,
  };

  const mergedParams = { ...defaultParams, ...params };

  return apiFetch<PropertyResponse>(`/property/search`, {
    base: "node",
    body: JSON.stringify(mergedParams),
    method: "POST",
    withClientId: false,
  });
};

//take first image and use as og image

export const getMetaImageFromSeondary = (params?: PropertyParams) => {
  const defaultParams: PropertyParams = {
    IsSold: false,
    Count: 1,
    Start: 0,
    ClientID: "66cd8c4d1ab291cad13d928d",
    IsNewWeb: true,
  };

  const mergedParams = { ...defaultParams, ...params };
  return apiFetch<PropertyResponse>(`/property/search`, {
    base: "node",
    body: JSON.stringify(mergedParams),
    method: "POST",
    withClientId: false,
    dynamic: false,
    revalidate: 300,
  });
};

export const getPropertyPrimary = (NotCache: boolean = true) =>
  apiFetch<PropertyResponse>(`/property/searchprimary`, {
    params: { Count: 10, IsNewWeb: true },
    dynamic: NotCache,
  });
