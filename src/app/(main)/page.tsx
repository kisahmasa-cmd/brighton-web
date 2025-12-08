// app/page.tsx (atau wherever your page.tsx is)
import HomeHeader from "@/components/custom/HomeHeader";
import HomeDynamicSections from "@/components/custom/HomeDynamicSections";
import { getArticles } from "@/services/article-service";
import { getBannerHero, getShortcuts, getTestimonies } from "@/services/homepage-service/homepage-service";
import { getPropertyPrimary, getSecondaryNew, getSecondaryPopuler } from "@/services/homepage-service/secondary-new-service";
import { InjectSchema } from "@/lib/schema/inject-schema";
import { schemaHomepage } from "@/lib/schema/schema-homepage";
import { buildHomepageSchema } from "@/lib/schema/schema-builder-helper";
import { DEFAULT_RESPONSE } from "@/data/default-response";
import NotFound from "@/components/custom/NotFound";

export const revalidate = 60; // cache 60 detik

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safe = async (fn: any, ...args: any[]) => {
    try {
      return await fn(...args);
    } catch (e) {
      console.error("API ERROR:", e);
      return DEFAULT_RESPONSE;
    }
  };
  const dataNews = await safe(getArticles, { Count: 10, Page: 1 });
  const dataNewSecondary = await safe(getSecondaryNew);
  const dataNewPrimary = await safe(getPropertyPrimary);
  const dataPopulerSecondary = await safe(getSecondaryPopuler);
  const dataServiceMenu = await safe(getShortcuts);
  const dataTestimonies = await safe(getTestimonies);
  const dataBannerImage = await safe(getBannerHero);

  const everythingFailed =
    dataNews === DEFAULT_RESPONSE &&
    dataNewSecondary === DEFAULT_RESPONSE &&
    dataNewPrimary === DEFAULT_RESPONSE &&
    dataPopulerSecondary === DEFAULT_RESPONSE &&
    dataServiceMenu === DEFAULT_RESPONSE &&
    dataTestimonies === DEFAULT_RESPONSE &&
    dataBannerImage === DEFAULT_RESPONSE;

  if (everythingFailed) return <NotFound />;

  //schema
  const homepageSchema = buildHomepageSchema();

  return (
    <main className="w-full h-full mx-auto">
      <InjectSchema data={homepageSchema} />
      {/* HomeHeader tetap SSR (hero + LCP image) */}
      <HomeHeader dataServices={dataServiceMenu.Data} dataBanner={dataBannerImage.Data} />

      {/* Semua section berat dirender client-side di HomeDynamicSections */}
      <HomeDynamicSections
        dataNewPrimary={dataNewPrimary.Data}
        dataPopulerSecondary={dataPopulerSecondary.Data}
        dataNewSecondary={dataNewSecondary.Data}
        dataNews={dataNews.Data}
        dataTestimonies={dataTestimonies.Data}
      />
    </main>
  );
}
