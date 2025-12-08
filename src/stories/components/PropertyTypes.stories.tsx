import PropertyTypes from "@/components/custom/PropertyTypes";
import { Meta, StoryFn } from "@storybook/nextjs";
import {dummyAgent} from "@/stories/dummies/agent";

export default {
  title: "Components/PropertyTypes",
  component: PropertyTypes,
  tags: ["autodocs"],
} as Meta<typeof PropertyTypes>;

const Template: StoryFn<typeof PropertyTypes> = () => <PropertyTypes types={[]} agents={dummyAgent} />;

export const Default = Template.bind({});
Default.args = {};
