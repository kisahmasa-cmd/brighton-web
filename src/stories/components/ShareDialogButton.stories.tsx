import ShareDialogButton from "@/components/custom/ShareDialogButton";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/ShareDialogButton",
  component: ShareDialogButton,
  tags: ["autodocs"],
} as Meta<typeof ShareDialogButton>;

const Template: StoryFn<typeof ShareDialogButton> = (args) => (
  <ShareDialogButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  URL: "https://example.com",
  emailSubject: "Email Subject",
};
