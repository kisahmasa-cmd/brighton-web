import FAQCard from "@/components/custom/FAQCard";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/FAQCard",
  component: FAQCard,
  tags: ["autodocs"],
} as Meta<typeof FAQCard>;

const Template: StoryFn<typeof FAQCard> = () => (
  <FAQCard
    href="#!"
    iconSrc="/icon-caribelisewa.png"
    label="Seputar Cari, Beli dan Sewa Properti"
  />
);

export const Default = Template.bind({});
Default.args = {};
