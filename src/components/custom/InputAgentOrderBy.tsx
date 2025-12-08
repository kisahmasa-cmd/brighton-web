"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AgentParams } from "../../../types/agent-types";
import { buildAgentPath } from "../../../utils/buildAgentPath";

interface InputAgentOrderByProps {
  params?: AgentParams;
  isIcon?: boolean;
  isHideMobile?: boolean;
  CitySlug?: string;
  OfficeSlug?: string;
}

export default function InputAgentOrderBy({ params, isIcon, isHideMobile, CitySlug, OfficeSlug }: InputAgentOrderByProps) {
  const citySlug = CitySlug || "all";
  const officeSlug = OfficeSlug || "";
  const basePath = buildAgentPath(citySlug, officeSlug);
  let labelOrder = "Urutkan";

  if (params?.SortField === "Name") {
    if (params?.SortOrder === "ASC") {
      labelOrder = "A-Z";
    } else if (params?.SortOrder === "DESC") {
      labelOrder = "Z-A";
    }
  }

  const createOrderUrl = (sortField: string, sortOrder: string) => {
    return Object.fromEntries(
      Object.entries({
        ...params,
        SortField: sortField,
        SortOrder: sortOrder,
      }).filter(([_, v]) => v !== undefined && v !== "")
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={isIcon ? "sm" : "default"}
          className={isIcon ? "flex-shrink-0 rounded-lg bg-white border-0 shadow transition-shadow" : "flex rounded-full min-w-35 font-medium cursor-pointer"}
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
        <DropdownMenuRadioGroup>
          <Link href={{ pathname: basePath, query: createOrderUrl("Name", "ASC") }}>
            <DropdownMenuRadioItem value="Name.ASC" className="px-3 py-2">
              A-Z
            </DropdownMenuRadioItem>
          </Link>
          <Link href={{ pathname: basePath, query: createOrderUrl("Name", "DESC") }}>
            <DropdownMenuRadioItem value="Name.DESC" className="px-3 py-2">
              Z-A
            </DropdownMenuRadioItem>
          </Link>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
