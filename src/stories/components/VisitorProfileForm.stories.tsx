import VisitorProfileForm from "@/components/custom/VisitorProfileForm";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/VisitorProfileForm",
  component: VisitorProfileForm,
  tags: ["autodocs"],
} as Meta<typeof VisitorProfileForm>;

const userDummy = {
  Name: 'Dayat',
  Email: 'dayatkun@mail.com',
  Phone: '08987654321',
  Address: 'Rumahnya Jauh',
}

const Template: StoryFn<typeof VisitorProfileForm> = () => <VisitorProfileForm user={userDummy} />;

export const Default = Template.bind({});
Default.args = {};
