import SignaturePad from "@/components/custom/agent-registration/SignaturePad";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/SignaturePad",
  component: SignaturePad,
  tags: ["autodocs"],
} as Meta<typeof SignaturePad>;

const Template: StoryFn<typeof SignaturePad> = (args) => <SignaturePad {...args} />;

export const Default = Template.bind({});
Default.args = {

};
