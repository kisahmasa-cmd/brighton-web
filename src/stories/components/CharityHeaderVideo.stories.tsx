import CharityHeaderVideo from "@/components/custom/CharityHeaderVideo";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/CharityHeaderVideo",
  component: CharityHeaderVideo,
  tags: ["autodocs"],
} as Meta<typeof CharityHeaderVideo>;

const Template: StoryFn<typeof CharityHeaderVideo> = () => (
  <CharityHeaderVideo />
);

export const Default = Template.bind({});
Default.args = {};
