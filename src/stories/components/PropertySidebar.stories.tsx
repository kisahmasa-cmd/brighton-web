import PropertySidebar from "@/components/custom/PropertySidebar";
import { Meta, StoryFn } from "@storybook/nextjs";
import {Property} from "../../../types/property-types";
import {dummyPropertyPrimary} from "@/stories/dummies/property-primary";

export default {
  title: "Components/PropertySidebar",
  component: PropertySidebar,
  tags: ["autodocs"],
} as Meta<typeof PropertySidebar>;

const demoProperty: Property = dummyPropertyPrimary;

const Template: StoryFn<typeof PropertySidebar> = () => <PropertySidebar agents={[]} property={demoProperty} />;

export const Default = Template.bind({});
Default.args = {};
