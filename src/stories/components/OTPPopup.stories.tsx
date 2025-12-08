import OTPPopup from "@/components/custom/OTPPopup";
import { Button } from "@/components/ui/button";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useState } from "react";

export default {
  title: "Components/OTPPopup",
  component: OTPPopup,
  tags: ["autodocs"],
} as Meta<typeof OTPPopup>;

const Template: StoryFn<typeof OTPPopup> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleSuccess() {
    console.log("handle if otp success");
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open OTP Popup</Button>
      <OTPPopup
        title={args.title}
        isPopupOpen={isOpen}
        setIsPopupOpen={setIsOpen}
        agentID={17066}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Hubungi Agen",
};
