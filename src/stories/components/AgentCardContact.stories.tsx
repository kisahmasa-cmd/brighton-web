import AgentCardContact from "@/components/custom/AgentCardContact";
import {Meta, StoryFn} from "@storybook/nextjs";
import {Agent} from "../../../types/agent-types";
import {Property} from "../../../types/property-types";
import {dummyPropertyPrimary} from "@/stories/dummies/property-primary";

export default {
  title: "Components/AgentCardContact",
  component: AgentCardContact,
  tags: ["autodocs"],
} as Meta<typeof AgentCardContact>;

// Demo data
const demoAgent: Agent = {
    ID: 2,
    Name: "Herman Tan",
    Caption: "Senior Property Advisor",
    Phone: "081234567891",
    WAPhone: "6281234567891",
    Email: "herman@example.com",
    Position: "Business Manager",
    Photo: {
      ID: 2,
      Title: "Agent Photo",
      Small: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      Medium: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      Original: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      SmallWebP: null,
      MediumWebP: null,
      OriginalWebP: null,
    },
    Office: {
      Name: "Brighton Infinite Mayjend Sungkono",
      OfficeAlias: "Brighton Infinite",
      getOfficeLabelCityLocation: "Mayjend Sungkono, Surabaya",
      City: "Mayjend Sungkono",
      ClassName: "",
      Address: "",
      Email: "",
      Phone: "",
      Code: "",
      Alias: "",
      ID: 0,
      LocationAndProvince: ""
    },
    Online: false,
    Badge: [],
    WAPhone2: null,
    Address: "",
    PhoneCDMA: null,
    ShowLocation: false,
    LastOnline: null,
    ClassName: "",
    Link: ""
  };

const demoProperty: Property = dummyPropertyPrimary;

const Template: StoryFn<typeof AgentCardContact> = () => (
  <div className="w-96">
    <AgentCardContact agent={demoAgent} property={demoProperty}/>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
