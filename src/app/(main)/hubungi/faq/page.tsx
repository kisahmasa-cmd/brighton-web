import FAQCardList from "@/components/custom/FAQCardList";
import FAQCollapsible from "@/components/custom/FAQCollapsible";
import FAQMostSearchTopics from "@/components/custom/FAQMostSearchTopics";
import FAQSearchBar from "@/components/custom/FAQSearchBar";
import SearchEmpty from "@/components/custom/SearchEmpty";
import IstilahKPRWrapper from "@/components/custom/GlossariesWrapper";
import { getFAQCategories, getFAQList, getSearchFAQList } from "@/services/faq-service";
import { getGlossaries } from "@/services/glossaries-service";
import React from "react";
import { FAQCategoriesParams, FAQCategoryData, FAQListParams } from "../../../../../types/faq-types";
import { Metadata } from "next";
import { schemaFAQ } from "@/lib/schema/schema-faq";
import { InjectSchema } from "@/lib/schema/inject-schema";

export const metadata: Metadata = {
  title: "FAQ: Frequently Asked Questions | Brighton.co.id",
};

type SearchParams = Promise<{
  keyword?: string;
}>;

interface PageProps {
  searchParams: SearchParams;
}

const page = async (props: PageProps) => {
  // Search
  const searchParams = await props.searchParams;
  const keyword = searchParams.keyword;

  const [dataFAQCategories, dataGlossaries, dataFAQMostSearchTopics] = await Promise.all([getFAQCategories(), getGlossaries(), getFAQList()]);

  const searchFAQListParam: FAQListParams = {
    Keyword: keyword,
  };
  const searchFAQCategoriesParam: FAQCategoriesParams = {
    Keyword: keyword,
  };

  let searchData: FAQCategoryData[] = [];

  if (keyword) {
    const [dataSearchFaqs, dataSearchFaqCategories] = await Promise.all([getSearchFAQList(searchFAQListParam), getFAQCategories(searchFAQCategoriesParam)]);
    searchData = [...dataSearchFaqs.Data, ...dataSearchFaqCategories.Data.filter((item) => (item.Faqs ?? []).length > 0)];
  }

  //schema
  let faqSchema = null;

  if (!keyword) {
    const allFAQItems = dataFAQMostSearchTopics.Data.map((cat) => {
      return {
        question: cat.Title,
        answer: cat.Description,
      };
    });

    faqSchema = schemaFAQ(allFAQItems.slice(0, 15));
  }

  return (
    <div>
      {/* Inject Schema */}
      {!keyword && faqSchema && <InjectSchema data={faqSchema} />}
      {/* Search Bar */}
      <FAQSearchBar />
      <div className="p-6 w-full container mx-auto">
        {/* Cards */}
        {!keyword && <FAQCardList data={dataFAQCategories.Data} />}
        {/* Collapsible: search only */}
        {keyword && (
          <div className="mb-6 flex flex-col gap-4">
            {searchData.length > 0 ? (
              searchData.map((item, i) => <FAQCollapsible title={item.Title} questions={item.Faqs ?? []} categoryUrlSegment={item.ParentCategory?.URLSegment} key={i} />)
            ) : (
              <SearchEmpty />
            )}
          </div>
        )}

        {/* Most Search Topics */}
        <FAQMostSearchTopics data={dataFAQMostSearchTopics.Data} />
      </div>
      {/* Glossaries */}
      {!keyword && <IstilahKPRWrapper glossaryData={dataGlossaries.Data} />}
    </div>
  );
};

export default page;
