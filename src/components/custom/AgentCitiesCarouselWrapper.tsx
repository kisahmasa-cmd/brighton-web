import { CityData } from "../../../types/agent-types";
import AgentCitiesCarousel from "./AgentCitiesCarousel";

interface AgentCitiesCarouselWrapperProps {
  datas?: CityData[];
}

export default function AgentCitiesCarouselWrapper({ datas }: AgentCitiesCarouselWrapperProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1>Temukan Agen Brighton Terbaik di Lokasi Incaran Anda!</h1>
      <AgentCitiesCarousel datas={datas} />
    </div>
  );
}
