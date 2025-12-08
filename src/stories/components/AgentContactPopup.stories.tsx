import AgentContactPopup from "@/components/custom/AgentContactPopup";
import { Button } from "@/components/ui/button";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useState } from "react";
import agents from "../dummies/agents.json";

export default {
  title: "Components/AgentContactPopup",
  component: AgentContactPopup,
  tags: ["autodocs"],
} as Meta<typeof AgentContactPopup>;

const Template: StoryFn<typeof AgentContactPopup> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isPopupOpen || false);

  return (
    <div>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Open Agent Contact
      </Button>
      <AgentContactPopup
        isFromPrimary={true}
        isPopupOpen={isOpen}
        setIsPopupOpen={setIsOpen}
        title={args.title}
        data={args.data}
        isPhoneOnly={args.isPhoneOnly}
        isShowPhoto={args.isShowPhoto}
        isWhatsAppOnly={args.isWhatsAppOnly}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Hubungi Agen",
  isShowPhoto: true,
  data: agents,
};
