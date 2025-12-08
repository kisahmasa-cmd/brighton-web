import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CharityData } from "../../../types/charity-types";

interface CharityCardProps {
  data: CharityData;
}

const CharityCard = ({ data }: CharityCardProps) => {
  function removeHTMLTags(str: string): string {
    const clean = str.replace(/<[^>]+>/g, "");
    return clean;
  }

  return (
    <Link href={`/peduli/view/${data.URLSegment}`} className="cursor-pointer">
      <div className="relative border border-gray-200 shadow-md h-full flex flex-col">
        {/* category */}
        <div className="absolute top-0 left-0 bg-primary px-4 py-1 font-bold text-sm">{data.Category.Title}</div>
        {/* image */}
        <Image src={data.Photo.Medium ?? "/empty.png"} alt={`${data.ID} Photo`} width={0} height={0} sizes="100vw" className="w-full" />
        {/* body */}
        <div className="bg-white p-4 flex flex-col justify-between flex-1">
          <article>
            {/* title */}
            <h4 className="font-bold">{data.Title}</h4>
            {/* description */}
            <p className="line-clamp-4">{removeHTMLTags(data.Content)}</p>
          </article>
          {/* link */}
          <div className="flex items-center gap-2 text-blue-600 mt-2">
            <span className="font-bold">Baca Lebih Lengkap</span>
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharityCard;
