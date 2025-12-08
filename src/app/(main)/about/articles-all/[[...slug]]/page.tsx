import type { Metadata } from "next";
import ArticlesFilter from "@/components/custom/ArticlesFilter";
import CardArticle from "@/components/custom/CardArticle";
import PaginationButton from "@/components/custom/PaginationButton";
import WrapperImage from "@/components/custom/WrapperImage";
import { getArticleCategories, getArticles, getArticleTags } from "@/services/article-service";
import { notFound } from "next/navigation";
import * as React from "react";
import { ArticlesFilterParams, OrderByArticleFilterType } from "../../../../../../types/article-types";
import SearchEmpty from "@/components/custom/SearchEmpty";
import { getPaginationData } from "../../../../../../utils/getPaginationData";
import { buildArticleDetailSchema, buildCollectionPageSchema, buildWebPageSchema } from "@/lib/schema/schema-builder-helper";
import { InjectSchema } from "@/lib/schema/inject-schema";

type Params = Promise<{ slug: string[] }>;
type SearchParams = Promise<{
  OrderBy: OrderByArticleFilterType;
  Keyword: string;
  page?: number;
}>;

interface ArticlesListPageProps {
  params: Params;
  searchParams: SearchParams;
}

// export const metadata: Metadata = {
//   title: 'Artikel Tips dan Informasi Lengkap Seputar Properti | Brighton.co.id',
// };

function isValidSlug(slugs: string[]) {
  if (slugs.length === 0) return true;
  if (slugs[0] === "tag") return slugs.length >= 2;
  if (slugs[0] === "category") {
    if (slugs.length === 2) return true;
    if (slugs[2] === "tag" && slugs.length >= 4) return true;
    return false;
  }
  return false;
}

const ArticlesListPage: React.FC<ArticlesListPageProps> = async (props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const slugs = params.slug ?? [];
  const orderBy = searchParams.OrderBy;
  const keyword = searchParams.Keyword;

  if (!isValidSlug(slugs)) {
    notFound();
  }

  let category: string | null = null;
  let tags: string[] = [];

  if (slugs[0] === "category") {
    category = slugs[1] ?? null;
    const tagIndex = slugs.indexOf("tag");
    if (tagIndex !== -1) {
      tags = slugs.slice(tagIndex + 1);
    }
  } else if (slugs[0] === "tag") {
    tags = slugs.slice(1);
  }

  const page = Number(searchParams.page) || 1;
  const limit = 9;

  const filterData: ArticlesFilterParams = {
    OrderBy: orderBy,
    Keyword: keyword,
    Category: category,
    Tags: tags,
    Page: page,
    Count: limit,
  };

  const dataArticles = await getArticles(filterData);
  const { pages, totalPages, startPage, endPage } = getPaginationData({
    count: dataArticles.Count,
    limit,
    page,
  });

  const dataCategories = await getArticleCategories();
  const dataTags = await getArticleTags();

  const articleData = dataArticles.Data[0];
  const isCategoryPage = slugs[0] === "category";

  //schema
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const schemaBlog = buildArticleDetailSchema({
    name: "Brighton News - Artikel Properti Terbaru",
    description: "Temukan artikel, tips, dan informasi terbaru seputar properti di Brighton News. Dapatkan wawasan mendalam untuk membantu Anda dalam dunia properti.",
    url: `${baseUrl}/about/articles-all`,
    image: articleData ? articleData?.Photo?.MediumWebP || articleData?.Photo?.Medium || "" : "",
    type: "blog",
  });

  const schemaCollection = buildCollectionPageSchema({
    name: "Brighton News - Artikel Properti Terbaru",
    description: "Temukan artikel, tips, dan informasi terbaru seputar properti di Brighton News. Dapatkan wawasan mendalam untuk membantu Anda dalam dunia properti.",
    url: `${baseUrl}/about/articles-all`,
    items: dataArticles.Data.map((article) => ({
      name: article.Title,
      url: `${baseUrl}/about/articles-all/${slugs}`,
      image: article?.Photo?.MediumWebP || article?.Photo?.Medium || "",
    })),
  });

  const schemaWebPage = buildWebPageSchema({
    name: "Brighton News - Artikel Properti Terbaru",
    description: "Temukan artikel, tips, dan informasi terbaru seputar properti di Brighton News. Dapatkan wawasan mendalam untuk membantu Anda dalam dunia properti.",
    url: `${baseUrl}/about/articles-all`,
    isPartOf: "${baseUrl}",
    image: articleData ? articleData?.Photo?.MediumWebP || articleData?.Photo?.Medium || "" : "",
  });

  const multipleSchemas = [
    !isCategoryPage ? schemaBlog : null, // Only add schemaBlog if it's NOT a category page
    schemaCollection,
    schemaWebPage,
  ].filter((schema) => schema !== null); // Filter out null values
  return (
    <div>
      <InjectSchema data={multipleSchemas} />
      {/* Banner */}
      <div className="md:px-4 px-2 py-4">
        <WrapperImage Title="Brighton News" imgUrl="https://www.brighton.co.id/themes/v7/img/articles.webp" imgAlt="Brighton News Banner" />
      </div>
      <div className="p-6 w-full container max-w-6xl mx-auto space-y-6">
        {/* Filter*/}
        <ArticlesFilter filter={filterData} categoriesData={dataCategories.Data} tagsData={dataTags.Data} />
        {/* Articles */}
        {dataArticles.Data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataArticles.Data.map((article, index) => (
                <CardArticle key={index} data={article} />
              ))}
            </div>
            {/* Pagination */}
            <PaginationButton params={searchParams} page={page} pages={pages} totalPages={totalPages} startPage={startPage} endPage={endPage} />
          </>
        ) : (
          <SearchEmpty />
        )}
      </div>
    </div>
  );
};

export default ArticlesListPage;
