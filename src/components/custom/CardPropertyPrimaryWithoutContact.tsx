import Image from "next/image";
import { Property } from "../../../types/property-types";
import { formatCurrency } from "../../../utils/formatCurrency";
import Link from "next/link";
import {removeBaseUrl} from "../../../utils/removeBaseUrl";
interface CardPropertySecondaryProps {
  data?: Property;
  isListing?: boolean;
}

export default function CardPropertyPrimaryWithoutContact(props: CardPropertySecondaryProps) {
  const data = props.data;

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white">
      <div className={ `relative bg-gray-200 aspect-7/3` }>
        <Link href={removeBaseUrl(data?.Link ?? "#")} className="w-full h-full">
          <Image src={data?.Photo?.Medium ?? "/empty.png"} alt="Citraland Buona Vista" className="w-full h-full object-cover" fill />
        </Link>
      </div>

      <div className="bg-white px-4 pt-3 pb-2 border-b border-x border-gray-200">
        <Link href={removeBaseUrl(data?.Link ?? "#")} className="w-full h-full">
          <div className="flex items-start justify-between">
            <p className="text-xs lg:text-sm font-semibold text-gray-800">{data?.Type} di {data?.Location?.Title}</p>
          </div>

          <p className="text-sm lg:text-base line-clamp-1 leading-5 font-bold text-gray-900">{data?.Title}</p>

          <p className="text-xs lg:text-sm line-clamp-1 font-semibold text-gray-800">
            {data?.ShortContent}
          </p>
        </Link>

        <p className="lg:text-lg font-bold text-gray-900">{formatCurrency(data?.PriceFormat ?? 0)}</p>
      </div>
    </div>
  );
}
