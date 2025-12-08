import PagePropertyPrimaryDetail from "@/components/custom/PagePropertyPrimaryDetail";
import { getPropertyPrimary } from "@/services/property-service";
import NotFound from "@/components/custom/NotFound";
import { getPropertyPrimaryDetailAction } from "@/actions/property-primary-detail-action";
import { Metadata } from "next";
import { globalGenerateMetadataOptimal } from "@/lib/global-metadata-optimal";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const primary = await getPropertyPrimaryDetailAction(slug);
  const data = primary.Data;

  const title = toTitleCase(data?.Title || "Detail Properti Lengkap di Brighton.co.id");
  const description = data?.Content
    ? toTitleCase(data.Content.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 152)) + "..."
    : "Detail properti lengkap tersedia di Brighton.co.id, portal properti terpercaya di Indonesia.";
  return globalGenerateMetadataOptimal({
    defaultMeta: {
      title,
      description,
    },
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch your data here
  const { slug } = await params;
  const propertyPrimary = await getPropertyPrimaryDetailAction(slug);
  const propertiesRelated = await getPropertyPrimary({ Count: 4, LocationID: propertyPrimary?.Data?.Location?.ID });

  if (propertyPrimary.Data) {
    return (
      <div className="w-full">
        <div className="container max-w-7xl mx-auto px-4 xl:px-0 py-10">
          <PagePropertyPrimaryDetail data={propertyPrimary.Data} dataRelated={propertiesRelated.Data} />
        </div>
      </div>
    );
  }

  return <NotFound />;
}
