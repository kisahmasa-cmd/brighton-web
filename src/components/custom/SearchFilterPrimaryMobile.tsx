"use client";

import React, {useEffect, useState} from 'react';
import {Search} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Developer, PropertyInfo, PropertyParams} from "../../../types/property-types";
import InputPropertyOrderBy from "@/components/custom/InputPropertyOrderBy";
import Link from "next/link";
import InputCityPrimary from "@/components/custom/InputCityPrimary";
import InputPropertyFilterDialogPrimary from "@/components/custom/InputPropertyFilterDialogPrimary";

interface SearchFilterMobileProps {
  propertyInfo?: PropertyInfo,
  params?: PropertyParams,
  developer?: Developer[]
}

export default function SearchFilterMobile({
  propertyInfo,
  params,
  developer
}: SearchFilterMobileProps) {
  const isOverseas = params?.show === "overseas";
  const [activeTab, setActiveTab] = useState(isOverseas ? 1 : 0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [keyword, setKeyword] = useState(params?.Keyword || "");
  const [type, setType] = useState(params?.Type || "");
  const [locationID, setLocationID] = useState(params?.LocationID?.toString() ?? "");

  // Sync with params when they change
  useEffect(() => {
    setActiveTab(isOverseas ? 1 : 0);
  }, [isOverseas]);

  useEffect(() => {
    setKeyword(params?.Keyword || "");
    setType(params?.Type || "");
    setLocationID(params?.LocationID?.toString() ?? "");
  }, [params]);

  // Handle location change
  const handleLocationChange = (value: string) => {
    setLocationID(value);
    setSearchFocused(true);
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
      Keyword: keyword || undefined,
      Type: type || undefined,
      LocationID: locationID ? Number(locationID) : undefined,
      show: activeTab === 1 ? 'overseas' : undefined
    };
  };

  const queryParams = Object.fromEntries(
    Object.entries(buildParams()).filter(([_, v]) => v !== undefined && v !== "")
  );

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-600"/>
        <Input
          type="text"
          placeholder="Lokasi, kata kunci, area, proyek, pengembangan ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={`pl-12 pr-4 py-6.5 border-0 rounded-full placeholder:italic placeholder:text-black-100 shadow transition-all ${
            searchFocused
              ? 'bg-white border border-gray-300'
              : 'bg-primary'
          }`}
          onFocus={() => setSearchFocused(true)}
        />
      </div>

      {/* Search Button - Animated */}
      <div className={`transition-all duration-500 ease-out ${
        searchFocused
          ? 'opacity-100 max-h-20 translate-y-0 mb-3'
          : 'opacity-0 max-h-0 -translate-y-4 pointer-events-none overflow-hidden'
      }`}>
        <Link
          href={{
            pathname: 'perumahan-baru',
            query: queryParams,
          }}
        >
          <Button className="w-full text-lg font-semibold py-6 rounded-full shadow">
            Cari
          </Button>
        </Link>
      </div>

      {/* Filter Buttons Row */}
      <div className="flex gap-2 pb-2">
        {/* Kota Dropdown */}
        <InputCityPrimary
          defaultCity={locationID}
          isMobile={true}
          overseas={activeTab}
          onChange={handleLocationChange}
        />

        {/* Filter Dialog */}
        <InputPropertyFilterDialogPrimary
          isMobile={true}
          propertyTypes={propertyInfo?.Type}
          params={params}
          developer={developer}
          onLocationChange={handleLocationChange}
          onOverseasChange={handleOverseasChange}
        />

        {/* Sort Button */}
        <InputPropertyOrderBy category="perumahan-baru" params={params} isIcon={true} options={[
          {label: "A-Z", sortField: "Title", sortOrder: "ASC"},
          {label: "Z-A", sortField: "Title", sortOrder: "DESC"},
          {label: "Terbaru", sortField: "Created", sortOrder: "DESC"},
          {label: "Terlama", sortField: "Created", sortOrder: "ASC"}
        ]}/>
      </div>
    </div>
  );
}