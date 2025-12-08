// components/FooterPropertyTabs.tsx (Client Component)
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TabsFooterData } from "../../../types/footer-types";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";
import Link from "next/link";

export interface FooterTabsProps {
  data?: TabsFooterData;
  activeTab?: number;
  onTabChange?: (tab: number) => void;
  isLoading?: boolean;
}

export default function FooterTabs({ data, activeTab, onTabChange, isLoading }: FooterTabsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? data?.Tabs : data?.Tabs.slice(0, 4);

  return (
    <div className="mb-8">
      {/* Tabs Navigation */}
      <div className="overflow-x-auto pb-4 mb-6">
        <div className="flex gap-6 min-w-max lg:min-w-0">
          {data?.TabHeader.map((tab, index) => (
            <button
              key={index + 1}
              disabled={isLoading}
              onClick={() => {
                onTabChange?.(index + 1);
                setIsExpanded(false); // Reset expanded saat ganti tab
              }}
              className={`text-base font-semibold pb-2 transition-colors whitespace-nowrap ${
                activeTab === index + 1 ? "text-yellow-400 border-b-2 border-yellow-400" : "text-gray-300 hover:text-white"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {tab.Title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content - Grid Layout */}
      <div className={`transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[768px] lg:min-w-0">
            <div className="grid grid-cols-4 gap-8">
              {visibleItems?.map((item, index) => (
                <div key={index + 1}>
                  <Link href={removeBaseUrl(item.URL)} className="text-sm text-gray-400 hover:text-white transition-colors block">
                    {item.CustomTitle}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tampilkan Lebih Banyak Button - Only show if more than 4 items */}
      {(data?.Tabs ?? []).length > 4 && (
        <div className="mb-8">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center">
            {isExpanded ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );
}
