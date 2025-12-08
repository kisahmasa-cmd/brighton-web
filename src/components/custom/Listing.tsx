import CardPropertySecondary from "@/components/custom/CardPropertySecondary";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PropertyResponse } from "@/services/homepage-service/secondary-new-service";
import { Property, PropertyParams } from "../../../types/property-types";
import { Loader2 } from "lucide-react";
import React from "react";
import PaginationButton from "@/components/custom/PaginationButton";
import { buildPropertyUrl } from "../../../utils/buildPropertyUrl";

interface ListingProps {
  properties: PropertyResponse;
  params?: PropertyParams;
  category?: string;
}

export default async function Listing({ properties, params, category }: ListingProps) {
  const page = Number(params?.page) || 1;
  const limit = 12;
  const total = properties?.All || 0;
  const totalPages = Math.ceil(total / limit);

  // Hitung halaman awal dan akhir yang akan ditampilkan
  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const { query } = buildPropertyUrl(category ?? "", params ?? {});

  if (!properties) {
    <div className="flex justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>;
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {properties?.Data.map((item: Property, index) => (
          <CardPropertySecondary key={index} data={item} />
        ))}
      </div>

      {/* Pagination */}
      <PaginationButton params={query} page={page} pages={pages} totalPages={totalPages} startPage={startPage} endPage={endPage} />
    </div>
  );
}
