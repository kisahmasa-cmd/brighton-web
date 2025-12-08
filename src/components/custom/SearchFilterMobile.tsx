"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PropertyInfo, PropertyParams } from "../../../types/property-types";
import InputPropertyType from "@/components/custom/InputPropertyType";
import InputPropertyPriceRange from "@/components/custom/InputPropertyPriceRange";
import InputPropertyFilterDialog from "@/components/custom/InputPropertyFilterDialog";
import InputPropertyOrderBy from "@/components/custom/InputPropertyOrderBy";
import { buildPropertyUrl } from "../../../utils/buildPropertyUrl";
import Link from "next/link";
import { formatSlug } from "../../../utils/formatSlug";
import { slugReadable } from "../../../utils/slugReadable";

interface SearchFilterMobileProps {
  propertyInfo?: PropertyInfo;
  category?: string;
  params?: PropertyParams;
  lastSlug?: string | undefined;
}

export default function SearchFilterMobile({ propertyInfo, category = "dijual", params, lastSlug }: SearchFilterMobileProps) {
  const [activeTab, setActiveTab] = useState(category);
  const [searchFocused, setSearchFocused] = useState(false);
  const [keyword, setKeyword] = useState(params?.Keyword || lastSlug || "");
  const [type, setType] = useState(params?.Type || "");
  const [priceMin, setPriceMin] = useState<number | null>(params?.PriceMin ?? null);
  const [priceMax, setPriceMax] = useState<number | null>(params?.PriceMax ?? null);

  // Sync with params when they change
  useEffect(() => {
    setActiveTab(category);
  }, [category]);

  useEffect(() => {
    setKeyword(params?.Keyword || lastSlug || "");
    setType(params?.Type || "");
    setPriceMin(params?.PriceMin ?? null);
    setPriceMax(params?.PriceMax ?? null);
  }, [params?.Keyword, params?.Type, params?.PriceMin, params?.PriceMax, lastSlug]);

  const updatedParams: PropertyParams = {
    ...params,
    page: undefined,
    Keyword: keyword || lastSlug || undefined,
    Type: type || undefined,
    PriceMin: priceMin ? Number(priceMin) : undefined,
    PriceMax: priceMax ? Number(priceMax) : undefined,
  };

  const { pathname, query } = buildPropertyUrl(activeTab, updatedParams);

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-600" />
        <Input
          type="text"
          placeholder="Lokasi, kata kunci, area, proyek, pengembangan ..."
          value={slugReadable(keyword)}
          onChange={(e) => setKeyword(e.target.value)}
          className={`pl-12 pr-4 py-6.5 border-0 rounded-full placeholder:italic placeholder:text-black-100 shadow transition-all ${searchFocused ? "bg-white border border-gray-300" : "bg-primary"}`}
          onFocus={() => setSearchFocused(true)}
        />
      </div>

      {/* Search Button - Animated */}
      <div className={`transition-all duration-500 ease-out ${searchFocused ? "opacity-100 max-h-20 translate-y-0 mb-3" : "opacity-0 max-h-0 -translate-y-4 pointer-events-none overflow-hidden"}`}>
        <Link
          href={{
            pathname,
            query,
          }}
        >
          <Button className="w-full text-lg font-semibold py-6 rounded-full shadow">Cari</Button>
        </Link>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab("dijual")}
          className={`flex-1 py-1.5 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === "dijual" ? "bg-primary shadow" : "bg-white border border-gray-400"}`}
        >
          Dijual
        </button>
        <button
          onClick={() => setActiveTab("disewa")}
          className={`flex-1 py-1.5 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === "disewa" ? "bg-primary shadow" : "bg-white border border-gray-400"}`}
        >
          Disewa
        </button>
      </div>

      {/* Filter Buttons Row */}
      <div className="flex gap-2 pb-2">
        {/* Perkantoran Dropdown */}
        <InputPropertyType propertyTypes={propertyInfo?.Type} isMobile={true} value={formatSlug(type)} onChangeAction={setType} enableAll={true} />

        {/* Harga Dropdown */}
        <InputPropertyPriceRange
          isMobile={true}
          valueMin={priceMin}
          valueMax={priceMax}
          onChange={(min, max) => {
            setPriceMin(min);
            setPriceMax(max);
          }}
        />

        {/* Filter Dialog */}
        <InputPropertyFilterDialog isMobile={true} propertyTypes={propertyInfo?.Type} params={params} category={activeTab} />

        {/* Sort Button */}
        <InputPropertyOrderBy params={params} category={activeTab} isIcon={true} />
      </div>
    </div>
  );
}
