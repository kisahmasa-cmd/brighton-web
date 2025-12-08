"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal, Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AgentParams } from "../../../types/agent-types";
import { City } from "../../../types/location-types";
import { buildAgentPath } from "../../../utils/buildAgentPath";
import { getGeolocation } from "../../../utils/getGeolocation";

interface InputFilterDialogProps {
  params?: AgentParams;
  citySlug?: string;
  officeSlug?: string;
  CityData?: City[];
  OfficeData?: City[];
}

export default function InputPropertyFilterDialog({ CityData, params, OfficeData, citySlug, officeSlug }: InputFilterDialogProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [officeOpen, setOfficeOpen] = useState(false);
  const [allowedLocation, setAllowedLocation] = useState<{ lat: number; long: number } | null>(null);

  // Detect current city and office from slugs
  const currentCity = CityData?.find((city) => city.Title?.toLowerCase().replace(/\s+/g, "-") === citySlug?.toLowerCase());

  const currentOffice = OfficeData?.find((office) => office.Title?.toLowerCase().replace(/\s+/g, "-") === officeSlug?.toLowerCase());

  // Initialize state with current URL values
  const [keyword, setKeyword] = useState<string>(params?.Keyword ?? "");
  const [unit, setUnit] = useState<string>(currentOffice ? String(currentOffice.ID) : params?.OfficeID ? String(params.OfficeID) : "");
  const [city, setCity] = useState<string>(currentCity ? String(currentCity.ID) : params?.LocationID ? String(params.LocationID) : "");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [nearby, setNearby] = useState<boolean>(params?.Terdekat === true || params?.Terdekat === "true");

  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Ask location permission once when component mounts
    getGeolocation((lat, long) => {
      setAllowedLocation({ lat, long });
    });
  }, []);

  // Update state when URL changes
  useEffect(() => {
    setKeyword(params?.Keyword ?? "");

    const newCity = CityData?.find((city) => city.Title?.toLowerCase().replace(/\s+/g, "-") === citySlug?.toLowerCase());
    const newOffice = OfficeData?.find((office) => office.Title?.toLowerCase().replace(/\s+/g, "-") === officeSlug?.toLowerCase());

    if (newCity) {
      setCity(String(newCity.ID));
    } else if (params?.LocationID) {
      setCity(String(params.LocationID));
    } else {
      setCity("");
    }

    if (newOffice) {
      setUnit(String(newOffice.ID));
    } else if (params?.OfficeID) {
      setUnit(String(params.OfficeID));
    } else {
      setUnit("");
    }
  }, [params, citySlug, officeSlug, CityData, OfficeData]);

  const cities = CityData || [];
  const offices = OfficeData || [];

  // Build query params
  const buildQueryParams = () => {
    const queryParams: AgentParams = {};

    if (keyword) queryParams.Keyword = keyword;
    if (nearby) queryParams.Terdekat = true;
    if (latitude && longitude) {
      queryParams.Latitude = latitude;
      queryParams.Longitude = longitude;
    }

    return Object.fromEntries(Object.entries(queryParams).filter(([_, v]) => v !== undefined && v !== "" && v !== false));
  };

  useEffect(() => {
    if (params?.Terdekat === true || params?.Terdekat === "true") {
      setTimeout(() => setNearby(true), 10);
    }
  }, [params]);

  const handleReset = () => {
    setKeyword("");
    setUnit("");
    setCity("");
    setNearby(false);
  };

  return (
    <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full px-6 font-medium cursor-pointer">
          <SlidersHorizontal className="hidden sm:block mr-2 h-4 w-4" />
          Filter
          <ChevronDown className="sm:hidden h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            linkRef.current?.click();
          }
        }}
        className="max-w-screen sm:max-w-2xl sm:h-auto h-full flex flex-col gap-0 sm:max-h-[90vh] max-h-screen overflow-y-auto sm:rounded-lg rounded-none w-full"
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Filter</DialogTitle>
            <DialogClose className="sm:hidden" />
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4 flex-1 overflow-y-auto">
          {/* Keyword / Nama Agen */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Keyword / Nama Agen</label>
            <Input placeholder="Cari berdasarkan keyword / nama Agen" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full" />
          </div>

          {/* Unit with Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Unit</label>
            <Popover open={officeOpen} onOpenChange={setOfficeOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={officeOpen} className="w-full justify-between font-normal">
                  {unit ? offices.find((office) => String(office.ID) === unit)?.Title : "Pilih Kantor"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()} // For mobile
                style={{ pointerEvents: "auto" }}
              >
                <Command>
                  <CommandInput placeholder="Cari kantor..." />
                  <CommandList>
                    <CommandEmpty>Kantor tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {offices.map((office) => (
                        <CommandItem
                          key={office.ID}
                          value={office.Title}
                          onSelect={() => {
                            setUnit(String(office.ID));
                            setOfficeOpen(false);
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", unit === String(office.ID) ? "opacity-100" : "opacity-0")} />
                          {office.Title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Kota with Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Kota</label>
            <Popover open={cityOpen} onOpenChange={setCityOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={cityOpen} className="w-full justify-between font-normal">
                  {city ? cities.find((cityItem) => String(cityItem.ID) === city)?.Title : "Pilih Kota"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()} // For mobile
                style={{ pointerEvents: "auto" }}
              >
                <Command>
                  <CommandInput placeholder="Cari kota..." />
                  <CommandList>
                    <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {cities.map((cityItem) => (
                        <CommandItem
                          key={cityItem.ID}
                          value={cityItem.Title}
                          onSelect={() => {
                            setCity(String(cityItem.ID));
                            setCityOpen(false);
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", city === String(cityItem.ID) ? "opacity-100" : "opacity-0")} />
                          {cityItem.Title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Checkbox nearby */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="nearby"
              checked={nearby}
              onCheckedChange={(checked) => {
                const isChecked = checked as boolean;
                setNearby(isChecked);

                if (isChecked) {
                  // If location already allowed, use it
                  if (allowedLocation) {
                    setLatitude(allowedLocation.lat);
                    setLongitude(allowedLocation.long);
                  } else {
                    // If not yet allowed, request it again
                    getGeolocation((lat, long) => {
                      setLatitude(lat);
                      setLongitude(long);
                      setAllowedLocation({ lat, long });
                    });
                  }
                } else {
                  setLatitude(null);
                  setLongitude(null);
                }
              }}
            />
            <label htmlFor="nearby" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              Terdekat
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-auto">
          <Button variant="outline" className="font-bold px-8 rounded-full cursor-pointer" onClick={handleReset}>
            Reset
          </Button>

          {(() => {
            const selectedCity = cities.find((c) => String(c.ID) === city);
            const selectedOffice = offices.find((o) => String(o.ID) === unit);

            return (
              <DialogClose asChild>
                <Link
                  ref={linkRef}
                  href={{
                    pathname: buildAgentPath(selectedCity?.Title || citySlug || "all", selectedOffice?.Title),
                    query: buildQueryParams(),
                  }}
                  onClick={() => setFilterOpen(false)}
                >
                  <Button className="font-bold rounded-full text-black px-8 cursor-pointer bg-yellow-400 hover:bg-yellow-500">Cari</Button>
                </Link>
              </DialogClose>
            );
          })()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
