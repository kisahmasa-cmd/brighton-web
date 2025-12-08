import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Agent } from "../../../types/agent-types";

interface BadgeProps {
  src: string;
  label: string;
  year?: string;
}

interface AgentProfileCardProps {
  data?: Agent;
}

const Badge = ({ src, label, year }: BadgeProps) => (
  <div className="flex flex-col items-center text-center w-20">
    <Image width={64} height={64} src={src} alt={`${label} Badge`} className="object-contain h-16 w-16" />
    <p className="text-xs font-semibold mt-1 text-gray-900">{label}</p>
    <p className="text-xs text-gray-700">{year}</p>
  </div>
);

const AgentProfileCard = ({ data }: AgentProfileCardProps) => {
  return (
    <div className="w-full bg-primary p-8">
      <div className="container w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Foto Agen */}
          <div className="flex-shrink-0">
            <Image
              width={200}
              height={200}
              src={data?.Photo.MediumWebP ?? data?.Photo.Medium ?? "/empty.png"}
              alt="Agent Profile"
              className="object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* Informasi Agen */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{data?.IsCRA === "1" ? data.NameCRA : data?.Name}</h1>
                {/* Menambahkan ikon centang biru */}
                {data?.IsCRA === "1" && <Image src="/verified-cra.svg" alt="Verified" width="30" height="30" />}
              </div>
              <p className="text-lg text-gray-800">{data?.Office?.Name}</p>
              <p className="text-lg text-gray-800">{data?.Office?.LocationAndProvince}</p>
            </div>

            <div className="inline-block bg-white py-1 px-4 rounded-lg shadow-md mb-4">
              <span className="font-bold text-gray-900">{data?.Position}</span>
            </div>
            {/* business  */}
            {(data?.TotalOffices ?? 0) > 0 && (data?.TotalLeaders ?? 0) > 0 && (
              <div className="lg:hidden flex flex-row divide-x divide-black bg-white py-2 px-4 rounded-lg shadow-md max-w-4/5 sm:max-w-3/5 mx-auto mb-4">
                <div className="flex flex-row gap-2 items-center justify-center w-1/2">
                  <div className="text-label-3xl font-bold text-black bg-primary rounded-full p-2">{data?.TotalOffices}</div>
                  <div className="text-label-2xl font-semibold text-gray-800">
                    Kantor
                    <br />
                    Cabang
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center w-1/2">
                  <div className="text-label-3xl font-bold text-black bg-white rounded-full p-2">{data?.TotalLeaders}</div>
                  <div className="text-label-2xl font-semibold text-gray-800">
                    Business
                    <br />
                    Managers
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Tentang</h3>
              <p className="text-sm leading-relaxed max-w-md mx-auto lg:mx-0 text-gray-800">{data?.Caption?.length === 0 ? "-" : data?.Caption}</p>
            </div>
          </div>

          {/* Grup Kanan: Statistik, Lencana, dan Kontak */}
          <div className="flex flex-col xl:flex-row items-center md:items-start gap-8 mt-4 lg:mt-0">
            {/* Kolom Statistik dan Lencana */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4 justify-center">
                <div className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-900">{data?.TotalListing ?? 0}</span>
                  <span className="text-sm text-gray-600">Listing</span>
                </div>
                <div className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-900">{data?.TotalSell ?? 0}</span>
                  <span className="text-sm text-gray-600">Jual</span>
                </div>
                <div className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-gray-900">{data?.TotalRent ?? 0}</span>
                  <span className="text-sm text-gray-600">Sewa</span>
                </div>
              </div>

              {/* Bagian Lencana Saya */}
              {(data?.Badge?.length ?? 0) > 0 && (
                <div className="w-full mt-2">
                  <h3 className="font-bold text-gray-900 mb-2 text-center">Lencana Saya</h3>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <>
                      {data?.Badge?.map((b) => (
                        <Badge key={b.ID} src={b.Photo.Medium ?? "/empty.png"} label={b.Title ?? ""} year={b.Tahun} />
                      ))}
                    </>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col h-full justify-between lg:w-auto w-full lg:items-start items-center">
              {/* Kolom Tombol Kontak dan QR Code */}
              <div className="flex flex-shrink-0 items-center gap-4 ">
                <div className="flex flex-col gap-2 w-48">
                  <a href={`https://wa.me/${data?.WAPhone}`} target="_blank" rel="noreferrer">
                    <Button
                      size={"lg"}
                      variant={"whatsapp"}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-lg"
                    >
                      <Image src="/whatsapp.svg" alt="Icon WhatsApp" width="15" height="17" className="invert w-4 h-auto" />
                      <span>WhatsApp</span>
                    </Button>
                  </a>
                  <a href={`mailto:${data?.Email}`} target="_blank" rel="noopener noreferrer">
                    <Button
                      size={"lg"}
                      variant={"outline"}
                      className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-lg"
                    >
                      <Mail size={20} />
                      Email Agen
                    </Button>
                  </a>
                </div>
                {/* Menambahkan QR Code */}
                <div className="bg-white p-1.5 rounded-lg shadow-lg">
                  <Image src={data?.BarcodeImageURL ?? "/empty.png"} width={100} height={100} alt="QR Code" />
                </div>
              </div>
              {/* business  */}
              {(data?.TotalOffices ?? 0) > 0 && (data?.TotalLeaders ?? 0) > 0 && (
                <div className="hidden lg:flex flex-row divide-x divide-black bg-white py-2 px-4 rounded-lg shadow-md w-full mt-4">
                  <div className="flex flex-row gap-2 items-center justify-center w-1/2">
                    <div className="text-label-3xl font-bold text-black bg-primary rounded-full p-2">{data?.TotalOffices}</div>
                    <div className="text-label-2xl font-semibold text-gray-800">
                      Kantor
                      <br />
                      Cabang
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-center w-1/2">
                    <div className="text-label-3xl font-bold text-black bg-white rounded-full p-2">{data?.TotalLeaders}</div>
                    <div className="text-label-2xl font-semibold text-gray-800">
                      Business
                      <br />
                      Managers
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfileCard;
