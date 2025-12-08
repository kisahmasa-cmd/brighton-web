import PropertyHeader from "@/components/custom/PropertyHeader";
import PropertyImageGallery from "@/components/custom/PropertyImageGallery";
import PropertyLocation from "@/components/custom/PropertyLocation";
import PropertyTypes from "@/components/custom/PropertyTypes";
import PropertyKPR from "@/components/custom/PropertyKPR";
import PropertySidebar from "@/components/custom/PropertySidebar";
import { Property } from "../../../types/property-types";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

interface PagePropertyPrimaryDetailProps {
  data: Property;
  dataRelated?: Property[];
}

const PagePropertyPrimaryDetail = ({ data, dataRelated }: PagePropertyPrimaryDetailProps) => {
  // dynamically import PropertyContent with no SSR
  const PropertyContent = dynamic(() => import("./PropertyContent"), {
    loading: () => (
      <div className="w-full space-y-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    ),
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Header */}
        <PropertyHeader
          title={data.Title}
          subtitle={data.Title2 ?? ""}
          location={data.Location.Title}
          currency={data.ForeignCurrency ?? "Rp"}
          priceMin={data.Price2Min ?? data.PriceMin ?? 0}
          priceMax={data.Price2Min ? data.Price2Max ?? 0 : data.PriceMax ?? 0}
        />

        {/* Image Gallery */}
        {data.Photos && data.Photos.length > 0 && <PropertyImageGallery photos={data.Photos} />}

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <PropertyContent content={data.Content ?? ""} />

          <PropertyLocation nearbyLocations={data.NearbyLocations} mapUrl={data.MapUrl} gmapUrl={data.GMapUrl} />

          {data.PrimaryType && <PropertyTypes agents={data.Agent} types={data.PrimaryType} propertyTitle={data.Title} propertyLink={data.Link} />}

          <PropertyKPR priceMin={data.PriceMin ?? 0} />
        </div>

        {/* Sidebar */}
        <PropertySidebar agents={data.Agent} property={data} relatedProperties={dataRelated} />
      </div>
    </div>
  );
};

export default PagePropertyPrimaryDetail;
