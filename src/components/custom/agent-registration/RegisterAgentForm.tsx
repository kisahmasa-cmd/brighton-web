"use client";

import Link from "next/link";
import { useState } from "react";
import Stepper from "./Stepper";
import PersonalDataForm from "./PersonalDataForm";
import BackgroundForm from "./BackgroundForm";
import TermsConfirmDialog from "../TermsConfirmDialog";
import { GetAgentSearchData } from "../../../../types/get-agent-search-types";
import { useGoogleReCaptcha } from "@google-recaptcha/react";
import { agentRegistration } from "@/services/agent-register-service";
import { AgentRegistrationRequest } from "../../../../types/agent-registration-types";
import { toast } from "sonner";
import { base64ToBlob } from "../../../../utils/base64ToBlob";

interface RegisterAgentFormProps {
  termContent: string;
}

export type OnChangeInputType = string | boolean | File | GetAgentSearchData | undefined;

export interface RegisterAgentInputDataProps {
  fullName?: string;
  noWA?: string;
  email?: string;
  address?: string;
  ktpPhotoFile?: File;
  ktpPhoto?: string;
  instagram?: string;
  privateVehicle?: string;
  langEn?: string;
  langCn?: string;
  isOtherLangCheck?: boolean;
  otherLang?: string;
  usedWorkAtBank?: string;
  bankName?: string;
  knowBrighton?: string;
  eventName?: string;
  havePartner?: string;
  partnerName?: string;
  lastEducation?: string;
  lastEmployment?: string;
  lastCompanyName?: string;
  lastExperienceYears?: string;
  haveFamilyAtOtherCompany?: string;
  familyCompanyName?: string;
  familyAtBrighton?: GetAgentSearchData;
  familyAtBrightonError?: string;
  signature?: string;
}

const RegisterAgentForm: React.FC<RegisterAgentFormProps> = ({
  termContent,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isFirstFormValid, setIsFirstFormValid] = useState<boolean>(false);
  const [inputData, setInputData] = useState<RegisterAgentInputDataProps | null>(null);
  const [errors, setErrors] = useState<RegisterAgentInputDataProps | null>(null);
  const [isShowTerms, setIsShowTerms] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const googleReCaptcha = useGoogleReCaptcha();

  const handleInputChange = (field: keyof RegisterAgentInputDataProps, value: OnChangeInputType) => {
    setInputData({ ...inputData, [field]: value });
    setErrors({ ...errors, [field]: undefined });
  }

  const handleReset = () => {
    setIsFirstFormValid(false);
    setStep(1);
    setInputData(null);
    setErrors(null);
  }

  const handleBack = () => {
    setStep(1);
  };

  const handleFormSubmit = () => {
    if (step === 1) {
      // Personal data form submit
      setIsFirstFormValid(true);
      setStep(2);
    } else {
      // Background form submit
      setIsShowTerms(true);
    }
  };

  const handleConfirm = () => {
    setIsShowTerms(false);
    toast.promise(handleRegister(), {
      loading: 'Mendaftar...',
      success: 'Registrasi Berhasil!',
      error: (e) => `${e}`,
    });
  }

  const handleRedirectSuccess = (url?: string, name?: string) => {
    // openLinkForm(url);
    setTimeout(() => {
      redirectToSuccess(name);
    }, 1000);
  }

  const handleRegister = async () => {
    if (!googleReCaptcha.executeV3) {
      console.error('Google reCAPTCHA is not initialized');
      return;
    }
    const token = await googleReCaptcha.executeV3('action');

    const signatureBlob = base64ToBlob(inputData!.signature!);
    const signatureText = inputData!.signature!.split(",")[1];
    const signatureFile = new File([signatureBlob], 'signature.png', { type: 'image/png' });

    try {
      setIsSubmitting(true);
      const requestBody: AgentRegistrationRequest = {
        IsAgree: "1",
        Name2: inputData?.fullName ?? "",
        Phone: inputData?.noWA ?? "",
        Email: inputData?.email ?? "",
        AddressDomisili: inputData?.address ?? "",
        IDCard: inputData?.ktpPhotoFile,
        InstagramAccount: inputData?.instagram ?? "",
        LangEn: inputData?.langEn !== undefined ? inputData?.langEn === "Aktif" ? "active" : "passive" : "",
        LangCn: inputData?.langCn !== undefined ? inputData?.langCn === "Aktif" ? "active" : "passive" : "",
        LangOther: inputData?.otherLang ?? "",
        UsedWorkAtBank: inputData?.usedWorkAtBank ?? "",
        UsedWorkAtBankName: inputData?.bankName ?? "",
        MengenalBrighton: inputData?.knowBrighton === "Ya" ? "1" : "0",
        ReferenceCode: "",
        EventReference: inputData?.eventName ?? "",
        IsPunyaPasangan: inputData?.havePartner === "Ya" ? "1" : "0",
        NamaPasangan: inputData?.partnerName ?? "",
        LastEducation: inputData?.lastEducation ?? "",
        LatestEmployement: inputData?.lastEmployment ?? "",
        ExperienceCompany: inputData?.lastCompanyName ?? "",
        ExperienceDuration: inputData?.lastExperienceYears ?? "",
        IsPunyaSaudara: inputData?.haveFamilyAtOtherCompany === "Ya" ? "1" : "0",
        IsPunyaSaudaraOffice: inputData?.familyCompanyName ?? "",
        FamilyIsBrighton: inputData?.familyAtBrighton?.id.toString() ?? "",
        SumberInput: "FORM_WEB",
        HistoryWorkDataID: "0",
        "g-recaptcha-response": token,
        "signature_text": signatureText,
        signature: signatureFile,
      }
      const result = await agentRegistration(requestBody);
      if (result.Code === "200") {
        handleReset();
        handleRedirectSuccess(result.URL, result.AgentName);
        return true;
      } else {
        throw result.Message;
      }
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  }

  const redirectToSuccess = (name?: string) => {
    let url = "/registrasi/success";
    if (name !== undefined) {
      url += `?agent_name=${encodeURIComponent(name)}`;
    }
    window.location.href = url;
  }

  const openLinkForm = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank");
  }

  // buat pas di local ajah
  const autoNgisi = () => {
    if (process.env.NODE_ENV !== "development") return;
    const data: RegisterAgentInputDataProps = {
      fullName: "Test IT 21 1",
      noWA: "0812345678211",
      email: "testit211@example.com",
      address: "Jl. Test 123",
      instagram: "@testit211",
      privateVehicle: "Mobil",
      langEn: "Aktif",
      langCn: "Pasif",
      isOtherLangCheck: true,
      otherLang: "Korean",
      usedWorkAtBank: "Ya",
      bankName: "BCA",
      knowBrighton: "Event",
      eventName: "Brighton Day Online",
      havePartner: "Ya",
      partnerName: "Test Partner",
      lastEducation: "S1",
      lastEmployment: "Agen Properti Lain",
      lastCompanyName: "PT. Test Properti",
      lastExperienceYears: "3",
      haveFamilyAtOtherCompany: "Ya",
      familyCompanyName: "PT. Test Properti",
    }
    setInputData(data);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center" onDoubleClick={autoNgisi}>
        Bangun Bisnis Bersama Brighton
      </h1>
      <p className="text-center">
        Silakan isi data di bawah ini untuk melanjutkan tahap interview menjadi
        agen Brighton.
      </p>

      {/* Stepper */}
      <Stepper
        step={step}
        setStep={isSubmitting ? () => {} : setStep}
        isFirstFormValid={isFirstFormValid}
      />

      {/* Form 1 */}
      {step === 1 && (
        <PersonalDataForm
          inputData={inputData}
          onChangeInput={handleInputChange}
          errors={errors}
          onError={setErrors}
          onFormSubmit={handleFormSubmit}
          onReset={handleReset}
        />
      )}

      {/* Form 2 */}
      {step === 2 && (
        <BackgroundForm
          inputData={inputData}
          onChangeInput={handleInputChange}
          errors={errors}
          onError={setErrors}
          onFormSubmit={handleFormSubmit}
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      )}

      <TermsConfirmDialog content={termContent} isOpen={ isShowTerms } setIsOpen={setIsShowTerms} onConfirm={handleConfirm} />

      {/* Footer Text */}
      <p className="text-xs">
        <span>
          Catatan: Dengan menekan tombol “Submit Data”, berarti saya telah
          menyetujui{" "}
        </span>
        <Link
          href="/syarat-dan-ketentuan"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-blue-700 hover:underline font-semibold"
        >
          Syarat dan Ketentuan
        </Link>
        <span>
          , saya menerima dan menyetujui pemrosesan dan transfer data pribadi
          saya sesuai dengan ketentuan{" "}
        </span>
        <Link
          href="/kebijakan-privasi"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-blue-700 hover:underline font-semibold"
        >
          Kebijakan Privasi
        </Link>
      </p>
    </div>
  );
};

export default RegisterAgentForm;
