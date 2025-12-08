import AgentCard from "@/components/custom/AgentCard";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/AgentCard",
  component: AgentCard,
  tags: ["autodocs"],
} as Meta<typeof AgentCard>;

const Template: StoryFn<typeof AgentCard> = () => (
  <div className="w-96">
    <AgentCard />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
