import CharityDetail from "@/components/custom/CharityDetail";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/CharityDetail",
  component: CharityDetail,
  tags: ["autodocs"],
} as Meta<typeof CharityDetail>;

const Template: StoryFn<typeof CharityDetail> = () => <CharityDetail />;

export const Default = Template.bind({});
Default.args = {};
