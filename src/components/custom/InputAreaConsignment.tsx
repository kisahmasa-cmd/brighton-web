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
import {getAreaConsignment} from "@/services/location-service";
import {Area} from "../../../types/consignment-types";
import {SelectItem} from "@/components/ui/select";

interface InputLocationProps {
  isMobile?: boolean,
  style?: string,
  onChange?: (value: string) => void,
  value?: string,
  className?: string,
  overseas?: number,
  enableAll?: boolean
}

export default function InputAreaConsignment({
  isMobile,
  style,
  onChange,
  value = "",
  overseas = 0,
  enableAll
}: InputLocationProps) {
  const [openArea, setOpenArea] = React.useState(false);
  const [selectedArea, setSelectedArea] = React.useState(value);
  const [areas, setCities] = React.useState<Area[]>([]);
  const [loadingCities, setLoadingCities] = React.useState(true);

  React.useEffect(() => {
    setSelectedArea(value);
  }, [value]);

  // Fetch areas when province changes (including from props)
  React.useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      const Area = await getAreaConsignment();
      setCities(Area);
      setLoadingCities(false);
    };
    fetchCities();
  }, [overseas]);

  // Handle Area selection
  const handleAreaSelect = async (value: string) => {
    setSelectedArea(value);
    setOpenArea(false);

    const Area = areas.find((c) => c.ID.toString() === value);
    if (Area) {
      onChange?.(value);
    } else if (value === "all") {
      onChange?.("");
    }
  };

  const getAreaLabel = () => {
    const Area = areas.find((c) => c.ID.toString() === selectedArea);
    return Area?.Title || "Pilih Lokasi/Daerah";
  };

  const handleSelectAll = () => {
    if (enableAll) {
      return <SelectItem value="all" className="px-3 py-2 font-semibold">Semua Area</SelectItem>
    }
  }

  return (
    <>
      <Popover open={openArea} onOpenChange={setOpenArea}>
        <PopoverTrigger asChild>
          <Button
            size={isMobile ? "sm" : "default"}
            variant={isMobile ? "outline" : "ghost"}
            role="combobox"
            aria-expanded={openArea}
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
                {getAreaLabel()}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opaArea-50"/>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Cari area..."/>
            <CommandList>
              <CommandEmpty>Area tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                {handleSelectAll()}
                {areas.map((Area) => (
                  <CommandItem
                    key={Area.ID}
                    value={Area.Title || ""}
                    onSelect={() => handleAreaSelect(Area.ID.toString())}
                  >
                    {Area.Title}
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