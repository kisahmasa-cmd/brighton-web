import NavbarVisitor from "@/components/custom/NavbarVisitor";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/NavbarVisitor",
  component: NavbarVisitor,
  tags: ["autodocs"],
} as Meta<typeof NavbarVisitor>;

const Template: StoryFn<typeof NavbarVisitor> = () => <NavbarVisitor />;

export const Default = Template.bind({});
Default.args = {};
