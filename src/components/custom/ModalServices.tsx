import React, { useState } from "react";
import { Home, Building2, Store, Warehouse, Building, CreditCard, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { ShortcutsTypes } from "../../../types/shortcut-types";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";

interface LainyaModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataAll?: ShortcutsTypes[];
}

export default function ModalServices({ isOpen, onClose, dataAll }: LainyaModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Match dengan durasi animasi
  };

  if (!isOpen && !isClosing) return null;

  const utamaItems = dataAll?.find((data) => data.Title === "Utama")?.Child;
  const dijualItems = dataAll?.find((data) => data.Title === "Cari Properti Dijual")?.Child;

  const disewaItems = dataAll?.find((data) => data.Title === "Cari Properti Disewa")?.Child;

  const kprItems = dataAll?.find((data) => data.Title === "Cek Fitur KPR")?.Child;

  const lihatJugaItems = dataAll?.find((data) => data.Title === "Lihat Juga")?.Child;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-screen sm:max-w-4xl sm:h-auto h-full flex flex-col gap-0 sm:max-h-[90vh] max-h-screen overflow-y-auto sm:rounded-lg rounded-none w-full pr-4">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold pb-4">Lainnya</DialogTitle>
            </div>
          </DialogHeader>

          {/* Content Container */}
          <div className="space-y-8 pr-2 max-h-[70vh] overflow-y-auto">
            {/* Utama Section */}
            {/* <section>
              <h3 className="text-sm md:text-base uppercase font-bold text-gray-900 mb-4 md:mb-6">Utama</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-y-6">
                {utamaItems?.map((item, index) => (
                  <a key={index} href={removeBaseUrl(item.Url)} className="flex flex-col items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-105 transition-all duration-200 shadow-md relative overflow-hidden">
                      <Image src={item.Icons.LinkCloudSmall} alt={item?.Title ?? "icons"} fill className="object-contain p-3" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-900 text-center leading-tight max-w-[80px] md:max-w-[100px]">{item.Title}</span>
                  </a>
                ))}
              </div>
            </section> */}

            {/* Cari Properti Dijual Section */}
            <section>
              <h3 className="text-sm md:text-base uppercase font-bold text-gray-900 mb-4 md:mb-6">Cari Properti Dijual</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-y-6">
                {dijualItems?.map((item, index) => (
                  <a key={index} href={removeBaseUrl(item.Url)} className="flex flex-col items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-105 transition-all duration-200 shadow-md relative overflow-hidden">
                      <Image src={item.Icons.LinkCloudSmall} alt={item?.Title ?? "icons"} fill className="object-contain p-3" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-900 text-center leading-tight max-w-[80px] md:max-w-[100px]">{item.Title}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Cari Properti Disewa Section */}
            <section>
              <h3 className="text-sm md:text-base uppercase font-bold text-gray-900 mb-4 md:mb-6">Cari Properti Disewa</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-y-6">
                {disewaItems?.map((item, index) => (
                  <a key={index} href={removeBaseUrl(item.Url)} className="flex flex-col items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-105 transition-all duration-200 shadow-md relative overflow-hidden">
                      <Image src={item.Icons.LinkCloudSmall} alt={item?.Title ?? "icons"} fill className="object-contain p-3" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-900 text-center leading-tight max-w-[80px] md:max-w-[100px]">{item.Title}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Cek Fitur KPR Section */}
            <section>
              <h3 className="text-sm md:text-base uppercase font-bold text-gray-900 mb-4 md:mb-6">Cek Fitur KPR</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-y-6">
                {kprItems?.map((item, index) => (
                  <a key={index} href={removeBaseUrl(item.Url)} className="flex flex-col items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-105 transition-all duration-200 shadow-md relative overflow-hidden">
                      <Image src={item.Icons.LinkCloudSmall} alt={item?.Title ?? "icons"} fill className="object-contain p-3" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-900 text-center leading-tight max-w-[80px] md:max-w-[100px]">{item.Title}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Lihat Juga Section */}
            <section>
              <h3 className="text-sm md:text-base uppercase font-bold text-gray-900 mb-4 md:mb-6">Lihat Juga</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-y-6">
                {lihatJugaItems?.map((item, index) => (
                  <a key={index} href={removeBaseUrl(item.Url)} className="flex flex-col items-center gap-3 group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:scale-105 transition-all duration-200 shadow-md relative overflow-hidden">
                      <Image src={item.Icons.LinkCloudSmall} alt={item?.Title ?? "icons"} fill className="object-contain p-3" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-900 text-center leading-tight max-w-[80px] md:max-w-[100px]">{item.Title}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
