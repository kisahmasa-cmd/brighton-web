import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQData } from "../../../types/faq-types";
import FAQTopicLink from "@/components/custom/FAQTopicLink";

interface FAQCollapsibleProps {
  title: string;
  categoryUrlSegment?: string;
  questions: FAQData[];
}

export default function FAQCollapsible(props: FAQCollapsibleProps) {
  return (
    <div className="border border-gray-200 shadow-md p-3 rounded-xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex w-full items-center p-2 justify-between hover:bg-slate-50 transition-colors cursor-pointer">
            <h4 className="text-base font-bold">{props.title}</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-2 flex flex-col gap-2 items-start">
              <hr className="w-full" />
              {props.questions.map((item, index) => (
                <FAQTopicLink
                  key={index}
                  categoryURLSegment={props.categoryUrlSegment ?? "c"}
                  faqURLSegment={item.URLSegment}
                  title={item.Title}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
