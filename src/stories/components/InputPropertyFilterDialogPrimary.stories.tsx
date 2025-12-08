import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import InputPropertyFilterDialogPrimary from "@/components/custom/InputPropertyFilterDialogPrimary";

export default {
  title: "Components/InputPropertyFilterDialogPrimary",
  component: InputPropertyFilterDialogPrimary,
  tags: ["autodocs"],
} as Meta<typeof InputPropertyFilterDialogPrimary>;

const Template: StoryFn<typeof InputPropertyFilterDialogPrimary> = () => <InputPropertyFilterDialogPrimary />;

export const Default = Template.bind({});
Default.args = {};
