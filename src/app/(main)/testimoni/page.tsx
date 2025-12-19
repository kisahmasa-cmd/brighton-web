import TestimoniCardV2 from "@/components/custom/TestimoniCardV2";
import { Button } from "@/components/ui/button";
import { getTestimonies } from "@/services/testimoni-service";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testimoni",
};

const TestimoniPage = async () => {
  const [agentTestimonies, clientTestimonies] = await Promise.all([
    getTestimonies({
      Type: "AGEN",
      Count: 2,
      Page: 1,
    }),
    getTestimonies({
      Type: "UMUM",
      Count: 2,
      Page: 1,
    }),
  ]);

  return (
    <div className="space-y-6 p-6 container max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="font-extrabold text-3xl text-center my-6">{"Simak Apa Kata Agen & Klien Tentang Brighton"}</h1>
      {/* Agent Testimonial */}
      <div className="flex flex-col lg:flex-row gap-6 mt-16">
        <div className="lg:basis-1/3 flex flex-col items-center lg:items-start gap-4 justify-center">
          <h2 className="text-4xl font-bold text-center lg:text-left">{"Testimoni Agen Brighton"}</h2>
          <p className="leading-8 text-center lg:text-left">{"Dengarkan cerita para agen Brighton yang telah membantu banyak klien menemukan properti impian mereka"}</p>
          <Link href="/testimoni/agen">
            <Button variant="secondary" size="xl" className="rounded-full font-semibold">
              {"Lihat Semua Testimoni Agen"}
            </Button>
          </Link>
        </div>
        {agentTestimonies.Data.map((testimoni, index) => (
          <div className="lg:basis-1/3" key={index}>
            <TestimoniCardV2 isAgent isShowButton data={testimoni} />
          </div>
        ))}
      </div>
      {/* Client Testimonial */}
      <div className="flex flex-col lg:flex-row gap-6 mt-16">
        <div className="lg:basis-1/3 flex flex-col items-center lg:items-start gap-4 justify-center lg:order-1">
          <h2 className="text-4xl font-bold text-center lg:text-left">{"Testimoni Klien Brighton"}</h2>
          <p className="leading-8 text-center lg:text-left">{"Simak pengalaman para klien kami yang telah berhasil menemukan properti idaman bersama Agen Brighton"}</p>
          <Link href="/testimoni/klien">
            <Button variant="secondary" size="xl" className="rounded-full font-semibold">
              {"Lihat Semua Testimoni Klien"}
            </Button>
          </Link>
        </div>
        {clientTestimonies.Data.map((testimoni, index) => (
          <div className="lg:basis-1/3" key={index}>
            <TestimoniCardV2 isShowButton data={testimoni} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimoniPage;
