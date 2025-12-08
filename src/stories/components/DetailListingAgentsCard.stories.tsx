import DetailListingAgentsCard from "@/components/custom/DetailListingAgentsCard";
import { Meta, StoryFn } from "@storybook/nextjs";
import agents from "../dummies/agents.json";

export default {
  title: "Components/DetailListingAgentsCard",
  component: DetailListingAgentsCard,
  tags: ["autodocs"],
} as Meta<typeof DetailListingAgentsCard>;

const Template: StoryFn<typeof DetailListingAgentsCard> = () => (
  <DetailListingAgentsCard agents={agents} />
);

export const Default = Template.bind({});
Default.args = {};
