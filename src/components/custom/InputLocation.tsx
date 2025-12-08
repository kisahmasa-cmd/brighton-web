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
import {
  getProvinces,
  getCitiesByProvince,
  getDistrictsByCity,
} from "@/services/location-service";
import {City, District, Province} from "../../../types/location-types";
import {formatSlug} from "../../../utils/formatSlug";
import ActionClear from "@/components/custom/ActionClear";

interface InputLocationProps {
  onProvinceChange?: (value: string, title: string, slug: string) => void;
  onCityChange?: (value: string, title: string, slug: string) => void;
  onDistrictChange?: (value: string, title: string, slug: string) => void;
  defaultProvince?: string;
  defaultCity?: string;
  defaultDistrict?: string;
  className?: string;
}

export default function InputLocation({
  onProvinceChange,
  onCityChange,
  onDistrictChange,
  defaultProvince = "",
  defaultCity = "",
  defaultDistrict = "",
  className,
}: InputLocationProps) {
  // Open states
  const [openProvince, setOpenProvince] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const [openDistrict, setOpenDistrict] = React.useState(false);

  // Selected values
  const [selectedProvince, setSelectedProvince] = React.useState(defaultProvince);
  const [selectedCity, setSelectedCity] = React.useState(defaultCity);
  const [selectedDistrict, setSelectedDistrict] = React.useState(defaultDistrict);

  // Data states
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [cities, setCities] = React.useState<City[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);

  // Loading states
  const [loadingProvinces, setLoadingProvinces] = React.useState(false);
  const [loadingCities, setLoadingCities] = React.useState(false);
  const [loadingDistricts, setLoadingDistricts] = React.useState(false);

  // Sync with default props when they change
  React.useEffect(() => {
    setSelectedProvince(defaultProvince);
  }, [defaultProvince]);

  React.useEffect(() => {
    setSelectedCity(defaultCity);
  }, [defaultCity]);

  React.useEffect(() => {
    setSelectedDistrict(defaultDistrict);
  }, [defaultDistrict]);

  // Fetch provinces on mount
  React.useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      const province = await getProvinces();
      setProvinces(province.Data);
      setLoadingProvinces(false);
    };
    fetchProvinces();
  }, []);

  // Fetch cities when province changes (including from props)
  React.useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvince) {
        setLoadingCities(true);
        const city = await getCitiesByProvince(Number(selectedProvince));
        setCities(city.Data);
        setLoadingCities(false);
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  // Fetch districts when city changes (including from props)
  React.useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCity) {
        setLoadingDistricts(true);
        const district = await getDistrictsByCity(Number(selectedCity));
        setDistricts(district.Data);
        setLoadingDistricts(false);
      } else {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [selectedCity]);

  // Handle province selection
  const handleProvinceSelect = async (value: string) => {
    setSelectedProvince(value);
    setSelectedCity("");
    setSelectedDistrict("");
    setOpenProvince(false);

    if (value === "") {
      // Clear dependent fields
      onProvinceChange?.("", "", "");
      onCityChange?.("", "", "");
      onDistrictChange?.("", "", "");
      return false;
    }

    const province = provinces.find((p) => p.ID.toString() === value);
    if (province) {
      onProvinceChange?.(value, province.Title, province.URLSegment ?? formatSlug(province.Title));
    }

    // Clear dependent fields
    onCityChange?.("", "", "");
    onDistrictChange?.("", "", "");
  };

  // Handle city selection
  const handleCitySelect = async (value: string) => {
    setSelectedCity(value);
    setSelectedDistrict("");
    setOpenCity(false);

    if (value === "") {
      // Clear dependent fields
      onCityChange?.("", "", "");
      onDistrictChange?.("", "", "");
      return false;
    }

    const city = cities.find((c) => c.ID.toString() === value);
    if (city) {
      onCityChange?.(value, city.Title, city.URLSegment ?? formatSlug(city.Title));
    }

    // Clear dependent field
    onDistrictChange?.("", "", "");
  };

  // Handle district selection
  const handleDistrictSelect = (value: string) => {
    setSelectedDistrict(value);
    setOpenDistrict(false);

    if (value === "") {
      // Clear dependent fields
      onDistrictChange?.("", "", "");
      return false;
    }

    const district = districts.find((d) => d.ID.toString() === value);
    if (district) {
      onDistrictChange?.(value, district.Title, district.URLSegment ?? formatSlug(district.Title));
    }
  };

  // Get display labels
  const getProvinceLabel = () => {
    const province = provinces.find((p) => p.ID.toString() === selectedProvince);
    return province?.Title || "Pilih Provinsi";
  };

  const getCityLabel = () => {
    const city = cities.find((c) => c.ID.toString() === selectedCity);
    return city?.Title || "Pilih Kota";
  };

  const getDistrictLabel = () => {
    const district = districts.find((d) => d.ID.toString() === selectedDistrict);
    return district?.Title || "Pilih Lokasi";
  };

  return (
    <div className={cn("space-y-2.5", className)}>
      {/* Province Select */}
      <div className="grid grid-cols-5 items-center">
        <label className="col-span-2 text-sm font-medium">Provinsi</label>
        <div className="col-span-3">
          <ActionClear
            value={selectedProvince}
            onClear={() => {
              handleProvinceSelect("");
            }}
            disabled={loadingProvinces}
          >
            <Popover open={openProvince} onOpenChange={setOpenProvince}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProvince}
                  className="w-full justify-between"
                  disabled={loadingProvinces}
                >
                  {loadingProvinces ? (
                    <>
                      Loading...
                      <Loader2 className="h-4 w-4 animate-spin"/>
                    </>
                  ) : (
                    <>
                      {getProvinceLabel()}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0"
                              align="start"
                              onWheel={(e) => e.stopPropagation()}
                              onTouchMove={(e) => e.stopPropagation()} // For mobile
                              style={{pointerEvents: 'auto'}}>
                <Command>
                  <CommandInput placeholder="Cari provinsi..."/>
                  <CommandList>
                    <CommandEmpty>Provinsi tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {provinces.map((province) => (
                        <CommandItem
                          key={province.ID}
                          value={province.Title}
                          onSelect={() => handleProvinceSelect(province.ID.toString())}
                        >
                          {province.Title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </ActionClear>
        </div>
      </div>

      {/* City Select */}
      <div className="grid grid-cols-5 items-center">
        <label className="col-span-2 text-sm font-medium">Kota</label>
        <div className="col-span-3">
          <ActionClear
            value={selectedProvince && selectedCity}
            onClear={() => {
              handleCitySelect("");
            }}
            disabled={loadingCities}
          >
            <Popover open={openCity} onOpenChange={setOpenCity}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCity}
                  className="w-full justify-between"
                  disabled={!selectedProvince || loadingCities}
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
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0"
                              align="start"
                              onWheel={(e) => e.stopPropagation()}
                              onTouchMove={(e) => e.stopPropagation()} // For mobile
                              style={{pointerEvents: 'auto'}}>
                <Command>
                  <CommandInput placeholder="Cari kota..."/>
                  <CommandList>
                    <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
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
        </div>
      </div>

      {/* District Select */}
      <div className="grid grid-cols-5 items-center">
        <label className="col-span-2 text-sm font-medium">Lokasi</label>
        <div className="col-span-3">
          <ActionClear
            value={selectedProvince && selectedCity && selectedDistrict}
            onClear={() => {
              handleDistrictSelect("");
            }}
            disabled={loadingDistricts}
          >
            <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDistrict}
                  className="w-full justify-between"
                  disabled={!selectedCity || loadingDistricts}
                >
                  {loadingDistricts ? (
                    <>
                      Loading...
                      <Loader2 className="h-4 w-4 animate-spin"/>
                    </>
                  ) : (
                    <>
                      {getDistrictLabel()}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0"
                              align="start"
                              onWheel={(e) => e.stopPropagation()}
                              onTouchMove={(e) => e.stopPropagation()} // For mobile
                              style={{pointerEvents: 'auto'}}>
                <Command>
                  <CommandInput placeholder="Cari lokasi..."/>
                  <CommandList>
                    <CommandEmpty>Lokasi tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {districts.map((district) => (
                        <CommandItem
                          key={district.ID}
                          value={district.Title}
                          onSelect={() => handleDistrictSelect(district.ID.toString())}
                        >
                          {district.Title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </ActionClear>
        </div>
      </div>
    </div>
  );
}