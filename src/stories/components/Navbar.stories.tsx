import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import Navbar from "@/components/custom/Navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {};
