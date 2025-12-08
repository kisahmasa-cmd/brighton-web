import React from "react";
import HeroSearch from "./HeroSearch";
import Image from "next/image";
import ServicesMenu from "./ServicesMenu";
import { ShortcutsTypes } from "../../../types/shortcut-types";
import { BannerData } from "../../../types/banner-home";
import CarouselBanner from "./CarouselBanner";

export interface HomeHeaderProps {
  dataServices?: ShortcutsTypes[];
  dataBanner?: BannerData[];
}

export default function HomeHeader({ dataServices, dataBanner }: HomeHeaderProps) {
  return (
    <>
      {/* Container utama */}
      <div className="relative w-full md:mb-60">
        <div className="flex flex-col md:block">
          {/* HeroSearch - order 1 di mobile */}
          <div className="order-1 z-20 md:order-none mt-2 md:mt-0 md:absolute md:-bottom-[110px] md:left-1/2 md:-translate-x-1/2 w-full max-w-search px-2 md:px-4 pb-2">
            <HeroSearch />
          </div>

          {/* ServicesMenu - order 2 di mobile */}
          <div className="order-2 md:order-none px-2 md:mt-26 mb-4 md:mb-0 md:absolute md:top-full md:left-0 md:right-0 md:z-10">
            <ServicesMenu data={dataServices} />
          </div>

          {/* Banner - order 3 di mobile */}
          <div className="order-3 md:order-none md:px-6">
            <CarouselBanner data={dataBanner} />
            {/* image desktop */}
            <div></div>
            {/* <Image
              src="https://cdn.brighton.co.id/Uploads/Images/17755333/LHGHdPaO/banner-web-desktop-compressed.webp"
              alt="Banner"
              width={1920}
              height={420}
              priority
              className="w-full h-auto rounded-xl hidden md:block"
            /> */}
            {/* image mobile */}
            {/* <Image
              src="https://cdn.brighton.co.id/Uploads/Images/13596713/Oc24fRCQ/banner-web-mobile-20251-Medium.webp"
              alt="Banner"
              width={800}
              height={1200}
              priority
              className="w-full h-auto md:hidden block p-2"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
