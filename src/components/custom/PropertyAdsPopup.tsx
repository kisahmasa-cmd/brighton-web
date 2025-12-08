"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Property } from "../../../types/property-types";
import { formatCurrency } from "../../../utils/formatCurrency";
import AgentContactPopup from "./AgentContactPopup";
import Link from "next/link";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";
import { checkLoginAndVerified } from "@/actions/check-login-action";
import { useUser } from "./UserContext";
import { sendWA } from "../../../utils/sendWA";
import { getWACSNumber, getWAVerifikasi } from "../../../utils/getWA";

export type PropertyAdsPopupVariant = "v1" | "v2" | "v3";

interface PropertyAdsPopupProps {
  variant: PropertyAdsPopupVariant;
  data: Property;
  onReady: (actions: { openDialog: () => void }) => void;
}

const PropertyAdsPopup: React.FC<PropertyAdsPopupProps> = ({ variant, data, onReady }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAgentContactPopupOpen, setIsAgentContactPopupOpen] = useState(false);

  const userInfo = useUser();

  const whatsappMessage = `Hi, saya tertarik mengetahui informasi mengenai properti ini. Mohon informasinya terkait unit tersebut : ${data.Link}

    _Hati-Hati Penipuan ,Demi Keamanan Anda , Pastikan bertransaksi di kantor Brighton & menggunakan Perjanjian Resmi Brighton_`;

  function openDialog() {
    setIsDialogOpen(true);
  }

  function handleDialogOpen(open: boolean) {
    setIsDialogOpen(open);
  }

  async function handleClickButton() {
    const dataAgent = Array.isArray(data.Agent) ? data.Agent[0] : data.Agent;

    const isVerified = await checkLoginAndVerified();
    if (isVerified && userInfo) {
      const phoneUsed = userInfo.UserType === "AGEN" ? dataAgent.WAPhone : getWAVerifikasi();
      sendWA(phoneUsed, whatsappMessage);
    } else {
      setIsAgentContactPopupOpen(true);
    }
  }

  useEffect(() => {
    if (onReady) {
      onReady({ openDialog });
    }
  }, [onReady]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
        <DialogContent showCloseButton={false} className="w-72 rounded-2xl p-0 border-0 gap-0 mt-16">
          <VisuallyHidden>
            <DialogTitle>Hidden Title for Accessibility</DialogTitle>
          </VisuallyHidden>

          <div className="relative">
            <Image
              src={`/ads-popup/woman-${variant}.png`}
              alt="Woman"
              width={0}
              height={0}
              sizes="100vw"
              className={cn("absolute", variant === "v1" && "w-40 top-0 left-10 -mt-32", variant === "v2" && "w-80 top-0 left-2 -mt-34 z-10", variant === "v3" && "w-60 top-0 left-6 -mt-38 z-10")}
            />
            {/* Segitiga */}
            {variant === "v1" && (
              <svg viewBox="0 0 100 100" className="h-8 w-auto absolute top-0 left-44 -mt-8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0 100 L50 0 L100 100 Z" className="fill-current text-primary" />
              </svg>
            )}
          </div>
          {/* Header */}
          <div className="bg-primary p-2 text-center rounded-t-2xl flex flex-row gap-3 justify-center items-center w-full relative">
            {/* Header Images */}
            {variant === "v2" && <div className="w-12 h-12 bg-white mask-[url(/logo_simple.svg)] mask-no-repeat mask-center mask-contain"></div>}
            {variant === "v3" && <Image src="/ads-popup/emoji-1.png" alt="Emoji 1" width={52} height={52} className="absolute -left-5 top-2" />}
            {variant === "v3" && <Image src="/ads-popup/emoji-2.png" alt="Emoji 2" width={52} height={52} className="absolute -right-5 bottom-3" />}
            <p className={cn("font-black text-black flex flex-col", variant === "v1" ? "items-center" : "items-start", variant === "v2" && "pt-1", variant === "v3" && "pt-6")}>
              <span className="text-xl">Pilihan Project</span>
              <span className="text-lg flex items-center gap-1">
                <span>Terbaru untuk Anda!</span>
                {variant === "v1" && <Image src="/ads-popup/txtmoji.png" alt="Woman" width={20} height={20} sizes="100vw" />}
              </span>
            </p>
          </div>
          <Link href={removeBaseUrl(data.Link)} target="_blank" rel="noopener noreferrer">
            {/* Image */}
            <Image src={data.Photo?.Medium ?? "/empty.png"} alt={data.Photo?.Title ?? "Photo Property"} width={0} height={0} sizes="100vw" className="w-full aspect-video object-cover" />
            {/* Content */}
            <div className="px-4 pt-4 flex flex-col gap-1">
              {/* Property Name */}
              <h3 className="text-xl font-semibold">{data.Title}</h3>
              {/* Developer */}
              <p className="text-sm">
                Developer: <span className="font-semibold uppercase">{data.Developer?.Nama ?? "-"}</span>
              </p>
              {/* Location */}
              <div className="flex flex-row gap-2 items-center">
                <MapPin className="w-4 h-4 text-black" />
                <span className="text-sm font-semibold">
                  {data.Location.Title}, {data.Location?.Province?.Title}
                </span>
              </div>
              {/* Price */}
              <div className="flex flex-row gap-2 items-center">
                <Image src="/logo_simple.svg" alt="logo simple" width={0} height={0} sizes="100vw" className="w-4 h-4" />
                <p className="text-sm">
                  Harga Mulai:{" "}
                  <span className="font-bold">
                    {formatCurrency(data?.PriceMin ?? 0)}
                    {(data?.PriceMax ?? 0) != 0 ? ` ~ ${formatCurrency(data?.PriceMax ?? 0).replace("Rp ", "")}` : ""}
                  </span>
                </p>
              </div>
            </div>
          </Link>
          {/* WhatsApp Button */}
          <div className="p-4">
            <Button variant="whatsapp" type="button" className="flex items-center gap-2 w-full z-10" onClick={handleClickButton}>
              <Image src="/whatsapp.svg" alt="WhatsApp Icon" width={18} height={18} className="invert" />
              <span className="font-semibold">WhatsApp</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {Array.isArray(data.Agent) && (
        <AgentContactPopup
          isFromPrimary={true}
          LinkWA={data.Link}
          isPopupOpen={isAgentContactPopupOpen}
          setIsPopupOpen={setIsAgentContactPopupOpen}
          isShowPhoto={false}
          isWhatsAppOnly
          title="Hubungi WhatsApp Agen"
          data={data.Agent}
        />
      )}
    </>
  );
};

export default PropertyAdsPopup;
