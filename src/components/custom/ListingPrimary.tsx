import {PropertyParams} from "../../../types/property-types";
import CardPropertyPrimary from "@/components/custom/CardPropertyPrimary";
import {Property} from "../../../types/property-types";
import {PropertyPrimaryResponse} from "@/services/property-service";
import PaginationButton from "@/components/custom/PaginationButton";

interface ListingPrimaryProps {
  properties: PropertyPrimaryResponse,
  params?: PropertyParams
}

export default async function ListingPrimary({properties, params}: ListingPrimaryProps) {
  const page = Number(params?.page) || 1;
  const limit = 12;
  const total = properties?.Count ?? 0;
  const totalPages = Math.ceil(total / limit);

  // Hitung halaman awal dan akhir yang akan ditampilkan
  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {properties?.Data.map((item: Property, index) => (
          <CardPropertyPrimary key={index} data={item} isListing={true}/>
        ))}
      </div>

      {/* Pagination */}
      <PaginationButton params={params} page={page} pages={pages} totalPages={totalPages} startPage={startPage} endPage={endPage}/>
    </div>
  );
}
