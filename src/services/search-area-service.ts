import {ApiResponse} from "../../utils/apiResponse";
import {SearchAreaData} from "../../types/search-area-type";
import {apiFetch} from "@/services/api";

export type SearchAreaResponse = ApiResponse<SearchAreaData[]>;

export const getSearchArea = (keyword?: string) =>
  apiFetch<SearchAreaResponse>(`/cari-properti/autocomplete`, {
    base: "old",
    body: JSON.stringify({params: {phrase: keyword}}),
    method: "POST",
    withClientId: false,
  });
