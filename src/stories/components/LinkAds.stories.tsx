import LinkAds from "@/components/custom/LinkAds";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/LinkAds",
  component: LinkAds,
  tags: ["autodocs"],
} as Meta<typeof LinkAds>;

const Template: StoryFn<typeof LinkAds> = () => <LinkAds imageURL="https://cdn.brighton.co.id/Uploads/Images/10728310/2Mln439O/UP-ads-BP.webp" linkURL="#!" />;

export const Default = Template.bind({});
Default.args = {};
