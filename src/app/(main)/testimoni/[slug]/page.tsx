import PaginationButton from "@/components/custom/PaginationButton";
import TestimoniCardV2 from "@/components/custom/TestimoniCardV2";
import { getTestimonies } from "@/services/testimoni-service";
import { notFound } from "next/navigation";
import { getPaginationData } from "../../../../../utils/getPaginationData";
import { Metadata } from "next";
import TestimoniesGrid from "@/components/custom/TestimoniesGrid";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{
  page: string;
}>;

interface TestimoniesPageProps {
  params: Params;
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: "Testimoni",
};

const TestimoniesPage: React.FC<TestimoniesPageProps> = async (
  props: TestimoniesPageProps,
) => {
  const params = await props.params;
  const slug = params.slug;
  if (!["agen", "klien"].includes(slug)) return notFound();

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = 9;

  const testimonies = await getTestimonies({
    Type: slug === "agen" ? "AGEN" : "UMUM",
    Count: limit,
    Page: page,
  });

  const { pages, totalPages, startPage, endPage } = getPaginationData({
    count: testimonies.Pagination?.Count || 0,
    limit,
    page,
  });

  return (
    <div className="space-y-6 p-6 container max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="font-extrabold text-3xl text-center my-6">
        {`Simak Apa Kata ${slug === "agen" ? "Agen" : "Klien"} Tentang Brighton`}
      </h1>
      {/* List */}
      <TestimoniesGrid slug={slug} data={testimonies.Data} />
      <hr className="border border-gray-200 w-full" />
      {/* Pagination */}
      <PaginationButton
        page={page}
        pages={pages}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
      />
    </div>
  );
};

export default TestimoniesPage;
