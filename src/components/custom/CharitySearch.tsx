"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDownIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { CharityCategoryData } from "../../../types/charity-types";
import { Input } from "../ui/input";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";

interface CharitySearchProps {
  categories: CharityCategoryData[];
}

export default function CharitySearch({ categories }: CharitySearchProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // function handleSearch(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const params = [];
  //   if (search !== "") {
  //     params.push(`Keyword=${search}`);
  //   }
  //   if (selectedCategory) {
  //     params.push(`Category=${selectedCategory}`);
  //   }
  //   router.push(`/peduli?${params.join("&")}#BrightonPeduli`);
  // }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const q = search.trim();
      setSearch(q);

      linkRef.current?.click(); // klik link manual biar global loading muncul
    }
  };

  const linkHref = () => {
    const query: ParsedUrlQueryInput = {};
    if (search !== "") {
      query.Keyword = search;
    }
    if (selectedCategory) {
      query.Category = selectedCategory;
    }
    return {
      pathname: "/peduli",
      query,
      hash: "#BrightonPeduli",
    };
  }

  return (
    <div className="p-6 flex flex-col items-center gap-4 bg-primary">
      <h2 className="font-bold text-center text-2xl">
        Cari Cerita / Penerima Bantuan
      </h2>
      <div className="w-full bg-white rounded-full shadow-lg flex items-center pl-2 pr-3 py-2.5 gap-2">
        {/* Search Input */}
        <div className="flex-1 pl-4 flex items-center">
          <Search className="w-5 h-5 text-gray-400"/>
          <Input
            type="search"
            placeholder="Cari kata kunci, orang, atau cerita..."
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="hidden md:block">
          <FilterDropdown
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
        {/* Search Button */}
        <Link
          ref={linkRef}
          href={linkHref()}
          className="hidden md:block"
        >
          <Button className="w-25 bg-black hover:bg-gray-800 text-white rounded-full font-bold cursor-pointer">
            <Search className="h-5 w-5"/>
            Cari
          </Button>
        </Link>
      </div>
      {/* Show on Mobile Only */}
      <div className="w-full block md:hidden md:py-4 bg-white rounded-full shadow-lg p-2">
        <FilterDropdown
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <Link
        ref={linkRef}
        href={linkHref()}
        className="w-full md:w-auto block md:hidden"
      >
        <Button className="w-full md:w-25 bg-black hover:bg-gray-800 text-white rounded-full font-bold cursor-pointer">
          <Search className="h-5 w-5"/>
          Cari
        </Button>
      </Link>
    </div>
  );
}

interface FilterDropdownProps {
  categories: CharityCategoryData[];
  selected: string | null;
  onChange: (selected: string | null) => void;
}

function FilterDropdown({
  categories,
  selected,
  onChange,
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <InputGroupButton variant="ghost" className="!pr-1.5 w-full md:w-auto">
          {selected
            ? categories.find((item) => item.URLSegment === selected)?.Title ||
              "Filter"
            : "Filter"}{" "}
          <ChevronDownIcon className="size-3" />
        </InputGroupButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="[--radius:0.95rem]">
        <DropdownMenuItem
          className="text-xs flex justify-center cursor-pointer bg-slate-50"
          onClick={() => onChange(null)}
        >
          Reset Filter
        </DropdownMenuItem>
        {categories.map((item, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className="flex justify-between cursor-pointer"
              onClick={() => onChange(item.URLSegment)}
            >
              <span>{item.Title}</span>
              {item.URLSegment === selected && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
