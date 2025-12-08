import { FAQPage, Question, Answer, WithContext } from "schema-dts";

export function schemaFAQ(items: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map<Question>((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      } as Answer,
    })),
  };
}
