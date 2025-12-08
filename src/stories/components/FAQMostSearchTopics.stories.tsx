import FAQMostSearchTopics from "@/components/custom/FAQMostSearchTopics";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/FAQMostSearchTopics",
  component: FAQMostSearchTopics,
  tags: ["autodocs"],
} as Meta<typeof FAQMostSearchTopics>;

const Template: StoryFn<typeof FAQMostSearchTopics> = () => (
  <FAQMostSearchTopics />
);

export const Default = Template.bind({});
Default.args = {};
