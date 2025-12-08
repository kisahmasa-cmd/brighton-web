import { cn } from "@/lib/utils";
import { FAQData } from "../../../types/faq-types";
import FAQTopicLink from "@/components/custom/FAQTopicLink";

interface FAQMostSearchTopicsProps {
  data?: FAQData[];
}

export default function FAQMostSearchTopics(props: FAQMostSearchTopicsProps) {
  return (
    <div>
      <h3 className="font-bold text-xl text-center">Topik yang banyak dicari</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={cn("flex flex-col items-center gap-2 px-3", i === 1 && "md:border-l-2 md:border-r-2 border-black")}>
            {props?.data?.slice(5 * i, 5 * i + 5).map((item, j) => (
              <FAQTopicLink key={`${i}-${j}`} categoryURLSegment={item.Category?.ParentCategory?.URLSegment ?? "c"} faqURLSegment={item.URLSegment} title={item.Title} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
