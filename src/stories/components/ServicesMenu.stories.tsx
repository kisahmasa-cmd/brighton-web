import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import Navbar from "@/components/custom/Navbar";
import ServicesMenu from "@/components/custom/ServicesMenu";

export default {
  title: "Components/ServicesMenu",
  component: ServicesMenu,
  tags: ["autodocs"],
} as Meta<typeof ServicesMenu>;

const Template: StoryFn<typeof ServicesMenu> = (args) => <ServicesMenu />;

export const Default = Template.bind({});
Default.args = {};
