import VerificationPhoneForm from "@/components/custom/VerificationPhoneForm";
import { Meta, StoryFn } from "@storybook/nextjs";
import { UserData } from "../../../types/user-types";

export default {
  title: "Components/VerificationPhoneForm",
  component: VerificationPhoneForm,
  tags: ["autodocs"],
} as Meta<typeof VerificationPhoneForm>;

const Template: StoryFn<typeof VerificationPhoneForm> = (args) => (
  <div className="w-96">
    <VerificationPhoneForm {...args} />
  </div>
);

const user: UserData = {
  UserID: "123",
  Phone: "081234567890",
  Name: "?",
  Email: "?",
  IsVerified: false,
  UserType: "MEMBER",
}

export const Default = Template.bind({});
Default.args = {
  user: user,
};
