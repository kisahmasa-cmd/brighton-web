import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import InputCityPrimary from "@/components/custom/InputCityPrimary";

export default {
  title: "Components/InputCityPrimary",
  component: InputCityPrimary,
  tags: ["autodocs"],
} as Meta<typeof InputCityPrimary>;

const Template: StoryFn<typeof InputCityPrimary> = () => <InputCityPrimary />;

export const Default = Template.bind({});
Default.args = {};
