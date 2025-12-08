import { WithContext, Article } from "schema-dts";

export function schemaArticle({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  headline?: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
        }
      : undefined,
  };
}
