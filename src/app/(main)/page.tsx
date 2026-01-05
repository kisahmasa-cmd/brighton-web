import HomeHeader from "@/components/custom/HomeHeader";
import HomeDynamicSections from "@/components/custom/HomeDynamicSections";
import { getBannerHero, getShortcuts } from "@/services/homepage-service/homepage-service";
import { InjectSchema } from "@/lib/schema/inject-schema";
import { buildHomepageSchema } from "@/lib/schema/schema-builder-helper";
import NotFound from "@/components/custom/NotFound";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 300; // CACHE PAGE

export default async function Home() {
  const [dataBannerImage, dataServiceMenu] = await Promise.all([getBannerHero(), getShortcuts()]);

  if (!dataBannerImage?.Data) return <NotFound />;

  const homepageSchema = buildHomepageSchema();

  return (
    <main className="w-full h-full mx-auto">
      <InjectSchema data={homepageSchema} />

      <HomeHeader dataServices={dataServiceMenu.Data} dataBanner={dataBannerImage.Data} />

      {/* SECTION BERAT — STREAMING */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl overflow-hidden">
                <Skeleton className="w-full h-40 md:h-48" />
                <div className="p-3 md:p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-5 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <HomeDynamicSections />
      </Suspense>
    </main>
  );
}
