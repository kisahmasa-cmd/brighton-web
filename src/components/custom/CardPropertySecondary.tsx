"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bath, BedDouble, House, LandPlot, Phone } from "lucide-react";
import CarouselImage from "@/components/custom/CarouselImage";

import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";
import { Property } from "../../../types/property-types";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import AgentContactPopup from "./AgentContactPopup";
import { useState, useTransition } from "react";
import { Agent } from "../../../types/agent-types";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";
import { sendWA } from "../../../utils/sendWA";
import { getWAVerifikasi } from "../../../utils/getWA";
import { useUser } from "./UserContext";
import { generateWhatsAppMessage } from "@/app/action/generateWhatsAppMessage";

interface CardPropertySecondaryProps {
  data?: Property;
  Title?: string;
}

interface ClickContactButtonProps {
  agent: Agent;
  isWA: boolean;
}

const getPropertyLabel = (data?: Property): string | null => {
  if (!data) return null;
  if (data.IsPremierListing) return "Premier";
  if (data.IsFeatureListing) return "Featured";
  if (data.IsNew) return "NEW";
  return null;
};

export default function CardPropertySecondary(props: CardPropertySecondaryProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isSelectedWA, setIsSelectedWA] = useState<boolean>(false);
  const [isAgentContactPopupOpen, setIsAgentContactPopupOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const userInfo = useUser();

  const data = props.data;
  const propertyLabel = getPropertyLabel(data);
  const agents = Array.isArray(data?.Agent) ? data?.Agent : [data?.Agent];
  if (data?.Agent2) {
    agents.push(data?.Agent2);
  }

  const TitleCard = data?.Transaction === "Jual" ? "JUAL" : data?.Transaction === "Sewa" ? "SEWA" : "JUAL/SEWA";

  if (!data) {
    return (
      <div className="w-full relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <Skeleton className="w-full aspect-7/4" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    );
  }

  function handleClickButton({ agent, isWA }: ClickContactButtonProps) {
    setSelectedAgent(agent);
    setIsSelectedWA(isWA);
    if (isWA) {
      startTransition(async () => {
        const isAgentUser = userInfo?.UserType === "AGEN";
        const message = await generateWhatsAppMessage({
          IDCode: data?.IDCode ?? "",
          Title: data?.Title ?? "",
          Link: data?.Link ?? "",
          isAgent: isAgentUser,
          agentName: userInfo?.Name,
        });

        const phoneUsed = userInfo?.UserType === "AGEN" ? agent.WAPhone : getWAVerifikasi();

        sendWA(phoneUsed, message);
      });
    } else {
      setIsAgentContactPopupOpen(true);
    }
  }

  return (
    <>
      <div className="bg-white w-full h-full relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        {propertyLabel && (
          <div className="absolute z-10 top-3 sm:top-0 left-0 px-2 sm:px-5 py-1 sm:py-0.5 rounded-r-sm sm:rounded-br-2xl bg-primary text-sm font-bold sm:font-semibold tracking-tighter sm:tracking-normal">
            {propertyLabel}
          </div>
        )}
        <div className="w-full grow">
          {(() => {
            if (!data?.Photos || data.Photos.length === 0) return <Image src="/empty.png" alt="No Image" className="w-full aspect-7/4 object-cover" width={400} height={200} />;
            if (data.Photos.length === 1)
              return <Image src={data.Photos[0].MediumWebP ?? "/empty.png"} alt={`Gambar Property ${data?.Title}`} className="w-full aspect-7/4 object-cover" width={400} height={200} />;
            return <CarouselImage images={data.Photos} limit={7} />;
          })()}
        </div>
        <Link href={removeBaseUrl(data?.Link ?? "#")} className="flex flex-col px-4 pt-2 pb-3">
          <div className="flex justify-between items-center sm:mb-1 md:mb-0">
            {data?.Type === "Tanah" ? (
              <p className="hidden sm:block flex-1 text-nowrap text-sm md:text-base lg:text-lg">
                <span className="font-bold">
                  {formatCurrency(data?.PricePerMeter ?? 0, "Rp", true, true)}
                  {"/m"}
                  <sup>2</sup>
                </span>
                <span className="ml-2 font-semibold text-label-2xl text-black">{`${formatCurrency(data?.Price ?? 0, "Rp", true, true)}`}</span>
              </p>
            ) : (
              <p className="hidden sm:block flex-1 text-nowrap text-sm md:text-base lg:text-lg font-bold">{formatCurrency(data?.Price ?? 0)}</p>
            )}
            <p className="text-label-xl xs:text-label-2xl sm:text-label-xl text-gray-700">Tayang sejak {formatDate(data?.PropertyDate)}</p>
          </div>
          <div className="hidden sm:flex gap-2 items-center text-sm sm:text-xs md:text-sm font-bold sm:font-normal uppercase">
            <Badge className=" text-black h-4.5">
              <b>{data?.Type}</b>
            </Badge>
            <p className="line-clamp-1">
              {TitleCard} {data?.Address}
            </p>
          </div>
          <p className="text-sm sm:text-xs md:text-sm font-bold sm:font-normal line-clamp-1 sm:mb-2 uppercase">{data?.Title}</p>
          <p className="sm:hidden text-xs font-semibold">{data?.Address}</p>
          <p className="sm:hidden text-label-xl text-gray-700 mb-1">
            {data?.Area?.Title}, {data?.Location.Title}
          </p>
          <div className="text-xs md:text-sm flex justify-between sm:justify-start gap-0 sm:gap-4">
            {data?.Type !== "Apartment" && (
              <div className="flex items-center gap-1">
                <b className="hidden sm:inline-flex">LT:</b>
                <LandPlot size={16} className="sm:hidden" />
                <span>
                  {data?.LT}m<sup>2</sup>
                </span>
              </div>
            )}
            {data?.Type !== "Tanah" && (
              <>
                <div className="flex items-center gap-1">
                  <b className="hidden sm:inline-flex">LB:</b>
                  <House size={16} className="sm:hidden" />
                  <span>
                    {data?.LB}m<sup>2</sup>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <b className="hidden sm:inline-flex">KT:</b>
                  <BedDouble size={16} className="sm:hidden" />
                  <span>{data?.KT}</span>
                </div>
                <div className="flex items-center gap-1">
                  <b className="hidden sm:inline-flex">KM:</b>
                  <Bath size={16} className="sm:hidden" />
                  <span>{data?.KM}</span>
                </div>
              </>
            )}
          </div>
        </Link>
        <div className="w-full h-0.25 bg-gray-300"></div>
        {/* Agents */}
        <div className="flex gap-2 px-4 py-2 xs:py-3">
          {agents.map((agent, index) => (
            <div key={index} className="flex-1 flex justify-between items-center gap-1">
              <div className="flex-1 flex justify-center gap-1">
                <Image
                  src={agent?.Photo.SmallWebP ?? agent?.Photo.Small ?? "/empty.png"}
                  alt="Gambar Property"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
                  width="50"
                  height="50"
                ></Image>
                <div className="flex-1 flex flex-col justify-center">
                  {agent?.URLSegment ? (
                    <Link href={`/${agent?.URLSegment}`}>
                      <p className="line-clamp-1 text-label-xl xs:text-xs font-bold leading-3">{agent?.Name}</p>
                      <p className="line-clamp-1 text-label-xl font-bold leading-3">{agent?.Office?.Alias}</p>
                      <p className="line-clamp-1 text-label-xl italic leading-3">{agent?.Office?.LocationAndProvince}</p>
                    </Link>
                  ) : (
                    <>
                      <p className="line-clamp-1 text-label-xl xs:text-xs font-bold leading-3">{agent?.Name}</p>
                      <p className="line-clamp-1 text-label-xl font-bold leading-3">{agent?.Office?.Alias}</p>
                      <p className="line-clamp-1 text-label-xl italic leading-3">{agent?.Office?.LocationAndProvince}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {agents.length === 1 && (
                  <Button
                    aria-label="Button Contact Agent"
                    size="xs"
                    variant="outline"
                    className="border-black w-6 btn-contact-phone"
                    onClick={() => handleClickButton({ agent: agent!, isWA: false })}
                  >
                    <Phone strokeWidth={1} fill="black" color="black" />
                  </Button>
                )}
                <Button
                  aria-label="Button Contact Agent"
                  size="xs"
                  variant="whatsapp"
                  className="w-6 xs:w-auto p-0 xs:px-2 md:px-4 lg:px-2"
                  onClick={() => handleClickButton({ agent: agent!, isWA: true })}
                >
                  <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="15" height="17" className="invert w-4 h-auto" />
                  {agents.length === 1 && <span className="hidden xs:inline-flex text-label-xl xs:text-xs font-bold">WhatsApp</span>}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Agent Contact Popup */}
      <AgentContactPopup
        isFromPrimary={false}
        LinkWA={data.Link}
        TitleWA={data.Title}
        IDCodeWA={data.IDCode}
        isPopupOpen={isAgentContactPopupOpen}
        setIsPopupOpen={setIsAgentContactPopupOpen}
        isShowPhoto={false}
        isWhatsAppOnly={isSelectedWA}
        isPhoneOnly={!isSelectedWA}
        title={`Hubungi ${isSelectedWA ? "WhatsApp" : "Telepon"} Agen`}
        data={selectedAgent ? [selectedAgent] : []}
      />
    </>
  );
}
