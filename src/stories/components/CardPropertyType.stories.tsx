import CardPropertyType from "@/components/custom/CardPropertyType";
import {Meta, StoryFn} from "@storybook/nextjs";
import {PrimaryType} from "../../../types/property-types";
import {dummyAgent} from "@/stories/dummies/agent";

export default {
  title: "Components/CardPropertyType",
  component: CardPropertyType,
  tags: ["autodocs"],
} as Meta<typeof CardPropertyType>;
const handleVariantClick = () => {
  console.log("success handle")
};

// Demo data
const demoPropertyType: PrimaryType = {
    "ID": 3181,
    "ClassName": "PrimaryTypeData",
    "Created": "2025-07-04 14:07:24",
    "LastEdited": "2025-07-04 14:16:13",
    "Title": "Type Canary",
    "ShortDescription": "",
    "Price": "2000000000",
    "LT": "120",
    "LB": "120",
    "KM": "4",
    "KT": "2",
    "Photo": {
      "ID": 16364600,
      "Title": "canary",
      "Small": "https://cdn.brighton.co.id/Uploads/Images/16364600/21KF9bJn/canary-Small.jpg",
      "Medium": "https://cdn.brighton.co.id/Uploads/Images/16364600/21KF9bJn/canary-Medium.jpg",
      "Original": "https://cdn.brighton.co.id/Uploads/Images/16364600/21KF9bJn/canary.jpg"
    }
  };

const Template: StoryFn<typeof CardPropertyType> = () => (
  <div className="w-96">
    <CardPropertyType type={demoPropertyType} onClick={handleVariantClick} agents={dummyAgent}/>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
