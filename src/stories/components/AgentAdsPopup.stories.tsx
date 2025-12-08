import AgentAdsPopup from "@/components/custom/AgentAdsPopup";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useEffect, useRef } from "react";

export default {
  title: "Components/AgentAdsPopup",
  component: AgentAdsPopup,
  tags: ["autodocs"],
} as Meta<typeof AgentAdsPopup>;

const agentData = {
  ID: 20990,
  ClassName: "AgentData",
  Name: "DEWITHA (SUOF)",
  WAPhone: "6281517183150",
  WAPhone2: null,
  Phone: "081517183150",
  PhoneCDMA: null,
  Address: " AZURA HOUSE BLOK C15 NO.25, VANYA PARK, BSD                 ",
  Position: "Business Manager",
  Link: "https://www.brighton.co.id/anitadewisoesanto",
  Online: false,
  LastOnline: "2025-05-21 13:43:00",
  ShowLocation: true,
  Photo: {
    ID: 7043282,
    Title: "Foto Bu Dewitha",
    Small:
      "https://cdn.brighton.co.id/Uploads/Images/7043282/kkcnsdLk/Foto-Bu-Dewitha-Small.jpg",
    Medium:
      "https://cdn.brighton.co.id/Uploads/Images/7043282/kkcnsdLk/Foto-Bu-Dewitha-Medium.jpg",
    Original:
      "https://cdn.brighton.co.id/Uploads/Images/7043282/kkcnsdLk/Foto-Bu-Dewitha.jpg",
  },
  Office: {
    ID: 38,
    ClassName: "OfficeData",
    Phone: "021 2222 9991",
    Name: "Brighton Favour BSD",
    Address: "Ruko Mendrisio 3 Blok C No.30 Boulevard Il Lago, Gading Serpong",
    Email: "brightonfavour@yahoo.com",
    City: "BSD",
    Code: "BRBSD",
    Alias: "Brighton Favour",
    LocationAndProvince: "BSD - Tangerang",
  },
};

const Template: StoryFn<typeof AgentAdsPopup> = () => {
  const popupRef = useRef<{ openDialog: () => void }>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      popupRef.current?.openDialog();
    }, 3000); // buka popup setelah 3 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <AgentAdsPopup
        data={agentData}
        onReady={(actions) => {
          popupRef.current = actions;
        }}
      />

      <p className="text-sm text-muted-foreground">
        Popup akan muncul otomatis setelah 3 detik...
      </p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
