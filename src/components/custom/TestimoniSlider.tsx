import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import CardTestimoni from "./CardTestimoni";
import { TestimoniData } from "../../../types/testimoni-types";
import Link from "next/link";

interface TestimoniSliderProps {
  data?: TestimoniData[];
  Title: string;
}

export default function TestimoniSlider({ data, Title }: TestimoniSliderProps) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-extrabold sm:text-left text-center">{Title}</h2>
        <div className="sm:block hidden">
          <Link href={"/testimoni"} className="bg-secondary rounded-full font-bold text-label-4xl text-white px-8 py-2">
            Lihat Semua
          </Link>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {data?.map((d, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 pb-4">
                <CardTestimoni data={d}></CardTestimoni>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 cursor-pointer shadow-lg" />
          <CarouselNext className="right-0 translate-x-1/2 cursor-pointer shadow-lg" />
        </Carousel>
      </div>
      <div className="sm:hidden block">
        <Link href={"/testimoni"} className="bg-secondary rounded-full font-bold text-label-4xl text-white px-8 py-2">
          Lihat Semua
        </Link>
      </div>
    </div>
  );
}
