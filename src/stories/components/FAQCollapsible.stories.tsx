import FAQCollapsible from "@/components/custom/FAQCollapsible";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/FAQCollapsible",
  component: FAQCollapsible,
  tags: ["autodocs"],
} as Meta<typeof FAQCollapsible>;

const Template: StoryFn<typeof FAQCollapsible> = () => (
  <FAQCollapsible
    title="title collapsible"
    questions={[
      {
        ID: 1,
        Title: "What is Brighton?",
        Description: "Brighton is a leading property agency.",
        FAQCategoryID: 1,
        URLSegment: "what-is-brighton",
      },
      {
        ID: 2,
        Title: "How to contact an agent?",
        Description: "You can contact agents via our website.",
        FAQCategoryID: 1,
        URLSegment: "how-to-contact-agent",
      },
      {
        ID: 3,
        Title: "Do you provide property valuation?",
        Description: "Yes, Brighton offers property valuation services.",
        FAQCategoryID: 1,
        URLSegment: "property-valuation",
      },
    ]}
  />
);

export const Default = Template.bind({});
Default.args = {};
