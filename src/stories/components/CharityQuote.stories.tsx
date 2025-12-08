import CharityQuote from "@/components/custom/CharityQuote";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/CharityQuote",
  component: CharityQuote,
  tags: ["autodocs"],
} as Meta<typeof CharityQuote>;

const Template: StoryFn<typeof CharityQuote> = () => <CharityQuote />;

export const Default = Template.bind({});
Default.args = {};
