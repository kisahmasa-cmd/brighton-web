"use client";

import {useEffect, useState} from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ChevronDown} from "lucide-react";
import ActionClear from "@/components/custom/ActionClear";

interface InputPriceRangeProps {
  isMobile?: boolean,
  onChange?: (min: number | null, max: number | null) => void,
  style?: string,
  valueMin?: number | null,
  valueMax?: number | null,
  withClear?: boolean
}

export default function InputPropertyPriceRange({
  isMobile,
  onChange,
  style,
  valueMin,
  valueMax,
  withClear = false
}: InputPriceRangeProps) {
  const [minPrice, setMinPrice] = useState<number | null>(valueMin || null);
  const [maxPrice, setMaxPrice] = useState<number | null>(valueMax || null);
  const [activeInput, setActiveInput] = useState<"min" | "max">("min");
  const [open, setOpen] = useState(false);

  // Helper function to format currency in simplified Indonesian format
  const formatSimplifiedCurrency = (value: number | null): string => {
    if (!value) return "";

    if (value >= 1000000000) {
      // Billions (Miliar)
      const billions = value / 1000000000;
      return billions % 1 === 0
        ? `${billions} M`
        : `${billions.toFixed(1).replace('.', ',')} M`;
    } else if (value >= 1000000) {
      // Millions (Juta)
      const millions = value / 1000000;
      return millions % 1 === 0
        ? `${millions} JT`
        : `${millions.toFixed(1).replace('.', ',')} JT`;
    }
    return value.toLocaleString("id-ID");
  };

  const prices = [
    {label: "Rp 50.000.000 (50 JT)", value: 50000000},
    {label: "Rp 80.000.000 (80 JT)", value: 80000000},
    {label: "Rp 100.000.000 (100 JT)", value: 100000000},
    {label: "Rp 150.000.000 (150 JT)", value: 150000000},
    {label: "Rp 200.000.000 (200 JT)", value: 200000000},
    {label: "Rp 250.000.000 (250 JT)", value: 250000000},
    {label: "Rp 300.000.000 (300 JT)", value: 300000000},
    {label: "Rp 400.000.000 (400 JT)", value: 400000000},
    {label: "Rp 500.000.000 (500 JT)", value: 500000000},
    {label: "Rp 750.000.000 (750 JT)", value: 750000000},
    {label: "Rp 1.000.000.000 (1 M)", value: 1000000000},
    {label: "Rp 1.500.000.000 (1,5 M)", value: 1500000000},
    {label: "Rp 2.000.000.000 (2 M)", value: 2000000000},
    {label: "Rp 3.000.000.000 (3 M)", value: 3000000000},
    {label: "Rp 5.000.000.000 (5 M)", value: 5000000000},
  ]

  const formatCurrency = (value: number | null) =>
    value ? value.toLocaleString("id-ID") : "";

  function handleSelectPrice(value: number) {
    if (activeInput === "min") {
      setMinPrice(value);
      setActiveInput("max");
    } else {
      setMaxPrice(value);
    }
  }

  function resetPrices() {
    setMinPrice(null);
    setMaxPrice(null);
    setActiveInput("min");
  }

  function handleManualInput(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const num = raw ? parseInt(raw, 10) : null;

    if (type === "min") setMinPrice(num);
    else setMaxPrice(num);
  }

  // 🔥 Call onChange every time values change
  useEffect(() => {
    if (onChange) {
      onChange(minPrice, maxPrice);
    }
  }, [minPrice, maxPrice]);

  const filteredPrices =
    activeInput === "min"
      ? prices
      : prices.filter((p) => p.value > (minPrice ?? 0));

  const isError = !!(minPrice && maxPrice && maxPrice <= minPrice);

  return (
    <ActionClear
      value={withClear ? (minPrice || maxPrice) : ""}
      onClear={() => {
        resetPrices()
      }}
    >
      <DropdownMenu
        open={open}
        onOpenChange={(o) => {
          // When dropdown closes, clear invalid max
          if (!o && isError) setMaxPrice(null);
          setOpen(o);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            size={isMobile ? "sm" : "default"}
            variant={isMobile ? "outline" : "ghost"}
            className={
              isMobile
                ? "flex-1 rounded-lg bg-white border-0 shadow transition-shadow"
                :
                style === "input"
                  ? "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] w-full"
                  : "rounded-full px-6 text-gray-600 hover:text-gray-600 font-medium cursor-pointer"
            }
          >
            {minPrice && maxPrice
              ? `Rp ${formatSimplifiedCurrency(minPrice)} - Rp ${formatSimplifiedCurrency(maxPrice)}`
              : minPrice
                ? `Mulai Rp ${formatSimplifiedCurrency(minPrice)}`
                : style === "input" ? "Pilih Harga" : "Harga"}
            <ChevronDown
              className={
                isMobile ? "h-4 w-4" : "h-4 w-4 opacity-50 ml-2"
              }
              color="#6a7282"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-80">
          <div className="p-4">
            {/* Min/Max Inputs */}
            <div className="flex items-center gap-3 mb-4">
              <Input
                type="text"
                placeholder="Min"
                className={`flex-1 ${
                  activeInput === "min" ? "border-primary" : ""
                }`}
                value={formatCurrency(minPrice)}
                onFocus={() => setActiveInput("min")}
                onChange={(e) => handleManualInput(e, "min")}
              />
              <span className="text-gray-500">s/d</span>
              <Input
                type="text"
                placeholder="Max"
                className={`flex-1 ${
                  isError
                    ? "border-red-500 focus-visible:ring-red-500"
                    : activeInput === "max"
                      ? "border-primary"
                      : ""
                }`}
                value={formatCurrency(maxPrice)}
                onFocus={() => setActiveInput("max")}
                onChange={(e) => handleManualInput(e, "max")}
              />
            </div>

            {isError && (
              <p className="text-xs text-red-500 -mt-2 mb-2">
                Harga maksimum harus lebih besar dari minimum.
              </p>
            )}

            <div className="border-t py-2">
              <Button
                variant="ghost"
                onClick={resetPrices}
                className="w-full text-left justify-start px-3 py-2 text-sm font-semibold"
              >
                Harga Berapapun
              </Button>
            </div>

            <div className="border-t pt-2 max-h-66 overflow-y-auto">
              <div className="space-y-1">
                {filteredPrices.map((price) => (
                  <Button
                    key={price.value}
                    variant="ghost"
                    onClick={() => handleSelectPrice(price.value)}
                    className={`w-full text-left justify-start px-3 py-2`}
                  >
                    {price.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </ActionClear>
  );
}
