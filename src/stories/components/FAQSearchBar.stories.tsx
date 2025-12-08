import FAQSearchBar from "@/components/custom/FAQSearchBar";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/FAQSearchBar",
  component: FAQSearchBar,
  tags: ["autodocs"],
} as Meta<typeof FAQSearchBar>;

const Template: StoryFn<typeof FAQSearchBar> = () => <FAQSearchBar />;

export const Default = Template.bind({});
Default.args = {};
