import ContactForm from "@/components/custom/ContactForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
} as Meta<typeof ContactForm>;

const Template: StoryFn<typeof ContactForm> = () => {
  return (
    <div className="space-y-4">
      <ContactForm />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
