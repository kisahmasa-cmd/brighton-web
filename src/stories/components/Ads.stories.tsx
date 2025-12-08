import Ads from "@/components/custom/Ads";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/Ads",
  component: Ads,
  tags: ["autodocs"],
} as Meta<typeof Ads>;

const Template: StoryFn<typeof Ads> = () => <Ads />;

export const Default = Template.bind({});
Default.args = {};
