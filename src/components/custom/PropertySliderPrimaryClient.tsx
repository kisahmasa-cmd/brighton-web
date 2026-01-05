"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CardPropertyPrimary from "./CardPropertyPrimary";
import { Property } from "../../../types/property-types";

export default function PropertySliderPrimaryClient(dataProps: { data?: Property[] }) {
  const { data } = dataProps;
  return (
    <div className="lg:w-3/4 w-full">
      <Carousel>
        <CarouselContent>
          {data?.map((item, i) => (
            <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <CardPropertyPrimary data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2 cursor-pointer shadow-lg" />
        <CarouselNext className="right-0 translate-x-1/2 cursor-pointer shadow-lg" />
      </Carousel>
    </div>
  );
}
