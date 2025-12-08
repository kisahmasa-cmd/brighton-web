"use client";

import Image from "next/image";

const steps = [
  {
    title: "Isi Form Kebutuhan Properti Anda",
    image: "https://www.brighton.co.id/themes/v7/img/titip-cari/isi-form.webp",
  },
  {
    title: "Pilih Agen Terbaik Rekomendasi Kami",
    image: "https://www.brighton.co.id/themes/v7/img/titip-cari/pilih-agen.webp",
  },
  {
    title: "Hubungi Agen Pilihan Anda Secara Langsung",
    image: "https://www.brighton.co.id/themes/v7/img/titip-cari/hubungi-agen.webp",
  },
];

export default function ConsignmentStep() {
  return (
    <section className="relative w-full">
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-[#fdd314]/40 blur-3xl rounded-full top-0 left-10 opacity-50" />
        <div className="absolute w-64 h-64 bg-[#fdd314]/30 blur-3xl rounded-full bottom-10 right-10 opacity-40" />
      </div>

      {/* Section Title */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          3 Langkah Praktis <span className="text-[#fdd314]">Titip/Cari Properti</span> di Brighton
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Proses cepat, aman, dan langsung terhubung dengan agen terpercaya kami.</p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8">
        {steps.map((step, index) => (
          <div key={index} className="group flex flex-col items-center text-center bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8">
            <Image src={step.image} alt={step.title} width={80} height={80} className="w-24 h-24 sm:w-28 sm:h-28 mb-5 rounded-full" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{step.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
