import CharityCardList from "@/components/custom/CharityCardList";
import { Meta, StoryFn } from "@storybook/nextjs";
import { CharityData } from "../../../types/charity-types";

export default {
  title: "Components/CharityCardList",
  component: CharityCardList,
  tags: ["autodocs"],
} as Meta<typeof CharityCardList>;

const data: CharityData[] = Array.from({ length: 6 }).map(() => {
  return {
    ID: 1,
    Title: "Pendidikan Luar Negeri",
    URLSegment: "pendidikan-luar-negeri",
    Status: "PUBLISHED",
    Content:
      "<p>Pendidikan adalah bekal, cahaya yang menuntun mereka melewati gelapnya jalan kehidupan. Di balik tawa polos dan senyum yang terpancar, ada harapan yang tumbuh dalam hati anak-anak salah satunya adalah harapan untuk suatu hari meraih mimpi yang kini terasa begitu jauh.</p><p>Brighton Peduli hadir di Panti Asuhan Agape, membawa sejumput cahaya dan hangatnya kebersamaan. Dalam suasana penuh kasih, kami berbagi bukan hanya cerita, tapi juga impian. Melihat mata mereka yang berbinar ketika berbicara tentang cita-cita, kami tahu betapa besar arti setiap dukungan bagi masa depan mereka.</p><p>Di sana, kami tak hanya memberi, tapi belajar bahwa ketulusan mereka menyimpan kekuatan, dan bahwa dukungan yang kami berikan adalah langkah kecil menuju mimpi besar mereka. Semoga setiap momen kebersamaan ini menjadi pengingat, bahwa ada masa depan yang harus kita bantu mereka wujudkan mimpi mereka.</p>",
    Category: {
      ClassName: "CharityCategoryData",
      Title: "Pendidikan",
      Unit: "tidak ada",
      ID: 2,
      LastEdited: "",
      Created: "",
      SubTitle: "",
      URLSegment: "pendidikan",
      IsShow: 1,
      IconID: 1,
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
    },
    Photo: {
      Small:
        "https://storage.googleapis.com/brighton-assets/Uploads/Images/6468499/0PPieDIi/img2-Small.jpg",
      Medium:
        "https://storage.googleapis.com/brighton-assets/Uploads/Images/6468499/0PPieDIi/img2-Medium.jpg",
      Original:
        "https://storage.googleapis.com/brighton-assets/Uploads/Images/6468499/0PPieDIi/img2.jpg",
      SmallWebP: "",
      MediumWebP: "",
      OriginalWebP: "",
    },
  };
});

const Template: StoryFn<typeof CharityCardList> = () => (
  <CharityCardList data={data} dataTotal={10} />
);

export const Default = Template.bind({});
Default.args = {};
