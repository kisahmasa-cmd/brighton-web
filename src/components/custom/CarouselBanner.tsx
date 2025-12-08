"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "../../../types/api-types";
import { BannerData } from "../../../types/banner-home";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";
import Link from "next/link";

interface CarouselImageProps {
  data?: BannerData[];
  images?: Photo[];
  showControls?: boolean; // tambahan: untuk kontrol tampil/tidak
}

export default function CarouselBanner({ images = [], showControls = true, data }: CarouselImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesLength = data?.length ?? 0;
  const isMobile = typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imagesLength - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagesLength - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const shouldShowControls = showControls && imagesLength > 1;

  return (
    <div className="w-full mx-auto">
      <div className="relative overflow-hidden">
        {/* Carousel Content */}
        <div className="flex transition-transform md:max-h-full max-h-[600px] duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data?.map((image) => {
            return (
              <Link key={image.ID} href={removeBaseUrl(image.Link)} aria-label="Artikel Brighton Real Estate" className={`min-w-full h-full flex flex-col items-center justify-center p-2 md:p-0`}>
                <div></div>
                {isMobile ? (
                  <Image src={image?.PhotoMobile?.MediumWebP ?? "/empty.png"} alt="Banner" width={800} height={500} priority fetchPriority="high" className="w-full object-cover md:hidden block" />
                ) : (
                  <Image
                    src={image.Photo.OriginalWebP ?? "/empty.png"}
                    alt="Banner"
                    width={1920}
                    height={420}
                    priority
                    fetchPriority="high"
                    className="w-full aspect-34/10 object-cover rounded-xl hidden md:block"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        {shouldShowControls && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer p-1 rounded-full shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={3} className="text-gray-800" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer p-1 rounded-full shadow-lg transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={3} className="text-gray-800" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {shouldShowControls && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {data?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
