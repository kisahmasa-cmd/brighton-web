"use client";

import FieldWrapper from "./FieldWrapper";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { GetAgentSearchData } from "../../../../types/get-agent-search-types";
import { getAgentSearch } from "@/services/agent-register-service";
import { cn } from "@/lib/utils";
import ActionClear from "../ActionClear";

interface GetAgentFieldProps {
  selected: GetAgentSearchData | undefined;
  onChange: (value: GetAgentSearchData | undefined) => void;
  ref: React.RefObject<HTMLButtonElement | null>;
  errorText?: string;
  disabled?: boolean;
}

const GetAgentField: React.FC<GetAgentFieldProps> = ({
  selected,
  errorText,
  onChange,
  ref,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<GetAgentSearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState<string | null>(null);

  const handleOpen = (value: boolean) => {
    if (value === false) {
      setSearchTerm("");
      setData([]);
      setErrorSearch(null);
    }
    setOpen(value);
  };

  const handleSearch = async (term: string) => {
    setErrorSearch(null);
    setSearchTerm(term);
  };

  const handleGetAgent = async () => {
    const k = searchTerm.trim();
    if (k.length < 3) {
      setData([]);
      return;
    }

    try {
      setIsLoading(true);
      const result = await getAgentSearch(k);
      setData(result);
    } catch (e) {
      console.error(e);
      setErrorSearch("Gagal mendapatkan data agent!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (text: string) => {
    const item = data.find((item) => item.text.toLowerCase() === text);
    if (!item) return;
    onChange(item);
    setOpen(false);
  };

  // Debounce
  useEffect(() => {
    if (!searchTerm) {
      setData([]);
      return;
    }

    const timeout = setTimeout(() => {
      handleGetAgent();
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  const items = useMemo(() => data, [data]);

  return (
    <FieldWrapper
      id="familyAtBrighton"
      label="Apakah Anda Mempunyai Pasangan/Keluarga yang Sudah Bergabung di Brighton?"
      errorText={errorText}
    >
      <ActionClear value={selected?.id} onClear={disabled ? () => { } : () => onChange(undefined)}>
        <Popover open={open} onOpenChange={handleOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              ref={ref}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("justify-between w-full rounded-full", !selected && "text-gray-500")}
            >
              {selected ? selected?.text : "Cari pasangan atau keluarga"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0"
            style={{ width: width > 0 ? `${width}px` : "auto" }}
          >
            <Command>
              <CommandInput
                placeholder="Cari nama pasangan/keluarga Anda"
                onValueChange={handleSearch}
              />
              <CommandList>
                <CommandEmpty>
                  {searchTerm.length > 2
                    ? isLoading ? "Mencari..." : (errorSearch ?? "Hasil tidak ditemukan.")
                    : "Tulis 2 atau lebih karakter untuk mencari"}
                </CommandEmpty>
                <CommandGroup>
                  {isLoading && (
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                      Mencari...
                    </p>
                  )}
                  {items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.text.toLowerCase()}
                      onSelect={handleSelect}
                      className="cursor-pointer"
                    >
                      {item.text}
                      <Check
                        className={cn(
                          "ml-auto",
                          selected?.id === item.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </ActionClear>
      <p className="text-xs">
        (isi nama pasangan/keluarga yang sudah bergabung di Brighton. Kosongkan
        jika tidak ada)
      </p>
    </FieldWrapper>
  );
};

export default GetAgentField;
