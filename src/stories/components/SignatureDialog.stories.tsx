import SignatureDialog from "@/components/custom/agent-registration/SignatureDialog";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/SignatureDialog",
  component: SignatureDialog,
  tags: ["autodocs"],
} as Meta<typeof SignatureDialog>;

const Template: StoryFn<typeof SignatureDialog> = (args) => <SignatureDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  fullName: "John Doe",
  disabled: false,
  onChangeSignature: () => {},
};
