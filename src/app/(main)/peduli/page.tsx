import CharityCardList from "@/components/custom/CharityCardList";
import CharityContent from "@/components/custom/CharityContent";
import CharityDetail from "@/components/custom/CharityDetail";
import CharityHeaderVideo from "@/components/custom/CharityHeaderVideo";
import CharityQuote from "@/components/custom/CharityQuote";
import CharitySearch from "@/components/custom/CharitySearch";
import { getCharities, getCharityCategories } from "@/services/charity-service";
import { CharitiesParams } from "../../../../types/charity-types";
import PaginationButton from "@/components/custom/PaginationButton";
import { Metadata } from "next";
import { getPaginationData } from "../../../../utils/getPaginationData";

type SearchParams = Promise<{
  Keyword: string;
  Category: string;
  page: string;
}>;

interface CharityPageProps {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: "Brighton Peduli - Bersama Wujudkan Mimpi | Brighton.co.id",
};

const CharityPage: React.FC<CharityPageProps> = async (props) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const limit = 6;

  const queryParams: CharitiesParams = {
    Count: limit,
    Page: page,
  };
  if (searchParams.Keyword) {
    queryParams.Keyword = searchParams.Keyword;
  }
  if (searchParams.Category) {
    queryParams.Category = searchParams.Category;
  }

  const [dataCharityCategories, dataCharities] = await Promise.all([getCharityCategories(), getCharities(queryParams)]);
  const total = dataCharities.Count;
  const { pages, totalPages, startPage, endPage } = getPaginationData({
    count: total,
    limit,
    page,
  });

  return (
    <main className="mx-auto w-full md:w-2/3 lg:w-1/2 px-6">
      <CharityHeaderVideo />
      <CharityContent categories={dataCharityCategories.Data} />
      <section id="BrightonPeduli">
        <CharitySearch categories={dataCharityCategories.Data} />
        <CharityCardList data={dataCharities.Data} dataTotal={total} />
        {/* pagination */}
        <PaginationButton page={page} pages={pages} totalPages={totalPages} startPage={startPage} endPage={endPage} hash="BrightonPeduli" />
      </section>
      <CharityQuote />
      <CharityDetail />
    </main>
  );
};

export default CharityPage;
