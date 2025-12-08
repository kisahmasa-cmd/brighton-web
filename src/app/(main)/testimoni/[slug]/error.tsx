"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const TestimoniesError = () => {
  const params = useParams();
  const slug = params.slug;

  return (
    <div className="space-y-6 p-6 container max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="font-extrabold text-3xl text-center my-6">
        {`Simak Apa Kata ${slug === "agen" ? "Agen" : "Klien"} Tentang Brighton`}
      </h1>
      {/* Body */}
      <div className="my-16 flex flex-col items-center gap-4">
        <h2 className="text-2xl text-center">Ups, data tidak ditemukan.</h2>
        <p className="text-center">
          Data tidak tersedia saat ini. Yuk, kembali ke halaman utama untuk
          jelajahi properti lainnya!.
        </p>
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="border-black rounded-full font-semibold"
          >
            Jelajahi Sekarang
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TestimoniesError;
