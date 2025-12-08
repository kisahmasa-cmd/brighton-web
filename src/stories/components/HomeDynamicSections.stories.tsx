import HomeDynamicSections from "@/components/custom/HomeDynamicSections";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/HomeDynamicSections",
  component: HomeDynamicSections,
  tags: ["autodocs"],
} as Meta<typeof HomeDynamicSections>;

const Template: StoryFn<typeof HomeDynamicSections> = () => <HomeDynamicSections />;

export const Default = Template.bind({});
Default.args = {};
