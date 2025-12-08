"use client";

import * as React from "react";
import {ChevronsUpDown, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {getCitiesPrimary} from "@/services/location-service";
import {City} from "../../../types/location-types";
import {formatSlug} from "../../../utils/formatSlug";
import ActionClear from "@/components/custom/ActionClear";

interface InputLocationProps {
  isMobile?: boolean,
  style?: string,
  onChange?: (value: string, title: string, slug: string) => void,
  defaultCity?: string,
  className?: string,
  overseas?: number,
  withClear?: boolean
}

export default function InputCityPrimary({
  isMobile,
  style,
  onChange,
  defaultCity = "",
  overseas = 0,
  withClear = false
}: InputLocationProps) {
  const [openCity, setOpenCity] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState(defaultCity);
  const [cities, setCities] = React.useState<City[]>([]);
  const [loadingCities, setLoadingCities] = React.useState(true);

  // Ensure defaultCity syncs into state correctly
  React.useEffect(() => {
    if (defaultCity) setSelectedCity(defaultCity);
  }, [defaultCity]);

  // Fetch cities when component mounts
  React.useEffect(() => {
    async function fetchCities() {
      setLoadingCities(true);
      const res = await getCitiesPrimary(overseas);
      setCities(res.Data || []);
      setLoadingCities(false);
    }

    fetchCities();
  }, [overseas]);

  // Use memo so it updates when cities or selectedCity changes
  const getCityLabel = React.useMemo(() => {
    const city = cities.find((c) => c.ID.toString() === selectedCity);
    return city?.Title || "Pilih Kota";
  }, [cities, selectedCity]);

  const handleCitySelect = (value: string) => {
    setSelectedCity(value);
    setOpenCity(false);

    if (value === "") {
      onChange?.("", "", "");
      return false;
    }

    const city = cities.find((c) => c.ID.toString() === value);
    if (city) {
      onChange?.(value, city.Title, city.URLSegment ?? formatSlug(city.Title));
    } else if (value === "all") {
      onChange?.("", "", "");
    }
  };

  return (
    <>
      <ActionClear
        value={withClear ? selectedCity : ""}
        onClear={() => {
          handleCitySelect("");
        }}
        disabled={loadingCities}
      >
        <Popover open={openCity} onOpenChange={setOpenCity}>
          <PopoverTrigger asChild>
            <Button
              size={isMobile ? "sm" : "default"}
              variant={isMobile ? "outline" : "ghost"}
              role="combobox"
              aria-expanded={openCity}
              disabled={loadingCities}
              className={
                isMobile
                  ? "flex-1 rounded-lg bg-white border-0 shadow transition-shadow"
                  :
                  style === "input"
                    ? "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
                    : "w-full rounded-full px-6 text-gray-600 hover:text-gray-600 font-medium cursor-pointer"
              }
            >
              {loadingCities ? (
                <>
                  Loading...
                  <Loader2 className="h-4 w-4 animate-spin"/>
                </>
              ) : (
                <>
                  {getCityLabel}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0"
                          onWheel={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()} // For mobile
                          align="start">
            <Command>
              <CommandInput placeholder="Cari kota..."/>
              <CommandList>
                <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key={0}
                    value="all"
                    onSelect={() => handleCitySelect("all")}
                  >
                    Semua Kota
                  </CommandItem>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.ID}
                      value={city.Title}
                      onSelect={() => handleCitySelect(city.ID.toString())}
                    >
                      {city.Title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </ActionClear>
    </>
  );
}
