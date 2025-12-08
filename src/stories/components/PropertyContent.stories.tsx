import PropertyContent from "@/components/custom/PropertyContent";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/PropertyContent",
  component: PropertyContent,
  tags: ["autodocs"],
} as Meta<typeof PropertyContent>;

const Template: StoryFn<typeof PropertyContent> = () => <PropertyContent content={"TESTING"} />;

export const Default = Template.bind({});
Default.args = {};
