import { GlossaryItem } from "../../types/glossaries-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type GlossaryResponse = ApiResponse<GlossaryItem[]>;

export const getGlossaries = () => apiFetch<GlossaryResponse>(`/glossaries`);
