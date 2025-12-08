// components/HomeDynamicSections.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";
import { ArticleItem } from "../../../types/article-types";
import { TestimoniData } from "../../../types/testimoni-types";
import { Property } from "../../../types/property-types";
import SectionFallback from "./SectionFallback";

// dynamic import client-only components (ssr: false)
const PropertySliderPrimary = dynamic(() => import("@/components/custom/PropertySliderPrimary"), {
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 animate-pulse" />,
});
const PropertySlider = dynamic(() => import("@/components/custom/PropertySlider"), {
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 animate-pulse" />,
});
const NewsSlider = dynamic(() => import("@/components/custom/NewsSlider"), {
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 animate-pulse" />,
});
const TestimoniSlider = dynamic(() => import("@/components/custom/TestimoniSlider"), {
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 animate-pulse" />,
});
const Newsletter = dynamic(() => import("@/components/custom/NewsLetter"), {
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 animate-pulse" />,
});

interface HomeDynamicSectionsProps {
  dataNewPrimary?: Property[];
  dataPopulerSecondary?: Property[];
  dataNewSecondary?: Property[];
  dataNews?: ArticleItem[];
  dataTestimonies?: TestimoniData[];
}

export default function HomeDynamicSections({ dataNewPrimary, dataPopulerSecondary, dataNewSecondary, dataNews, dataTestimonies }: HomeDynamicSectionsProps) {
  return (
    <>
      {/* Proyek Baru */}
      <div className="w-full sm:pt-10 lg:py-10 py-10 px-6 lg:px-10 bg-gray-100">
        {dataNewPrimary?.length ? (
          <PropertySliderPrimary
            data={dataNewPrimary}
            Description="Rekomendasi terbaik untuk Anda. Dapatkan informasi proyek terkini mengenai rumah minimalis, ruko strategis, hingga apartment modern."
            Title="Proyek Baru"
          />
        ) : (
          <SectionFallback title="Proyek Baru" />
        )}
      </div>

      {/* Properti Terpopuler */}
      <div className="w-full flex flex-col items-center gap-6 py-10 px-6 lg:px-10">
        {dataPopulerSecondary?.length ? <PropertySlider Title="Properti Terpopuler" data={dataPopulerSecondary} link="/cari-properti" /> : <SectionFallback title="Properti Terpopuler" />}
      </div>

      {/* Properti Terbaru */}
      <div className="w-full flex flex-col items-center gap-6 py-10 px-6 lg:px-10">
        {dataNewSecondary?.length ? (
          <PropertySlider data={dataNewSecondary} Title="Properti Terbaru" link="/cari-properti/?OrderBy=5&sortRadio=on&SortField=Created&SortOrder=DESC" />
        ) : (
          <SectionFallback title="Properti Terbaru" />
        )}
      </div>

      {/* Berita Terbaru */}
      <div className="w-full flex flex-col items-center gap-6 py-10 px-6 lg:px-10">
        {dataNews?.length ? <NewsSlider Title="Berita Terbaru" data={dataNews} /> : <SectionFallback title="Berita Terbaru" />}
      </div>

      {/* Testimoni */}
      <div className="w-full flex flex-col items-center gap-6 py-10 px-6 lg:px-10">
        {dataTestimonies?.length ? <TestimoniSlider data={dataTestimonies} Title="Testimoni Mereka Tentang Brighton" /> : <SectionFallback title="Testimoni" />}
      </div>

      <div className="mx-4 mt-6 lg:mt-10 px-2 lg:px-6">
        <Newsletter />
      </div>
    </>
  );
}
