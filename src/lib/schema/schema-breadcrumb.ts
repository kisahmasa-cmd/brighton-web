import { WithContext, BreadcrumbList, ListItem } from "schema-dts";

export type PathSegment = {
  label: string;
  url: string;
};

export function schemaBreadcrumb(pathSegments: PathSegment[]): WithContext<BreadcrumbList> {
  const itemListElement = pathSegments.map((segment, index) => ({
    "@type": "ListItem" as const, // Gunakan 'as const' untuk ketat
    position: index + 1,
    name: segment.label,
    item: segment.url,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElement as ListItem[],
  };
}
