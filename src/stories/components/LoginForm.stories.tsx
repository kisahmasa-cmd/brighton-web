import LoginForm from "@/components/custom/LoginForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  isMember: true,
};
