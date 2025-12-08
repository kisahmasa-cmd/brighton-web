import React, { useState, useEffect } from "react";
import { getAgentRecommendation } from "@/services/agent-service";
import AgentCardContactWhatsApp from "@/components/custom/AgentCardContactWhatsApp";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Agent } from "../../../types/agent-types";

interface ConsignmentAgentRecommendationProps {
  formData: {
    // Titip fields
    city?: string;
    area?: string;
    propertyType?: string;
    transactionType?: string;
    address?: string;
    specifications?: string;
    price?: string;
    bankGuaranteed?: string;
    bankName?: string;
    ownershipStatus?: string;
    // Cari fields
    searchCity?: string;
    searchArea?: string;
    searchPropertyType?: string;
    propertyUsage?: string;
    budget?: string;
    requirements?: string;

    // Shared fields
    name: string;
    phone: string;
  };
  formType: "titip" | "cari";
  onSuccess: () => void; // Callback to reset form after success
}

export default function ConsignmentAgentRecommendation({ formData, formType, onSuccess }: ConsignmentAgentRecommendationProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 3;
  // City name to LocationID mapping - UPDATE WITH YOUR ACTUAL IDs
  const cityToLocationID: Record<string, number> = {
    jakarta: 1,
    surabaya: 651,
    bandung: 3,
  };
  const fetchAgents = async (currentSkip: number) => {
    setLoading(true);
    try {
      // Get the correct city/area based on form type
      const city = formType === "titip" ? formData.city : formData.searchCity;
      const area = formType === "titip" ? formData.area : formData.searchArea;
      const propertyType = formType === "titip" ? formData.propertyType : formData.searchPropertyType;

      const params = {
        Skip: currentSkip,
        Limit: LIMIT,
        LocationID: Number(city),
        AgentOfficeCity: area || "",
        Keyword: area || "",
        Transaction: formData.transactionType || "",
        Type: propertyType || "",
      };

      const response = await getAgentRecommendation("", params);

      if (response?.Message?.Code === 200 && response.Data && response.Data.length > 0) {
        setAgents((prev) => (currentSkip === 0 ? response.Data : [...prev, ...response.Data]));
        setHasMore(response.Data.length === LIMIT);

        // Call success callback only on initial load
        if (!initialLoadDone && currentSkip === 0) {
          setInitialLoadDone(true);
          onSuccess();
        }
      } else {
        setHasMore(false);
        if (currentSkip === 0) {
          setAgents([]);
          toast.info("Tidak ada agen yang tersedia untuk area ini");
        }
      }
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      toast.error("Ups... Gagal memuat daftar agen. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAgents(0);
  }, []);
  const handleLoadMore = () => {
    const newSkip = skip + LIMIT;
    setSkip(newSkip);
    fetchAgents(newSkip);
  };
  // Format WhatsApp message from form data
  const generateWhatsAppMessage = () => {
    if (formType === "titip") {
      return encodeURIComponent(`
        Halo, saya ingin menitipkan properti:\n\n +
        Nama: ${formData.name}\n +
        No. WhatsApp: +62${formData.phone}\n +
        Status Kepemilikan: ${formData.ownershipStatus}\n +
        Tipe Properti: ${formData.propertyType}\n +
        Alamat: ${formData.address}\n +
        Kota: ${formData.city}\n +
        Lokasi/Daerah: ${formData.area || "-"}\n +
        Spesifikasi: ${formData.specifications}\n +
        Harga: Rp ${formData.price}\n +
        Transaksi: ${formData.transactionType}\n +
        Dijamin Bank: ${formData.bankGuaranteed === "ya" ? "Ya - " + formData.bankName : "Tidak"}
    `);
    } else {
      return encodeURIComponent(`
        Halo, saya mencari properti:\n\n +
        Nama: ${formData.name}\n +
        No. WhatsApp: +62${formData.phone}\n +
        Penggunaan: ${formData.propertyUsage}\n +
        Tipe Properti: ${formData.searchPropertyType}\n +
        Kota: ${formData.searchCity}\n +
        Lokasi/Daerah: ${formData.searchArea || "-"}\n +
        Budget: Rp ${formData.budget}\n +
        Kebutuhan: ${formData.requirements}
    `);
    }
  };
  const whatsappMessage = generateWhatsAppMessage();
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Rekomendasi Agen Terbaik Untuk {formType === "titip" ? "Titip" : "Cari"} Properti</h2>
        <p className="text-gray-600">Pilih agen yang sesuai dengan kebutuhan properti Anda</p>
      </div>
      {/* Loading Initial State */}
      {loading && agents.length === 0 && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Agents Grid */}
      {agents.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCardContactWhatsApp key={agent.ID} agent={agent} whatsappMessage={whatsappMessage} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && agents.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <p className="text-gray-500">Tidak ada agen yang tersedia untuk area ini</p>
          <p className="text-sm text-gray-400">Coba ubah kriteria pencarian Anda</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && agents.length > 0 && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore} disabled={loading} variant="outline" size="lg">
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Muat Lebih Banyak
          </Button>
        </div>
      )}
    </div>
  );
}
