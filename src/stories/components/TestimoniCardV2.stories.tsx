import TestimoniCardV2 from "@/components/custom/TestimoniCardV2";
import { Meta, StoryFn } from "@storybook/nextjs";
import testimonies from "../dummies/testimonies.json";
import { TestimoniData } from "../../../types/testimoni-types";

export default {
  title: "Components/TestimoniCardV2",
  component: TestimoniCardV2,
  tags: ["autodocs"],
} as Meta<typeof TestimoniCardV2>;

const Template: StoryFn<typeof TestimoniCardV2> = (args) => {
  const data =
    testimonies.find(
      (item) => item.Type === (args.isAgent ? "AGEN" : "UMUM"),
    ) ?? testimonies[0];
  return (
    <div className="w-96">
      <TestimoniCardV2
        data={data as TestimoniData}
        isAgent={args.isAgent}
        isFullText={args.isFullText}
        isShowButton={args.isShowButton}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Agent = Template.bind({});
Agent.args = { isAgent: true };

export const WithButton = Template.bind({});
WithButton.args = { isShowButton: true };
