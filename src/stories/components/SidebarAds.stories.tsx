import SidebarAds from "@/components/custom/SidebarAds";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/SidebarAds",
  component: SidebarAds,
  tags: ["autodocs"],
} as Meta<typeof SidebarAds>;

const Template: StoryFn<typeof SidebarAds> = () => (
  <div className="w-72">
    <SidebarAds />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
