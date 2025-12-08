import ContactForm from "@/components/custom/ContactForm";
import ImageWithButton from "@/components/custom/ImageWithButton";
import { getListCityAgent } from "@/services/agent-service";

export default async function page() {
  const dataCity = await getListCityAgent();
  return (
    <main className="w-full container mx-auto px-2">
      <ContactForm dataCity={dataCity.Data} />
      <div className="py-8 w-full">
        <ImageWithButton
          Size="lg"
          Variant="secondary"
          BtnTitle="Hubungi Customer Service Brigita"
          Title="Masih butuh info lain atau bantuan seputar jual, sewa, cari properti?"
          Img="https://cdn.brighton.co.id/Uploads/Images/18982156/KvQ90dz4/update-logo-RENIX-di-BrightonApp-02.webp"
        />
      </div>
    </main>
  );
}
