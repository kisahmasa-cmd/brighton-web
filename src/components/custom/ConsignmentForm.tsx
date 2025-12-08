"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Search, User, Phone, Building, MapPin, MessageSquare, CheckCircle2, ArrowLeft, RotateCcw } from "lucide-react";
import ConsignmentAgentRecommendation from "@/components/custom/ConsignmentAgentRecommendation";
import InputPropertyType from "@/components/custom/InputPropertyType";
import { PropertyBasicInfo } from "../../../types/property-types";
import { Consignment } from "../../../types/consignment-types";
import InputAreaConsignment from "@/components/custom/InputAreaConsignment";
import { formatSlug } from "../../../utils/formatSlug";
import InputCity from "@/components/custom/InputCity";
import { toast } from "sonner";
import { postConsignment } from "@/services/consignment-service"; // Adjust path as needed
import { cn } from "@/lib/utils";
import { ApiResponse } from "../../../utils/apiResponse"; // Adjust path as needed
import { checkLogin } from "@/actions/check-login-action";
import OTPPopup from "./OTPPopup";

const INITIAL_FORM_DATA = {
  // Data Diri
  name: "",
  phone: "",

  // Data Properti - Titip Properti
  ownershipStatus: "",
  propertyType: "",
  address: "",
  city: "",
  area: "",
  specifications: "",
  price: "",
  transactionType: "",
  bankGuaranteed: "",
  bankName: "",

  // Data Properti - Cari Properti
  propertyUsage: "",
  searchPropertyType: "",
  searchCity: "",
  searchArea: "",
  budget: "",
  requirements: "",
};

interface FormErrors {
  name?: string;
  address?: string;
  specifications?: string;
  bankName?: string;
  requirements?: string;
}

interface ConsignmentFormProps {
  propertyTypes?: PropertyBasicInfo[];
}

export default function PropertyForm({ propertyTypes }: ConsignmentFormProps) {
  const [activeTab, setActiveTab] = useState("titip");
  const [showAgentRecommendation, setShowAgentRecommendation] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);

  // input refs
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const specificationsRef = useRef<HTMLTextAreaElement>(null);
  const bankNameRef = useRef<HTMLInputElement>(null);
  const requirementsRef = useRef<HTMLTextAreaElement>(null);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(Number(number));
  };

  const handleCurrencyInput = (field: string, value: string) => {
    const formatted = formatCurrency(value);
    updateField(field, formatted);
  };

  const formatPhoneNumber = (value: string) => {
    let number = value.replace(/\D/g, "");
    if (number.startsWith("0")) {
      number = number.substring(1);
    }
    if (number.length <= 3) {
      return number;
    } else if (number.length <= 7) {
      return `${number.slice(0, 3)} ${number.slice(3)}`;
    } else {
      return `${number.slice(0, 3)} ${number.slice(3, 7)} ${number.slice(7, 12)}`;
    }
  };

  const handlePhoneInput = (value: string) => {
    const formatted = formatPhoneNumber(value);
    updateField("phone", formatted);
  };

  const prepareSubmitData = () => {
    // Remove formatting from phone number (remove spaces)
    const cleanPhone = "0" + formData.phone.replace(/\s/g, "");

    if (activeTab === "titip") {
      // Remove formatting from price (remove dots/commas)
      const cleanPrice = formData.price.replace(/\D/g, "");

      return {
        Type: "Titip",
        Name: formData.name,
        Phone: cleanPhone,
        OwnershipStatus: formData.ownershipStatus === "pribadi" ? "Pribadi" : "Orang Lain",
        PropertyType: formData.propertyType,
        PropertyAddress: formData.address,
        LocationDataID: parseInt(formData.city),
        LocationArea: formData.area || "",
        PropertyDescription: formData.specifications,
        PropertyPrice: cleanPrice,
        PropertyTransaction: formData.transactionType,
        PropertyOnBank: formData.bankGuaranteed === "ya" ? 1 : 0,
        PropertyBankName: formData.bankGuaranteed === "ya" ? formData.bankName : "",
      };
    } else {
      // Cari Properti
      const cleanBudget = formData.budget.replace(/\D/g, "");

      return {
        Type: "Cari",
        Name: formData.name,
        Phone: cleanPhone,
        PropertyUseOf: formData.propertyUsage === "hunian" ? "Hunian" : "Bisnis Komersial",
        PropertyType: formData.searchPropertyType,
        LocationDataID: parseInt(formData.searchCity),
        LocationArea: formData.searchArea || "",
        EstimatedBudget: cleanBudget,
        TellUsPropertyNeeds: formData.requirements,
      };
    }
  };

  const handleSubmit = async () => {
    if (!isWhiteSpaceValid()) return;

    // Check if user is logged in (replace with actual auth check)
    const isLoggedIn = await checkLogin();

    if (!isLoggedIn) {
      setIsOtpPopupOpen(true);
      return;
    }

    setIsSubmitting(true);

    const submitData = prepareSubmitData();

    toast.promise(postConsignment(submitData), {
      loading: "Mengirim data...",
      success: (response: ApiResponse<Consignment>) => {
        if (response?.Message?.Code === 200) {
          setShowAgentRecommendation(true);
          setIsSubmitting(false);
          return "Data berhasil dikirim!";
        } else {
          setIsSubmitting(false);
          return response?.Message?.Text || "Terjadi kesalahan pada server";
        }
      },
      error: (error) => {
        // Error handling logic
        console.error("Error: ", error);
        setIsSubmitting(false);
        return "Maaf, Gagal memproses permintaan Anda";
      },
    });
  };

  const isWhiteSpaceValid = (): boolean => {
    let result = true;
    let firstError: { ref?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>; message?: string } = {};
    const newErrors: FormErrors = {};

    const errorMessage = (label: string): string => `${label} tidak boleh hanya berisi spasi!`;

    if (formData.name.trim() === "") {
      newErrors.name = errorMessage("Nama Lengkap");
      if (!firstError.ref) {
        firstError = { ref: nameRef, message: newErrors.name };
      }
      result = false;
    }

    if (activeTab === "titip") {
      if (formData.address.trim() === "") {
        newErrors.address = errorMessage("Alamat Properti");
        if (!firstError.ref) {
          firstError = { ref: addressRef, message: newErrors.address };
        }
        result = false;
      }
      if (formData.specifications.trim() === "") {
        newErrors.specifications = errorMessage("Spesifikasi Properti");
        if (!firstError.ref) {
          firstError = { ref: specificationsRef, message: newErrors.specifications };
        }
        result = false;
      }
      if (formData.bankGuaranteed === "ya" && formData.bankName.trim() === "") {
        newErrors.bankName = errorMessage("Nama Bank");
        if (!firstError.ref) {
          firstError = { ref: bankNameRef, message: newErrors.bankName };
        }
        result = false;
      }
    } else {
      if (formData.requirements.trim() === "") {
        newErrors.requirements = errorMessage("Kebutuhan Properti");
        if (!firstError.ref) {
          firstError = { ref: requirementsRef, message: newErrors.requirements };
        }
        result = false;
      }
    }

    if (!result) {
      setErrors(newErrors);
      if (firstError.ref?.current) {
        firstError.ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.ref.current.focus();
      }
      if (firstError.message) {
        toast.error(firstError.message);
      }
    }

    return result;
  };

  const handleBackToForm = () => {
    setShowAgentRecommendation(false);
  };

  const handleResetForm = () => {
    if (confirm("Apakah Anda yakin ingin mengosongkan semua data form?")) {
      setFormData(INITIAL_FORM_DATA);
      setShowAgentRecommendation(false);
      setActiveTab("titip");
    }
  };

  const handleAgentSuccess = () => {
    // Reset form after successfully showing agents
    // setFormData(INITIAL_FORM_DATA);
  };

  const isTitipFormValid = () => {
    return (
      formData.name &&
      formData.phone &&
      formData.ownershipStatus &&
      formData.propertyType &&
      formData.address &&
      formData.city &&
      formData.area &&
      formData.specifications &&
      formData.price &&
      formData.transactionType &&
      formData.bankGuaranteed &&
      (formData.bankGuaranteed === "tidak" || formData.bankName)
    );
  };

  const isCariFormValid = () => {
    return formData.name && formData.phone && formData.propertyUsage && formData.searchPropertyType && formData.searchCity && formData.searchArea && formData.budget && formData.requirements;
  };

  // If showing agent recommendations, render that view
  if (showAgentRecommendation) {
    document.getElementById("containerAutoScroll")?.scrollIntoView({ behavior: "smooth" });

    return (
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {/* CTA back dan reset disembunyikan */}
        <div className="hidden justify-center gap-2">
          <Button onClick={handleBackToForm} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Form
          </Button>
          <Button onClick={handleResetForm} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset Form
          </Button>
        </div>
        <ConsignmentAgentRecommendation formData={formData} formType={activeTab as "titip" | "cari"} onSuccess={handleAgentSuccess} />
      </div>
    );
  }

  return (
    <>
    <Card className="w-full shadow-xl border-0 rounded-3xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">Kebutuhan Properti</CardTitle>
        <CardDescription className="text-base">Pilih jenis layanan yang Anda butuhkan</CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="flex bg-gray-100 rounded-full px-2 py-8 w-full">
            <TabsTrigger
              value="titip"
              className="px-2 py-6 rounded-full font-bold transition-colors cursor-pointer
                          data-[state=active]:bg-black
                          data-[state=active]:text-white
                          text-gray-600 hover:text-gray-900"
            >
              <Home className="w-4 h-4" />
              Titip Properti
            </TabsTrigger>

            <TabsTrigger
              value="cari"
              className="px-2 py-6 rounded-full font-bold transition-colors cursor-pointer
                          data-[state=active]:bg-black
                          data-[state=active]:text-white
                          text-gray-600 hover:text-gray-900"
            >
              <Search className="w-4 h-4" />
              Cari Properti
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Titip Properti Form */}
        <TabsContent value="titip" className="mt-6">
          <CardContent className="space-y-8">
            {/* Data Diri Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Data Diri</h3>
              </div>

              <div className="space-y-4 pl-1">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    ref={nameRef}
                    id="name"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={cn("h-11", errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm font-medium select-none">+62</span>
                    <Input id="phone" placeholder="898 7654 3210" value={formData.phone} onChange={(e) => handlePhoneInput(e.target.value)} maxLength={14} className="h-11 pl-10" />
                  </div>
                  <p className="text-xs text-gray-500">Format otomatis: +62 898 7654 3210</p>
                </div>
              </div>
            </div>

            {/* Data Properti Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Building className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Data Properti</h3>
              </div>

              <div className="space-y-5 pl-1">
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Status Kepemilikan <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={formData.ownershipStatus} onValueChange={(value) => updateField("ownershipStatus", value)}>
                    <div className="grid grid-cols-2 gap-4">
                      <Label htmlFor="pribadi" className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="pribadi" id="pribadi" />
                        <span className="flex-1">Pribadi</span>
                      </Label>
                      <Label htmlFor="orang-lain" className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="orang-lain" id="orang-lain" />
                        <span className="flex-1">Orang Lain</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-base font-medium">
                    Tipe Properti <span className="text-red-500">*</span>
                  </Label>
                  <InputPropertyType
                    value={formData.propertyType ? formatSlug(formData.propertyType) : undefined}
                    propertyTypes={propertyTypes}
                    style={"input"}
                    onChangeAction={(value, label) => updateField("propertyType", label)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Alamat Properti <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    ref={addressRef}
                    id="address"
                    placeholder="Isi alamat lengkap properti"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    rows={3}
                    className={cn("resize-none", errors.address && "border-red-500")}
                  />
                  {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-medium">
                      Kota Properti <span className="text-red-500">*</span>
                    </Label>
                    <InputCity style={"input"} enableAll={false} defaultCity={formData.city} onChange={(value) => updateField("city", value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-base font-medium">
                      Lokasi/Daerah <span className="text-red-500">*</span>
                    </Label>
                    <InputAreaConsignment style={"input"} enableAll={false} value={formData.area} onChange={(value) => updateField("area", value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications" className="text-base font-medium">
                    Spesifikasi Properti <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    ref={specificationsRef}
                    id="specifications"
                    placeholder="Contoh: rumah 2 lantai, luas tanah 300m², luas bangunan 250m², dsb"
                    value={formData.specifications}
                    onChange={(e) => updateField("specifications", e.target.value)}
                    rows={4}
                    className={cn("resize-none", errors.specifications && "border-red-500")}
                  />
                  {errors.specifications && <p className="text-red-500 text-xs">{errors.specifications}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base font-medium flex items-center gap-2">
                    Harga <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                    <Input id="price" placeholder="0" value={formData.price} onChange={(e) => handleCurrencyInput("price", e.target.value)} className="h-11 pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transactionType" className="text-base font-medium">
                    Jenis Transaksi <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.transactionType} onValueChange={(value) => updateField("transactionType", value)}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Pilih jenis transaksi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jual">Dijual</SelectItem>
                      <SelectItem value="Sewa">Disewa</SelectItem>
                      <SelectItem value="JualSewa">Jual/Sewa</SelectItem>
                      <SelectItem value="Lelang">Lelang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Apakah dijamin oleh bank? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={formData.bankGuaranteed} onValueChange={(value) => updateField("bankGuaranteed", value)}>
                    <div className="grid grid-cols-2 gap-4">
                      <Label htmlFor="ya" className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="ya" id="ya" />
                        <span className="flex-1">Ya, Dijaminkan</span>
                      </Label>
                      <Label htmlFor="tidak" className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="tidak" id="tidak" />
                        <span className="flex-1">Tidak Dijaminkan</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.bankGuaranteed === "ya" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Label htmlFor="bankName" className="text-base font-medium">
                      Nama Bank <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      ref={bankNameRef}
                      id="bankName"
                      placeholder="Isi nama bank"
                      value={formData.bankName}
                      onChange={(e) => updateField("bankName", e.target.value)}
                      className={cn("h-11", errors.bankName && "border-red-500")}
                    />
                    {errors.bankName && <p className="text-red-500 text-xs">{errors.bankName}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Catatan:</h4>
              <ol className="text-sm text-blue-800 leading-relaxed list-decimal px-4">
                <li className="mb-2">
                  Anda adalah Pemilik langsung Properti yang akan dititipkan di Brighton dan dengan ini menjamin bahwa Anda adalah pemilik yang sah atas Properti tersebut, dan/atau memang pihak yang
                  berwenang atas Properti tersebut. Anda menjamin dan menyatakan bahwa; tidak ada pihak lain yang ikut berhak dan/atau ikut memiliki Properti tersebut; serta Properti tersebut bebas
                  dari sitaan, dan tidak tersangkut dalam suatu perkara apapun.
                </li>
                <li>
                  Anda menjamin kebenaran informasi yang diberikan sehubungan dengan Properti tersebut dan setuju membebaskan Brighton dari segala tuntutan maupun kewajiban membayar ganti rugi apapun
                  yang diakibatkan oleh informasi yang tidak benar, tidak tepat, atau yang tidak diberikan oleh Anda.
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                <span className="font-semibold">*Dengan mengisi & mengirimkan data, Anda sudah langsung menyetujui </span>
                <a href="#" className="underline font-semibold">
                  syarat & ketentuan
                </a>
                <span className="font-semibold"> yang berlaku.</span>
              </p>
            </div>

            <Button onClick={handleSubmit} disabled={!isTitipFormValid()} size="xl" className="w-full bg-blue-300 hover:bg-blue-200 font-semibold text-blue-800 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              Kirim Data
            </Button>
          </CardContent>
        </TabsContent>

        {/* Cari Properti Form */}
        <TabsContent value="cari" className="mt-6">
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <User className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Data Diri</h3>
              </div>

              <div className="space-y-4 pl-1">
                <div className="space-y-2">
                  <Label htmlFor="name-cari" className="text-base font-medium flex items-center gap-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    ref={nameRef}
                    id="name-cari"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={cn("h-11", errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-cari" className="text-base font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm font-medium select-none">+62</span>
                    <Input id="phone-cari" placeholder="898 7654 3210" value={formData.phone} onChange={(e) => handlePhoneInput(e.target.value)} maxLength={14} className="h-11 pl-10" />
                  </div>
                  <p className="text-xs text-gray-500">Format otomatis: +62 898 7654 3210</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Search className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Data Properti</h3>
              </div>

              <div className="space-y-5 pl-1">
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Penggunaan Properti <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={formData.propertyUsage} onValueChange={(value) => updateField("propertyUsage", value)}>
                    <div className="grid grid-cols-2 gap-4">
                      <Label htmlFor="hunian" className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="hunian" id="hunian" />
                        <span className="flex-1">Untuk Hunian</span>
                      </Label>
                      <Label htmlFor="bisnis" className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="bisnis" id="bisnis" />
                        <span className="flex-1">Untuk Bisnis / Komersial</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="searchPropertyType" className="text-base font-medium">
                    Tipe Properti <span className="text-red-500">*</span>
                  </Label>
                  <InputPropertyType
                    value={formData.propertyType ? formData.searchPropertyType : undefined}
                    propertyTypes={propertyTypes}
                    style={"input"}
                    onChangeAction={(value, label) => updateField("searchPropertyType", label)}
                    enableAll={false}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="searchCity" className="text-base font-medium">
                      Kota Properti <span className="text-red-500">*</span>
                    </Label>
                    <InputCity style={"input"} enableAll={false} defaultCity={formData.searchCity} onChange={(value) => updateField("searchCity", value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="searchArea" className="text-base font-medium">
                      Lokasi/Daerah <span className="text-red-500">*</span>
                    </Label>
                    <InputAreaConsignment style={"input"} enableAll={false} value={formData.searchArea} onChange={(value) => updateField("searchArea", value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-base font-medium flex items-center gap-2">
                    Estimasi Budget <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                    <Input id="budget" placeholder="0" value={formData.budget} onChange={(e) => handleCurrencyInput("budget", e.target.value)} className="h-11 pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-base font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Ceritakan Kebutuhan Properti Anda <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    ref={requirementsRef}
                    id="requirements"
                    placeholder="Contoh: rumah 2 lantai, kamar tidur minimal 2, ada garasi, dekat area sekolah, tengah kota, dsb."
                    value={formData.requirements}
                    onChange={(e) => updateField("requirements", e.target.value)}
                    rows={5}
                    className={cn("resize-none", errors.requirements && "border-red-500")}
                  />
                  {errors.requirements && <p className="text-red-500 text-xs">{errors.requirements}</p>}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 leading-relaxed">
                <span className="font-semibold">*Dengan mengisi & mengirimkan data, Anda sudah langsung menyetujui </span>
                <a href="#" className="underline font-semibold">
                  syarat & ketentuan
                </a>
                <span className="font-semibold"> yang berlaku.</span>
              </p>
            </div>

            <Button onClick={handleSubmit} disabled={!isCariFormValid() || isSubmitting} size="xl" className="w-full h-12 bg-green-300 hover:bg-green-200 font-semibold text-green-800 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
              Kirim Data
            </Button>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
    <OTPPopup
      isPopupOpen={isOtpPopupOpen}
      setIsPopupOpen={setIsOtpPopupOpen}
      initialName={formData?.name ?? "-"}
      initialPhone={`0${formData.phone.replace(/\s/g, "")}`}
      onSuccess={handleSubmit}
      title={activeTab === "titip" ? "Titip Properti" : "Cari Properti" }
    />
    </>
  );
}
