import PropertyImageGallery from "@/components/custom/PropertyImageGallery";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/PropertyImageGallery",
  component: PropertyImageGallery,
  tags: ["autodocs"],
} as Meta<typeof PropertyImageGallery>;

const Template: StoryFn<typeof PropertyImageGallery> = () => <PropertyImageGallery photos={[]} />;

export const Default = Template.bind({});
Default.args = {};
