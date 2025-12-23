import { ActivityData } from "../../../types/activity-types";

export async function activityLogServer(data: ActivityData) {
  try {
    const res = await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      console.error("Activity log failed:", res.status);
      return null;
    }

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Activity log error:", err);
    return null;
  }
}
