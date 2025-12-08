"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ChevronDown, SlidersHorizontal} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, {useState, useEffect} from "react";
import {
  Developer,
  PropertyBasicInfo,
  PropertyParams,
} from "../../../types/property-types";
import Link from "next/link";
import InputCityPrimary from "@/components/custom/InputCityPrimary";
import InputDeveloper from "@/components/custom/InputDeveloper";
import {Checkbox} from "../ui/checkbox";
import {getGeolocation} from "../../../utils/getGeolocation";
import ActionClear from "@/components/custom/ActionClear";

interface InputFilterDialogProps {
  isMobile?: boolean,
  propertyTypes?: PropertyBasicInfo[] | undefined,
  params?: PropertyParams,
  developer?: Developer[] | undefined,
  onLocationChange?: (locationId: string) => void,
  onOverseasChange?: (overseas: number) => void
}

export default function InputPropertyFilterDialogPrimary({
  isMobile,
  propertyTypes = [],
  params,
  developer,
  onLocationChange,
  onOverseasChange
}: InputFilterDialogProps) {
  const isOverseas = params?.show === "overseas";
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter states
  const [activeTab, setActiveTab] = useState(isOverseas ? "1" : "0");
  const [type, setType] = useState<string>(params?.Type ?? "");
  const [locationID, setLocationID] = useState<string>(
    params?.LocationID?.toString() ?? "",
  );
  const [lBMin, setLBMin] = useState<string>(params?.LBMin?.toString() ?? "");
  const [lBMax, setLBMax] = useState<string>(params?.LBMax?.toString() ?? "");
  const [developerID, setDeveloperID] = useState<string>(
    params?.DeveloperID?.toString() ?? "",
  );
  const [isClosest, setIsClosest] = useState<boolean>(
    params?.SortField === "closest",
  );
  const [latitude, setLatitude] = useState<number | undefined>(
    isClosest ? params?.Latitude : undefined,
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    isClosest ? params?.Longitude : undefined,
  );

  // Get Current Locations
  useEffect(() => {
    getGeolocation((lat, long) => {
      setLatitude(lat);
      setLongitude(long);
    })
  }, []);

  // Sync all state with params when params change
  useEffect(() => {
    setType(params?.Type ?? "");
    setLocationID(params?.LocationID?.toString() ?? "");
    setLBMin(params?.LBMin?.toString() ?? "");
    setLBMax(params?.LBMax?.toString() ?? "");
    setDeveloperID(params?.DeveloperID?.toString() ?? "");
    setIsClosest(params?.SortField === "closest");
    setLatitude(params?.Latitude);
    setLongitude(params?.Longitude);
  }, [params]);

  // Sync activeTab with category
  useEffect(() => {
    const newTab = isOverseas ? "1" : "0";
    setActiveTab(newTab);
  }, [isOverseas]);

  // Handle location change and notify parent
  const handleLocationChange = (value: string) => {
    setLocationID(value);
    if (onLocationChange) {
      onLocationChange(value);
    }
  };

  // Handle overseas change and notify parent
  const handleOverseasChange = (value: string) => {
    setActiveTab(value);
    // Clear location when switching overseas/local
    setLocationID("");
    if (onOverseasChange) {
      onOverseasChange(Number(value));
    }
    if (onLocationChange) {
      onLocationChange("");
    }
  };

  const buildParams = () => {
    return {
      ...params,
      page: undefined,
      Type: type || undefined,
      LBMin: lBMin ? Number(lBMin) : undefined,
      LBMax: lBMax ? Number(lBMax) : undefined,
      LocationID: locationID ? Number(locationID) : undefined,
      DeveloperID: developerID ? Number(developerID) : undefined,
      SortField: isClosest ? "closest" : "distance",
      Latitude: isClosest ? latitude : undefined,
      Longitude: isClosest ? longitude : undefined,
      show: activeTab === "1" ? "overseas" : undefined,
    };
  };

  const queryParams = Object.fromEntries(
    Object.entries(buildParams()).filter(([_, v]) => v !== undefined && v !== ""),
  );

  return (
    <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
      <DialogTrigger asChild>
        <Button
          size={isMobile ? "sm" : "default"}
          variant={isMobile ? "outline" : "ghost"}
          className={
            isMobile
              ? "flex-1 rounded-lg bg-white border-0 shadow transition-shadow"
              : "rounded-full px-6 font-medium cursor-pointer"
          }
        >
          <SlidersHorizontal className="hidden sm:block mr-2 h-4 w-4"/>
          Filter
          <ChevronDown className="sm:hidden h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen sn:max-w-2xl sm:h-auto h-full flex flex-col gap-0 sm:max-h-[90vh] max-h-screen overflow-y-auto sm:rounded-lg rounded-none w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Filter</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-2.5 py-4 flex-1 overflow-y-auto sm:overflow-hidden">
          {/* Kategori */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Kategori</label>
            <div className="col-span-3">
              <Select value={activeTab} onValueChange={handleOverseasChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Lokal"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Lokal</SelectItem>
                  <SelectItem value="1">Luar Negeri</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Kota */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Kota</label>
            <div className="col-span-3">
              <InputCityPrimary
                defaultCity={locationID}
                style={"input"}
                withClear={true}
                overseas={Number(activeTab)}
                onChange={handleLocationChange}
              />
            </div>
          </div>

          {/* Pengembang */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Pengembang</label>
            <div className="col-span-3">
              <InputDeveloper
                style={"input"}
                developer={developer}
                withClear={true}
                defaultDeveloper={params?.DeveloperID?.toString()}
                onChange={setDeveloperID}
              />
            </div>
          </div>

          {/* Tipe */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium">Tipe</label>
            <div className="col-span-3">
              <ActionClear
                value={type}
                onClear={() => setType("")}
              >
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Tipe"/>
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes?.length > 0 ? (
                      propertyTypes?.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-400 text-sm">
                        Tidak ada data
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </ActionClear>
            </div>
          </div>

          {/* Sekitar Saya */}
          <div className="grid grid-cols-5 items-center">
            <label className="col-span-2 text-sm font-medium" htmlFor="nearMe">
              Sekitar Saya
            </label>
            <div className="col-span-3">
              <Checkbox
                id="nearMe"
                checked={isClosest}
                onCheckedChange={() => setIsClosest(!isClosest)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="font-bold px-8 rounded-full cursor-pointer"
            >
              Batal
            </Button>
          </DialogClose>
          <Link
            href={{
              pathname: `/perumahan-baru`,
              query: queryParams,
            }}
            onClick={() => setFilterOpen(false)}
          >
            <Button className="font-bold rounded-full text-black px-8 cursor-pointer">
              Cari
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}