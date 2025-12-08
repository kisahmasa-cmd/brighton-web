"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { searchHint, searchHintPrimary } from "@/services/property-service";
import { HintInfo, PropertyParams } from "../../../types/property-types";
import Link from "next/link";
import { buildPropertyUrl } from "../../../utils/buildPropertyUrl";
import { formatSlug } from "../../../utils/formatSlug";
import { slugReadable } from "../../../utils/slugReadable";

interface InputPropertySearchProps {
  onChange?: (value: string) => void;
  category?: string;
  params?: PropertyParams;
  isPrimary?: boolean;
  withIcon?: boolean;
  placeholder?: string;
  lastSlug?: string;
}

export default function InputPropertySearch({
  onChange: externalOnChange,
  category,
  params,
  isPrimary,
  withIcon = true,
  placeholder = "Lokasi, kata kunci, area, proyek, pengembang...",
  lastSlug,
}: InputPropertySearchProps) {
  const [keyword, setKeyword] = useState(params?.Keyword || lastSlug);
  const [results, setResults] = useState<HintInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setKeyword(value);

    if (externalOnChange) {
      externalOnChange(value);
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only fetch if length > 2
    if (value.length < 3) {
      setResults([]);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      const k = value.trim();
      if (k == "") return;
      setLoading(true);
      try {
        if (isPrimary) {
          // Call searchHintPrimary for primary properties
          const res = await searchHintPrimary(k);
          const data = res.Data;

          // Transform string array to HintInfo array
          if (data && Array.isArray(data) && data.length > 0) {
            const transformedResults: HintInfo[] = data.map((title: string, index: number) => ({
              _id: index,
              Title: title,
              Location: title,
            }));
            setResults(transformedResults);
          } else {
            setResults([]);
          }
        } else {
          // Call searchHint for secondary properties
          const res = await searchHint(k);
          const data = res.Data;
          if (res.Data && data?.length > 0) {
            setResults(data);
          } else {
            setResults([]);
          }
        }
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce 400ms
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();

      // Close the results dropdown
      setResults([]);

      if (!keyword?.trim()) {
        return;
      }

      // Trigger the hidden link click to navigate with loader
      if (hiddenLinkRef.current) {
        hiddenLinkRef.current.click();
      }
    }
  }

  function handleClear() {
    // Just clear the input state
    setKeyword("");

    // Clear search results
    setResults([]);

    // Notify parent component
    if (externalOnChange) {
      externalOnChange("");
    }
  }

  function buildHintItemUrl(item: HintInfo) {
    // Build params based on item type
    let pathname = `/${category}`;
    const typeSlug = params?.Type ? formatSlug(params.Type) : "properti";
    const hintParams: PropertyParams = {
      ...params,
    };
    const query: Record<string, undefined> = {};
    const excludeFromQuery = ["Keyword", "Type", "ProvinceID", "ProvinceTitle", "ProvinceSlug", "LocationID", "LocationTitle", "LocationSlug", "AreaID", "AreaTitle", "AreaSlug", "page"];

    Object.entries(hintParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && !excludeFromQuery.includes(key)) {
        query[key] = value;
      }
    });

    if (item.Type === "Project") {
      return { pathname: `/perumahan-baru/viewdetail/${item.URLSegment}` };
    }

    if (item.Type === "Province") {
      pathname = `/${category}/${typeSlug}/${item.URLSegment}`;
    } else if (item.Type === "Location") {
      pathname = `/${category}/${typeSlug}/${item.URLSegment}`;
    } else if (item.Type === "Area") {
      pathname = `/${category}/${typeSlug}/${formatSlug(item.Location ?? "")}/${item.URLSegment}`;
    }

    return {
      pathname: pathname,
      query: query,
    };
  }

  function handleItemClick(item: HintInfo) {
    if (isPrimary) {
      // For primary: set the value and close dropdown
      setKeyword(item.Title);
      if (externalOnChange) {
        externalOnChange(item.Title);
      }
      setResults([]);
    }
    // For non-primary, Link navigation will handle it
  }

  // Build URL for Enter key navigation
  const updatedParams: PropertyParams = {
    ...params,
    Keyword: keyword?.trim() || lastSlug || undefined,
    page: undefined,
  };
  const { pathname, query: queryParams } = buildPropertyUrl(category || "dijual", updatedParams);

  // Show clear button only when there's text in the input field
  const shouldShowClear = Boolean(keyword?.trim());

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center">
        {withIcon && <Search className="w-5 h-5 text-gray-400" />}
        <Input
          type="text"
          placeholder={placeholder}
          className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"
          value={slugReadable(keyword ?? "")}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {shouldShowClear && (
          <button onClick={handleClear} className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" aria-label="Clear search">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Hidden link for Enter key navigation */}
      <Link
        ref={hiddenLinkRef}
        href={{
          pathname,
          query: queryParams,
        }}
        className="hidden"
        tabIndex={-1}
        aria-label="Link Search"
      />

      {loading && <div className="absolute left-0 right-0 mt-1 bg-white shadow rounded-lg p-3 text-sm text-gray-500">Loading...</div>}

      {results.length > 0 && !loading && (
        <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-50 max-h-72 overflow-y-auto">
          {results.map((item) =>
            isPrimary ? (
              <button key={item._id} onClick={() => handleItemClick(item)} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-gray-100">
                <div>
                  <p className="text-sm font-medium line-clamp-1">{item.Location}</p>
                  {item.Title && item.Title !== item.Location && <p className="text-xs text-gray-500">{item.Title}</p>}
                </div>
              </button>
            ) : (
              <Link href={item?.Link ? item.Link : buildHintItemUrl(item)} key={item._id} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-gray-100">
                <div>
                  <p className="text-sm font-medium line-clamp-1">{item.Title}</p>
                  {item.Location && <p className="text-xs text-gray-500">{item.Location}</p>}
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
