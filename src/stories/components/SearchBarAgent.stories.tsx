import SearchBarAgent from "@/components/custom/SearchBarAgent";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/SearchBarAgent",
  component: SearchBarAgent,
  tags: ["autodocs"],
} as Meta<typeof SearchBarAgent>;

const Template: StoryFn<typeof SearchBarAgent> = (args) => <SearchBarAgent />;

export const Default = Template.bind({});
Default.args = {};
