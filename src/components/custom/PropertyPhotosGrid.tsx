"use client";

import { Photo } from "../../../types/api-types";

import Image from "next/image";
import CarouselImage from "./CarouselImage";
import { useState } from "react";
import ModalImage from "./ModalImage";

interface PropertyPhotosGridProps {
  photos: Photo[];
}

const PropertyPhotosGrid = ({ photos }: PropertyPhotosGridProps) => {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const remainingPhotos = photos.length - 3;

  const handleImageClick = (index: number) => {
    setFullscreenIndex(index);
    setShowFullscreen(true);
  };
  return (
    <>
      <div className="lg:col-span-4 flex flex-col lg:grid lg:grid-cols-4 gap-6 w-full">
        {/* Main Image Carousel */}
        <div className="lg:col-span-3 rounded-3xl w-full overflow-hidden hover:cursor-pointer">
          <CarouselImage images={photos} onImageClick={handleImageClick} imageStyle="w-full aspect-video lg:h-120 object-cover" />
        </div>

        {/* Thumbnail Grid */}
        <div className="w-full grid grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 gap-4 lg:gap-6 lg:h-120">
          {photos.slice(1, 4).map((photo, idx) => {
            const isLastItem = idx === 2;
            const shouldShowOverlay = isLastItem && remainingPhotos > 0;

            return (
              <div key={photo.ID} className="relative aspect-square lg:aspect-auto lg:h-full">
                <Image
                  src={photo.MediumWebP ?? photo.Medium}
                  alt={photo.Title}
                  className={`w-full h-full rounded-2xl overflow-hidden cursor-pointer hover:opacity-75 transition-opacity object-cover ${shouldShowOverlay ? "blur-sm" : ""}`}
                  onClick={() => handleImageClick(idx + 1)}
                  width={200}
                  height={200}
                />

                {shouldShowOverlay && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl lg:rounded-3xl cursor-pointer" onClick={() => handleImageClick(idx + 1)}>
                    <span className="text-white text-label-xl sm:text-xl font-bold">Lihat Semua</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showFullscreen && photos && <ModalImage images={photos} initialIndex={fullscreenIndex} onClose={() => setShowFullscreen(false)} />}
    </>
  );
};

export default PropertyPhotosGrid;
