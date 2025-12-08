import DetailListingKPRCalculator from "@/components/custom/DetailListingKPRCalculator";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/DetailListingKPRCalculator",
  component: DetailListingKPRCalculator,
  tags: ["autodocs"],
} as Meta<typeof DetailListingKPRCalculator>;

const Template: StoryFn<typeof DetailListingKPRCalculator> = () => (
  <DetailListingKPRCalculator propertyPrice={3900000000} />
);

export const Default = Template.bind({});
Default.args = {};
