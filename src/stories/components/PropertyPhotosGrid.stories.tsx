import PropertyPhotosGrid from "@/components/custom/PropertyPhotosGrid";
import { Meta, StoryFn } from "@storybook/nextjs";
import { Photo } from "../../../types/api-types";

export default {
  title: "Components/PropertyPhotosGrid",
  component: PropertyPhotosGrid,
  tags: ["autodocs"],
} as Meta<typeof PropertyPhotosGrid>;

const photos: Photo[] = Array.from({ length: 5 }).map((_, index) => ({
  ID: index + 1,
  Original: `https://picsum.photos/id/${index}/600/300`,
  Medium: `https://picsum.photos/id/${index}/300/200`,
  Small: `https://picsum.photos/id/${index}/150/100`,
  Title: `photo ${index + 1}`,
}));

const Template: StoryFn<typeof PropertyPhotosGrid> = () => (
  <PropertyPhotosGrid photos={photos} />
);

export const Default = Template.bind({});
Default.args = {};
