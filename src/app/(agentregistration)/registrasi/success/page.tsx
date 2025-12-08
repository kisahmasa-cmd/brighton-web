import { cn } from "@/lib/utils";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registrasi Agent Berhasil",
};

type SearchParams = Promise<{
  agent_name?: string;
}>;

interface AgentRegisterSuccessPageProps {
  searchParams: SearchParams;
}

const AgentRegisterSuccessPage: React.FC<
  AgentRegisterSuccessPageProps
> = async (props) => {
  const searchParams = await props.searchParams;
  const agentName = searchParams.agent_name;

  const getImage = (image: string) => {
    return `/agent-registration-success/${image}`;
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary relative">
        <div className="p-4 lg:p-12 space-y-1 md:space-y-6 w-3/5 md:w-2/3">
          <CompImage
            src={getImage("logo-white-circle.webp")}
            alt="Logo"
            className="w-auto h-6 md:h-12"
          />
          {agentName && (
            <div className="md:text-3xl lg:text-5xl">
              <p className="font-medium">Terima Kasih,</p>
              <p className="font-bold">Bapak/Ibu {agentName}</p>
            </div>
          )}
          <p className="text-lg md:text-3xl lg:text-6xl font-extrabold">Registrasi Berhasil!</p>
          <p className="text-sm md:text-xl lg:text-3xl font-medium md:w-2/3">
            Brighton Care akan menghubungi Anda, maksimal di 2x24 jam.
          </p>
        </div>
        <CompImage
          src={getImage("hero-bg.webp")}
          alt="Hero"
          className="absolute right-0 top-0 h-full w-auto max-h-full object-contain"
        />
      </section>
      {/* Steps */}
      <section className="flex flex-col items-center gap-4 md:gap-8 p-4 lg:p-8">
        <p className="font-bold bg-primary text-center rounded-lg px-2 py-1 md:text-lg lg:text-2xl">
          Berikut adalah tahapan selanjutnya :
        </p>
        <div className="w-full max-w-5xl container flex flex-col gap-8 items-center justify-center">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4">
            <StepItem
              image={getImage("tahap1.webp")}
              step={1}
              label="Mengisi Tes DISC (Personality Test)"
            />
            <CompArrow />
            <StepItem
              image={getImage("tahap2.webp")}
              step={2}
              label="Interview Leader (Akan Dijadwalkan)"
            />
            <CompArrow />
            <StepItem
              image={getImage("tahap3.webp")}
              step={3}
              label="Jika Diterima, Lakukan Investasi Bisnis (Maksimal H+1) untuk Mendapatkan Program Bonus"
            />
          </div>
          <div className="flex flex-col md:flex-row-reverse justify-center items-center md:items-start gap-4">
            <CompArrow isTopToLeft otherClass="hidden md:block mt-10" />
            <CompArrow otherClass="md:hidden rotate-90" />
            <StepItem
              image={getImage("tahap4.webp")}
              step={4}
              label="Melakukan MOU (Perjanjian Kerjasama Agen)"
            />
            <CompArrow otherClass="rotate-90 md:rotate-180 md:mt-28 lg:mt-40" />
            <StepItem
              image={getImage("tahap5.webp")}
              step={5}
              label="Training Bright On 3 Hari (Akan Dijadwalkan)"
            />
          </div>
        </div>
      </section>
      {/* Back to Home */}
      <section className="flex flex-col items-center gap-8">
        <CompImage src={getImage("text-selamat.webp")} alt="Text Selamat" className="max-w-6xl container h-auto object-contain" />
        <Link href="/" className="font-semibold text-xl px-8 py-4 rounded-full border-2 border-primary hover:bg-black/5">Kembali ke Home</Link>
        <div className="flex flex-col items-center w-full">
          <CompImage src={getImage("img-grup-success.webp")} alt="Grup Success" className="max-w-6xl container h-auto object-contain" />
          <div className="w-full h-20 bg-primary"></div>
        </div>
      </section>
    </div>
  );
};

const CompArrow = ({otherClass = "rotate-90 md:rotate-0 md:mt-28 lg:mt-40", isTopToLeft=false}: {otherClass?: string, isTopToLeft?: boolean}) => {
  return (
    <div className={cn("border-2 border-black rounded-full p-1", otherClass)}>
      {isTopToLeft ? (
        <CornerDownLeft className="w-6 h-6 text-black" />
      ) : (
        <ArrowRight className="w-6 h-6 text-black" />
      )}

    </div>
  );
};

interface StepItemProps {
  image: string;
  step: number;
  label: string;
}

const StepItem: React.FC<StepItemProps> = ({ image, step, label }) => {
  return (
    <div className="w-56 lg:w-72 flex flex-col items-center gap-6">
      <div className="relative w-40 h-40 lg:w-56 lg:h-56">
        <CompImage
          src={image}
          alt={`Step ${step}`}
          className="w-full h-auto object-contain rounded-full"
        />
        <div className="absolute bottom-1 right-1 lg:bottom-3 lg:right-3">
          <div className="relative flex justify-center items-center">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full"></div>
            <p className="text-2xl lg:text-3xl font-bold absolute">{step}</p>
          </div>
        </div>
      </div>

      <p className="lg:text-xl font-bold text-center">{label}</p>
    </div>
  );
};

interface CompImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CompImage: React.FC<CompImageProps> = ({ src, alt, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={className}
    />
  );
};

export default AgentRegisterSuccessPage;
