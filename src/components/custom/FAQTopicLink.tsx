import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  categoryURLSegment: string;
  faqURLSegment: string;
  title: string;
  isTextCenter?: boolean;
}

const FAQTopicLink = (props: Props) => {
  const faqBaseURL = "/hubungi/faq";
  const { isTextCenter = true } = props;
  return (
    <Link
      href={`${faqBaseURL}/${props.categoryURLSegment}/${props.faqURLSegment}`}
      className={cn(
        "text-blue-600 hover:text-blue-800 hover:underline text-base",
        isTextCenter && "text-center"
      )}
    >
      {props.title}
    </Link>
  );
};

export default FAQTopicLink;
