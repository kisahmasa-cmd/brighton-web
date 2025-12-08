import { WithContext, Person } from "schema-dts";

export function schemaPerson({ name, image, telephone, email, url }: { name: string; image: string; telephone: string; email: string; url: string }): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    image,
    telephone,
    email,
    url,
  };
}
