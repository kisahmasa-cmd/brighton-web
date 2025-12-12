import DetailListingAgentsCard from "@/components/custom/DetailListingAgentsCard";
import DetailListingKPRCalculator from "@/components/custom/DetailListingKPRCalculator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDetailPropertySecondary, getRelatedSecondaryProperties } from "@/services/property-service";
import { notFound } from "next/navigation";
import { formatCurrency, formatCurrencyFull } from "../../../../../../utils/formatCurrency";
import { formatDate } from "../../../../../../utils/formatDate";
import ShareDialogButton from "@/components/custom/ShareDialogButton";
import { Metadata } from "next";
import PropertyPhotosGrid from "@/components/custom/PropertyPhotosGrid";
import AgentAdsPopupWrapper from "@/components/custom/AgentAdsPopupWrapper";
import LinkAds from "@/components/custom/LinkAds";
import PropertySlider from "@/components/custom/PropertySlider";
import { buildPropertyUrl } from "../../../../../../utils/buildPropertyUrl";
import { formatSlug } from "../../../../../../utils/formatSlug";
import { getWACSNumber } from "../../../../../../utils/getWA";
import { globalGenerateMetadataOptimal } from "@/lib/global-metadata-optimal";
import { schemaBreadcrumb } from "@/lib/schema/schema-breadcrumb";
import { buildAgentContactSchema } from "@/lib/schema/schema-builder-helper";
import { schemaOffer } from "@/lib/schema/schema-offer";
import { schemaProduct } from "@/lib/schema/schema-product";
import { InjectSchema } from "@/lib/schema/inject-schema";
import { decodeUnicode } from "../../../../../../utils/decodeUnicode";

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
  const secondary = await getDetailPropertySecondary(slug);
  const data = secondary.Data;

  const title = toTitleCase(data?.Title || "Detail Properti Lengkap di Brighton.co.id");
  const description = data.Other
    ? toTitleCase(data.Other.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 152)) + "..."
    : "Detail properti lengkap tersedia di Brighton.co.id, portal properti terpercaya di Indonesia.";
  return globalGenerateMetadataOptimal({
    defaultMeta: {
      title,
      description,
      images: data?.Photos && data.Photos.length > 0 ? [data.Photos[0].Medium] : [],
    },
  });
}

const Page: React.FC<PageProps> = async (props) => {
  const params = await props.params;
  const slug = params.slug;

  const secondary = await getDetailPropertySecondary(slug);
  const secondaryData = secondary.Data;
  const agent = Array.isArray(secondaryData?.Agent) ? secondaryData.Agent[0] : secondaryData?.Agent;
  if (!secondaryData) notFound();

  const agents = [secondaryData.Agent];
  if (secondaryData.Agent2) {
    agents.push(secondaryData.Agent2);
  }

  const transaction = secondaryData.Transaction === "Jual" ? "dijual" : secondaryData.Transaction === "Sewa" ? "disewa" : secondaryData.Transaction === "JualSewa" ? "dijualsewa" : "dijual";
  const link = buildPropertyUrl(transaction, {
    ProvinceID: secondaryData.Province?.ID,
    ProvinceTitle: secondaryData.Province?.Title,
    ProvinceSlug: secondaryData.Province?.Title ? formatSlug(secondaryData.Province?.Title) : undefined,
    LocationID: secondaryData.Location?.ID,
    LocationTitle: secondaryData.Location?.Title,
    LocationSlug: secondaryData.Location?.Title ? formatSlug(secondaryData.Location?.Title) : undefined,
    AreaID: secondaryData.Area?.ID,
    AreaTitle: secondaryData.Area?.Title,
    AreaSlug: secondaryData.Area?.Title ? formatSlug(secondaryData.Area?.Title) : undefined,
    Type: secondaryData.Type,
    PriceMin: secondaryData.Price ? (secondaryData.Price * 80) / 100 : undefined,
    PriceMax: secondaryData.Price ? (secondaryData.Price * 120) / 100 : undefined,
  });

  const similarProperties = await getRelatedSecondaryProperties(slug);

  const title = `${secondaryData.Transaction === "JualSewa" ? "Jual/Sewa" : secondaryData.Transaction} ${secondaryData.Address}`;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

  //schema
  const breadcrumb = schemaBreadcrumb([
    { label: "Cari Properti", url: "/cari-properti" },
    { label: secondaryData.Title, url: `/cari-properti/view/${slug}` },
  ]);

  const schemaOfferDetail = schemaOffer({
    price: secondaryData.Price ?? 0,
    priceCurrency: "IDR",
    url: `${baseURL}/cari-properti/view/${slug}`,
    itemOffered: {
      name: secondaryData.Title,
      url: `${baseURL}/cari-properti/view/${slug}`,
      description: secondaryData.Other ? secondaryData.Other.replace(/<\/?[^>]+(>|$)/g, "") : undefined,
    },
    availability: secondaryData.Transaction === "Sewa" ? "https://schema.org/LeaseOut" : "https://schema.org/InStock",
  });

  const schemaPersonAgent = buildAgentContactSchema({
    name: agent?.Name || "Brighton Agent",
    telephone: agent?.Phone || getWACSNumber(),
    email: agent?.Email || "",
    photo: agent?.Photo?.MediumWebP || "",
    url: agent?.Link || "",
  });

  const schemaProductDetail = schemaProduct({
    name: secondaryData.Title ?? "",
    description: secondaryData.Content ? secondaryData.Content.replace(/<\/?[^>]+(>|$)/g, "") : "",
    url: `${baseURL}/cari-properti/view/${slug}`,
    image: secondaryData.Photos && secondaryData.Photos.length > 0 ? secondaryData.Photos.map((photo) => photo.MediumWebP || photo.Medium) : [],
    category: secondaryData.Type,
  });

  const multiSchema = [breadcrumb, schemaOfferDetail, schemaPersonAgent, schemaProductDetail];

  return (
    <div>
      <InjectSchema data={multiSchema as []} />
      <div className="p-2 lg:p-6 container mx-auto max-w-6xl space-y-4">
        {/* Images Grid */}
        <div className="px-2 lg:px-4">
          <PropertyPhotosGrid photos={secondaryData.Photos ?? []} />
        </div>

        {/* Tag */}
        <div className="px-2 lg:px-4">
          <div className="text-lg px-3 py-1 bg-primary rounded-lg font-semibold inline">{secondaryData.Type}</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Property Info */}
          <div className="flex-1 space-y-2">
            <div className="px-2 lg:px-4">
              <div className="flex items-start gap-3">
                {/* Transaction - Address */}
                <h1 className="flex-1 font-bold uppercase mt-2">{title}</h1>
                {/* Share Button */}
                <ShareDialogButton emailSubject={title.toUpperCase()} />
              </div>
              {/* Price */}
              {secondaryData.Type === "Tanah" ? (
                <p className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-2xl">
                    {formatCurrency(secondaryData.PricePerMeter ?? 0, "Rp", true, true)}
                    {"/m"}
                    <sup>2</sup>
                  </span>
                  <span>{formatCurrency(secondaryData.Price ?? 0, "Rp", true, true)}</span>
                </p>
              ) : (
                <p className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-2xl">{formatCurrency(secondaryData.Price ?? 0)}</span>
                  {secondaryData.Price2 != null && Number(secondaryData.Price2) !== 0 && <span>{formatCurrency(secondaryData.Price2)}</span>}
                </p>
              )}

              {/* Title */}
              <p>{secondaryData.Title}</p>
            </div>
            <DividerLine />
            {/* Detail Properti */}
            <div className="space-y-1 px-2 lg:px-4">
              <h2 className="font-bold text-2xl mb-2">Detail Properti</h2>
              <div className="flex gap-4">
                <p className="flex-1">Transaksi</p>
                <p className="flex-2 font-bold">{secondaryData.Transaction === "JualSewa" ? "Jual Sewa" : secondaryData.Transaction}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Kamar Tidur</p>
                <p className="flex-2 font-bold">{secondaryData.KT ?? "-"}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Kamar Mandi</p>
                <p className="flex-2 font-bold">{secondaryData.KM ?? "-"}</p>
              </div>
              {secondaryData.Type !== "Apartment" && (
                <div className="flex gap-4">
                  <p className="flex-1">Luas Tanah</p>
                  <p className="flex-2 font-bold">
                    {secondaryData.LT ?? "-"} m<sup>2</sup>
                  </p>
                </div>
              )}
              {secondaryData.Type !== "Tanah" && (
                <div className="flex gap-4">
                  <p className="flex-1">Luas Bangunan</p>
                  <p className="flex-2 font-bold">
                    {secondaryData.LB ?? "-"} m<sup>2</sup>
                  </p>
                </div>
              )}
              <div className="flex gap-4">
                <p className="flex-1">Tipe Properti</p>
                <p className="flex-2 font-bold">{secondaryData.Type}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Alamat</p>
                <p className="flex-2 font-bold">{secondaryData.Address}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Lokasi</p>
                <p className="flex-2 font-bold">
                  {secondaryData.Province?.Title}, {secondaryData.Location.Title}, {secondaryData.Area?.Title}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Listrik</p>
                <p className="flex-2 font-bold">{secondaryData.Listrik ? `${secondaryData.Listrik} Watt` : "-"}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Sertifikat</p>
                <p className="flex-2 font-bold">{secondaryData.Certificate ?? "-"}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Hadap</p>
                <p className="flex-2 font-bold">{secondaryData.Hadap ?? "-"}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Group</p>
                <p className="flex-2 font-bold">{secondaryData.AdditionalData?.MainGroup ?? "-"}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">Furnish</p>
                <p className="flex-2 font-bold">{secondaryData.AdditionalData?.StatusFurnish ?? "-"}</p>
              </div>
              {secondaryData.Type === "Tanah" && secondaryData.PricePerMeter && (
                <div className="flex gap-4">
                  <p className="flex-1">
                    Per m<sup>2</sup>
                  </p>
                  <p className="flex-2 font-bold">
                    {formatCurrencyFull(secondaryData.PricePerMeter ?? 0)} m<sup>2</sup>
                  </p>
                </div>
              )}
              {secondaryData.AdditionalData?.Garage !== "0" && (
                <div className="flex gap-4">
                  <p className="flex-1">Ada Garasi</p>
                  <p className="flex-2 font-bold">{secondaryData.AdditionalData?.Garage === "1" ? "Ya" : "Tidak"}</p>
                </div>
              )}

              <div className="flex gap-4">
                <p className="flex-1">Terdaftar Pada</p>
                <p className="flex-2 font-bold">{formatDate(secondaryData.PropertyDate, "id-ID", "long")}</p>
              </div>
              <div className="flex gap-4">
                <p className="flex-1">ID Listing</p>
                <p className="flex-2 font-bold">{secondaryData.IDCode}</p>
              </div>
            </div>
            <DividerLine />
            {/* Keterangan */}
            <div className="space-y-1 px-2 lg:px-4">
              <h2 className="font-bold text-2xl mb-2">Keterangan</h2>
              <div
                className="prose prose-lg max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: decodeUnicode(secondaryData.Other ?? "").replace(/\n/g, "<br/>") }}
                style={{
                  fontSize: "16px",
                  lineHeight: "1.25",
                }}
              />
            </div>
            <DividerLine />
            {/* Simulasi Cicilan KPR */}
            <div className="px-2 lg:px-4">
              <DetailListingKPRCalculator propertyPrice={secondaryData.Price ?? 0} />
            </div>
          </div>

          {/* Mobile Only Ads */}
          <div className="flex md:hidden flex-col gap-6 w-full">
            <div className="rounded-lg overflow-hidden">
              <LinkAds
                linkURL="/perumahan-baru/?show=overseas&SortField=distance&SortOrder=ASC&Latitude=-7.2894436&Longitude=112.677753"
                imageURL="https://cdn.brighton.co.id/Uploads/Images/18982169/xVIpCSOw/update-logo-RENIX-di-BrightonApp-05-Medium.webp"
                imageAlt="Ads 1"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <LinkAds linkURL="https://landing.brighton.co.id/fastloan" imageURL="https://cdn.brighton.co.id/Uploads/Images/13194950/XlkvbSeT/1-Medium.webp" imageAlt="Ads 2" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72">
            {/* Agents Card */}
            <DetailListingAgentsCard agents={agents.flat()} IDCodeWA={secondaryData.IDCode} LinkWA={secondaryData.Link} TitleWA={secondaryData.Title} />
            {/* Ads */}
            <div className="hidden lg:flex flex-col gap-6 w-full mt-6">
              <LinkAds linkURL="/peduli" imageURL="https://cdn.brighton.co.id/Uploads/Images/10728310/2Mln439O/UP-ads-BP.webp" imageAlt="Sidebar Ads 1" />
              <LinkAds linkURL="/" imageURL="https://cdn.brighton.co.id/Uploads/Images/17323453/dvxY2PAa/Fifilety.webp" imageAlt="Sidebar Ads 2" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Only Ads */}
      <div className="hidden md:flex flex-col gap-6 px-6 lg:px-24 py-6">
        <div className="rounded-lg overflow-hidden">
          <LinkAds
            linkURL="/perumahan-baru/?show=overseas&SortField=distance&SortOrder=ASC&Latitude=-7.2894436&Longitude=112.677753"
            imageURL="https://cdn.brighton.co.id/Uploads/Images/18982156/KvQ90dz4/update-logo-RENIX-di-BrightonApp-02.webp"
            imageAlt="Ads 1"
          />
        </div>
        <div className="rounded-lg overflow-hidden">
          <LinkAds linkURL="https://landing.brighton.co.id/fastloan" imageURL="https://cdn.brighton.co.id/Uploads/Images/13170373/1jqiC3f8/4.webp" imageAlt="Ads 2" />
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="bg-gray-200 px-6 lg:px-16 py-6 ">
          <PropertySlider data={similarProperties} Title="Properti Serupa" linkBuild={link} />
        </div>
      )}

      {/* Call CS */}
      <div className="bg-primary p-6" id="call-cs">
        <div className="container max-w-6xl mx-auto flex flex-col items-center gap-4 lg:px-16">
          <p className="font-bold text-center lg:text-2xl">Butuh bantuan jual, sewa, cari properti? Brighton siap membantu</p>
          <Link href={`https://wa.me/${getWACSNumber()}?text=Hai,%20saya%20mau%20bertanya%20mengenai%20Brighton`} target="_blank" className="w-full">
            <Button variant="secondary" size="xl" className="w-full px-4">
              <span className="font-bold lg:text-lg">Hubungi Customer Service Brigita</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Agent Ads Popup*/}
      <AgentAdsPopupWrapper
        IDCodeWA={secondaryData.IDCode}
        LinkWA={secondaryData.Link}
        TitleWA={secondaryData.Title}
        data={Array.isArray(secondaryData.Agent) ? secondaryData.Agent[0] : secondaryData.Agent}
      />
    </div>
  );
};

const DividerLine = () => {
  return <hr className="border border-gray-200 w-full" />;
};

export default Page;
