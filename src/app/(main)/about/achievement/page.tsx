import { getCategoriesAchievement } from "@/services/achievement-service";
import { redirect } from "next/navigation";

export default async function Page() {
  const dataCategories = await getCategoriesAchievement();
  const categories = dataCategories.Data.map((cat) => cat.URLSegment);

  const firstCategory = categories[0];
  redirect(`/about/achievement/${firstCategory}`);
}
