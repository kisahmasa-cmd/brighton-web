"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { sendWA } from "../../../utils/sendWA";
import OTPPopup from "./OTPPopup";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Agent } from "../../../types/agent-types";
import { useUser } from "./UserContext";
import { getWAVerifikasi } from "../../../utils/getWA";
import { generateWhatsAppMessage } from "@/app/action/generateWhatsAppMessage";
import { saveActivityLog } from "@/services/activity-log-service";

interface AgentAdsPopupProps {
  data: Agent;
  onReady: (actions: { openDialog: () => void }) => void;
  IDCodeWA?: string;
  TitleWA?: string;
  LinkWA?: string;
}

const AgentAdsPopup: React.FC<AgentAdsPopupProps> = ({ data, onReady, IDCodeWA, LinkWA, TitleWA }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOTPPopupOpen, setIsOTPPopupOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const userInfo = useUser();

  function openDialog() {
    setIsDialogOpen(true);
  }

  function handleDialogOpen(open: boolean) {
    setIsDialogOpen(open);
  }

  async function handleClickButton() {
    saveActivityLog({
      Action: "Contact",
      UserContact: data.WAPhone ?? "",
      UserID: userInfo?.UserID?.toString() ?? "",
      UserType: userInfo?.UserType === "AGEN" ? "Agent" : "Visitor",
      UserName: userInfo?.Name ?? "",
      RefURL: LinkWA ?? "",
      RefID: IDCodeWA ?? "",
      ContactType: "WhatsApp",
      Source: "Website",
      ContactID: data.ID?.toString() ?? "",
      Contact: data.WAPhone ?? "",
      RefType: "PropertyData",
    });
    handleSuccess();
  }

  function handleSuccess() {
    startTransition(async () => {
      const message = await generateWhatsAppMessage({
        IDCode: IDCodeWA ?? "",
        Title: TitleWA ?? "",
        Link: LinkWA ?? "",
        isAgent: userInfo?.UserType === "AGEN",
        agentName: userInfo?.Name,
      });

      const phoneUsed = userInfo?.UserType === "AGEN" ? data.WAPhone : getWAVerifikasi();

      sendWA(phoneUsed, message);
    });
  }

  useEffect(() => {
    if (onReady) {
      onReady({ openDialog });
    }
  }, [onReady]);

  return (
    <>
      <OTPPopup title="Hubungi Agen" isPopupOpen={isOTPPopupOpen} setIsPopupOpen={setIsOTPPopupOpen} agentID={data.ID ?? 0} onSuccess={handleSuccess} />
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
        <DialogContent showCloseButton={false} className="w-96 rounded-2xl p-0 border-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Hidden Title for Accessibility</DialogTitle>
          </VisuallyHidden>
          {/* Yellow Header Section */}
          <div className="bg-primary px-8 pt-8 pb-24 text-center">
            <h2 className="text-4xl font-black text-black">
              Tertarik dengan
              <br />
              Properti Ini?
            </h2>
          </div>
          {/* Profile Image - Overlapping */}
          <div className="relative -mt-22 flex justify-center">
            <div className="w-36 h-36 rounded-full bg-white p-1 ">
              <div className="w-full h-full rounded-full bg-primary overflow-hidden">
                <Image src={data.Photo.Medium ?? "/empty.png"} alt={data.Photo.Title ?? "Agent Photo"} width={0} height={0} sizes="100vw" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          {/* Agent Info Section */}
          <div className="px-4 pt-2 pb-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 uppercase">{data.Name ?? "Agent Name"}</h2>
            <p className="text-xl md:text-2xl font-bold text-black mb-6">Siap Membantu!</p>

            {/* WhatsApp Button */}
            <Button variant="whatsapp" size="lg" type="button" className="flex items-center gap-2 w-full" onClick={handleClickButton}>
              <Image src="/whatsapp.svg" alt="WhatsApp Icon" width={24} height={24} className="invert" />
              <span className="font-semibold text-xl">WhatsApp</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgentAdsPopup;
