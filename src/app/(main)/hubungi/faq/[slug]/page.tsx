import FAQCollapsible from "@/components/custom/FAQCollapsible";
import FAQMostSearchTopics from "@/components/custom/FAQMostSearchTopics";
import FAQSearchBar from "@/components/custom/FAQSearchBar";
import { getFAQCategories, getFAQList } from "@/services/faq-service";
import { FAQCategoriesParams } from "../../../../../../types/faq-types";
import { Metadata } from "next";
import SearchEmpty from "@/components/custom/SearchEmpty";

export const metadata: Metadata = {
  title: "FAQ: Frequently Asked Questions | Brighton.co.id",
};

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async (props: PageProps) => {
  const capitalizeWords = (str: string): string => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const title = capitalizeWords(props.params.slug);

  const param: FAQCategoriesParams = {
    URLSegment: props.params.slug,
  };
  const dataFAQCategories = await getFAQCategories(param);
  const filteredData = dataFAQCategories.Data.filter((item) => (item.Faqs ?? []).length > 0);
  const dataFAQMostSearchTopics = await getFAQList();
  return (
    <div>
      {/* Search Bar */}
      <FAQSearchBar />
      <div className="p-6 w-full container mx-auto flex flex-col gap-4">
        {filteredData.length > 0 ? (
          <>
            {/* Title */}
            <h3 className="font-bold text-xl text-center">{title}</h3>
            {/* Collapsibles */}
            {filteredData.map((item, i) => (
              <FAQCollapsible key={i} title={item.Title} questions={item.Faqs ?? []} categoryUrlSegment={props.params.slug} />
            ))}
          </>
        ) : (
          <SearchEmpty />
        )}

        {/* Most Search Topics */}
        <FAQMostSearchTopics data={dataFAQMostSearchTopics.Data} />
      </div>
    </div>
  );
};

export default page;
