"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, Funnel, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Combobox } from "../ui/combobox";
import MultiValueInput from "./MultiValueInput";
import {
  ArticleCategory,
  ArticlesFilterParams,
  ArticleTag,
  OrderByArticleFilterType,
} from "../../../types/article-types";
import ActionClear from "./ActionClear";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";

interface ArticlesFilterProps {
  filter: ArticlesFilterParams;
  categoriesData: ArticleCategory[];
  tagsData: ArticleTag[];
}

interface ArticlesSortValue {
  value: OrderByArticleFilterType;
  label: string;
}

const ArticlesFilter: React.FC<ArticlesFilterProps> = ({
  filter,
  categoriesData,
  tagsData,
}) => {
  const sortData: ArticlesSortValue[] = [
    { value: "", label: "Urutkan" },
    { value: "Z-A", label: "Z-A" },
    { value: "A-Z", label: "A-Z" },
    { value: "latest", label: "Terbaru" },
    { value: "oldest", label: "Terlama" },
  ];

  const [selectedSort, setSelectedSort] = useState<string>(
    filter.OrderBy || "",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    filter.Category || "",
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(filter.Tags || []);
  const [keyword, setKeyword] = useState<string>(filter.Keyword || "");

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const linkRef = useRef<HTMLAnchorElement>(null);

  function handleOpenFilter(open: boolean) {
    setIsOpenFilter(open);
  }

  function linkHref(orderByParam?: string) {
    const categorySlug =
      selectedCategory !== "" ? `/category/${selectedCategory}` : "";
    const tagsSlug =
      selectedTags.length > 0 ? `/tag/${selectedTags.join("/")}` : "";

    const query: ParsedUrlQueryInput = {};
    if ((orderByParam && orderByParam !== "") || selectedSort !== "") {
      query.OrderBy = orderByParam ?? selectedSort;
    }
    if (keyword !== "") {
      query.Keyword = keyword;
    }

    return {
      pathname: `/about/articles-all${categorySlug}${tagsSlug}`,
      query: query,
    };
  }

  function handleCloseFilter() {
    setKeyword(filter.Keyword ?? "");
    setSelectedCategory(filter.Category ?? "");
    setSelectedTags(filter.Tags ?? []);
    setIsOpenFilter(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (keyword.trim() === "") return;
      linkRef.current?.click(); // klik link manual biar global loading muncul
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:items-center">
      <div className="flex-1 flex flex-row justify-between md:justify-start gap-4 items-center">
        {/* Sorting Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row gap-2 items-center rounded-full"
            >
              <span>
                {sortData.find((item) => item.value === selectedSort)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortData.map((item, index) => (
              <Link
                href={linkHref(item.value)}
                onClick={() => setSelectedSort(item.value)}
                key={index}
              >
                <DropdownMenuItem>{item.label}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filter Button */}
        <Dialog open={isOpenFilter} onOpenChange={handleOpenFilter}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row gap-2 items-center rounded-full"
            >
              <Funnel className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
            </DialogHeader>
            <div className="border-t border-b border-gray-200 mb-4 py-4 space-y-4">
              {/* Keyword/Article Title Input */}
              <div className="flex flex-col gap-2 items-start">
                <Label htmlFor="keyword">Keyword/Judul Artikel</Label>
                <Input
                  type="search"
                  placeholder="Cari berdasarkan keyword/judul artikel"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {/* Article Category Input */}
              <div className="w-full flex flex-col gap-2 items-start">
                <Label htmlFor="category">Kategori Artikel</Label>
                <div className="grid grid-cols-1 w-full">
                  <ActionClear
                    value={selectedCategory}
                    onClear={() => setSelectedCategory("")}
                  >
                    <Combobox
                      placeholder={
                        categoriesData.find(
                          (e) => e.URLSegment === selectedCategory,
                        )?.Name ?? "Semua Kategori Artikel"
                      }
                      options={[
                        {
                          value: "",
                          label: "Semua Kategori Artikel",
                        },
                        ...categoriesData.map((category) => {
                          return {
                            value: category.URLSegment,
                            label: category.Name,
                          };
                        }),
                      ]}
                      value={selectedCategory}
                      onChange={(value) => setSelectedCategory(value)}
                    />
                  </ActionClear>
                </div>
              </div>
              {/* Article Tag Input */}
              <MultiValueInput
                label="Tag Artikel"
                id="tags"
                placeholder="Pilih Tag Artikel"
                options={tagsData.map((tag) => {
                  return {
                    value: tag.URLSegment,
                    label: tag.Name,
                  };
                })}
                value={selectedTags}
                onChange={(selected) => setSelectedTags(selected)}
              />
            </div>
            <DialogFooter className="justify-end">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={handleCloseFilter}
              >
                Batal
              </Button>
              <Link
                ref={linkRef}
                href={linkHref()}
                onClick={() => setIsOpenFilter(false)}
              >
                <Button className="rounded-full">Cari</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Input */}
      <div className="flex-1 bg-white rounded-full flex items-center pl-0 pr-1.5 border border-gray-200 gap-2">
        {/* Search Input */}
        <div className="flex-1 pl-4 flex items-center">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Cari berdasarkan judul artikel"
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* Search Button */}
        <Link ref={linkRef} href={linkHref()} className="flex items-center">
          <Button
            size="search"
            className="w-25 bg-black hover:bg-gray-800 text-white rounded-full font-bold cursor-pointer"
          >
            <Search className="h-5 w-5" />
            Cari
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArticlesFilter;
