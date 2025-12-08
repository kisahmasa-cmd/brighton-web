import UserMenuPopover from "@/components/custom/UserMenuPopover";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/UserMenuPopover",
  component: UserMenuPopover,
  tags: ["autodocs"],
} as Meta<typeof UserMenuPopover>;

const Template: StoryFn<typeof UserMenuPopover> = (args) => (
  <div className="w-72 border border-gray-200 p-4">
    <UserMenuPopover {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isMember: true,
};
