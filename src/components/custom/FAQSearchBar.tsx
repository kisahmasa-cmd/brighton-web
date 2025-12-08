"use client";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search, SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";

export default function FAQSearchBar() {
  const faqBaseURL = "/hubungi/faq";
  const [keyword, setKeyword] = useState("");
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const q = keyword.trim();
      setKeyword(q);

      linkRef.current?.click(); // klik link manual biar global loading muncul
    }
  };

  return (
    <div className="bg-primary p-6 w-full">
      <div className="container max-w-6xl mx-auto flex flex-col items-center gap-5">
        {/* Text */}
        <h1 className="text-3xl text-center font-bold">Informasi apa yang Anda Butuhkan?</h1>
        {/* Form Search */}
        <div className="w-full bg-white rounded-full shadow-lg flex items-center pl-2 pr-3 py-2.5 gap-2">
          {/* Search Input */}
          <div className="flex-1 pl-4 flex items-center">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Masukkan pencarian di sini"
              className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {/* Search Button */}
          <Link
            ref={linkRef}
            href={{
              pathname: faqBaseURL,
              query: { keyword },
            }}
          >
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
