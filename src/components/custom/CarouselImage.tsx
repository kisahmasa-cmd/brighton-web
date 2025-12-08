"use client"

import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "../../../types/api-types";

interface CarouselImageProps {
  images?: Photo[];
  limit?: number;
  onImageClick?: (index: number) => void;
  imageStyle?: string;
}

export default function CarouselImage({
  images,
  limit,
  onImageClick,
  imageStyle = "w-full h-full aspect-video object-cover",
}: CarouselImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Apply limit to images if provided
  const displayImages = useMemo(() => {
    if (!images) return [];
    if (!Array.isArray(images)) return [images];
    if (!limit || limit <= 0) return images;
    return images.slice(0, limit);
  }, [images, limit]);

  const imagesLength = displayImages.length;

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesLength - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesLength - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Don't render if no images
  if (imagesLength === 0) {
    return (
      <div className="w-full mx-auto">
        <div className="relative overflow-hidden">
          <Image
            src="/empty.png"
            alt="No image available"
            className="w-full h-full aspect-7/4 object-cover"
            width="400"
            height="200"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full mx-auto">
      <div className="relative overflow-hidden">
        {/* Carousel Content */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="min-w-full h-full flex flex-col items-center justify-center"
            >
              <Image
                src={image.MediumWebP ?? image.Medium ?? "/empty.png"}
                onClick={() => onImageClick && onImageClick(currentIndex)}
                alt="Gambar Property"
                className={imageStyle}
                width="400"
                height="200"
              ></Image>
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Only show if more than 1 image */}
        {imagesLength > 1 && (
          <>
            <div
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer p-1 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft
                size={20}
                strokeWidth={3}
                className="text-gray-800"
              />
            </div>

            <div
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer p-1 rounded-full shadow-lg transition-all"
            >
              <ChevronRight
                size={20}
                strokeWidth={3}
                className="text-gray-800"
              />
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {displayImages.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
