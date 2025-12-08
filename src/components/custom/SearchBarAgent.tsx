"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { AgentParams } from "../../../types/agent-types";
import { buildAgentPath } from "../../../utils/buildAgentPath";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface AgentProps {
  params?: AgentParams;
  isTransparent?: boolean;
  citySlug?: string;
  officeSlug?: string;
}

export default function SearchBarAgent({ params, isTransparent, citySlug, officeSlug }: AgentProps) {
  const [keyword, setKeyword] = useState(params?.Keyword ?? "");
  const paramsNearby = params?.Latitude && params?.Longitude ? `Latitude=${params.Latitude}&Longitude=${params.Longitude}` : "";
  const checkParamsNearby = !!(params?.Latitude && params?.Longitude);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Build href agar sesuai query yang diinginkan
  const basePath = buildAgentPath(citySlug, officeSlug);
  const searchHref = keyword ? `${basePath}?Keyword=${keyword}&page=1` : `${basePath}?page=1`;
  const finalHref = paramsNearby ? `${searchHref}&${paramsNearby}` : searchHref;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const q = keyword.trim();
      setKeyword(q);

      linkRef.current?.click(); // klik link manual biar global loading muncul
    }
  };

  return (
    <div className="w-full bg-primary py-10">
      <div className="container max-w-7xl mx-auto px-4 lg:px-0">
        <div className="flex-1 bg-white rounded-full shadow-lg flex items-center pl-2 pr-3 py-2.5 gap-2">
          {/* Search Input */}
          <div className="flex-1 pl-4 flex items-center">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Tulis nama agen yang Anda cari"
              className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {/* Search Button */}
          <Link ref={linkRef} href={finalHref}>
            <Button className="w-25 bg-black hover:bg-gray-800 text-white rounded-full font-bold cursor-pointer">
              <Search className="h-5 w-5" />
              Cari
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
