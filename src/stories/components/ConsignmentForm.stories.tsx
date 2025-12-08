import ConsignmentForm from "@/components/custom/ConsignmentForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/ConsignmentForm",
  component: ConsignmentForm,
  tags: ["autodocs"],
} as Meta<typeof ConsignmentForm>;

const Template: StoryFn<typeof ConsignmentForm> = () => (
  <div className="w-full md:w-3/5">
    <ConsignmentForm />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
