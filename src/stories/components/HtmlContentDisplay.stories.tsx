import { HtmlContentDisplay } from "@/components/custom/HtmlContentDisplay";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/HtmlContentDisplay",
  component: HtmlContentDisplay,
  tags: ["autodocs"],
} as Meta<typeof HtmlContentDisplay>;

const Template: StoryFn<typeof HtmlContentDisplay> = () => <HtmlContentDisplay content="<p>test</p>" />;

export const Default = Template.bind({});
Default.args = {};
