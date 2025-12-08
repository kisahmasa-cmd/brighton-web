import SearchFilterPrimaryMobile from "@/components/custom/SearchFilterPrimaryMobile";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/SearchFilterPrimaryMobile",
  component: SearchFilterPrimaryMobile,
  tags: ["autodocs"],
} as Meta<typeof SearchFilterPrimaryMobile>;

const Template: StoryFn<typeof SearchFilterPrimaryMobile> = () => <SearchFilterPrimaryMobile />;

export const Default = Template.bind({});
Default.args = {};
