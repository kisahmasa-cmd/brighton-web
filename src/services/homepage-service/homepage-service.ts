import { BannerData } from "../../../types/banner-home";
import { FooterTypes, TabsFooterData } from "../../../types/footer-types";
import { ShortcutsTypes } from "../../../types/shortcut-types";
import { SocialMediaData } from "../../../types/social-icons";
import { TestimoniData } from "../../../types/testimoni-types";
import { ApiResponse } from "../../../utils/apiResponse";
import { apiFetch } from "../api";

export type ShortcutsResponse = ApiResponse<ShortcutsTypes[]>;
export type FooterResponse = ApiResponse<FooterTypes[]>;
export type FooterTabs = ApiResponse<TabsFooterData>;
export type TestimoniResponse = ApiResponse<TestimoniData[]>;
export type SocialMediaResponse = ApiResponse<SocialMediaData[]>;
export type BannerImageResponse = ApiResponse<BannerData[]>;

export const getShortcuts = () => apiFetch<ShortcutsResponse>(`/shortcut`);
export const getFooters = () => apiFetch<FooterResponse>(`/footers`);
export const getFooterProvince = (Province: string = "", City: string = "", TypeProperty: string = "", TypeTransaction: string = "", Area: string = "") =>
  apiFetch<FooterTabs>("/property/total/province", { params: { Province, City, TypeProperty, TypeTransaction, Area }, dynamic: false, revalidate: 60, withClientId: false });
export const getFooterLocation = (Province: string = "", City: string = "", TypeProperty: string = "", TypeTransaction: string = "", Area: string = "") =>
  apiFetch<FooterTabs>("/property/total/location", { params: { Province, City, TypeProperty, TypeTransaction, Area }, dynamic: false, revalidate: 60, withClientId: false });
// export const getFooterTabs = (Category: number = 1, Province: string = "", City: string = "", TypeProperty: string = "", TypeTransaction: string = "", Area: string = "") =>
//   apiFetch<FooterTabs>(`/toplistproperties`, {
//     params: { Category, Province, City, TypeProperty, TypeTransaction, Area },
//     dynamic: false,
//     revalidate: 18000,
//   });
type FooterHandler = (Province: string, City: string, TypeProperty: string, TypeTransaction: string, Area: string) => Promise<FooterTabs>;
const footerHandlers: Record<number, FooterHandler> = {
  1: getFooterProvince,
  2: getFooterLocation,
};

export const getFooterTabs = async (Category = 1, Province = "", City = "", TypeProperty = "", TypeTransaction = "", Area = "") => {
  const handler = footerHandlers[Category];

  if (handler) {
    return await handler(Province, City, TypeProperty, TypeTransaction, Area);
  }

  return await apiFetch<FooterTabs>(`/toplistproperties`, {
    params: { Category, Province, City, TypeProperty, TypeTransaction, Area },
    dynamic: false,
    revalidate: 18000,
  });
};

export const getIcons = () => apiFetch<SocialMediaResponse>(`/socialicons`);
export const getTestimonies = () => apiFetch<TestimoniResponse>(`/testimonies`, { params: { Count: 5, Start: 0, Type: "UMUM" } });
export const getBannerHero = () => apiFetch<BannerImageResponse>(`/property-api/slideshow`, { base: "old", params: { onlyapp: "onlyapp" } });
