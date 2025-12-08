import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs";
import InputPropertyOrderBy from "@/components/custom/InputPropertyOrderBy";

export default {
  title: "Components/InputPropertyOrderBy",
  component: InputPropertyOrderBy,
  tags: ["autodocs"],
} as Meta<typeof InputPropertyOrderBy>;

const Template: StoryFn<typeof InputPropertyOrderBy> = () => <InputPropertyOrderBy category={""} />;

export const Default = Template.bind({});
Default.args = {};
