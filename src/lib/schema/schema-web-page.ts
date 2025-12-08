import { WithContext, WebPage } from "schema-dts";

export function schemaWebPage({ name, description, url, isPartOf, image }: { name: string; description: string; url: string; isPartOf?: string; image?: string }): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    image,
    isPartOf: isPartOf
      ? {
          "@type": "WebSite",
          url: isPartOf,
        }
      : undefined,
  };
}
