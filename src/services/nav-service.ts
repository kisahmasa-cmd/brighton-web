// services/navService.ts
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export interface NavItem {
  Sort: number;
  Title: string;
  Url: string;
  Subs: NavItem[];
}

export type NavResponse = ApiResponse<{
  TopNav: NavItem[];
  MainNav: NavItem[];
}>;

export const getNav = (clientId?: string) => apiFetch<NavResponse>(`/home/activenav`, { dynamic: false, revalidate: 60 });
