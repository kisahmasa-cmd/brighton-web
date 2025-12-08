import { PropertyParams } from "../types/property-types";
import { formatSlug } from "./formatSlug";
import { getCities, getDistricts, getProvinces } from "@/services/location-service";
import { getType } from "@/services/property-service";

export async function buildPropertySlug(search: PropertyParams, slug: string[]) {
  // Get all location data for comparison
  const [provincesData, typesData] = await Promise.all([getProvinces(), getType()]);

  const provinces = provincesData.Data || [];
  const types = typesData.Data?.Type || [];
  const presetParams: PropertyParams = { ...search };
  let isNotFound = false;
  let slugIndex = 0;

  // Check if first slug is a property type (match by Title converted to slug)
  const matchedType = types.find((type) => formatSlug(type.value) === slug[slugIndex]?.toLowerCase());

  if (matchedType) {
    presetParams.Type = matchedType.value;
    slugIndex++;
  } else if (slug[slugIndex]?.toLowerCase() === "properti") {
    // If first slug is "properti", skip it (it's just a placeholder for no type)
    slugIndex++;
  } else {
    // If first slug is neither a type nor "properti", return 404
    isNotFound = true;
  }

  // Check remaining slugs for location
  if (slug.length > slugIndex) {
    const address1 = slug[slugIndex];
    const address2 = slug[slugIndex + 1];

    // First, try to match address1 as a Province (by Title converted to slug)
    const matchedProvince = provinces.find((prov) => formatSlug(prov.Title) === address1?.toLowerCase());

    if (matchedProvince) {
      // address1 is a Province
      presetParams.ProvinceID = matchedProvince.ID;
      presetParams.ProvinceSlug = formatSlug(matchedProvince.Title);
      presetParams.ProvinceTitle = matchedProvince.Title;
    } else {
      // address1 is not a province, try as City
      let foundCity = false;

      const citiesData = await getCities({ URLSegment: address1 });
      const cities = citiesData.Data || [];

      const matchedCity = cities.find((city) => formatSlug(city.Title) === address1?.toLowerCase());

      if (matchedCity) {
        // Only city, no district
        foundCity = true;
        presetParams.ProvinceID = matchedCity?.Province?.ID;
        presetParams.ProvinceSlug = formatSlug(matchedCity?.Province?.Title ?? "");
        presetParams.ProvinceTitle = matchedCity?.Province?.Title;
        presetParams.LocationID = matchedCity.ID;
        presetParams.LocationSlug = formatSlug(matchedCity.Title);
        presetParams.LocationTitle = matchedCity.Title;

        if (address2) {
          // address2 must be a district within this city
          const districtsData = await getDistricts({ LocationID: String(matchedCity.ID), URLSegment: address2 });
          const districts = districtsData.Data || [];

          const matchedDistrict = districts.find((dist) => formatSlug(dist.Title) === address2?.toLowerCase());

          if (matchedDistrict) {
            presetParams.AreaID = matchedDistrict.ID;
            presetParams.AreaSlug = formatSlug(matchedDistrict.Title);
            presetParams.AreaTitle = matchedDistrict.Title;
          } else {
            isNotFound = true;
          }
        }
      }

      if (!foundCity) {
        isNotFound = true;
      }
    }
  }

  const enhancedParams = presetParams;

  return {
    enhancedParams,
    isNotFound,
    typesData,
  };
}
