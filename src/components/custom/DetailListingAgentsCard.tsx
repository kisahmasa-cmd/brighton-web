"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Agent } from "../../../types/agent-types";
import AgentContactPopup from "./AgentContactPopup";
import { sendWA } from "../../../utils/sendWA";
import { getWAVerifikasi } from "../../../utils/getWA";
import { generateWhatsAppMessage } from "@/app/action/generateWhatsAppMessage";
import { useUser } from "./UserContext";

interface DetailListingAgentsCardProps {
  agents: Agent[];
  IDCodeWA?: string;
  TitleWA?: string;
  LinkWA?: string;
}

interface ClickContactButtonProps {
  agent: Agent;
  isWA: boolean;
}

const DetailListingAgentsCard: React.FC<DetailListingAgentsCardProps> = ({ agents, IDCodeWA, LinkWA, TitleWA }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardVisible, setCardVisible] = useState(true);
  const [isBlockerVisible, setBlockerVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isSelectedWA, setIsSelectedWA] = useState<boolean>(false);
  const [isAgentContactPopupOpen, setIsAgentContactPopupOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const userInfo = useUser();

  // Card akan fixed kalau: card gak terlihat DAN blocker gak terlihat
  const isFixed = !isCardVisible && !isBlockerVisible;

  useEffect(() => {
    const card = cardRef.current;
    const blocker = document.getElementById("call-cs");
    if (!card || !blocker) return;

    const observerCard = new IntersectionObserver(([entry]) => setCardVisible(entry.isIntersecting), { threshold: 0.1 });

    const observerBlocker = new IntersectionObserver(([entry]) => setBlockerVisible(entry.isIntersecting), { threshold: 0.1 });

    observerCard.observe(card);
    observerBlocker.observe(blocker);

    return () => {
      observerCard.disconnect();
      observerBlocker.disconnect();
    };
  }, []);

  function handleClickButton({ agent, isWA }: ClickContactButtonProps) {
    setSelectedAgent(agent);
    setIsSelectedWA(isWA);
    if (isWA) {
      startTransition(async () => {
        const message = await generateWhatsAppMessage({
          IDCode: IDCodeWA ?? "",
          Title: TitleWA ?? "",
          Link: LinkWA ?? "",
          isAgent: userInfo?.UserType === "AGEN",
          agentName: userInfo?.Name,
        });
        const phoneUsed = userInfo?.UserType === "AGEN" ? agent?.WAPhone || agent?.WAPhone2 || "" : getWAVerifikasi() || "";
        sendWA(phoneUsed, message);
      });
    } else {
      setIsAgentContactPopupOpen(true);
    }
  }

  return (
    <>
      <div ref={cardRef} className="w-full border border-gray-200 rounded-lg shadow-md p-4 space-y-4 bg-white">
        {/* Agent Items */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-4">
          {agents.map((agent, index) => (
            <div key={index} className="flex-1">
              <AgentItem data={agent} isFixed={false} isSingleData={agents.length === 1} onClickButton={handleClickButton} />
              {index < agents.length - 1 && <div className="block md:hidden lg:block my-4 border border-gray-100 w-full"></div>}
            </div>
          ))}
        </div>
        {/* Terms */}
        <Terms />
      </div>
      {/* Fixed Bottom */}
      {isFixed && <FixedCard agents={agents} onClickButton={handleClickButton} />}
      {/* Agent Contact Popup */}
      <AgentContactPopup
        isFromPrimary={false}
        LinkWA={LinkWA}
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
};

interface FixedCardProps {
  agents: Agent[];
  onClickButton: ({ agent, isWA }: ClickContactButtonProps) => void;
}

const FixedCard = ({ agents, onClickButton }: FixedCardProps) => {
  return (
    <div className="w-full p-4 space-y-4 bg-white fixed bottom-0 inset-x-0 z-10 border-2 border-primary shadow flex flex-col items-center">
      <div className="max-w-4xl flex flex-col items-center gap-2 w-full">
        <div className="w-full flex flex-col sm:flex-row justify-center gap-4 lg:gap-10">
          {/* Agent Items */}
          {agents.map((agent, index) => (
            <div className="flex-1" key={index}>
              <AgentItem data={agent} isFixed isSingleData={agents.length === 1} onClickButton={onClickButton} />
            </div>
          ))}
        </div>
        {/* Terms */}
        <Terms />
      </div>
    </div>
  );
};

interface AgentItemProps {
  isFixed: boolean;
  isSingleData: boolean;
  data: Agent;
  onClickButton: ({ agent, isWA }: ClickContactButtonProps) => void;
}

const AgentItem = ({ isFixed, isSingleData, data, onClickButton }: AgentItemProps) => {
  return (
    <div className={cn("w-full flex justify-between", isFixed ? "flex-row gap-4 items-center " : "flex-row sm:flex-col md:flex-row lg:flex-col gap-2")}>
      <div className="flex-1 flex items-center space-x-4">
        <Image
          src={data.Photo.Small ?? "/empty.png"}
          alt={data.Photo.Title ?? `${data.Name} Photo`}
          width={0}
          height={0}
          sizes="100vw"
          className={cn("md:w-14 md:h-14 rounded-full", isFixed ? "w-9 h-9" : "w-14 h-14")}
        />
        <div>
          {data?.URLSegment ? (
            <Link href={`/${data?.URLSegment}`}>
              <h4 className="line-clamp-1 font-bold uppercase text-sm md:text-base">{data.Name}</h4>
              <p className="font-semibold text-label-xl lg:text-sm line-clamp-1">{data.Office?.OfficeAlias ?? data.Office?.Alias ?? data.Office?.Name ?? "-"}</p>
              <p className="italic text-label-xl line-clamp-1">{data.Office?.LocationAndProvince ?? "-"}</p>
            </Link>
          ) : (
            <>
              <h4 className="line-clamp-1 font-bold uppercase text-sm md:text-base">{data.Name}</h4>
              <p className="font-semibold text-label-xl lg:text-sm line-clamp-1">{data.Office?.OfficeAlias ?? data.Office?.Alias ?? data.Office?.Name ?? "-"}</p>
              <p className="italic text-label-xl line-clamp-1">{data.Office?.LocationAndProvince ?? "-"}</p>
            </>
          )}
        </div>
      </div>
      <div className={cn("flex gap-2", isSingleData ? `flex-row ${!isFixed && "md:flex-col"}` : isFixed ? "flex-row sm:flex-col" : "flex-col items-start sm:items-stretch")}>
        <Button variant="outline" size={isFixed ? "sm" : "default"} className="flex items-center gap-2 border-black btn-contact-phone" onClick={() => onClickButton({ agent: data, isWA: false })}>
          <Phone className="w-4 h-4" />
          <span className="font-semibold hidden sm:block">Hubungi</span>
        </Button>
        <Button variant="whatsapp" size={isFixed ? "sm" : "default"} className="flex items-center gap-2" onClick={() => onClickButton({ agent: data, isWA: true })}>
          <Image src="/whatsapp.svg" alt="WhatsApp Icon" width={0} height={0} sizes="100vw" className="invert w-4 h-4" />
          <span className="font-semibold text-xs sm:text-sm">WhatsApp</span>
        </Button>
      </div>
    </div>
  );
};

const Terms = () => {
  return (
    <p className="text-xs">
      Dengan klik tombol kontak, Pengguna setuju dengan{" "}
      <Link href="/syarat-dan-ketentuan" className="font-semibold">
        Syarat Pengguna
      </Link>{" "}
      dan{" "}
      <Link href="/kebijakan-privasi" className="font-semibold">
        Kebijakan Privasi
      </Link>{" "}
    </p>
  );
};

export default DetailListingAgentsCard;
