import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import InputPropertyPriceRange from "@/components/custom/InputPropertyPriceRange";

export default {
  title: "Components/InputPropertyPriceRange",
  component: InputPropertyPriceRange,
  tags: ["autodocs"],
} as Meta<typeof InputPropertyPriceRange>;

const Template: StoryFn<typeof InputPropertyPriceRange> = () => <InputPropertyPriceRange />;

export const Default = Template.bind({});
Default.args = {};
