"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { CityData } from "../../../types/agent-types";

interface AgentCitiesCarouselProps {
  datas?: CityData[];
}

export default function AgentCitiesCarousel({ datas }: AgentCitiesCarouselProps) {
  return (
    <div>
      <Carousel>
        <CarouselContent className="-ml-1">
          {datas?.map((data, index) => {
            const imageUrl = data?.Photo?.MediumWebP ?? "https://dummyimage.com/300x200";

            return (
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5 pl-1">
                <Link href={data.URLSegment}>
                  <div className="relative h-20 md:h-40 rounded-2xl overflow-hidden cursor-pointer mx-2">
                    {/* Gambar */}
                    <Image src={imageUrl} alt={data?.Title} fill className="object-cover" sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* City Name */}
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                      <h3 className="text-white text-xs md:text-lg font-bold tracking-wide">{data?.Title}</h3>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious variant="link" size="xs" className="text-black -left-6" />
        <CarouselNext variant="link" size="xs" className="text-black -right-6" />
      </Carousel>
    </div>
  );
}
