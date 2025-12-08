import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import CardArticle from "./CardArticle";
import { ArticleItem } from "../../../types/article-types";
import Link from "next/link";

interface NewsSliderProps {
  data?: ArticleItem[];
  Title: string;
}

export default function NewsSlider(props: NewsSliderProps) {
  const dataNews = props.data || [];
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-extrabold sm:text-left text-center">{props.Title}</h2>
        <div className="sm:block hidden">
          <Link href={"/about/articles-all/"} className="bg-secondary rounded-full font-bold text-label-4xl text-white px-8 py-2">
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
            {dataNews?.map((data, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pb-4">
                <CardArticle data={data}></CardArticle>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 cursor-pointer shadow-lg" />
          <CarouselNext className="right-0 translate-x-1/2 cursor-pointer shadow-lg" />
        </Carousel>
      </div>
      <div className="sm:hidden block">
        <Link href={"/about/articles-all/"} className="bg-secondary rounded-full font-bold text-label-4xl text-white px-8 py-2">
          Lihat Semua
        </Link>
      </div>
    </div>
  );
}
