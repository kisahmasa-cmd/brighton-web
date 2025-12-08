import RegisterPageForm from "@/components/custom/RegisterPageForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/RegisterPageForm",
  component: RegisterPageForm,
  tags: ["autodocs"],
} as Meta<typeof RegisterPageForm>;

const Template: StoryFn<typeof RegisterPageForm> = () => <RegisterPageForm termContent="<p>Term conditions paragraph...</p>" />;

export const Default = Template.bind({});
Default.args = {};
