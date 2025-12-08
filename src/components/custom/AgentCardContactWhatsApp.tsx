import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Agent } from "../../../types/agent-types";
import Image from "next/image";
import React from "react";

interface AgentCardContactWhatsAppProps {
  agent: Agent;
  whatsappMessage: string;
}

export default function AgentCardContactWhatsApp({ agent, whatsappMessage }: AgentCardContactWhatsAppProps) {
  const handleWhatsAppClick = () => {
    // Use WAPhone, fallback to WAPhone2 if WAPhone is not available
    const phoneNumber = (agent.WAPhone || agent.WAPhone2)?.replace(/\D/g, "");
    if (!phoneNumber) {
      console.error("Agent WhatsApp number not available");
      alert("Nomor WhatsApp agen tidak tersedia");
      return;
    }

    const url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(url, "_blank");
  };
  const hasWhatsApp = !!(agent.WAPhone || agent.WAPhone2);

  const getAgentImage = (agent: Agent) => {
    const raw = agent.Photo?.MediumWebP || agent.Photo?.Medium;
    return raw?.replace(/\\\//g, "/");
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col justify-between gap-4">
      <div className="space-y-4">
        {/* Agent Photo */}
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
          {agent.Photo?.MediumWebP ? (
            <Image src={agent.Photo?.MediumWebP} alt={agent.Name} width={250} height={250} className="w-full h-full object-cover" />
          ) : (
            agent.Photo?.Medium && <Image src={agent.Photo?.Medium} alt={agent.Name} width={250} height={250} className="w-full h-full object-cover" />
          )}
        </div>
        {/* Agent Info */}
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-lg">{agent.Name}</h3>
          {agent.Office?.Name && <p className="text-sm text-gray-600">{agent.Office.Name}</p>}
          {agent.Position && <p className="text-xs text-gray-500">{agent.Position}</p>}
        </div>
      </div>
      <div className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <div className="font-semibold">{agent.TotalListing || 0}</div>
            <div className="text-xs text-gray-500">Listing</div>
          </div>
          <div>
            <div className="font-semibold">{agent.TotalSell || 0}</div>
            <div className="text-xs text-gray-500">Jual</div>
          </div>
          <div>
            <div className="font-semibold">{agent.TotalRent || 0}</div>
            <div className="text-xs text-gray-500">Sewa</div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <Button onClick={handleWhatsAppClick} className="w-full bg-green-600 hover:bg-green-700 text-green-100 btn-contact-whatsapp" disabled={!hasWhatsApp}>
          <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="15" height="17" className="invert w-4 h-auto" />
          Hubungi via WhatsApp
        </Button>
      </div>
    </div>
  );
}
