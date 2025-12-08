"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputPropertySearch from "@/components/custom/InputPropertySearch";
import { Developer, PropertyInfo, PropertyParams } from "../../../types/property-types";
import Link from "next/link";
import InputPropertyFilterDialogPrimary from "@/components/custom/InputPropertyFilterDialogPrimary";
import InputCityPrimary from "@/components/custom/InputCityPrimary";
import { trimKeyword } from "../../../utils/trimKeyword";

interface SearchFilterProps {
  propertyInfo?: PropertyInfo;
  params?: PropertyParams;
  developer?: Developer[];
}

export default function SearchFilterPrimary({ propertyInfo, params, developer }: SearchFilterProps) {
  const isOverseas = params?.show === "overseas";
  const [activeTab, setActiveTab] = useState<number>(isOverseas ? 1 : 0);

  // Filter states
  const [keyword, setKeyword] = useState(params?.Keyword ?? "");
  const [locationID, setLocationID] = useState(params?.LocationID?.toString() ?? "");

  // Sync all state with params when params change
  useEffect(() => {
    setKeyword(params?.Keyword ?? "");
    setLocationID(params?.LocationID?.toString() ?? "");
  }, [params]);

  // Sync activeTab with category
  useEffect(() => {
    setActiveTab(isOverseas ? 1 : 0);
  }, [isOverseas]);

  // Handle location change from InputCityPrimary
  const handleLocationChange = (value: string) => {
    setLocationID(value);
  };

  // Handle overseas change from filter dialog
  const handleOverseasChange = (overseas: number) => {
    setActiveTab(overseas);
    setLocationID(""); // Clear location when switching
  };

  const buildParams = () => {
    return {
      ...params,
      page: undefined,
      Keyword: trimKeyword(keyword) || undefined,
      LocationID: locationID ? Number(locationID) : undefined,
      show: activeTab === 1 ? "overseas" : undefined,
    };
  };

  const queryParams = Object.fromEntries(Object.entries(buildParams()).filter(([_, v]) => v !== undefined && v !== ""));

  return (
    <div className="flex-1 bg-white rounded-full shadow-lg flex items-center pl-2 pr-3 py-2.5 gap-2">
      {/* Search Input */}
      <div className="flex-1 px-4">
        <InputPropertySearch isPrimary={true} category={"perumahan-baru"} onChange={setKeyword} params={queryParams} />
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-gray-200" />

      {/* Property Type Dropdown */}
      <div className="min-w-35">
        <InputCityPrimary defaultCity={locationID} overseas={activeTab} onChange={handleLocationChange} />
      </div>

      {/* Divider */}
      <div className="h-8 w-px bg-gray-200" />

      {/* Filter Button */}
      <InputPropertyFilterDialogPrimary
        propertyTypes={propertyInfo?.Type || []}
        developer={developer}
        params={params}
        onLocationChange={handleLocationChange}
        onOverseasChange={handleOverseasChange}
      />

      {/* Divider */}
      <div className="h-8 w-px bg-gray-200" />

      {/* Search Button */}
      <Link
        href={{
          pathname: `/perumahan-baru`,
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
