"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import React, { useState, forwardRef, useImperativeHandle, Ref } from "react";
import { X } from "lucide-react";

export interface BrightonCareChatRef {
  openChat: () => void;
  closeChat: () => void;
}

const BrightonCareChat = forwardRef(function BrightonCareChat(_props: object, ref: Ref<BrightonCareChatRef>) {
  const [open, setOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    openChat: () => setOpen(true),
    closeChat: () => setOpen(false),
  }));

  return (
    <div className="fixed bottom-6 right-6 z-50 mx-24">
      <Popover open={open} onOpenChange={setOpen}>
        {/* Tidak menggunakan PopoverTrigger */}
        <PopoverTrigger aria-label="Chat With Brighton Care"></PopoverTrigger>
        <PopoverContent side="top" className="relative p-0 overflow-hidden rounded-xl shadow-xl border w-full lg:w-96 h-[512px] bg-white -translate-x-8">
          <div className="absolute top-0 inset-x-0 w-full bg-primary p-4 flex items-center gap-4">
            <Image src="/brighton-care-icon.webp" alt="Brighton Care Icon" width={0} height={0} sizes="100vw" className="w-10 h-10 border border-white rounded-full" />
            <div className="flex-1 text-lg font-bold">Brighton Care</div>
            <button onClick={() => setOpen(false)} className="cursor-pointer p-2 rounded-full hover:bg-black/5">
              <X className="w-5 h-5" />
            </button>
          </div>
          <iframe src="https://live.cekat.ai/?chat=Brighton-HkJZLTAE" className="w-full h-full border-0" allow="camera; microphone; clipboard-read; clipboard-write" />
          <div className="absolute bottom-0 inset-x-0 w-full bg-primary p-4"></div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

export default BrightonCareChat;
