"use client";

import { Check, HeartHandshake, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Property } from "../../../types/property-types";
import { formatCurrency } from "../../../utils/formatCurrency";
import Link from "next/link";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import AgentContactPopup from "./AgentContactPopup";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";

interface CardPropertyPrimaryProps {
  data?: Property;
  isListing?: boolean;
}

export default function CardPropertyPrimary({ data, isListing }: CardPropertyPrimaryProps) {
  const [isAgentContactPopupOpen, setIsAgentContactPopupOpen] = useState(false);

  const prices = (property?: Property) => {
    if (!property) {
      return false;
    }

    if (property.Price2Min) {
      const priceMax = property.Price2Max ? " - " + property.ForeignCurrency + formatCurrency(property.Price2Max, "") : "";

      return `${property.ForeignCurrency}${formatCurrency(property.Price2Min, "")}${priceMax}`;
    }

    const priceMax = property.PriceMax && property.PriceMax !== "0" ? " - " + formatCurrency(property.PriceMax) : "";

    return `${formatCurrency(property.PriceMin ?? 0)}${priceMax}`;
  };

  const link = data?.Link ? removeBaseUrl(data?.Link) : "#";

  return (
    <>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white">
        <Link href={link} className="w-full">
          <div className={`relative bg-gray-200 ${isListing ? "aspect-8/5" : "aspect-4/3"}`}>
            <Image src={data?.Photo?.Medium ?? "/empty.png"} alt={data?.Photo?.Title ?? `${data?.Title} Photo`} className="w-full h-full object-cover" width={0} height={0} sizes="100vw" />
          </div>

          <div className="bg-primary px-4 pt-3 pb-2">
            <div className="flex items-start justify-between">
              <p className="text-xs lg:text-sm font-semibold text-gray-800 uppercase">{data?.Type}</p>
              <Image src="https://www.brighton.co.id/themes/v7/img/logo-white-circle.webp" alt="Logo brighton white" width="92" height="22" className="w-18 lg:w-23 object-cover" />
            </div>

            <p className="text-sm lg:text-base line-clamp-1 leading-5 font-bold text-gray-900">{data?.Title}</p>

            <p className="text-xs lg:text-sm font-semibold text-gray-700">{data?.Location?.Title}</p>

            <p className="text-xs lg:text-sm line-clamp-1 font-semibold text-gray-800">{data?.ShortContent}</p>

            <p className="lg:text-lg font-bold text-gray-900">{prices(data)}</p>
          </div>
        </Link>

        <div className="w-full p-4 py-3 flex items-center justify-between gap-2 border border-gray-200">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="h-6 lg:h-8 flex-1 flex items-center gap-2 bg-white hover:bg-gray-100 border border-primary rounded-full cursor-pointer px-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center bg-primary rounded-full">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
                <p className="flex-1 line-clamp-1 text-xs lg:text-sm text-left text-wrap font-semibold">Official Developer&#39;s Partner</p>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <VisuallyHidden>
                <DrawerTitle>Hidden Title for Accessibility</DrawerTitle>
              </VisuallyHidden>
              <div className="px-4 pb-2 lg:px-6 lg:pb-6">
                <div className="flex flex-row items-center justify-between pb-4">
                  <h5 className="font-bold">{"Official Developer's Partner"}</h5>
                  <DrawerClose asChild>
                    <Button variant="ghost">
                      <X className="w-5 h-5" />
                    </Button>
                  </DrawerClose>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex flex-row items-center gap-4">
                    <HeartHandshake className="w-10 h-10" />
                    <p className="font-medium flex-1">{"Brighton Real Estate sebagai partner pemasaran resmi"}</p>
                  </div>
                  <hr className="border border-gray-200 w-full" />
                  <div className="flex flex-row items-center gap-4">
                    <ShieldCheck className="w-10 h-10" />
                    <p className="font-medium flex-1">{"Harga terbaik dan informasi langsung dari developer"}</p>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <Button size="sm" className="h-6 lg:h-8 text-xs lg:text-sm font-semibold rounded-full" onClick={() => setIsAgentContactPopupOpen(true)}>
            Hubungi
          </Button>
        </div>
      </div>
      {/* Agent Contact Popup */}
      <AgentContactPopup
        isFromPrimary={true}
        isPopupOpen={isAgentContactPopupOpen}
        setIsPopupOpen={setIsAgentContactPopupOpen}
        isShowPhoto={true}
        title={`Hubungi Marketing`}
        LinkWA={data?.Link}
        data={data?.Agent ? (Array.isArray(data?.Agent) ? data?.Agent : [data?.Agent]) : []}
      />
    </>
  );
}
