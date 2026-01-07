import VisitorProfileForm from "@/components/custom/VisitorProfileForm";
import { Meta, StoryFn } from "@storybook/nextjs";
import { UserInfo } from "../../../types/user-types";

export default {
  title: "Components/VisitorProfileForm",
  component: VisitorProfileForm,
  tags: ["autodocs"],
} as Meta<typeof VisitorProfileForm>;

const userDummy : UserInfo = {
  ID: 108249,
  ClassName: "PublicMemberData",
  LastEdited: "2026-01-06T13:31:07.000Z",
  Created: "2025-11-20T09:36:28.000Z",
  Name: "Rafdi Dayat",
  Address: null,
  Email: "rafdihs@gmail.com",
  Phone: null,
  Username: "rafdihs@gmail.com",
  Password: "2af3ed18d472823751133ecb825bffa498642c0f",
  Salt: "2ae10ec70286d6d572bd6bba1b2818bd10c56f7d",
  LoginCount: 0,
  ChangePasswordCount: 1,
  OTP: 0,
  OTPCode: 0,
  PhotoID: 0,
  Telephone: "081227597517",
  Gender: null,
  OTPDueTime: "2025-11-21T13:19:22.000Z",
  ForgotPassCode: null,
  IsBlock: 0,
  AgentAccID: 0,
  GoogleID: null,
  FacebookID: null,
  AppleID: null,
  ReferrerNotes: null,
  Latitude: 0,
  Longitude: 0,
  VoucherCode: null
}

const Template: StoryFn<typeof VisitorProfileForm> = () => <VisitorProfileForm user={userDummy} />;

export const Default = Template.bind({});
Default.args = {};
