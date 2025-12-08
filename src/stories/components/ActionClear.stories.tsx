import ActionClear from "@/components/custom/ActionClear";
import { Meta, StoryFn } from "@storybook/nextjs";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";

export default {
  title: "Components/ActionClear",
  component: ActionClear,
  tags: ["autodocs"],
} as Meta<typeof ActionClear>;

const Template: StoryFn<typeof ActionClear> = () => <ActionClear value={undefined} onClear={function(): void {
    console.log("Function not implemented.");
} } > <Select value={"wow"} onValueChange={function(): void {
  console.log("Function not implemented.");
}}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Lokal"/>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="0">Lokal</SelectItem>
    <SelectItem value="1">Luar Negeri</SelectItem>
  </SelectContent>
</Select> </ActionClear>;

export const Default = Template.bind({});
Default.args = {};
