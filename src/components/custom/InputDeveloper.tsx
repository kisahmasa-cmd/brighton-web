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
import {Developer} from "../../../types/property-types";
import {getDeveloper} from "@/services/property-service";
import {ApiResponse} from "../../../utils/apiResponse";
import ActionClear from "@/components/custom/ActionClear";

interface InputDeveloperProps {
  isMobile?: boolean,
  style?: string,
  onChange?: (value: string) => void,
  defaultDeveloper?: string,
  className?: string,
  developer?: Developer[] | undefined,
  withClear?: boolean
}

export default function InputDeveloper({
  isMobile,
  style,
  onChange,
  defaultDeveloper = "",
  developer,
  withClear = false
}: InputDeveloperProps) {
  const [openDeveloper, setOpenDeveloper] = React.useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = React.useState(defaultDeveloper);
  const [developers, setDevelopers] = React.useState<Developer[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setSelectedDeveloper(defaultDeveloper);
  }, [defaultDeveloper]);

  // Fetch developers when province changes (including from props)
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!developer) {
        const dataDeveloper = await getDeveloper();
        setDevelopers(dataDeveloper.Data);
      } else {
        setDevelopers(developer);
      }
      setLoading(false);
    };
    fetchData();
  }, [developer]);

  // Handle Developer selection
  const handleDeveloperSelect = async (value: string) => {
    setSelectedDeveloper(value);
    setOpenDeveloper(false);

    if (value === "") {
      onChange?.("");
      return false;
    }

    const Developer = developers.find((c) => c.ID.toString() === value);
    if (Developer) {
      onChange?.(value);
    } else if (value === "all") {
      onChange?.("");
    }
  };

  const getDeveloperLabel = () => {
    const Developer = developers.find((c) => c.ID.toString() === selectedDeveloper);
    return Developer?.Nama || Developer?.Nama2 || "Pilih Pengembang";
  };

  return (
    <>
      <ActionClear
        value={withClear ? selectedDeveloper : ""}
        onClear={() => {
          handleDeveloperSelect("");
        }}
        disabled={loading}
      >
        <Popover open={openDeveloper} onOpenChange={setOpenDeveloper}>
          <PopoverTrigger asChild>
            <Button
              size={isMobile ? "sm" : "default"}
              variant={isMobile ? "outline" : "ghost"}
              role="combobox"
              aria-expanded={openDeveloper}
              disabled={loading}
              className={
                isMobile
                  ? "flex-1 rounded-lg bg-white border-0 shadow transition-shadow"
                  :
                  style === "input"
                    ? "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
                    : "w-full rounded-full px-6 text-gray-600 hover:text-gray-600 font-medium cursor-pointer"
              }
            >
              {loading ? (
                <>
                  Loading...
                  <Loader2 className="h-4 w-4 animate-spin"/>
                </>
              ) : (
                <>
                  {getDeveloperLabel()}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opaDeveloper-50"/>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0"
                          onWheel={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()} // For mobile
                          align="start">
            <Command>
              <CommandInput placeholder="Cari pengembang..."/>
              <CommandList>
                <CommandEmpty>Pengembang tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key={0}
                    value="all"
                    onSelect={() => handleDeveloperSelect("all")}
                  >
                    Semua Pengembang
                  </CommandItem>
                  {developers.map((Developer) => (
                    <CommandItem
                      key={Developer.ID}
                      value={Developer.Nama || Developer.Nama2 || ""}
                      onSelect={() => handleDeveloperSelect(Developer.ID.toString())}
                    >
                      {Developer.Nama || Developer.Nama2}
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
