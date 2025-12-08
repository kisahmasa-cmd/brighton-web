"use client";

import dynamic from "next/dynamic";
import InputAgentOrderBy from "./InputAgentOrderBy";
import { AgentParams } from "../../../types/agent-types";
import { City } from "../../../types/location-types";

const InputAgentFilterDialog = dynamic(() => import("./InputAgentFilterDialog"), {
  ssr: false,
  loading: () => <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-lg" />,
});

interface Props {
  citySlug?: string;
  officeSlug?: string;
  params: AgentParams;
  CityData?: City[];
  OfficeData?: City[];
}

export default function AgentFilterContainer({ citySlug, officeSlug, params, CityData, OfficeData }: Props) {
  return (
    <div className="py-2 w-full flex justify-between flex-wrap">
      <InputAgentFilterDialog citySlug={citySlug} officeSlug={officeSlug} params={params} CityData={CityData} OfficeData={OfficeData} />
      <InputAgentOrderBy params={params} CitySlug={citySlug} OfficeSlug={officeSlug} />
    </div>
  );
}
