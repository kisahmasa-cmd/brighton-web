import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";
import {City, District, Province} from "../../types/location-types";
import {Area} from "../../types/consignment-types";

export type ProvinceResponse = ApiResponse<Province[]>;
export type CityResponse = ApiResponse<City[]>;
export type DistrictResponse = ApiResponse<District[]>;

export const getProvinces = (countryId: number = 1) =>
  apiFetch<ProvinceResponse>(`/property/province?CountryID=${countryId}`, {
    base: "api",
    method: "GET",
  });

export const getCities = (params: Record<string, string>) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
  );

  const queryString = new URLSearchParams(filteredParams).toString();

  return apiFetch<CityResponse>(`/property/location?${queryString}`, {
    base: "api",
    method: "GET",
  });
};

export const getCitiesByProvince = (provinceId?: number) =>
  apiFetch<CityResponse>(`/property/location?ProvinceID=${provinceId}`, {
    base: "api",
    method: "GET",
  });

export const getDistricts = (params: Record<string, string>) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
  );

  const queryString = new URLSearchParams(filteredParams).toString();

  return apiFetch<DistrictResponse>(`/property/area?${queryString}`, {
    base: "api",
    method: "GET",
  });
};

export const getDistrictsByCity = (cityId?: number) =>
  apiFetch<DistrictResponse>(`/property/area?LocationID=${cityId}`, {
    base: "api",
    method: "GET",
  });

export const getCitiesPrimary = (overseas: number = 0) =>
  apiFetch<CityResponse>(`/property/primarylocations?Overseas=${overseas}`, {
    base: "api",
    method: "GET",
    withClientId: false,
  });

export const getAreaConsignment = (): Area[] => {
  return [
    { ID: "Citraland", Title: "Citraland" },
    { ID: "Satelit", Title: "Satelit" },
    { ID: "Manyar", Title: "Manyar" },
    { ID: "Gading Serpong", Title: "Gading Serpong" },
    { ID: "Pakuwon City", Title: "Pakuwon City" },
    { ID: "Graha", Title: "Graha" },
    { ID: "Villa Bukit Mas", Title: "Villa Bukit Mas" },
    { ID: "Pakuwon Indah", Title: "Pakuwon Indah" },
    { ID: "MERR", Title: "MERR" },
    { ID: "Jemursari", Title: "Jemursari" },
    { ID: "Taman Pinang", Title: "Taman Pinang" },
    { ID: "Denpasar", Title: "Denpasar" },
    { ID: "Kelapa Gading", Title: "Kelapa Gading" },
    { ID: "HR Muhammad", Title: "HR Muhammad" },
    { ID: "Tanjung Duren", Title: "Tanjung Duren" },
    { ID: "Dieng", Title: "Dieng" },
    { ID: "BSD", Title: "BSD" },
    { ID: "Rungkut", Title: "Rungkut" },
    { ID: "Grand Kenjeran", Title: "Grand Kenjeran" },
    { ID: "Monginsidi", Title: "Monginsidi" },
    { ID: "Dr. Cipto", Title: "Dr. Cipto" },
    { ID: "Gatot Subroto", Title: "Gatot Subroto" },
    { ID: "Balikpapan", Title: "Balikpapan" },
    { ID: "Samarinda", Title: "Samarinda" },
    { ID: "Amir Hamzah", Title: "Amir Hamzah" },
    { ID: "Bangau", Title: "Bangau" },
    { ID: "Belian", Title: "Belian" },
    { ID: "Kusumanegara", Title: "Kusumanegara" },
    { ID: "Veteran", Title: "Veteran" },
    { ID: "Pondok Indah", Title: "Pondok Indah" },
    { ID: "Jakarta", Title: "Jakarta" },
    { ID: "Jakarta Pusat", Title: "Jakarta Pusat" },
    { ID: "Margonda", Title: "Margonda" },
    { ID: "Yos Sudarso", Title: "Yos Sudarso" },
    { ID: "Bangbarung", Title: "Bangbarung" },
    { ID: "Alam Sutera", Title: "Alam Sutera" },
    { ID: "Cengkareng", Title: "Cengkareng" },
    { ID: "Canggu", Title: "Canggu" },
    { ID: "PIK", Title: "PIK" },
    { ID: "Joyoboyo", Title: "Joyoboyo" },
    { ID: "CBD Sudirman", Title: "CBD Sudirman" },
    { ID: "Nginden", Title: "Nginden" },
    { ID: "Seminyak", Title: "Seminyak" },
    { ID: "Batu", Title: "Batu" },
    { ID: "Nusa Dua", Title: "Nusa Dua" },
    { ID: "Mayjend Sungkono", Title: "Mayjend Sungkono" },
    { ID: "Darmo Hill", Title: "Darmo Hill" },
    { ID: "Sanur", Title: "Sanur" },
    { ID: "Northwest", Title: "Northwest" },
    { ID: "Soekarno Hatta", Title: "Soekarno Hatta" },
    { ID: "Cibubur", Title: "Cibubur" },
    { ID: "Makassar", Title: "Makassar" },
    { ID: "Galaxy", Title: "Galaxy" },
    { ID: "Sunter", Title: "Sunter" },
    { ID: "Kota Baru Parahyangan", Title: "Kota Baru Parahyangan" },
    { ID: "Panglima Sudirman", Title: "Panglima Sudirman" },
    { ID: "Green Lake", Title: "Green Lake" },
    { ID: "Karawaci", Title: "Karawaci" },
    { ID: "Harapan Indah", Title: "Harapan Indah" },
    { ID: "Ubud", Title: "Ubud" },
    { ID: "Greenville", Title: "Greenville" },
    { ID: "Gamacity", Title: "Gamacity" },
    { ID: "Pekanbaru", Title: "Pekanbaru" },
    { ID: "Lampung", Title: "Lampung" },
    { ID: "Pontianak", Title: "Pontianak" },
    { ID: "Madiun", Title: "Madiun" },
    { ID: "Tebet", Title: "Tebet" },
    { ID: "Bintaro", Title: "Bintaro" },
    { ID: "Tomang", Title: "Tomang" },
    { ID: "Lainnya", Title: "Lainnya" }
  ];
}
