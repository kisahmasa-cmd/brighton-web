import PropertyKPR from "@/components/custom/PropertyKPR";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/PropertyKPR",
  component: PropertyKPR,
  tags: ["autodocs"],
} as Meta<typeof PropertyKPR>;

const Template: StoryFn<typeof PropertyKPR> = () => <PropertyKPR priceMin={"1212"} installment={0} onInstallmentChange={function(value: number): void {
  console.log(`Callback from func. Value is ${value}`);
} } />;

export const Default = Template.bind({});
Default.args = {};
