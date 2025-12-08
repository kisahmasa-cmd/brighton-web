"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, ChevronDown, Search } from "lucide-react";
import { BusinessUnitData, BusinessUnitUrlParams, CityData } from "../../../types/business-unit-types";
import CityLocationCard from "./CityLocationCard";
import BusinessUnitCard from "./BusinessUnitCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UrlObject } from "url";
import { ParsedUrlQueryInput } from "querystring";

type TabValueType = "kota" | "bisnis-unit";

interface LocationSelectorClientProps {
  initialTab?: TabValueType;
  citiesData: CityData[];
  businessUnitsData: BusinessUnitData[];
  citiesFilter?: CityData[];
  urlParams: BusinessUnitUrlParams;
}

export default function LocationSelectorClient({ initialTab = "bisnis-unit", citiesData, businessUnitsData, citiesFilter, urlParams }: LocationSelectorClientProps) {
  const [activeTab, setActiveTab] = useState<TabValueType>(initialTab);
  const [keyword, setKeyword] = useState(urlParams.Keyword ?? "");
  const [selectedSort, setSelectedSort] = useState<number | undefined>(urlParams.OrderBy);
  const [selectedSortUnit, setSelectedSortUnit] = useState<number | undefined>(urlParams.OrderByUnit);
  const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>(urlParams.LocationID);

  const [openCityId, setOpenCityId] = useState<number | null>(null);
  const [openBusinessId, setOpenBusinessId] = useState<number | null>(null);

  const searchButtonLinkRef = useRef<HTMLAnchorElement>(null);

  const buildUrl = ({ orderByParam, orderByUnitParam, locationIdParam }: {orderByParam?: number, orderByUnitParam?: number, locationIdParam?: number}):UrlObject => {
    const query: ParsedUrlQueryInput = {};
    if (keyword !== "" || urlParams.Keyword) {
      query.Keyword = keyword ?? urlParams.Keyword;
    }
    if (activeTab === 'kota' && (orderByParam || urlParams.OrderBy)) {
      query.OrderBy = orderByParam ?? selectedSort ?? urlParams.OrderBy;
    }
    if (activeTab === 'bisnis-unit' && (orderByUnitParam || urlParams.OrderByUnit)) {
      query.OrderByUnit = orderByUnitParam ?? selectedSortUnit ?? urlParams.OrderByUnit;
    }
    if (activeTab === 'bisnis-unit' && (locationIdParam || urlParams.LocationID)) {
      query.LocationID = locationIdParam ?? selectedLocationId ?? urlParams.LocationID;
    }

    return {
      pathname: '/hubungi/alamat-kantor',
      query: query,
    };
  };

  const sortValues = ["Z-A", "A-Z", "Terbaru", "Terlama"];
  let sortLabel = "Urutkan";
  if (activeTab === "kota") {
    sortLabel = selectedSort ? sortValues[selectedSort - 1] : "Urutkan"
  } else {
    sortLabel = selectedSortUnit ? sortValues[selectedSortUnit - 1] : "Urutkan"
  }

  const cityFilterLabel = citiesFilter?.find((city) => city.ID === Number(selectedLocationId))?.Title ?? "Kota";

  function handleChangeSort(value: number) {
    if (activeTab === "kota") {
      setSelectedSort(value);
    } else {
      setSelectedSortUnit(value);
    }
  }

  function handleChangeCity(value: number) {
    setSelectedLocationId(value);
  }

  function handleChangeTab(tab: TabValueType) {
    setActiveTab(tab);
    if (tab === "kota") {
      setSelectedSort(urlParams.OrderBy);
      setSelectedSortUnit(undefined);
    } else {
      setSelectedSort(undefined);
      setSelectedSortUnit(urlParams.OrderByUnit);
      setSelectedLocationId(urlParams.LocationID);
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (searchButtonLinkRef.current) {
        searchButtonLinkRef.current.click()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lokasi Kantor Brighton</h1>
        <p className="text-gray-600">Temukan kantor dan unit bisnis kami di seluruh Indonesia</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Dropdown Urutkan */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-lg px-4 py-2 border border-gray-300 bg-white hover:border-gray-400">
                { sortLabel }
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Urutkan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortValues.map((item, index) => (
                <Link key={index} href={activeTab === "kota" ? buildUrl({orderByParam: index + 1}) : buildUrl({orderByUnitParam: index + 1}) } prefetch>
                  <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={() => handleChangeSort(index + 1)}>
                    {item}
                    {selectedSort === (index + 1) && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Dropdown Kota */}
          {activeTab === "bisnis-unit" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-lg px-4 py-2 border border-gray-300 bg-white hover:border-gray-400">
                  { cityFilterLabel }
                  <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Kota</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {citiesFilter?.map((item, index) => (
                  <Link key={index} href={buildUrl({locationIdParam: item.ID})} prefetch>
                    <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={() => handleChangeCity(item.ID)}>
                      {item.Title}
                      {selectedLocationId === item.ID && <Check className="w-4 h-4" />}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>

        <div className="flex w-full sm:w-2/5 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input type="search" placeholder="Cari lokasi atau unit bisnis..." name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleSearchKeyDown} className="pl-10 w-full" />
          </div>

          {/* Gunakan Link untuk navigasi */}
          <Link ref={searchButtonLinkRef} href={buildUrl({})} prefetch>
            <Button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6">
              Cari
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <Button
          onClick={() => handleChangeTab("kota")}
          className={`flex-1 rounded-full py-6 text-base font-semibold transition-all shadow-md ${
            activeTab === "kota" ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          Kota ({citiesData.length})
        </Button>
        <Button
          onClick={() => handleChangeTab("bisnis-unit")}
          className={`flex-1 rounded-full py-6 text-base font-semibold transition-all ${
            activeTab === "bisnis-unit" ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          }`}
        >
          Unit Bisnis ({businessUnitsData.length})
        </Button>
      </div>

      {/* Data Grid */}
      {activeTab === "kota" ? (
        citiesData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada data kota ditemukan.</p>
            {urlParams.Keyword && (
              <Link href="/hubungi/alamat-kantor">
                <Button variant="link" className="text-yellow-600 hover:text-yellow-700 mt-4">
                  Lihat semua lokasi
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citiesData.map((city) => (
              <CityLocationCard key={city.ID} city={city} isOpen={openCityId === city.ID} onToggle={() => setOpenCityId((prev) => (prev === city.ID ? null : city.ID))} />
            ))}
          </div>
        )
      ) : businessUnitsData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada data unit bisnis ditemukan.</p>
          {urlParams.Keyword && (
            <Link href="/hubungi/alamat-kantor">
              <Button variant="link" className="text-yellow-600 hover:text-yellow-700 mt-4">
                Lihat semua unit bisnis
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessUnitsData.map((unit) => (
            <BusinessUnitCard key={unit.ID} businessUnit={unit} isOpen={openBusinessId === unit.ID} onToggle={() => setOpenBusinessId((prev) => (prev === unit.ID ? null : unit.ID))} />
          ))}
        </div>
      )}
    </div>
  );
}
