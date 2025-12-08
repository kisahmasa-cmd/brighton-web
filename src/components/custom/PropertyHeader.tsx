"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputPropertySearch from "@/components/custom/InputPropertySearch";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PropertyHeaderProps {
  title: string;
  subtitle: string;
  location: string;
  priceMin: string | number;
  priceMax: string | number;
  currency: string;
}

const PropertyHeader = ({ title, subtitle, location, priceMin, priceMax, currency }: PropertyHeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  // Prevent body scroll when search is open
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [searchOpen]);

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/perumahan-baru?Keyword=${encodeURIComponent(keyword)}`);
      setSearchOpen(false);
      setKeyword("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClose = () => {
    setSearchOpen(false);
    setKeyword("");
  };

  return (
    <>
      <div className="lg:col-span-4">
        {/* Search Button - Muncul pertama di mobile */}
        <div className="mb-4 sm:hidden">
          <Button onClick={() => setSearchOpen(true)} variant="outline" className="w-full rounded-full border-2 hover:bg-gray-50 transition-all">
            <Search className="h-5 w-5" />
            Cari Proyek Baru
          </Button>
        </div>

        {/* Desktop Layout - Title di kiri, Search di kanan */}
        <div className="flex items-start justify-between gap-4 w-full">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">
              {subtitle} di {location}
            </p>
            <div className="flex items-baseline gap-2">
              {priceMin && priceMin !== 0 && priceMin !== "0" ? (
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(priceMin, currency, false, true)}</span>
              ) : (
                <p className="text-lg font-bold text-gray-900">Tanyakan harga pada Agen</p>
              )}
              {priceMax && priceMax !== 0 && priceMax !== "0" && (
                <>
                  <span className="text-2xl text-gray-500">-</span>
                  <span className="text-2xl font-bold text-gray-900">{formatCurrency(priceMax, currency, false, true)}</span>
                </>
              )}
            </div>
          </div>

          {/* Search Button - Hanya muncul di desktop */}
          <Button onClick={() => setSearchOpen(true)} variant="outline" className="hidden sm:flex rounded-full border-2 hover:bg-gray-50 transition-all">
            <Search className="h-5 w-5" />
            Cari Proyek Baru
          </Button>
        </div>
      </div>

      {/* Apple-style Blurry Search Overlay */}
      {searchOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xl transition-all duration-300 ease-out"
            onClick={handleClose}
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
          />

          {/* Search Container */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleClose}
            style={{
              animation: "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="w-full max-w-3xl p-6 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyPress}>
              {/* Header */}
              <div className="border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Cari Proyek Baru</h2>
                  <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Search Input */}
              <div className="relative">
                <div className="flex justify-between gap-4 border-2 px-4 py-2 rounded-full">
                  <InputPropertySearch isPrimary={true} category={"perumahan-baru"} onChange={setKeyword} />
                  <Link
                    href={{
                      pathname: `/perumahan-baru`,
                      query: { Keyword: keyword },
                    }}
                  >
                    <Button className="w-25 bg-black hover:bg-gray-800 text-white rounded-full font-bold cursor-pointer">
                      <Search className="h-5 w-5" />
                      Cari
                    </Button>
                  </Link>
                </div>

                {/* Keyboard Hint */}
                <div className="hidden md:block mt-6 text-center">
                  <p className="text-xs text-gray-400">
                    Anda juga dapat menekan <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">Enter</kbd> untuk melakukan pencarian.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default PropertyHeader;
