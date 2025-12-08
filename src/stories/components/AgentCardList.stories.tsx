import AgentCardList from "@/components/custom/AgentCardList";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/AgentCardList",
  component: AgentCardList,
  tags: ["autodocs"],
} as Meta<typeof AgentCardList>;

const Template: StoryFn<typeof AgentCardList> = () => <AgentCardList />;

export const Default = Template.bind({});
Default.args = {};
