"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/services/newsletter-service";
import { NewsletterParams } from "../../../types/newsletter-types";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.promise(async () => {
      setIsLoading(true);
      try {
        const params: NewsletterParams = {
          Email: email,
          Phone: phone,
        };
        await subscribeNewsletter(params);
        setEmail("");
        setPhone("");
        return true;
      } catch (error) {
        throw new Error(`${error}`);
      } finally {
        setIsLoading(false);
      }
    }, {
      loading: "Harap tunggu...",
      success: "Berhasil subscribe!",
      error: (e) => e.message,
    })
  }

  return (
    <>
      <div className="bg-primary rounded-lg py-4 px-6 mb-4 flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Info */}
        <div className="flex-1 flex flex-col items-center lg:items-start">
          <p className="text-center lg:text-left font-bold text-xl">Dapatkan Berita Terdepan!</p>
          <p className="text-center lg:text-left text-sm font-medium">Dapatkan update & info properti dengan berlangganan sekarang</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full lg:w-2/5 flex flex-col lg:flex-row gap-2">
          <Input type="email" required disabled={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Anda" className="bg-white rounded-full"/>
          <Input type="tel" required disabled={isLoading} inputMode="numeric" pattern="[0-9]*" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nomor Anda" className="bg-white rounded-full"/>
          <Button type="submit" disabled={isLoading} variant="secondary" className="font-semibold rounded-full">Subscribe</Button>
        </form>
      </div>
      <Image src="https://www.brighton.co.id/themes/v7/img/Banner-Download-App-2024-small.webp" alt="Banner" width={1920} height={420} priority className="w-full h-auto rounded-xl" />
    </>
  );
}
