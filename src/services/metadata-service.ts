import { getSmartFallbackMeta } from "@/lib/smart-fallback";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type MetaResponse = ApiResponse<{
  ID: number;
  MetaTitle: string;
  MetaDescription: string;
  MetaKeyword: string;
  Content: string;
}>;

export interface MetaDataResult {
  MetaTitle: string;
  MetaDescription: string;
  MetaKeyword: string;
  Content: string;
}

export const getMetaData = async (path: string): Promise<MetaDataResult> => {
  try {
    const res = await apiFetch<MetaResponse>(`/seo`, {
      dynamic: false,
      revalidate: 300,
      params: { URL: path },
    });

    // API tidak mengembalikan data valid
    if (!res?.Data || typeof res.Data.MetaTitle !== "string") {
      return getSmartFallbackMeta(path);
    }

    return res.Data;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return getSmartFallbackMeta(path);
  }
};
