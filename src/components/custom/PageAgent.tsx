import SearchBarAgent from "@/components/custom/SearchBarAgent";
import AgentCardList from "@/components/custom/AgentCardList";
import AgentCitiesCarouselWrapper from "@/components/custom/AgentCitiesCarouselWrapper";
import ImageWithButton from "@/components/custom/ImageWithButton";
import { getCityAgent, getDataAgent, getListCityAgent, getListOffice } from "@/services/agent-service";
import { AgentParams } from "../../../types/agent-types";
import AgentFilterContainer from "./AgentFilterContainer";
import SearchEmpty from "./SearchEmpty";

interface AgentPageBaseProps {
  searchParams?: Promise<AgentParams>;
  citySlug?: string;
  officeSlug?: string;
}

export default async function AgentPageBase({ searchParams, citySlug, officeSlug }: AgentPageBaseProps) {
  const [dataListCity, dataListOffices, dataCity] = await Promise.all([getListCityAgent(), getListOffice(), getCityAgent()]);
  const search = (await searchParams) || {};

  const page = Number(search.page) || 1;
  const limit = 12;
  const start = (page - 1) * limit;

  let locationId: number | undefined;
  let officeId: number | string | undefined;

  if (citySlug) {
    const selectedCity = dataCity.Data.find((item) => item.Title?.toLowerCase().replace(/\s+/g, "-") === citySlug.toLowerCase());
    locationId = selectedCity?.ID;
  }

  if (officeSlug) {
    const selectedOffice = dataListOffices.Data.find((item) => item.Title?.toLowerCase().replace(/\s+/g, "-") === officeSlug.toLowerCase());
    officeId = selectedOffice?.ID;
  }

  const finalParams: AgentParams = {
    Start: start,
    Count: limit,
    ...(locationId ? { LocationID: locationId } : {}),
    ...(officeId ? { OfficeID: officeId } : {}),
    ...search,
  };

  const dataAgent = await getDataAgent(finalParams);

  return (
    <main className="w-full h-full">
      <SearchBarAgent params={search} citySlug={citySlug} officeSlug={officeSlug} />
      <div className="container max-w-7xl mx-auto px-4 lg:px-0 flex flex-col gap-4">
        <AgentFilterContainer citySlug={citySlug} officeSlug={officeSlug} params={search} CityData={dataListCity.Data} OfficeData={dataListOffices.Data} />
        <AgentCitiesCarouselWrapper datas={dataCity.Data} />
        {dataAgent?.Data?.length ? <AgentCardList agents={dataAgent} params={search} citySlug={citySlug} officeSlug={officeSlug} /> : <SearchEmpty />}
      </div>
      <div className="py-8 w-full">
        <ImageWithButton
          Size="lg"
          Variant="secondary"
          BtnTitle="Hubungi Customer Service Brigita"
          Title="Masih butuh info lain atau bantuan seputar jual, sewa, cari properti?"
          Img="https://cdn.brighton.co.id/Uploads/Images/18982156/KvQ90dz4/update-logo-RENIX-di-BrightonApp-02.webp"
        />
      </div>
    </main>
  );
}
