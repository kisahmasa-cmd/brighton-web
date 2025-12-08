"use client";

import { useRef, useState } from "react";
import ModalServices from "./ModalServices";
import Link from "next/link";
import { ShortcutsTypes } from "../../../types/shortcut-types";
import Image from "next/image";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";
import { useUser } from "./UserContext";
import BrightonCareChat, { BrightonCareChatRef } from "./BrightonCareChat";

export interface ServicesMenuProps {
  data?: ShortcutsTypes[];
}

export default function ServicesMenu(props: ServicesMenuProps) {
  const userInfo = useUser();
  const datas = props.data;

  let dataShowFirst = datas?.find((data) => data.Title === "First")?.Child;
  if (userInfo?.UserType !== "AGEN") {
    dataShowFirst = dataShowFirst?.filter((data) => data.Title !== "Brighton Care");
  }
  const AllData = datas?.filter((data) => data.Title !== "First");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatRef = useRef<BrightonCareChatRef>(null);

  const handleServiceClick = (e: React.MouseEvent<HTMLButtonElement>, title: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (title === "Lainnya") {
      setIsModalOpen(true);
    }
    if (title === "Brighton Care") {
      chatRef.current?.openChat();
    }
  };
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {dataShowFirst?.map((service, index) =>
              service.Title === "Lainnya" || service.Title === "Brighton Care" ? (
                <button key={index} onClick={(e) => handleServiceClick(e, service.Title)} className="cursor-pointer flex flex-col items-center gap-3 group transition-transform hover:scale-105">
                  <div className="relative w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors shadow-md">
                    <div className="w-15 h-15 relative rounded-full">
                      <Image src={service.Icons.LinkCloudSmall} alt="icon" fill />
                    </div>
                  </div>
                  <span className="text-gray-900 text-sm font-medium text-center max-w-[100px] leading-tight">{service.Title}</span>
                </button>
              ) : (
                <Link key={index} href={removeBaseUrl(service.Url)} className="flex flex-col items-center gap-3 group transition-transform hover:scale-105">
                  <div className="relative w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors shadow-md">
                    <div className="w-15 h-15 relative rounded-full">
                      <Image src={service.Icons.LinkCloudSmall} alt="icon" fill />
                    </div>
                  </div>
                  <span className="text-gray-900 text-sm font-medium text-center max-w-[100px] leading-tight">{service.Title}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version - 2 Columns Grid */}
      <div className="lg:hidden bg-white py-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-6">
            {dataShowFirst?.map((service, index) =>
              service.Title === "Lainnya" || service.Title === "Brighton Care" ? (
                <button key={index} onClick={(e) => handleServiceClick(e, service.Title)} className="flex flex-col items-center gap-2 group transition-transform hover:scale-105">
                  <div className="relative w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors shadow-md">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Image src={service.Icons.LinkCloudSmall} alt="icon" fill />
                    </div>
                  </div>
                  <span className="text-gray-900 text-sm font-medium text-center max-w-[100px] leading-tight">{service.Title}</span>
                </button>
              ) : (
                <Link key={index} href={removeBaseUrl(service.Url)} className="flex flex-col items-center gap-2 group transition-transform hover:scale-105">
                  <div className="relative w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors shadow-md">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Image src={service.Icons.LinkCloudSmall} alt="icon" fill />
                    </div>
                  </div>
                  <span className="text-gray-900 text-xs font-medium text-center max-w-[100px] leading-tight">{service.Title}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      {/* Modal Lainnya */}
      <ModalServices dataAll={AllData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Brighton Care Chat */}
      <BrightonCareChat ref={chatRef} />
    </>
  );
}
