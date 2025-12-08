import RegisterAgentForm from "@/components/custom/agent-registration/RegisterAgentForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/RegisterAgentForm",
  component: RegisterAgentForm,
  tags: ["autodocs"],
} as Meta<typeof RegisterAgentForm>;

const Template: StoryFn<typeof RegisterAgentForm> = () => <RegisterAgentForm termContent="<p>Term conditions paragraph...</p>" />;

export const Default = Template.bind({});
Default.args = {};
