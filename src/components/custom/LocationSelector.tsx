import { BusinessUnitData, BusinessUnitUrlParams, CityData } from "../../../types/business-unit-types";
import LocationSelectorClient from "./LocationSelectorClient";

interface LocationSelectorProps {
  initialTab?: "kota" | "bisnis-unit";
  citiesData: CityData[];
  businessUnitsData: BusinessUnitData[];
  citiesFilter?: CityData[];
  urlParams: BusinessUnitUrlParams;
}

export default function LocationSelector({ initialTab = "bisnis-unit", citiesData, businessUnitsData, citiesFilter, urlParams }: LocationSelectorProps) {
  return <LocationSelectorClient initialTab={initialTab} citiesData={citiesData} businessUnitsData={businessUnitsData} citiesFilter={citiesFilter} urlParams={urlParams} />;
}
