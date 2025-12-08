import Image from "next/image";
import { TestimoniData } from "../../../types/testimoni-types";

interface CardTestimoniProps {
  data?: TestimoniData;
}

export default function CardTestimoni({ data }: CardTestimoniProps) {
  return (
    <div className="relative border border-gray-200 rounded-xl mt-8 p-6 bg-white shadow-lg h-60 flex flex-col">
      <div className="absolute -top-8 left-6 w-15 h-15 rounded-full bg-primary overflow-hidden flex items-center justify-center flex-shrink-0">
        {data?.Photo?.Medium ? (
          <Image
            src={data?.Photo?.Medium}
            alt="agent photo"
            className="w-full h-full object-cover"
            fill
          />
        ) : (
          <p className="w-full h-full font-bold text-3xl flex justify-center items-center">
            {data?.Nama?.charAt(0)}
          </p>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 mt-5 flex-shrink-0">
        <div className="flex flex-col mb-3">
          <p className="font-bold uppercase text-gray-900 leading-5 line-clamp-2">{data?.Nama}</p>
          <p className="text-gray-600 text-sm line-clamp-1">{data?.Type}</p>
        </div>
        <div className="bg-primary w-10 h-10 rounded-md relative flex-shrink-0">
          <p className="absolute top-1 -left-0.5 text-6xl italic font-semibold">“</p>
        </div>
      </div>

      <p className="text-xs leading-4 text-gray-700 text-justify line-clamp-5 flex-grow overflow-hidden">{data?.Testimoni}</p>
    </div>
  );
}
