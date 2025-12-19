import CharityQuote from "@/components/custom/CharityQuote";
import { getCharities, getCharityDetail } from "@/services/charity-service";
import Image from "next/image";
import * as React from "react";
import { CharitiesParams } from "../../../../../../types/charity-types";
import CharityCard from "@/components/custom/CharityCard";
import Link from "next/link";
import CharityDetail from "@/components/custom/CharityDetail";
import { Metadata } from "next";
import { HtmlContentDisplay } from "@/components/custom/HtmlContentDisplay";

type Params = Promise<{ charitySlug: string }>;

interface CharityDetailPageProps {
  params: Params;
}

const CharityDetailPage: React.FC<CharityDetailPageProps> = async (props) => {
  const params = await props.params;
  const charitySlug = params.charitySlug;
  const queryParams: CharitiesParams = {
    Count: 3,
    Page: 1,
  };

  const [dataCharity, dataCharities] = await Promise.all([getCharityDetail(charitySlug), getCharities(queryParams)]);
  const otherCharities = dataCharities.Data.filter((charity) => charity.ID !== dataCharity.Data.ID).slice(0, 2);

  return (
    <main className="mx-auto w-full md:w-2/3 lg:w-1/2 p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl text-center font-bold">{dataCharity.Data.Title}</h1>
      {/* Image */}
      <Image src={dataCharity.Data.Photo.Original ?? "/empty.png"} alt={`Brighton Peduli ${dataCharity.Data.ID} Photo`} width={0} height={0} sizes="100vw" className="w-full h-auto" />
      {/* Body */}
      <HtmlContentDisplay content={dataCharity.Data.Content ?? "-"} />
      <CharityQuote />
      {/* Others*/}
      {otherCharities.length > 0 && (
        <div className="flex flex-col items-center gap-6">
          <div className="border border-black w-1/2"></div>
          <h2 className="text-2xl font-bold text-center">Simak Kisah Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherCharities.map((charity, index) => (
              <CharityCard key={index} data={charity} />
            ))}
          </div>
          <Link href="/peduli" className="w-full md:w-1/2 p-4 border border-primary hover:bg-primary font-semibold text-center">
            Lihat Semuanya
          </Link>
        </div>
      )}
      <CharityDetail />
    </main>
  );
};

export default CharityDetailPage;
