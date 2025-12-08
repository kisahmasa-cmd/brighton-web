import { formatSlug } from "./formatSlug";
import { PropertyParams } from "../types/property-types";

export function buildPropertyUrl(
  category: string,
  params: PropertyParams
): { pathname: string; query: Record<string, undefined> } {
  const slugParts: string[] = [category];

  // Add type or "properti" to the slug
  if (params.Type) {
    slugParts.push(formatSlug(params.Type));
  } else if (params.ProvinceSlug || params.LocationSlug || params.AreaSlug) {
    // If there's a location but no type, add "properti"
    slugParts.push("properti");
  }

  // Add location slugs
  if (params.AreaSlug) {
    // If district is specified, we need city or province first
    if (params.LocationSlug) {
      slugParts.push(params.LocationSlug);
    } else if (params.ProvinceSlug) {
      slugParts.push(params.ProvinceSlug);
    }
    slugParts.push(params.AreaSlug);
  } else if (params.LocationSlug) {
    // Only city
    slugParts.push(params.LocationSlug);
  } else if (params.ProvinceSlug) {
    // Only province
    slugParts.push(params.ProvinceSlug);
  }

  // Build pathname
  const pathname = slugParts.length > 1 ? `/${slugParts.join("/")}` : `/${category}`;

  // Build query params (exclude location/type info already in slug)
  const query: Record<string, undefined> = {};
  const excludeFromQuery = [
    "Type",
    "ProvinceID",
    "ProvinceTitle",
    "ProvinceSlug",
    "LocationID",
    "LocationTitle",
    "LocationSlug",
    "AreaID",
    "AreaTitle",
    "AreaSlug",
  ];

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && !excludeFromQuery.includes(key)) {
      query[key] = value;
    }
  });

  return { pathname, query };
}