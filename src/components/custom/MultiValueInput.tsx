import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Badge } from "../ui/badge";
import { Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

interface MultiValueInputProps {
  label: string;
  id: string;
  placeholder?: string;
  options: MultiValueInputOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

interface MultiValueInputOption {
  label: string;
  value: string;
}

const MultiValueInput: React.FC<MultiValueInputProps> = ({
  label,
  id,
  placeholder = "",
  options,
  value = [],
  onChange,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState<string[]>(value);
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleSelected(option: string) {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    setSelected(newSelected);
    onChange(newSelected);
    setIsOpen(false);
  }

  function handleClear() {
    setSelected([]);
    onChange([]);
  }

  useEffect(() => {
    if (parentRef.current) {
      setWidth(parentRef.current.offsetWidth);
    }
  }, []);

  return (
    <div ref={parentRef} className="flex flex-col gap-2 items-start">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <InputGroup>
            <InputGroupInput
              id={id}
              placeholder={selected.length === 0 ? placeholder : ""}
            />
            {selected.map((item, index) => (
              <InputGroupAddon key={index}>
                <Badge
                  className="text-black flex flex-row items-center gap-1 z-50 cursor-pointer"
                  onClick={() => handleToggleSelected(item)}
                >
                  <X className="w-3 h-3 cursor-pointer" />
                  <span>
                    {options.find((option) => option.value === item)?.label}
                  </span>
                </Badge>
              </InputGroupAddon>
            ))}
            {selected.length > 0 && (
              <InputGroupAddon align="inline-end">
                <X className="w-4 h-4 cursor-pointer" onClick={handleClear} />
              </InputGroupAddon>
            )}
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: width > 0 ? `${width}px` : "auto" }}
        >
          <Command>
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option.label}
                    onSelect={() => handleToggleSelected(option.value)}
                    className="flex justify-between cursor-pointer"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selected.includes(option.value)
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
    </div>
  );
};

export default MultiValueInput;
