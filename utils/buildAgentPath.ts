import { formatSlug } from "./formatSlug";
export function buildAgentPath(city?: string, office?: string) {
  if (!city || city === "search") return "/agent/search";

  if (city.toLowerCase() === "all") {
    return `/agent/all${office ? `/${formatSlug(office)}` : ""}`;
  }

  return `/agent/${formatSlug(city)}${office ? `/${formatSlug(office)}` : ""}`;
}
