import FAQCard from "@/components/custom/FAQCard";
import { FAQCategoryData } from "../../../types/faq-types";

interface FAQCardListProps {
  data?: FAQCategoryData[];
}

export default function FAQCardList(props: FAQCardListProps) {
  const faqBaseURL = "/hubungi/faq";
  const faqCards = props?.data?.filter((item) => item.ParentID === 0).slice(0, 3);
  return (
    <div>
      {/* Title */}
      <div className="flex items-center gap-6">
        <div className="border border-black flex-1"></div>
        <h2 className="text-xl">Pertanyaan Umum</h2>
        <div className="border border-black flex-1"></div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">
        {faqCards?.map((item, index) => (
          <FAQCard
            key={index}
            href={`${faqBaseURL}/${item.URLSegment}`}
            iconSrc={item.Icon?.Small || ""}
            label={item.Title}
          />
        ))}
      </div>
    </div>
  );
}
