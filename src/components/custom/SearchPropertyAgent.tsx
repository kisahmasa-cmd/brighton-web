"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { AgentParams } from "../../../types/agent-types";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface AgentProps {
  params?: AgentParams;
  isTransparent?: boolean;
  slug?: string;
  placeholder?: string;
}

export default function SearchPropertyAgent({ params, slug, placeholder = "Cari..." }: AgentProps) {
  const [keyword, setKeyword] = useState(params?.Keyword ?? "");
  const linkRef = useRef<HTMLAnchorElement>(null);

  const searchHref = `${slug}?Keyword=${keyword}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (keyword.trim() === "") return;
      linkRef.current?.click(); // klik link manual biar global loading muncul
    }
  };

  return (
    <div className="flex-1 bg-white rounded-full flex items-center pl-0 pr-1.5 border border-gray-200 gap-2">
      {/* Search Input */}
      <div className="flex-1 pl-4 flex items-center">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          type="search"
          placeholder={placeholder}
          className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* Search Button */}
      <Link ref={linkRef} href={searchHref} className="flex items-center">
        <Button size="search" className="w-25 bg-black hover:bg-gray-800 text-white rounded-full font-bold cursor-pointer">
          <Search className="h-5 w-5" />
          Cari
        </Button>
      </Link>
    </div>
  );
}
