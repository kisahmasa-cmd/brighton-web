import CardPropertyPrimaryWithoutContact from "@/components/custom/CardPropertyPrimaryWithoutContact";
import {Meta, StoryFn} from "@storybook/nextjs";
import {Property} from "../../../types/property-types";

export default {
  title: "Components/CardPropertyPrimaryWithoutContact",
  component: CardPropertyPrimaryWithoutContact,
  tags: ["autodocs"],
} as Meta<typeof CardPropertyPrimaryWithoutContact>;

// Demo data
const demoProperty: Property = {
  ID: 1,
  Title: "ECO MEDAYU RUNGKUT",
  Title2: "Rumah 🏠 Di Surabaya, Jawa Timur",
  PriceMin: "Rp 1,5 M",
  PriceMax: "Rp 2,7 M",
  Link: "",
  Type: "Rumah",
  Content: `<div class="space-y-4">
    <div>
      <h3 class="font-bold text-lg mb-2">Tentang Properti</h3>
      <p>ECO Medayu adalah perumahan ramah lingkungan (eco-friendly) di kawasan Medayu Ayu, Rungkut, Kota Surabaya. Dikembangkan oleh PT Yekape Surabaya, proyek ini menawarkan hunian modern dengan nilai kenyamanan tinggi.</p>
    </div>
    
    <div>
      <h4 class="font-semibold mb-2">Keunggulan Lokasi</h4>
      <ul class="space-y-1 text-gray-700">
        <li>• Dekat ke Medayu Ayu, Rungkut, Surabaya Timur</li>
        <li>• Akses mudah ke jalan arteri dan penghubung kota</li>
        <li>• Dekat dengan kampus dan institusi pendidikan (UPN)</li>
        <li>• Lingkungan dengan fasilitas lengkap</li>
      </ul>
    </div>

    <div>
      <h4 class="font-semibold mb-2">Fasilitas</h4>
      <ul class="space-y-1 text-gray-700">
        <li>• One gate system untuk keamanan</li>
        <li>• Taman dan area hijau</li>
        <li>• Jalan lebar dan terawat</li>
        <li>• Konsep eco-friendly</li>
      </ul>
    </div>
  </div>`,
  ShortContent: "Perumahan eco-friendly di lokasi strategis Rungkut, Surabaya Timur",
  URLSegment: "eco-medayu-rungkut",
  Latitude: -7.3447,
  Longitude: 112.7661,
  Photos: [
    { ID: 1, Title: "Main View", Small: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400", Medium: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", Original: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200" },
    { ID: 2, Title: "Front View", Small: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400", Medium: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", Original: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200" },
    { ID: 3, Title: "Interior", Small: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400", Medium: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800", Original: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200" },
    { ID: 4, Title: "Side View", Small: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400", Medium: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800", Original: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200" }
  ],
  Developer: {
    Nama: "PT Yekape Surabaya",
    TotalPrimary: 5,
    ID: 0
  },
  Agent: [
    {
      ID: 1,
      Name: "Andy Wangi",
      Caption: "Brighton Property Consultant",
      Phone: "081234567890",
      WAPhone: "6281234567890",
      Email: "andy@example.com",
      Position: "Property Advisor",
      Photo: {
        ID: 1,
        Title: "Agent Photo",
        Small: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
        Medium: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
        Original: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
        SmallWebP: null,
        MediumWebP: null,
        OriginalWebP: null,
      },
      Office: {
        Name: "Brighton Winner Pakuwon Indah",
        OfficeAlias: "Brighton Winner",
        getOfficeLabelCityLocation: "Pakuwon Indah, Surabaya",
        City: "Pakuwon Indah",
        ClassName: "",
        Address: "",
        Email: "",
        Phone: "",
        Code: "",
        Alias: "",
        ID: 0,
        LocationAndProvince: ""
      },
      Online: true,
      Badge: [],
      WAPhone2: null,
      Address: "",
      PhoneCDMA: null,
      ShowLocation: false,
      LastOnline: null,
      ClassName: "",
      Link: ""
    },
    {
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
    }
  ],
  Location: {
    Title: "Surabaya",
    Rumah123City: "Surabaya",
    Rumah123Province: "Jawa Timur",
    URLSegment: "",
    ProvinceID: "",
    ID: 0
  }
};

const Template: StoryFn<typeof CardPropertyPrimaryWithoutContact> = () => (
  <div className="w-96">
    <CardPropertyPrimaryWithoutContact data={demoProperty}/>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
