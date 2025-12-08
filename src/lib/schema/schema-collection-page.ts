import { WithContext, CollectionPage } from "schema-dts";

export function schemaCollectionPage({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items?: {
    name: string;
    url: string;
  }[];
}): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    hasPart: items?.map((i) => ({
      "@type": "WebPage",
      name: i.name,
      url: i.url,
    })),
  };
}
