import VisitorPasswordForm from "@/components/custom/VisitorPasswordForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/VisitorPasswordForm",
  component: VisitorPasswordForm,
  tags: ["autodocs"],
} as Meta<typeof VisitorPasswordForm>;

const Template: StoryFn<typeof VisitorPasswordForm> = () => <VisitorPasswordForm />;

export const Default = Template.bind({});
Default.args = {};
