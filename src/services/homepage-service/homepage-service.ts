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
export const getFooterTabs = (Category: number = 1, Province: string = "", City: string = "", TypeProperty: string = "", TypeTransaction: string = "", Area: string = "") =>
  apiFetch<FooterTabs>(`/toplistproperties`, {
    params: { Category, Province, City, TypeProperty, TypeTransaction, Area },
    dynamic: false,
    revalidate: 18000,
  });
export const getIcons = () => apiFetch<SocialMediaResponse>(`/socialicons`);
export const getTestimonies = () => apiFetch<TestimoniResponse>(`/testimonies`, { params: { Count: 5, Start: 0, Type: "UMUM" } });
export const getBannerHero = () => apiFetch<BannerImageResponse>(`/property-api/slideshow`, { base: "old", params: { onlyapp: "onlyapp" } });
