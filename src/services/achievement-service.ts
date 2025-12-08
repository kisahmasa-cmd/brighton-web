import { AchievementItem, CategoriesAchievement } from "../../types/api-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type AchievementsResponse = ApiResponse<AchievementItem[]>;
export type CategoriesAchievementResponse = ApiResponse<CategoriesAchievement[]>;

export const getCategoriesAchievement = () => {
  return apiFetch<CategoriesAchievementResponse>("/achievements/categories");
};

export const getAchievements = (URLSegment: string) => {
  return apiFetch<AchievementsResponse>(`/achievements`, {
    params: {
      URLSegment,
    },
  });
};
