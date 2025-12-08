import LocationSelector from "@/components/custom/LocationSelector";
import { getBusinessCity, getBusinessUnit, getOfficeCities } from "@/services/business-unit-service";
import { Metadata } from "next";
import { BusinessUnitUrlParams } from "../../../../../types/business-unit-types";

interface PageProps {
  searchParams: Promise<BusinessUnitUrlParams>;
}

// export async function generateMetadata({
//   searchParams,
// }: PageProps): Promise<Metadata> {
//   const { Keyword = "" } = await searchParams;
//   const title = Keyword
//     ? `Pencarian "${Keyword}" | Alamat Kantor Brighton Real Estate Indonesia`
//     : "Alamat Kantor & Unit Bisnis | Brighton Real Estate Indonesia";

//   const description = Keyword
//     ? `Temukan alamat kantor dan unit bisnis Brighton Real Estate Indonesia untuk kata kunci "${Keyword}".`
//     : "Temukan semua alamat kantor dan unit bisnis Brighton Real Estate Indonesia di seluruh Indonesia.";

//   return { title, description };
// }

export default async function Page({ searchParams }: PageProps) {
  const { Keyword = "", OrderBy, OrderByUnit, LocationID } = await searchParams;

  const [dataUnit, dataOfficeLocation, dataOfficeCities] = await Promise.all([getBusinessUnit({ Keyword, OrderByUnit, LocationID }), getBusinessCity({ Keyword, OrderBy }), getOfficeCities()]);

  const urlParams: BusinessUnitUrlParams = { Keyword, OrderBy, OrderByUnit, LocationID };

  return (
    <main className="container mx-auto px-2 py-8">
      <LocationSelector initialTab="bisnis-unit" citiesData={dataOfficeLocation.Data} businessUnitsData={dataUnit.Data} citiesFilter={dataOfficeCities.Data} urlParams={urlParams} />{" "}
    </main>
  );
}
