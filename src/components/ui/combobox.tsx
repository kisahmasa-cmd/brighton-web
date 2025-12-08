"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useEffect, useRef, useState } from "react";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  placeholder?: string;
  options?: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Combobox({
  placeholder = "Select option...",
  options = [],
  value,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? "");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState(0);

  function handleSelect(label: string) {
    setSelected(label === selected ? "" : label);
    if (onChange) {
      onChange(options.find((option) => option.label === label)?.value ?? "");
    }
    setOpen(false);
  }

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    setSelected(options.find((option) => option.value === value)?.label ?? "");
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {selected
            ? options.find((option) => option.label === selected)?.label
            : placeholder}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: width > 0 ? `${width}px` : "auto" }}
      >
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => (
                <CommandItem
                  key={index}
                  value={option.label}
                  onSelect={handleSelect}
                  className={cn(
                    "flex justify-between cursor-pointer",
                    selected === option.label && "bg-gray-100",
                  )}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "h-4 w-4",
                      selected === option.label ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
