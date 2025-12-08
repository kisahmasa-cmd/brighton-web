import FAQRelatedTopics from "@/components/custom/FAQRelatedTopics";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/FAQRelatedTopics",
  component: FAQRelatedTopics,
  tags: ["autodocs"],
} as Meta<typeof FAQRelatedTopics>;

const Template: StoryFn<typeof FAQRelatedTopics> = () => <FAQRelatedTopics />;

export const Default = Template.bind({});
Default.args = {};
