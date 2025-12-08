import ForgotPasswordDialog from "@/components/custom/ForgotPasswordDialog";
import { Button } from "@/components/ui/button";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/ForgotPasswordDialog",
  component: ForgotPasswordDialog,
  tags: ["autodocs"],
} as Meta<typeof ForgotPasswordDialog>;

const Template: StoryFn<typeof ForgotPasswordDialog> = () => (
  <ForgotPasswordDialog>
    <Button variant="secondary">Open Dialog</Button>
  </ForgotPasswordDialog>
);

export const Default = Template.bind({});
Default.args = {};
