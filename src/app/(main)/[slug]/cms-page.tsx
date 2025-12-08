import { HtmlContentDisplay } from "@/components/custom/HtmlContentDisplay";
import NewsSmall from "@/components/custom/NewsSmall";
import { getArticles } from "@/services/article-service";
import WrapperImage from "@/components/custom/WrapperImage";
import { getHtmlCMS } from "@/services/cms-page";
import { notFound } from "next/navigation";

export default async function CMSPageContent({ slug }: { slug: string }) {
  try {
    const dataHtml = await getHtmlCMS(slug);
    const dataNews = await getArticles({ Count: 10, Page: 1 });

    return (
      <div className="p-3">
        <WrapperImage imgUrl="/bg-cms.webp" imgAlt="CMS Page Banner" Title={dataHtml.Data.Title} />
        <div className="container mx-auto p-2 lg:p-6">
          <div className="flex flex-col lg:flex-row justify-center gap-6 md:gap-24">
            <div className="w-full lg:basis-4/6">
              <div className="max-w-4xl mx-auto">
                <HtmlContentDisplay content={dataHtml.Data.Content} />
              </div>
            </div>
            <div className="w-full lg:basis-2/6">
              <NewsSmall data={dataNews?.Data} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
