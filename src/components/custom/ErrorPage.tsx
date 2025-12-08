"use client"

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, Frown, Home, SearchX } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ErrorPageProps {
  isNotFound?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ isNotFound = false }) => {
  const Icon = isNotFound ? SearchX : Frown;
  const title = isNotFound ? "Halaman Tidak Ditemukan" : "Terjadi Kesalahan";
  const message = isNotFound ? (
    <span>
      Maaf, halaman yang Anda cari tidak dapat ditemukan. <br/>Halaman mungkin telah dipindahkan atau tidak tersedia.
    </span>
  ) : "Maaf, terjadi kesalahan pada halaman ini.";
  return (
    <main>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-full container mx-auto max-w-xl h-full md:h-auto">
          <Card className="h-full md:h-auto rounded-none md:rounded-2xl">
            <CardContent className="py-3 px-4">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/logo_full.svg"
                  alt="Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-auto h-8 object-contain mb-3"
                />
                <Icon className="w-16 h-16 text-gray-400 my-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-center">
                  {message}
                </p>
                <div className="flex gap-4 justify-center items-center mt-6">
                  <Button size="lg" variant={"secondary"} className="rounded-full flex items-center gap-2" onClick={() => window.history.back()}>
                    <ArrowLeft />
                    <span>Kembali</span>
                  </Button>
                  <Link href="/">
                    <Button
                      size="lg"
                      variant={"outline"}
                      className="rounded-full flex items-center gap-2"
                    >
                      <Home />
                      <span>Ke Beranda</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
