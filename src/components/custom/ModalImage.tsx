"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {Photo} from "../../../types/api-types";

interface ModalImageProps {
  images: Photo[];
  initialIndex: number;
  onClose: () => void;
}

const ModalImage = ({
  images,
  initialIndex,
  onClose,
}: ModalImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:bg-white/10 p-3 rounded-full z-10 transition-colors hover:cursor-pointer"
        aria-label="Close"
      >
        <X className="w-7 h-7" />
      </button>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-4 rounded-full z-10 transition-colors hover:cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-4 rounded-full z-10 transition-colors hover:cursor-pointer"
        aria-label="Next"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="relative w-full h-full max-w-[90%] max-h-[90%]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        <Image
          src={images[currentIndex]?.OriginalWebP ?? images[currentIndex]?.Original}
          alt={images[currentIndex]?.Title}
          className={`object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          fill
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg font-medium bg-black/50 px-6 py-3 rounded-lg backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ModalImage;