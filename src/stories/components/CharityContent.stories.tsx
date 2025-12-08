import CharityContent from "@/components/custom/CharityContent";
import { Meta, StoryFn } from "@storybook/nextjs";
import { CharityCategoryData } from "../../../types/charity-types";

export default {
  title: "Components/CharityContent",
  component: CharityContent,
  tags: ["autodocs"],
} as Meta<typeof CharityContent>;

const data: CharityCategoryData[] = Array.from({ length: 3 }).map(() => {
  return {
    ID: 1,
    ClassName: "CharityCategoryData",
    LastEdited: "2024-06-07T16:52:25.000Z",
    Created: "2024-06-07T16:52:25.000Z",
    Title: "Pengobatan",
    SubTitle: "Inilah pengobatan",
    URLSegment: "pengobatan",
    IsShow: 0,
    IconID: 6455770,
    Unit: "a",
    Count: 999,
    Icon: {
      Small:
        "https://storage.googleapis.com/brighton-assets/Uploads/Images/6455770/KR9rEDV6/photo-Small.png",
      Medium:
        "https://storage.googleapis.com/brighton-assets/Uploads/Images/6455770/KR9rEDV6/photo-Medium.png",
      Original:
        "https://storage.googleapis.com/brighton-assets/Uploads/Images/6455770/KR9rEDV6/photo.png",
      SmallWebP: "",
      MediumWebP: "",
      OriginalWebP: "null",
    },
  };
});

const Template: StoryFn<typeof CharityContent> = () => (
  <CharityContent categories={data} />
);

export const Default = Template.bind({});
Default.args = {};
