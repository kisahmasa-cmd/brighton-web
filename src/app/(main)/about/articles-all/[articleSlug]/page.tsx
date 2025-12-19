import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticleCategories, getArticleDetail, getArticles } from "@/services/article-service";
import { getPropertyPrimary } from "@/services/property-service";
import { CalendarDays, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrency } from "../../../../../../utils/formatCurrency";
import PropertyAdsPopupWrapper from "@/components/custom/PropertyAdsPopupWrapper";
import { getSecondaryPopuler } from "@/services/homepage-service/secondary-new-service";
import LinkAds from "@/components/custom/LinkAds";
import { HtmlContentDisplay } from "@/components/custom/HtmlContentDisplay";
import { removeBaseUrl } from "../../../../../../utils/removeBaseUrl";
import { buildArticleDetailSchema, buildWebPageSchema } from "@/lib/schema/schema-builder-helper";
import { InjectSchema } from "@/lib/schema/inject-schema";
import { schemaBlogPosting } from "@/lib/schema/schema-blog-posting";

type Params = Promise<{ articleSlug: string }>;

interface ArticleDetailPageProps {
  params: Params;
}
const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async (props) => {
  const params = await props.params;
  const slug = params.articleSlug;

  const article = await getArticleDetail(slug);
  const articleData = article.Data;

  if (!article.Data) {
    notFound();
  }

  const articleBaseURL = `/about/articles-all`;
  const propertyBaseURL = `/cari-properti`;
  const [categories, articleList, secondaryProperties, primaryProperties] = await Promise.all([
    getArticleCategories(),
    getArticles({ Count: 6, Page: 1 }),
    getSecondaryPopuler(),
    getPropertyPrimary(),
  ]);

  const otherCategories = categories.Data.filter((category) => category.URLSegment !== article.Data.Category?.URLSegment);
  const otherArticleList = articleList.Data.filter((other) => other.ID !== article.Data.ID).slice(0, 5);
  const propertyRecommendations = secondaryProperties.Data.slice(0, 5);
  const propertyAds = primaryProperties.Data[0];
  const contentBody = article.Data.Content.split('<div id="CustomMiddleAds"></div>');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const articleSchema = schemaBlogPosting({
    headline: articleData.Title,
    description: articleData.Content,
    url: `${baseUrl}/about/articles-all/${slug}`,
    image: articleData.Photo.MediumWebP || articleData.Photo.Medium,
    datePublished: articleData.CreatedNice,
    dateModified: articleData.LastEdited,
    authorName: articleData.Author,
    publisherName: "Brighton Real Estate Indonesia",
    publisherLogo: `${baseUrl}/logo_full.svg`,
  });

  const schemaWebPage = buildWebPageSchema({
    name: "Brighton News - Artikel Properti Terbaru",
    description: "Temukan artikel, tips, dan informasi terbaru seputar properti di Brighton News. Dapatkan wawasan mendalam untuk membantu Anda dalam dunia properti.",
    url: baseUrl + "/about/articles-all",
    isPartOf: baseUrl,
    image: articleData ? articleData?.Photo?.MediumWebP || articleData?.Photo?.Medium || "" : "",
  });

  return (
    <div>
      {/* schema */}
      <InjectSchema data={articleSchema} />
      {/* Image */}
      {article.Data.Photo && (article.Data.Photo?.OriginalWebP || article.Data.Photo?.Original) && (
        <div className="md:px-20 lg:px-40">
          <div className="w-full aspect-video md:aspect-[16/7] overflow-hidden flex items-center justify-center">
            <Image
              src={article.Data.Photo.OriginalWebP ?? article.Data.Photo.Original}
              alt={article.Data.Photo.Title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto bg-center object-cover"
            />
          </div>
        </div>
      )}
      <div className="px-6 w-full container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 py-6">
          {/* Content */}
          <div className="flex-1 space-y-4">
            {/* Title */}
            <h1 className="text-3xl font-bold">{article.Data.Title}</h1>

            <div className="flex items-center gap-4">
              <div className="border-2 border-primary bg-primary w-8"></div>
              {/* Date */}
              <div className="flex flex-row items-center gap-2">
                <CalendarDays className="w-5 h-5 text-black" />
                <span className="font-bold">{article.Data.DateLabelArtikel}</span>
              </div>
              {/* Category */}
              {article.Data.Category?.Name && (
                <div className="flex flex-row items-center gap-2 ml-4">
                  <Tags className="w-5 h-5 text-black" />
                  <span className="font-bold">{article.Data.Category?.Name ?? "-"}</span>
                </div>
              )}
            </div>
            {/* Author */}
            {article.Data.Author && <p>Penulis: {article.Data.Author}</p>}
            {/* Top Ads */}
            <LinkAds linkURL={article.Data?.Ads?.Top?.LinkURL} imageURL={article.Data?.Ads?.Top?.Image?.Original} imageAlt={article.Data?.Ads?.Top?.Kode} />
            {/* Body */}
            <HtmlContentDisplay content={contentBody[0]} />
            {contentBody[1] && (
              <>
                <LinkAds linkURL={article.Data?.Ads?.Middle?.LinkURL} imageURL={article.Data?.Ads?.Middle?.Image?.Original} imageAlt={article.Data?.Ads?.Middle?.Kode} />
                <HtmlContentDisplay content={contentBody[1]} />
              </>
            )}
            {/* Bottom Ads */}
            <LinkAds linkURL={article.Data?.Ads?.Bottom?.LinkURL} imageURL={article.Data?.Ads?.Bottom?.Image?.Original} imageAlt={article.Data?.Ads?.Bottom?.Kode} />
            {/* Tags/Topic */}
            {article.Data.Tags && article.Data.Tags.length > 0 && (
              <div className="border-t border-gray-200 mt-4 py-4 space-y-4">
                <h2 className="text-2xl font-bold">Topik</h2>
                <div className="flex flex-wrap gap-2">
                  {article.Data.Tags.map((tag, index) => (
                    <Link href={`${articleBaseURL}/tag/${tag.URLSegment}`} key={index}>
                      <Button variant="outline" className="rounded-full border-cyan-400 text-cyan-500 hover:text-cyan-600">
                        {tag.Name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-4">
            {/* Categories */}
            {otherCategories.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Lihat Kategori Artikel Lainnya</h2>
                <div className="flex flex-wrap gap-2">
                  {otherCategories.map((category, index) => (
                    <Link href={`${articleBaseURL}/category/${category.URLSegment}`} key={index}>
                      <Button variant="outline" className="rounded-full border-primary hover:bg-primary">
                        {category.Name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {otherArticleList.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Lihat Artikel Terkait Lainnya</h2>
                <div className="flex flex-col gap-4">
                  {otherArticleList.map((otherArticle, index) => (
                    <Link href={`${articleBaseURL}/${otherArticle.URLSegment}`} key={index}>
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex flex-row gap-4 items-center">
                          {/* Other Article Photo */}
                          <div className="w-36 aspect-video overflow-hidden flex items-center justify-center">
                            <Image
                              src={otherArticle.Photo?.Small ?? "/dummy-article-photo.jpg"}
                              alt={otherArticle.Photo?.Title ?? "article photo"}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full h-auto bg-center object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          {/* Other Article Date & Title */}
                          <div className="flex-1 space-y-2">
                            <p className="flex items-center gap-2">
                              <CalendarDays className="w-4 h-4" />
                              <span className="text-sm font-bold">{otherArticle.DateLabelArtikel}</span>
                            </p>
                            <h3 className="text-sm font-bold text-blue-600 line-clamp-2">{otherArticle.Title}</h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href={articleBaseURL}>
                  <Button variant="outline" className="rounded-full border-cyan-400 text-cyan-500 hover:text-cyan-600 w-full">
                    Lihat Semua Artikel
                  </Button>
                </Link>
              </div>
            )}
            {/* Property Recommendations*/}
            {propertyRecommendations.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Rekomendasi Properti</h2>
                <div className="flex flex-col gap-4">
                  {propertyRecommendations.map((property, index) => (
                    <Link href={removeBaseUrl(property.Link ?? "#")} key={index}>
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex flex-row gap-4 items-start">
                          {/* Property Photo */}
                          <div className="w-36 aspect-video overflow-hidden flex items-center justify-center">
                            <Image
                              src={property.Photos ? property.Photos[0].Small ?? "/empty.png" : "/empty.png"}
                              alt={property.Photos ? property.Photos[0].Title : "Property image"}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full h-auto bg-center object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          {/* Property Data */}
                          <div className="flex-1 space-y-1">
                            <h3 className="text-xs font-semibold uppercase line-clamp-3 text-gray-700">{property.Title}</h3>
                            <p className="text-sm font-bold">{formatCurrency(property.Price ?? 0)}</p>
                            <Badge className="rounded-full text-black">{property.Type}</Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href={propertyBaseURL}>
                  <Button variant="outline" className="rounded-full border-cyan-400 text-cyan-500 hover:text-cyan-600 w-full">
                    Lihat Properti Lainnya
                  </Button>
                </Link>
              </div>
            )}
            {/* Brighton Peduli Ads */}
            <LinkAds linkURL="/peduli" imageURL="https://cdn.brighton.co.id/Uploads/Images/10728310/2Mln439O/UP-ads-BP.webp" imageAlt="Brighton Peduli" />
          </div>
        </div>
      </div>
      <PropertyAdsPopupWrapper variant="v3" data={propertyAds} />
    </div>
  );
};

export default ArticleDetailPage;
