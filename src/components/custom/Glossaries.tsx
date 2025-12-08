"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { GlossaryItem } from "../../../types/glossaries-types";

interface GlossariesProps {
  data: GlossaryItem[];
}

export function Glossaries({ data }: GlossariesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filter data berdasarkan letter dan search query
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesLetter = item.Title.charAt(0).toUpperCase() === selectedLetter;
      const matchesSearch = item.Title.toLowerCase().includes(searchQuery.toLowerCase()) || item.Description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLetter && matchesSearch;
    });
  }, [data, selectedLetter, searchQuery]);

  // Get all available letters dari data
  const availableLetters = Array.from(new Set(data.map((item) => item.Title.charAt(0).toUpperCase()))).sort();

  return (
    <div className="w-full container max-w-6xl mx-auto p-6 bg-white">
      <h4 className="text-3xl font-bold text-gray-900 mb-6 text-center sm:text-left">Istilah KPR</h4>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari Istilah KPR"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Alphabet Filter */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-300 justify-center w-full">
        {letters.map((letter) => {
          const isAvailable = availableLetters.includes(letter);
          const isSelected = letter === selectedLetter;

          return (
            <button
              key={letter}
              onClick={() => {
                if (isAvailable) {
                  setSelectedLetter(letter);
                  setSearchQuery("");
                }
              }}
              disabled={!isAvailable}
              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                isSelected ? "bg-yellow-400 text-black" : isAvailable ? "bg-gray-200 text-gray-900 hover:bg-gray-300" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Glossary Items */}
      <div className="space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.ID} className="pb-6 border-b border-gray-200 last:border-b-0">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.Title}</h2>
              <p className="text-gray-700">{item.Description}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada istilah yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
