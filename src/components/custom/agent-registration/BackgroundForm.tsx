"use client";

import { Button } from "@/components/ui/button";
import {
  OnChangeInputType,
  RegisterAgentInputDataProps,
} from "./RegisterAgentForm";
import SelectField from "./SelectField";
import FieldWrapper from "./FieldWrapper";
import { useMemo, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import SignatureDialog from "./SignatureDialog";
import TextField from "./TextField";
import GetAgentField from "./GetAgentField";
import { toast } from "sonner";

interface BackgroundFormProps {
  onChangeInput: (
    field: keyof RegisterAgentInputDataProps,
    value: OnChangeInputType,
  ) => void;
  inputData: RegisterAgentInputDataProps | null;
  errors: RegisterAgentInputDataProps | null;
  onError: (e: RegisterAgentInputDataProps) => void;
  onFormSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const BackgroundForm: React.FC<BackgroundFormProps> = ({
  onChangeInput,
  inputData,
  errors,
  onError,
  onFormSubmit,
  onBack,
  isSubmitting,
}) => {
  // input refs
  const lastEducationRef = useRef<HTMLButtonElement>(null);
  const lastEmploymentRef = useRef<HTMLButtonElement>(null);
  const lastCompanyNameRef = useRef<HTMLInputElement>(null);
  const haveFamilyAtOtherCompanyRef = useRef<HTMLButtonElement>(null);
  const familyCompanyNameRef = useRef<HTMLInputElement>(null);
  const familyAtBrightonRef = useRef<HTMLButtonElement>(null);
  const signatureRef = useRef<HTMLButtonElement>(null);

  const handleBack = () => {
    onBack();
  };

  const isValid = (): boolean => {
    let result = true;
    let firstError: {
      ref?: React.RefObject<HTMLInputElement | HTMLButtonElement | null>;
      message?: string;
    } = {};
    const newErrors: RegisterAgentInputDataProps = {};

    const onlySpacesMessage = (label: string) =>
      `${label} tidak boleh hanya spasi!`;

    const notChoosedMessage = (label: string) =>
      `${label} harus dipilih salah satu!`;

    // Pendidikan Terakhir harus dipilih
    if (inputData?.lastEducation === undefined) {
      newErrors.lastEducation = notChoosedMessage("Pendidikan Terakhir");
      if (!firstError.ref) {
        firstError = {
          ref: lastEducationRef,
          message: newErrors.lastEducation,
        };
      }
      result = false;
    }

    // Pekerjaan Sebelumnya harus dipilih
    if (inputData?.lastEmployment === undefined) {
      newErrors.lastEmployment = notChoosedMessage("Pekerjaan Sebelumnya");
      if (!firstError.ref) {
        firstError = {
          ref: lastEmploymentRef,
          message: newErrors.lastEmployment,
        };
      }
      result = false;
    }

    if (inputData?.lastEmployment === "Agen Properti Lain") {
      // Nama Perusahaan tidak boleh hanya spasi
      if (inputData?.lastCompanyName?.trim() === "") {
        newErrors.lastCompanyName = onlySpacesMessage("Nama Perusahaan");
        if (!firstError.ref) {
          firstError = {
            ref: lastCompanyNameRef,
            message: newErrors.lastCompanyName,
          };
        }
        result = false;
      }

      // Punya Keluarga dari Agen Properti Lain harus dipilih
      if (inputData?.haveFamilyAtOtherCompany === undefined) {
        newErrors.haveFamilyAtOtherCompany = notChoosedMessage(
          "Punya Keluarga dari Agen Properti Lain",
        );
        if (!firstError.ref) {
          firstError = {
            ref: haveFamilyAtOtherCompanyRef,
            message: newErrors.haveFamilyAtOtherCompany,
          };
        }
        result = false;
      }

      // Nama kantor Properti tidak boleh hanya spasi
      if (
        inputData?.haveFamilyAtOtherCompany === "Ya" &&
        inputData?.familyCompanyName?.trim() === ""
      ) {
        newErrors.familyCompanyName = onlySpacesMessage("Nama Kantor Properti");
        if (!firstError.ref) {
          firstError = {
            ref: familyCompanyNameRef,
            message: newErrors.familyCompanyName,
          };
        }
        result = false;
      }
    }

    // Tanda Tangan tidak boleh kosong
    if (inputData?.signature === undefined) {
      newErrors.signature = "Tanda Tangan harus diisi!";
      if (!firstError.ref) {
        firstError = { ref: signatureRef, message: newErrors.signature };
      }
      result = false;
    }

    if (!result) {
      onError(newErrors);
      if (firstError.ref?.current) {
        firstError.ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstError.ref.current.focus();
      }
      if (firstError.message) {
        toast.error(firstError.message);
      }
    }

    return result;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) return;
    onFormSubmit();
  };

  const previewSignature = useMemo(() => {
    const signature = inputData?.signature;
    if (!signature) return null;
    return signature;
  }, [inputData?.signature]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Last Education */}
      <SelectField<RegisterAgentInputDataProps>
        field="lastEducation"
        label="Pendidikan Terakhir"
        options={["SMA", "D3", "S1", "S2", "S3"]}
        value={inputData?.lastEducation || ""}
        onChange={onChangeInput}
        errorText={errors?.lastEducation}
        ref={lastEducationRef}
        disabled={isSubmitting}
        required
      />
      {/* Last Employment */}
      <SelectField<RegisterAgentInputDataProps>
        field="lastEmployment"
        label="Pekerjaan Anda Sebelumnya"
        options={[
          "Ibu Rumah Tangga",
          "Fresh Graduate",
          "Karyawan Swasta",
          "Wiraswasta",
          "Pensiunan",
          "Freelancer",
          "Agen Properti Lain",
          "Lain-lain",
        ]}
        value={inputData?.lastEmployment || ""}
        onChange={onChangeInput}
        errorText={errors?.lastEmployment}
        ref={lastEmploymentRef}
        disabled={isSubmitting}
        required
      />
      {/* Show if lastEmployment is Agen Properti Lain */}
      {inputData?.lastEmployment === "Agen Properti Lain" && (
        <div className="space-y-4">
          {/* Last Company Name */}
          <TextField<RegisterAgentInputDataProps>
            field="lastCompanyName"
            label="Nama Perusahaan Sebelumnya"
            placeholder="Masukkan nama perusahaan sebelumnya"
            value={inputData?.lastCompanyName || ""}
            onChange={onChangeInput}
            errorText={errors?.lastCompanyName}
            ref={lastCompanyNameRef}
            disabled={isSubmitting}
            required
          />
          {/* Last Experience Years */}
          <TextField<RegisterAgentInputDataProps>
            type="number"
            field="lastExperienceYears"
            label="Masa Kerja"
            placeholder="Masukkan berapa tahun masa kerja"
            value={inputData?.lastExperienceYears || ""}
            onChange={(field, value) => {
              if (!value?.match(/^[0-9]*$/) && value !== undefined) return;
              onChangeInput(field, value);
            }}
            errorText={errors?.lastExperienceYears}
            inputMode="numeric"
            pattern="[0-9]*"
            suffixText="tahun"
            max={40}
            disabled={isSubmitting}
            required
          />
          {/* Have Family At Other Company */}
          <SelectField<RegisterAgentInputDataProps>
            field="haveFamilyAtOtherCompany"
            label="Apakah Anda Mempunyai Pasangan/Keluarga dari Agen Properti Lain?"
            options={["Ya", "Tidak"]}
            value={inputData?.haveFamilyAtOtherCompany || ""}
            onChange={onChangeInput}
            errorText={errors?.haveFamilyAtOtherCompany}
            ref={haveFamilyAtOtherCompanyRef}
            disabled={isSubmitting}
            required
          />
          {/* Family Company Name */}
          {inputData?.haveFamilyAtOtherCompany === "Ya" && (
            <TextField<RegisterAgentInputDataProps>
              field="familyCompanyName"
              label="Jika Iya, Kantor Properti Apa?"
              placeholder="Masukkan nama kantor properti"
              value={inputData?.familyCompanyName || ""}
              onChange={onChangeInput}
              errorText={errors?.familyCompanyName}
              ref={familyCompanyNameRef}
              disabled={isSubmitting}
              required
            />
          )}
          {/* Family At Brighton */}
          <GetAgentField
            selected={inputData?.familyAtBrighton}
            onChange={(value) => onChangeInput("familyAtBrighton", value)}
            ref={familyAtBrightonRef}
            errorText={errors?.familyAtBrightonError}
            disabled={isSubmitting}
          />
        </div>
      )}
      {/* Signature */}
      <FieldWrapper
        id="signature"
        label="Tanda Tangan"
        errorText={errors?.signature}
        required
      >
        {previewSignature && (
          <div className="relative inline-block">
            <Image
              src={previewSignature}
              alt="Signature"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
            />
            {!isSubmitting && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onChangeInput("signature", undefined);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}

          </div>
        )}
        <SignatureDialog
          fullName={inputData?.fullName ?? "-"}
          onChangeSignature={(value) => onChangeInput("signature", value)}
          ref={signatureRef}
          disabled={isSubmitting}
        />
      </FieldWrapper>
      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="rounded-full font-semibold"
          disabled={isSubmitting}
        >
          Kembali
        </Button>
        <Button
          type="submit"
          className="flex-1 w-full rounded-full font-semibold"
          disabled={isSubmitting}
        >
          Submit Data
        </Button>
      </div>
    </form>
  );
};

export default BackgroundForm;
