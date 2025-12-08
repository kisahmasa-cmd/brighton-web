"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { City } from "../../../types/location-types";
import { submitContact } from "@/services/contact-service";

interface ContactFormData {
  dataCity?: City[];
}

export default function ContactForm({ dataCity }: ContactFormData) {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Location: "",
    Feedback: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const handleSubmit = async () => {
    // Validation
    if (!formData.Name || !formData.Email || !formData.Feedback || !formData.Location || !formData.Phone) {
      setAlert({
        show: true,
        type: "error",
        message: "Mohon lengkapi semua data yang diperlukan",
      });

      // Auto hide alert after 5 seconds
      setTimeout(() => {
        setAlert({ show: false, type: "success", message: "" });
      }, 5000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      setAlert({
        show: true,
        type: "error",
        message: "Format email tidak valid",
      });

      setTimeout(() => {
        setAlert({ show: false, type: "success", message: "" });
      }, 5000);
      return;
    }

    setIsLoading(true);
    setAlert({ show: false, type: "success", message: "" });

    try {
      const response = await submitContact(formData);

      if (response.Message.Code === 201 || response.Message.Code === 200) {
        setAlert({
          show: true,
          type: "success",
          message: response.Message.Text || "Data berhasil dikirim! Terima kasih telah menghubungi kami.",
        });

        // Reset form
        setFormData({
          Name: "",
          Email: "",
          Phone: "",
          Location: "",
          Feedback: "",
        });

        // Auto hide alert after 5 seconds
        setTimeout(() => {
          setAlert({ show: false, type: "success", message: "" });
        }, 5000);
      } else {
        throw new Error(response.Message.Text || "Terjadi kesalahan");
      }
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: error instanceof Error ? error.message : "Gagal mengirim data. Silakan coba lagi.",
      });

      // Auto hide alert after 5 seconds
      setTimeout(() => {
        setAlert({ show: false, type: "success", message: "" });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="py-4 bg-white flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">HUBUNGI KAMI</h1>
          <p className="text-gray-600 text-sm md:text-base">Jika Anda mempunyai kebutuhan properti , bisa isi data di bawah ini :</p>
        </div>

        {/* Alert Messages */}
        {alert.show && (
          <Alert className={`mb-4 ${alert.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            {alert.type === "success" ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
            <AlertTitle className="font-semibold">{alert.type === "success" ? "Berhasil!" : "Gagal!"}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {/* Name - Full width on all screens */}
          <Input
            type="text"
            placeholder="Masukan Nama Anda"
            value={formData.Name}
            onChange={(e) => handleChange("Name", e.target.value)}
            className="w-full h-12 md:h-14 text-sm md:text-base"
            disabled={isLoading}
          />

          {/* Email and Phone - Stack on mobile, side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Masukan Email Anda"
              value={formData.Email}
              onChange={(e) => handleChange("Email", e.target.value)}
              className="h-12 md:h-14 text-sm md:text-base"
              disabled={isLoading}
            />
            <Input
              type="tel"
              placeholder="Masukan Nomor Telepon Anda"
              value={formData.Phone}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleChange("Phone", e.target.value.replace(/[^0-9]/g, ""))}
              className="h-12 md:h-14 text-sm md:text-base"
              disabled={isLoading}
            />
          </div>

          {/* City Dropdown - Full width */}
          <Select value={formData.Location} onValueChange={(value) => handleChange("Location", value)} disabled={isLoading}>
            <SelectTrigger className="w-full h-12 md:h-14 text-sm md:text-base text-gray-500">
              <SelectValue placeholder="Kota" />
            </SelectTrigger>
            <SelectContent className="h-60">
              {dataCity &&
                dataCity.map((city) => (
                  <SelectItem key={city.ID} value={city.Title}>
                    {city.Title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Message Textarea - Full width */}
          <Textarea
            placeholder="Pesan"
            value={formData.Feedback}
            onChange={(e) => handleChange("Feedback", e.target.value)}
            className="min-h-[120px] md:min-h-[150px] text-sm md:text-base resize-none"
            disabled={isLoading}
          />

          {/* Submit Button - Full width */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-12 md:h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base md:text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
