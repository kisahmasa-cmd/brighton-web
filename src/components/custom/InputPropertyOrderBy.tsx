"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropertyParams } from "../../../types/property-types";

interface OrderOption {
  label: string;
  sortField: string;
  sortOrder: string;
}

interface InputPropertyOrderByProps {
  category?: string;
  params?: PropertyParams;
  isIcon?: boolean;
  isHideMobile?: boolean;
  options?: OrderOption[]; // 👈 custom options
}

export default function InputPropertyOrderBy({
  category,
  params,
  isIcon,
  isHideMobile,
  options,
}: InputPropertyOrderByProps) {
  // 🧠 Default options fallback
  const defaultOptions: OrderOption[] = [
    { label: "Termahal", sortField: "Price", sortOrder: "DESC" },
    { label: "Termurah", sortField: "Price", sortOrder: "ASC" },
    { label: "Terbaru", sortField: "Created", sortOrder: "DESC" },
    { label: "Terlama", sortField: "Created", sortOrder: "ASC" },
  ];

  const finalOptions = options && options.length > 0 ? options : defaultOptions;

  // 🏷️ Determine active label
  let labelOrder = "Urutkan";
  const active = finalOptions.find(
    (o) => o.sortField === params?.SortField && o.sortOrder === params?.SortOrder
  );
  if (active) labelOrder = active.label;

  // 🔗 Helper to build next URL query
  const createOrderUrl = (sortField: string, sortOrder: string) => {
    return Object.fromEntries(
      Object.entries({
        ...params,
        SortField: sortField,
        SortOrder: sortOrder,
      }).filter(([k, v]) => v !== undefined && v !== "" && k !== "page")
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={isIcon ? "sm" : "default"}
          className={
            isIcon
              ? "flex-shrink-0 rounded-lg bg-white border-0 shadow transition-shadow"
              : isHideMobile
                ? "flex rounded-full min-w-35 font-medium cursor-pointer"
                : "hidden sm:flex rounded-full min-w-35 font-medium cursor-pointer"
          }
        >
          {isIcon ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : (
            <>
              {labelOrder} <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-4">
        <DropdownMenuLabel className="px-3">Berdasarkan</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {finalOptions.map((opt) => (
            <Link
              key={`${opt.sortField}-${opt.sortOrder}`}
              href={{
                pathname: `/${category}`,
                query: createOrderUrl(opt.sortField, opt.sortOrder),
              }}
            >
              <DropdownMenuItem
                className="px-3 py-2"
              >
                {opt.label}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
