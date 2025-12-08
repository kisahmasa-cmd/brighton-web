import { PrimaryType } from "../../../types/property-types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Bath, Bed, Home, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Agent } from "../../../types/agent-types";
import { CtaContactAgent } from "../../../types/api-types";
import AgentContactPopup from "@/components/custom/AgentContactPopup";

export default function CardPropertyType({
  type,
  onClick,
  agents,
  propertyLink,
  propertyTitle,
}: {
  type: PrimaryType;
  onClick: () => void;
  agents: Agent | Agent[];
  propertyLink?: string | undefined;
  propertyTitle?: string | undefined;
}) {
  const [isAgentContactPopupOpen, setIsAgentContactPopupOpen] = useState(false);
  const [isSelectedWA, setIsSelectedWA] = useState<boolean>(false);

  function handleClickButton({ isWA }: CtaContactAgent) {
    setIsSelectedWA(isWA);
    setIsAgentContactPopupOpen(true);
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0 gap-0">
        <div className="relative w-full h-full aspect-[4/3] bg-gray-100 cursor-pointer" onClick={onClick}>
          <Image src={type?.Photo?.MediumWebP || type?.Photo?.Medium || type?.Photo?.Original || "/empty.png"} alt={type.Title} className="object-cover" fill />
        </div>
        <CardContent className="p-4 border-t">
          <h3 className="text-xs xl:text-sm font-bold text-gray-500">{type.Title}</h3>
          <p className="xl:text-lg font-bold text-gray-900 mb-2">{formatCurrency(type.Price)}</p>

          <div className="grid grid-cols-2 gap-2 text-xs xl:text-sm">
            {type.LT && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Maximize2 className="w-4 h-4" />
                <span className="font-semibold">
                  {type.LT}m<sup>2</sup>
                </span>
              </div>
            )}
            {type.LB && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Home className="w-4 h-4" />
                <span className="font-semibold">
                  {type.LB}m<sup>2</sup>
                </span>
              </div>
            )}
            {type.KM && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Bed className="w-4 h-4" />
                <span className="font-semibold">{type.KM}</span>
              </div>
            )}
            {type.KT && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Bath className="w-4 h-4" />
                <span className="font-semibold">{type.KT}</span>
              </div>
            )}
          </div>

          <Button variant={"whatsapp"} size={"sm"} className="w-full mt-2 xl:mt-4 xl:!py-5 text-sm rounded-full" onClick={() => handleClickButton({ isWA: true })}>
            <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="15" height="17" className="invert w-4 h-auto" />
            Tanya Unit
          </Button>
        </CardContent>
      </Card>

      <AgentContactPopup
        isFromPrimary={true}
        LinkWA={propertyLink}
        isPopupOpen={isAgentContactPopupOpen}
        setIsPopupOpen={setIsAgentContactPopupOpen}
        isShowPhoto={true}
        isWhatsAppOnly={isSelectedWA}
        isPhoneOnly={!isSelectedWA}
        layout={"row"}
        title={`Hubungi WhatsApp Agen`}
        data={Array.isArray(agents) ? agents : [agents]}
      />
    </>
  );
}
