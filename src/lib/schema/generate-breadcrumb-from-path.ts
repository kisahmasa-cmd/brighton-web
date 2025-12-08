import { schemaBreadcrumb } from "./schema-breadcrumb";

export function generateBreadcrumbFromPath(pathname: string) {
  // Remove query and hash
  const cleanPath = pathname.split("?")[0].split("#")[0];

  const segments = cleanPath.split("/").filter(Boolean);

  let url = "";
  const list = segments.map((segment) => {
    url += `/${segment}`;
    return {
      label: decodeURIComponent(segment.replace(/-/g, " ")),
      url,
    };
  });

  return schemaBreadcrumb(list);
}
