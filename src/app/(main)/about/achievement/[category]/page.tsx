import AwardsComponent from "@/components/custom/AwardsComponent";
import { Metadata } from "next";

export default async function page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return (
    <div className="container mx-auto px-2">
      <AwardsComponent selectedCategory={category} />
    </div>
  );
}

// SEO metadata
// export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
//   const { category } = await params;

//   const titles: Record<string, string> = {
//     "business-unit-commission": "15 Best Business Unit Based on Commission",
//     "achievement-business-manager": "30 Best Achievement Business Manager",
//     "mimpi-tanpa-batas": "10 Best #Mimpi Tanpa Batas",
//   };

//   return {
//     title: `${titles[category] || "Achievement"} - Brighton Awards`,
//     description: "Celebrating our top achievers and award winners at Brighton",
//   };
// }
