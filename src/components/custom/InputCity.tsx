"use client";

import * as React from "react";
import {ChevronsUpDown, Loader2} from "lucide-react";
import {cn} from "@/lib/utils";
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
import {getCities, getCitiesPrimary} from "@/services/location-service";
import {City} from "../../../types/location-types";
import {formatSlug} from "../../../utils/formatSlug";
import {SelectItem} from "@/components/ui/select";

interface InputLocationProps {
  isMobile?: boolean,
  style?: string,
  onChange?: (value: string, title: string, slug: string) => void,
  defaultCity?: string,
  className?: string,
  overseas?: number,
  enableAll?: boolean
}

export default function InputCity({
  isMobile,
  style,
  onChange,
  defaultCity = "",
  overseas = 0,
  enableAll
}: InputLocationProps) {
  const [openCity, setOpenCity] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState(defaultCity);
  const [cities, setCities] = React.useState<City[]>([]);
  const [loadingCities, setLoadingCities] = React.useState(true);

  React.useEffect(() => {
    setSelectedCity(defaultCity);
  }, [defaultCity]);

  // Fetch cities when province changes (including from props)
  React.useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      const city = await getCities({});
      setCities(city.Data);
      setLoadingCities(false);
    };
    fetchCities();
  }, [overseas]);

  // Handle city selection
  const handleCitySelect = async (value: string) => {
    setSelectedCity(value);
    setOpenCity(false);

    const city = cities.find((c) => c.ID.toString() === value);
    if (city) {
      onChange?.(value, city.Title, city.URLSegment ?? formatSlug(city.Title));
    } else if (value === "all") {
      onChange?.("", "", "");
    }
  };

  const getCityLabel = () => {
    const city = cities.find((c) => c.ID.toString() === selectedCity);

    if (city) {
      return city?.Title || "Pilih Kota";
    }

    const cityByTitle = cities.find((c) => c.Title === selectedCity);

    return cityByTitle?.Title || "Pilih Kota";
  };

  const handleSelectAll = () => {
    if (enableAll) {
      return <SelectItem value="all" onSelect={() => handleCitySelect("all")}>Semua Area</SelectItem>
    }
  }

  return (
    <>
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
                {getCityLabel()}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Cari kota..."/>
            <CommandList>
              <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                {handleSelectAll()}
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
    </>
  );
}