import AgentCitiesCarousel from "@/components/custom/AgentCitiesCarousel";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/AgentCitiesCarousel",
  component: AgentCitiesCarousel,
  tags: ["autodocs"],
} as Meta<typeof AgentCitiesCarousel>;

const Template: StoryFn<typeof AgentCitiesCarousel> = () => (
  <AgentCitiesCarousel />
);
export const Default = Template.bind({});
Default.args = {};
