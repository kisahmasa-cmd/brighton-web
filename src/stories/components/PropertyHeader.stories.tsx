import PropertyHeader from "@/components/custom/PropertyHeader";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/PropertyHeader",
  component: PropertyHeader,
  tags: ["autodocs"],
} as Meta<typeof PropertyHeader>;

const Template: StoryFn<typeof PropertyHeader> = () => <PropertyHeader title={"TEST"} subtitle={"TESTING"} location={"JAUH"} currency={"Rp"} priceMin={"111"} priceMax={"2222"} />;

export const Default = Template.bind({});
Default.args = {};
