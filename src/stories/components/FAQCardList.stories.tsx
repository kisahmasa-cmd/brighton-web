import FAQCardList from "@/components/custom/FAQCardList";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/FAQCardList",
  component: FAQCardList,
  tags: ["autodocs"],
} as Meta<typeof FAQCardList>;

const Template: StoryFn<typeof FAQCardList> = () => <FAQCardList />;

export const Default = Template.bind({});
Default.args = {};
