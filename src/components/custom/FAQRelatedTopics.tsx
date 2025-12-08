import { FAQData } from "../../../types/faq-types";
import FAQTopicLink from "@/components/custom/FAQTopicLink";

interface Props {
  data?: FAQData[];
}

export default function FAQRelatedTopics(props: Props) {
  return (
    <div>
      <h2 className="font-bold text-xl">Topik Terkait</h2>
      <div className="mt-4 flex flex-col gap-2 items-start">
        {props?.data?.map((item, i) => (
          <FAQTopicLink key={i} categoryURLSegment={item.Category?.ParentCategory?.URLSegment ?? "c"} faqURLSegment={item.URLSegment} title={item.Title} isTextCenter={false} />
        ))}
      </div>
    </div>
  );
}
