import LoginPageForm from "@/components/custom/LoginPageForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/LoginPageForm",
  component: LoginPageForm,
  tags: ["autodocs"],
} as Meta<typeof LoginPageForm>;

const Template: StoryFn<typeof LoginPageForm> = () => <LoginPageForm />;

export const Default = Template.bind({});
Default.args = {};
