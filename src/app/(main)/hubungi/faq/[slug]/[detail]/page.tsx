import FAQSearchBar from "@/components/custom/FAQSearchBar";
import FAQRelatedTopics from "@/components/custom/FAQRelatedTopics";
import { getFAQDetail, getFAQList } from "@/services/faq-service";
import Link from "next/link";
import { Metadata } from "next";
import { HtmlContentDisplay } from "@/components/custom/HtmlContentDisplay";

type Params = Promise<{ slug: string; detail: string }>;

interface PageProps {
  params: Params;
}

const capitalizeWords = (str: string): string => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// export async function generateMetadata(props: PageProps): Promise<Metadata> {
//   const params = await props.params;
//   const faqURLSegment = params.detail;
//   const dataFAQDetail = (await getFAQDetail(faqURLSegment)).Data;

//   return {
//     title: dataFAQDetail.Title,
//   };
// }

const page = async ({ params }: PageProps) => {
  const faqBaseURL = "/hubungi/faq";
  const param = await params;

  const categoryURLSegment = param.slug;
  const faqURLSegment = param.detail;

  const dataFAQDetail = (await getFAQDetail(faqURLSegment)).Data;
  // Get Related Topics
  const dataFAQCategories = await getFAQList({
    CategoryID: dataFAQDetail.FAQCategoryID,
  });

  const relatedTopics = dataFAQCategories.Data.filter((item) => item.URLSegment !== faqURLSegment).slice(0, 5);

  return (
    <div>
      {/* Search Bar */}
      <FAQSearchBar />
      <div className="px-6 xl:px-0 py-6 w-full container max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Article */}
        <div className="basis-3/4 flex flex-col gap-2">
          {/* Breadcrumb */}
          <div>
            <Link href={faqBaseURL} className="text-blue-600 hover:text-800 hover:underline">
              FAQ
            </Link>
            <span>{" > "}</span>
            <Link href={`${faqBaseURL}/${categoryURLSegment}`} className="text-blue-600 hover:text-800 hover:underline">
              {capitalizeWords(categoryURLSegment)}
            </Link>
            <span>{" > "}</span>
            <span>{dataFAQDetail.Title}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold">{dataFAQDetail.Title}</h1>
          {/* Body */}
          <HtmlContentDisplay content={dataFAQDetail.Description ?? "-"} />
        </div>
        {/* Related Topics */}
        <div className="basis-1/4">
          <FAQRelatedTopics data={relatedTopics} />
        </div>
      </div>
    </div>
  );
};

export default page;
