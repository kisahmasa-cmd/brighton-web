"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputPropertySearch from "@/components/custom/InputPropertySearch";
import InputPropertyPriceRange from "@/components/custom/InputPropertyPriceRange";
import InputPropertyFilterDialog from "@/components/custom/InputPropertyFilterDialog";
import InputPropertyType from "@/components/custom/InputPropertyType";
import { PropertyInfo, PropertyParams } from "../../../types/property-types";
import Link from "next/link";
import { buildPropertyUrl } from "../../../utils/buildPropertyUrl";
import { formatSlug } from "../../../utils/formatSlug";
import { trimKeyword } from "../../../utils/trimKeyword";

interface SearchFilterProps {
  propertyInfo?: PropertyInfo;
  category?: string;
  params?: PropertyParams;
  lastSlug?: string | undefined;
}

export default function SearchFilter({ propertyInfo, category, params, lastSlug }: SearchFilterProps) {
  const [activeTab, setActiveTab] = useState(category ?? "dijual");
  const [keyword, setKeyword] = useState("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Sync all state with params when params change
  useEffect(() => {
    setKeyword(params?.Keyword ?? "");
    setPropertyType(params?.Type ?? "");
    setMinPrice(params?.PriceMin ?? null);
    setMaxPrice(params?.PriceMax ?? null);
  }, [params?.Keyword, params?.Type, params?.PriceMin, params?.PriceMax, lastSlug]);

  // Sync activeTab with category
  useEffect(() => {
    if (category) {
      setActiveTab(category);
    }
  }, [category]);

  const updatedParams: PropertyParams = {
      ...params,
      Type: propertyType || undefined,
      PriceMin: minPrice ? Number(minPrice) : undefined,
      PriceMax: maxPrice ? Number(maxPrice) : undefined,
      Keyword: trimKeyword(keyword) || lastSlug || undefined,
      page: undefined,
    };

  const { pathname, query: queryParams } = buildPropertyUrl(activeTab, updatedParams);

  return (
    <div className="flex-1 bg-white rounded-full shadow-lg flex items-center pl-2 pr-3 py-2.5 gap-2">
      {/* Search Input */}
      <div className="flex-1 px-4">
        <InputPropertySearch category={activeTab} params={params} onChange={setKeyword} lastSlug={lastSlug} />
      </div>

      <div className="h-8 w-px bg-gray-200" />

      {/* Dijual/Disewa Toggle */}
      <div className="flex bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setActiveTab("dijual")}
          className={`px-6 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${activeTab === "dijual" ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          Dijual
        </button>
        <button
          onClick={() => setActiveTab("disewa")}
          className={`px-6 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${activeTab === "disewa" ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          Disewa
        </button>
      </div>

      <div className="h-8 w-px bg-gray-200" />

      {/* Property Type */}
      <InputPropertyType propertyTypes={propertyInfo?.Type} value={formatSlug(propertyType)} onChangeAction={setPropertyType} enableAll={true} />

      <div className="h-8 w-px bg-gray-200" />

      {/* Price Range */}
      <InputPropertyPriceRange
        valueMin={Number(params?.PriceMin)}
        valueMax={Number(params?.PriceMax)}
        onChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
      />

      <div className="h-8 w-px bg-gray-200" />

      {/* Filter Button (Advanced) */}
      <InputPropertyFilterDialog params={params} propertyTypes={propertyInfo?.Type} category={activeTab} />

      <div className="h-8 w-px bg-gray-200" />

      {/* Search Button */}
      <Link
        href={{
          pathname,
          query: queryParams,
        }}
      >
        <Button className="w-25 bg-black hover:bg-gray-800 text-white rounded-full font-bold cursor-pointer">
          <Search className="h-5 w-5" />
          Cari
        </Button>
      </Link>
    </div>
  );
}
