"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import InputPropertyOrderBy from "@/components/custom/InputPropertyOrderBy";
import { PropertyParams } from "../../../types/property-types";

interface ContentHeaderPrimaryProps {
  params?: PropertyParams;
}

export default function ContentHeaderPrimary({ params }: ContentHeaderPrimaryProps) {
  const searchParams = useSearchParams();
  const showParam = searchParams.get("show");
  const isOverseas = showParam === "overseas";

  return (
    <div className="w-full flex items-center justify-between flex-wrap sm:mb-6 gap-y-4">
      <h1 className="text-center sm:text-left">Jual, Beli dan Cari Properti Baru di Seluruh Indonesia - Brighton</h1>
      <div className="w-full sm:w-auto flex items-center justify-center sm:justify-between gap-4 mb-4 sm:mb-0">
        <InputPropertyOrderBy
          category="perumahan-baru"
          params={params}
          options={[
            { label: "A-Z", sortField: "Title", sortOrder: "ASC" },
            { label: "Z-A", sortField: "Title", sortOrder: "DESC" },
            { label: "Terbaru", sortField: "Created", sortOrder: "DESC" },
            { label: "Terlama", sortField: "Created", sortOrder: "ASC" },
          ]}
        />
        <div className="flex bg-gray-100 rounded-full p-1">
          {isOverseas ? (
            <Link
              href={{ pathname: "/perumahan-baru", query: { show: "local" } }}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${!isOverseas ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Lokal
            </Link>
          ) : (
            <div className="px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs font-bold bg-black text-white cursor-default">Lokal</div>
          )}
          {!isOverseas ? (
            <Link
              href={{ pathname: "/perumahan-baru", query: { show: "overseas" } }}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${isOverseas ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              Luar Negeri
            </Link>
          ) : (
            <div className="px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs font-bold bg-black text-white cursor-default">Luar Negeri</div>
          )}
        </div>
      </div>
    </div>
  );
}
