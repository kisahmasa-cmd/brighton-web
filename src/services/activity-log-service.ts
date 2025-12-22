import { ActivityData } from "../../types/activity-types";
import { apiFetch } from "./api";

export function saveActivityLog(data: ActivityData) {
  return apiFetch("/activity/save", {
    method: "POST",
    base: "api",
    body: JSON.stringify({ ClientID: "66cd8c1704c3597db1602520", Data: data }),
    withClientId: false,
    dynamic: true,
    withAccessToken: false,
  });
}
