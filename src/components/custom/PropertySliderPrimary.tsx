import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import CardPropertyPrimary from "./CardPropertyPrimary";
import { Property } from "../../../types/property-types";
import Link from "next/link";

interface PropertyPrimarySliderProps {
  data?: Property[];
  Title: string;
  Description: string;
}

export default function PropertySliderPrimary(props: PropertyPrimarySliderProps) {
  const datas = props.data;
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-stretch items-center gap-10 md:pt-28 lg:pt-12 pt-0">
      <div className="lg:w-1/4 w-full h-full flex flex-col gap-5 text-center lg:text-left justify-between">
        <h2 className="text-3xl font-extrabold w-full">{props.Title}</h2>
        <p className="font-normal">{props.Description}</p>
        <div className="sm:block hidden">
          <Link href={"/perumahan-baru"} className="bg-secondary rounded-full font-bold text-label-4xl text-white px-8 py-2">
            Lihat Semua
          </Link>
        </div>
      </div>
      <div className="lg:w-3/4 w-full">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {datas?.map((data, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 pb-4">
                <CardPropertyPrimary data={data}></CardPropertyPrimary>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 cursor-pointer shadow-lg" />
          <CarouselNext className="right-0 translate-x-1/2 cursor-pointer shadow-lg" />
        </Carousel>
      </div>
      <div className="sm:hidden block">
        <Link href={"/perumahan-baru"} className="bg-secondary rounded-full font-bold text-label-4xl text-white px-8 py-2">
          Lihat Semua
        </Link>
      </div>
    </div>
  );
}
