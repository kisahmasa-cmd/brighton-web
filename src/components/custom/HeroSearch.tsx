"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import InputPropertySearch from "@/components/custom/InputPropertySearch";
import { buildPropertyUrl } from "../../../utils/buildPropertyUrl";
import Link from "next/link";
import { trimKeyword } from "../../../utils/trimKeyword";

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<"dijual" | "disewa" | "perumahan-baru">("dijual");
  const [keyword, setKeyword] = useState("");

  const { pathname, query: queryParams } = buildPropertyUrl(activeTab, { Keyword: trimKeyword(keyword) });

  return (
    <section className="relative bg-gray-500 py-4 px-4 rounded-xl">
      {/* Background Image Overlay (Optional) */}
      <div className="absolute inset-0 bg-black/30 rounded-xl"></div>

      {/* Content */}
      <div className="relative max-w-search mx-auto">
        {/* Title */}
        <h1 className="text-white md:text-label-9xl text-label-6xl font-bold text-center mb-3 font-inter">Jual Beli Sewa KPR Properti</h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 md:gap-8 mb-3">
          <button
            onClick={() => setActiveTab("dijual")}
            className={`text-xl md:text-base text-label-2xl px-6 font-bold transition-all ${
              activeTab === "dijual" ? "text-white border-b-4 border-yellow-400 pb-2" : "text-gray-300 hover:text-white pb-2"
            }`}
          >
            Dijual
          </button>
          <button
            onClick={() => setActiveTab("disewa")}
            className={`text-xl md:text-base text-label-2xl px-6 font-bold transition-all ${
              activeTab === "disewa" ? "text-white border-b-4 border-yellow-400 pb-2" : "text-gray-300 hover:text-white pb-2"
            }`}
          >
            Disewa
          </button>
          <button
            onClick={() => setActiveTab("perumahan-baru")}
            className={`text-xl md:text-base text-label-2xl px-6 font-bold transition-all ${
              activeTab === "perumahan-baru" ? "text-white border-b-4 border-yellow-400 pb-2" : "text-gray-300 hover:text-white pb-2"
            }`}
          >
            Proyek Baru
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-2xl flex items-center max-w-search mx-auto py-1">
          {/* Search Icon */}
          <div className="pl-4 md:pl-6">
            <Search className="w-6 h-6 text-gray-400" />
          </div>

          <div className="flex-1 pr-4">
            <InputPropertySearch
              isPrimary={activeTab === "perumahan-baru"}
              withIcon={false}
              category={activeTab}
              onChange={setKeyword}
              placeholder="Cari rumah surabaya barat, 2 kamar tidur, harga 800jt..."
            />
          </div>

          {/* Filter Button
          <button className="flex items-center gap-2 md:px-2 md:py-3 text-gray-700 hover:text-gray-900 font-semibold transition-colors md:text-base text-label-2xl">
            Filter
            <ChevronDown className="w-5 h-5" />
          </button> */}

          {/* Search/Cari Button */}
          <Link
            href={{
              pathname,
              query: queryParams,
            }}
            aria-label="Link Search"
          >
            <button className="hidden md:flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold md:px-12 md:py-1 rounded-full transition-all text-label-2xl md:text-lg whitespace-nowrap mr-1 cursor-pointer">
              <span>
                <Image src="/ai-search-logo.svg" width={20} height={20} alt="logo" />
              </span>
              Pencarian AI
            </button>
          </Link>
        </div>

        {/* Cari Button Mobile */}
        <div className="md:hidden flex justify-center mt-4 w-full">
          <Link
            href={{
              pathname,
              query: queryParams,
            }}
            className="w-full"
          >
            <button className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold p-2 rounded-full transition-all text-label-2xl whitespace-nowrap">
              <span>
                <Image src="/ai-search-logo.svg" width={20} height={20} alt="logo" />
              </span>
              Pencarian AI
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
