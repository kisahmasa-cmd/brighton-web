import { WithContext, Blog } from "schema-dts";

export function schemaBlog({ name, description, url, image }: { name: string; description: string; url: string; image?: string }): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    description,
    url,
    image,
  };
}
