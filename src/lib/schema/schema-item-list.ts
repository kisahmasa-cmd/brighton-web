import { WithContext, ItemList, ListItem } from "schema-dts";

export type ItemListElement = {
  name: string;
  url: string;
  image?: string;
  description?: string;
  position?: number;
};

export function schemaItemList({
  name,
  description,
  url,
  items,
  numberOfItems,
}: {
  name?: string;
  description?: string;
  url?: string;
  items: ItemListElement[];
  numberOfItems?: number;
}): WithContext<ItemList> {
  const itemListElement = items.map<ListItem>((item, index) => ({
    "@type": "ListItem",
    position: item.position || index + 1,
    name: item.name,
    url: item.url,
    item: {
      "@type": "Thing",
      name: item.name,
      url: item.url,
      image: item.image,
      description: item.description,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url,
    numberOfItems: numberOfItems || items.length,
    itemListElement,
  };
}
