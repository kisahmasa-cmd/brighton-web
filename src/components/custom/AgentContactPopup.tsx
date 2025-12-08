"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";
import OTPPopup from "./OTPPopup";
import { sendWA } from "../../../utils/sendWA";
import { Agent } from "../../../types/agent-types";
import Link from "next/link";
import { checkLoginAndVerified } from "@/actions/check-login-action";
import { getWAVerifikasi } from "../../../utils/getWA";
import { useUser } from "./UserContext";
import { generateWhatsAppMessage } from "@/app/action/generateWhatsAppMessage";

interface AgentContactPopupProps {
  isFromPrimary: boolean;
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
  title?: string;
  isShowPhoto?: boolean;
  isPhoneOnly?: boolean;
  isWhatsAppOnly?: boolean;
  data: Agent[];
  layout?: "col" | "row";
  IDCodeWA?: string;
  TitleWA?: string;
  LinkWA?: string;
}

interface PhoneButtonProps {
  phoneNumber: string;
  onClick: () => void;
}

const AgentContactPopup: React.FC<AgentContactPopupProps> = ({
  isFromPrimary,
  isPopupOpen = false,
  setIsPopupOpen,
  title = "Hubungi Agen",
  isShowPhoto = true,
  isPhoneOnly = false,
  isWhatsAppOnly = false,
  data,
  layout = "col",
  LinkWA,
  TitleWA,
  IDCodeWA,
}) => {
  const [isOTPPopupOpen, setIsOTPPopupOpen] = useState(false);
  const [agentID, setAgentID] = useState<number | null>(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string>("");
  const [isSelectedWA, setIsSelectedWA] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const userInfo = useUser();

  function maskPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 4) return phone;
    const visible = cleaned.slice(0, -4);
    const masked = visible + "****";
    return masked;
  }

  async function handleClickButton(id: number, phoneNumber: string, isWA: boolean) {
    setAgentID(id);
    setSelectedPhoneNumber(phoneNumber);

    const isVerified = await checkLoginAndVerified();

    if (isVerified) {
      handleSuccess(phoneNumber, isWA);
    } else {
      setIsSelectedWA(isWA);
      setIsOTPPopupOpen(true);
    }
  }

  function handleSendWhatsApp(phone: string) {
    startTransition(async () => {
      const message = await generateWhatsAppMessage({
        IDCode: IDCodeWA ?? "",
        Title: TitleWA ?? "",
        Link: LinkWA ?? "",
        isAgent: userInfo?.UserType === "AGEN",
        agentName: userInfo?.Name,
      });
      sendWA(phone, message);
    });
  }

  function handleTelPhone(phone: string) {
    window.location.href = `tel:${phone}`;
  }

  async function handleSuccess(phoneNumber: string, isWA?: boolean) {
    const phoneUsed = userInfo?.UserType === "AGEN" || isFromPrimary ? phoneNumber : getWAVerifikasi();
    const useWA = isWA ?? isSelectedWA;

    if (useWA) {
      handleSendWhatsApp(phoneUsed);
    } else {
      handleTelPhone(phoneUsed);
    }
    setIsPopupOpen(false);
  }

  function renderPhone(phone: string) {
    if (userInfo && userInfo.IsVerified) {
      return phone;
    } else {
      return maskPhone(phone);
    }
  }

  return (
    <>
      <OTPPopup title="Hubungi Agen" isPopupOpen={isOTPPopupOpen} setIsPopupOpen={setIsOTPPopupOpen} agentID={agentID ?? 0} onSuccess={() => handleSuccess(selectedPhoneNumber, isSelectedWA)} />
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className={layout === "row" ? "max-w-screen sm:max-w-3xl" : ""}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className={`w-full border-t border-gray-200 pt-4 flex flex-${layout} justify-evenly gap-4`}>
            {data.map((agent, index) => {
              const agentUrl = agent?.URLSegment ?? agent.Link ?? "";

              return (
                <div className="flex flex-col items-center" key={index}>
                  {/* Photo */}
                  {isShowPhoto && (
                    <Image
                      src={agent.Photo.MediumWebP ?? agent.Photo.Medium ?? "/empty.png"}
                      alt={agent.Photo.Title ?? agent.Name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-full w-28 h-28 mb-2"
                    />
                  )}

                  {agentUrl ? (
                    <Link href={`/${agentUrl}`}>
                      <p className="text-2xl uppercase font-bold text-center">{agent.Name}</p>
                      <p className="text-center">{agent.Office?.Name ?? "-"}</p>
                      <p className="text-center italic text-sm">{agent.Office?.LocationAndProvince ?? "-"}</p>
                    </Link>
                  ) : (
                    <>
                      <p className="text-2xl uppercase font-bold text-center">{agent.Name}</p>
                      <p className="text-center">{agent.Office?.Name ?? "-"}</p>
                      <p className="text-center italic text-sm">{agent.Office?.LocationAndProvince ?? "-"}</p>
                    </>
                  )}

                  {(agent.Phone || agent.WAPhone) && (
                    <div className="flex flex-row gap-4 w-full mt-2">
                      {/* Phone */}
                      {agent.Phone && !isWhatsAppOnly && <PhoneButton phoneNumber={renderPhone(agent.Phone)} onClick={() => handleClickButton(agent.ID, agent.Phone!, false)} />}

                      {/* WA Phone*/}
                      {agent.WAPhone && !isPhoneOnly && <WAButton phoneNumber={renderPhone(agent.WAPhone)} onClick={() => handleClickButton(agent.ID, agent.WAPhone!, true)} />}
                    </div>
                  )}
                  {(agent.PhoneCDMA || agent.WAPhone2) && (
                    <div className="flex flex-row gap-4 w-full mt-2">
                      {/* Phone 2 */}
                      {agent.PhoneCDMA && !isWhatsAppOnly && <PhoneButton phoneNumber={renderPhone(agent.PhoneCDMA)} onClick={() => handleClickButton(agent.ID, agent.PhoneCDMA!, false)} />}

                      {/* WA Phone 2*/}
                      {agent.WAPhone2 && !isPhoneOnly && <WAButton phoneNumber={renderPhone(agent.WAPhone2)} onClick={() => handleClickButton(agent.ID, agent.WAPhone2!, true)} />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const PhoneButton: React.FC<PhoneButtonProps> = ({ phoneNumber, onClick }) => {
  return (
    <Button className="flex gap-1 rounded-full flex-1 btn-contact-phone" onClick={onClick}>
      <Phone className="w-4 h-4" />
      <span>{phoneNumber}</span>
    </Button>
  );
};

const WAButton: React.FC<PhoneButtonProps> = ({ phoneNumber, onClick }) => {
  return (
    <Button className="flex gap-1 rounded-full flex-1 btn-contact-whatsapp" onClick={onClick}>
      <Image src="/whatsapp.svg" alt="WhatsApp" width={0} height={0} sizes="100vw" className="w-4 h-4" />
      <span>{phoneNumber}</span>
    </Button>
  );
};

export default AgentContactPopup;
