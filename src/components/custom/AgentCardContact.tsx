import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import React, { useState } from "react";
import { Agent } from "../../../types/agent-types";
import Image from "next/image";
import { CtaContactAgent } from "../../../types/api-types";
import { Property } from "../../../types/property-types";
import AgentContactPopup from "@/components/custom/AgentContactPopup";
import Link from "next/link";

export default function AgentCardContact({ agent, property }: { agent: Agent; property: Property }) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>(undefined);
  const [isAgentContactPopupOpen, setIsAgentContactPopupOpen] = useState(false);
  const [isSelectedWA, setIsSelectedWA] = useState<boolean>(false);

  function handleClickButton({ agent, isWA }: CtaContactAgent) {
    setSelectedAgent(agent);
    setIsSelectedWA(isWA);
    setIsAgentContactPopupOpen(true);
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 mb-3">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={agent.Photo.Medium} alt={agent.Name} className="object-cover" fill />
        </div>
        <div className="flex-1 min-w-0">
          {agent?.URLSegment ? (
            <Link href={`/${agent?.URLSegment}`}>
              <p className="font-bold text-sm text-gray-900">{agent.Name}</p>
              <p className="text-xs font-semibold text-gray-700">{agent.Office?.OfficeAlias || agent.Office?.Name}</p>
              <p className="text-xs text-gray-500 italic">{agent.Office?.getOfficeLabelCityLocation}</p>
            </Link>
          ) : (
            <>
              <p className="font-bold text-sm text-gray-900">{agent.Name}</p>
              <p className="text-xs font-semibold text-gray-700">{agent.Office?.OfficeAlias || agent.Office?.Name}</p>
              <p className="text-xs text-gray-500 italic">{agent.Office?.getOfficeLabelCityLocation}</p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          className="text-xs font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-50 rounded-full"
          onClick={() => handleClickButton({ agent: agent!, isWA: false })}
        >
          <Phone className="w-4 h-4" />
          Hubungi
        </Button>
        <Button variant={"whatsapp"} size={"sm"} className="text-xs font-semibold rounded-full" onClick={() => handleClickButton({ agent: agent!, isWA: true })}>
          <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="15" height="17" className="invert w-4 h-auto" />
          WhatsApp
        </Button>
      </div>

      <AgentContactPopup
        isFromPrimary={true}
        LinkWA={property?.Link}
        isPopupOpen={isAgentContactPopupOpen}
        setIsPopupOpen={setIsAgentContactPopupOpen}
        isShowPhoto={false}
        isWhatsAppOnly={isSelectedWA}
        isPhoneOnly={!isSelectedWA}
        title={`Hubungi ${isSelectedWA ? "WhatsApp" : "Telepon"} Agen`}
        data={selectedAgent ? [selectedAgent] : []}
      />
    </div>
  );
}
