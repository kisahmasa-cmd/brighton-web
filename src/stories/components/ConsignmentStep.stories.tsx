import ConsignmentStep from "@/components/custom/ConsignmentStep";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/ConsignmentStep",
  component: ConsignmentStep,
  tags: ["autodocs"],
} as Meta<typeof ConsignmentStep>;

const Template: StoryFn<typeof ConsignmentStep> = () => <ConsignmentStep />;

export const Default = Template.bind({});
Default.args = {};
