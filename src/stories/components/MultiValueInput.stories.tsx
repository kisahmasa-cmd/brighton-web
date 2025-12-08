import MultiValueInput from "@/components/custom/MultiValueInput";
import { Meta, StoryFn } from "@storybook/nextjs";
import { useState } from "react";

export default {
  title: "Components/MultiValueInput",
  component: MultiValueInput,
  tags: ["autodocs"],
} as Meta<typeof MultiValueInput>;

const Template: StoryFn<typeof MultiValueInput> = () => {
  const tagsData = [
    { label: "Berita", value: "berita" },
    { label: "Tips", value: "tips" },
    { label: "Properti", value: "properti" },
    { label: "Investasi", value: "investasi" },
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return <MultiValueInput label="Tag Artikel" id="tags" placeholder="Pilih Tag Artikel" options={tagsData} value={selectedTags} onChange={(selected) => setSelectedTags(selected)} />;
};

export const Default = Template.bind({});
Default.args = {};
