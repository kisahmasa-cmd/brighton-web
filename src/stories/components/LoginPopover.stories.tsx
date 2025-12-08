import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import LoginPopover from "@/components/custom/LoginPopover";

export default {
  title: "Components/LoginPopover",
  component: LoginPopover,
} as Meta<typeof LoginPopover>;

const Template: StoryFn<typeof LoginPopover> = () => <LoginPopover />;

export const Default = Template.bind({});
Default.args = {};
