import SearchEmpty from "@/components/custom/SearchEmpty";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/SearchEmpty",
  component: SearchEmpty,
  tags: ["autodocs"],
} as Meta<typeof SearchEmpty>;

const Template: StoryFn<typeof SearchEmpty> = () => <SearchEmpty />;

export const Default = Template.bind({});
Default.args = {};
