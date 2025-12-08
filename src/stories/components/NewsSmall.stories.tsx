import NewsSmall from "@/components/custom/NewsSmall";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/NewsSmall",
  component: NewsSmall,
  tags: ["autodocs"],
} as Meta<typeof NewsSmall>;

const Template: StoryFn<typeof NewsSmall> = () => <NewsSmall />;

export const Default = Template.bind({});
Default.args = {};
