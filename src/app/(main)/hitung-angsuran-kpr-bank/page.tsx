import DataChecklist from "@/components/custom/DataChecklist";
import ImageWithButton from "@/components/custom/ImageWithButton";
import { CalculatorSimulasiSection } from "@/components/custom/CalculatorSimulasiSection";
import NewsSlider from "@/components/custom/NewsSlider";
import WrapperImage from "@/components/custom/WrapperImage";
import { kprData, tambahanData } from "@/data/checklist-data";
import { getGlossaries } from "@/services/glossaries-service";
import React from "react";
import GlossariesWrapper from "@/components/custom/GlossariesWrapper";
import { getArticles } from "@/services/article-service";
import { DEFAULT_RESPONSE } from "@/data/default-response";
import NotFound from "@/components/custom/NotFound";
import SectionFallback from "@/components/custom/SectionFallback";

export default async function page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safe = async <T, A extends any[]>(fn: (...args: A) => Promise<T>, ...args: A): Promise<T | typeof DEFAULT_RESPONSE> => {
    try {
      return await fn(...args);
    } catch (e) {
      console.error("API ERROR:", e);
      return DEFAULT_RESPONSE;
    }
  };

  const [dataNews, dataGlossaries] = await Promise.all([safe(getArticles, { Count: 10, Page: 1 }), safe(getGlossaries)]);

  return (
    <main className="w-full h-full">
      <div className="md:px-4 px-2 pb-4">
        <WrapperImage Title="Simulasikan Pinjamanmu!" imgUrl="https://www.brighton.co.id/themes/v7/img/hitung-kpr.webp" imgAlt="Calculator and laptop background" />
      </div>
      <CalculatorSimulasiSection />
      <DataChecklist {...kprData} />
      <DataChecklist {...tambahanData} />
      <ImageWithButton />
      {dataGlossaries.Data.length > 0 ? <GlossariesWrapper glossaryData={dataGlossaries.Data} /> : <SectionFallback title="Glossaries" />}
      <div className="w-full flex flex-col items-center gap-6 py-10 px-6 lg:px-10">{dataNews.Data.length > 0 ? <NewsSlider Title="Berita Terbaru" data={dataNews.Data} /> : <NotFound />}</div>
    </main>
  );
}
