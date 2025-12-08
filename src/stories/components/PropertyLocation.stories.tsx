import PropertyLocation from "@/components/custom/PropertyLocation";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/PropertyLocation",
  component: PropertyLocation,
  tags: ["autodocs"],
} as Meta<typeof PropertyLocation>;

const Template: StoryFn<typeof PropertyLocation> = () => <PropertyLocation />;

export const Default = Template.bind({});
Default.args = {};
