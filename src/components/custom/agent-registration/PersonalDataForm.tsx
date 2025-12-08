"use client";

import { Button } from "@/components/ui/button";
import {
  OnChangeInputType,
  RegisterAgentInputDataProps,
} from "./RegisterAgentForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMemo, useRef, useState } from "react";
import TextField from "./TextField";
import FieldWrapper from "./FieldWrapper";
import SelectField from "./SelectField";
import { Label } from "@/components/ui/label";
import RadioField from "./RadioField";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, Upload, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { toast } from "sonner";

interface PersonalDataFormProps {
  onChangeInput: (
    field: keyof RegisterAgentInputDataProps,
    value: OnChangeInputType,
  ) => void;
  inputData: RegisterAgentInputDataProps | null;
  errors: RegisterAgentInputDataProps | null;
  onError: (e: RegisterAgentInputDataProps) => void;
  onFormSubmit: () => void;
  onReset: () => void;
}

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  onChangeInput,
  inputData,
  errors,
  onError,
  onReset,
  onFormSubmit,
}) => {
  const [isOpenConfirmCancel, setIsOpenConfirmCancel] = useState(false);

  // input refs
  const fullNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const hiddenInputFileRef = useRef<HTMLInputElement>(null);
  const ktpPhotoButtonRef = useRef<HTMLButtonElement>(null);
  const instagramRef = useRef<HTMLInputElement>(null);
  const privateVehicleRef = useRef<HTMLButtonElement>(null);
  const usedWorkAtBankRef = useRef<HTMLButtonElement>(null);
  const bankNameRef = useRef<HTMLInputElement>(null);
  const knowBrightonRef = useRef<HTMLButtonElement>(null);
  const eventNameRef = useRef<HTMLButtonElement>(null);
  const havePartnerRef = useRef<HTMLButtonElement>(null);
  const partnerNameRef = useRef<HTMLInputElement>(null);

  const handleClickUploadButton = () => {
    hiddenInputFileRef.current?.click();
  };

  const isUploadValid = (f: File): boolean => {
    let result = true;
    let errorMessage = "";
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (!allowedTypes.includes(f.type)) {
      errorMessage =
        "Tipe file tidak valid. Hanya JPEG, JPG, dan PNG yang diizinkan.";
      result = false;
    } else if (f.size > maxSize) {
      errorMessage = "Ukuran file melebihi batas 3MB.";
      result = false;
    }

    if (!result) {
      onError({ ...errors, ktpPhoto: errorMessage });
      toast.error(errorMessage);
    }

    return result;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (!isUploadValid(file)) return;
      onChangeInput("ktpPhotoFile", file);
      onError({ ...errors, ktpPhoto: undefined });
    }
  };

  const handleRemovePhoto = () => {
    if (hiddenInputFileRef.current) hiddenInputFileRef.current.value = "";
    onChangeInput("ktpPhotoFile", undefined);
  };

  const handleReset = () => {
    onReset();
    setIsOpenConfirmCancel(false);
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

    // Nama lengkap tidak boleh hanya spasi
    if (inputData?.fullName?.trim() === "") {
      newErrors.fullName = onlySpacesMessage("Nama Lengkap");
      if (!firstError.ref) {
        firstError = { ref: fullNameRef, message: newErrors.fullName };
      }
      result = false;
    }

    // Alamat Domisili tidak boleh hanya spasi
    if (inputData?.address?.trim() === "") {
      newErrors.address = onlySpacesMessage("Alamat Domisili");
      if (!firstError.ref) {
        firstError = { ref: addressRef, message: newErrors.address };
      }
      result = false;
    }

    // Foto KTP tidak boleh kosong, silahkan upload foto KTP
    if (inputData?.ktpPhotoFile === undefined) {
      newErrors.ktpPhoto =
        "Foto KTP tidak boleh kosong, silahkan upload foto KTP Anda!";
      if (!firstError.ref) {
        firstError = { ref: ktpPhotoButtonRef, message: newErrors.ktpPhoto };
      }
      result = false;
    }

    // Akun Instagram tidak boleh hanya spasi
    if (inputData?.instagram !== "" && inputData?.instagram?.trim() === "") {
      newErrors.instagram = onlySpacesMessage("Akun Instagram");
      if (!firstError.ref) {
        firstError = { ref: instagramRef, message: newErrors.instagram };
      }
      result = false;
    }

    // Kendaraan Pribadi harus dipilih
    if (inputData?.privateVehicle === undefined) {
      newErrors.privateVehicle = notChoosedMessage("Kendaraan Pribadi");
      if (!firstError.ref) {
        firstError = {
          ref: privateVehicleRef,
          message: newErrors.privateVehicle,
        };
      }
      result = false;
    }

    // Aktif di Bank harus dipilih
    if (inputData?.usedWorkAtBank === undefined) {
      newErrors.usedWorkAtBank = notChoosedMessage("Aktif di Perbankan");
      if (!firstError.ref) {
        firstError = {
          ref: usedWorkAtBankRef,
          message: newErrors.usedWorkAtBank,
        };
      }
      result = false;
    }

    // Nama Bank tidak boleh hanya spasi
    if (
      inputData?.usedWorkAtBank === "Ya" &&
      inputData?.bankName?.trim() === ""
    ) {
      newErrors.bankName = onlySpacesMessage("Nama Bank");
      if (!firstError.ref) {
        firstError = { ref: bankNameRef, message: newErrors.bankName };
      }
      result = false;
    }

    // Tau Brighton harus dipilih
    if (inputData?.knowBrighton === undefined) {
      newErrors.knowBrighton = notChoosedMessage("Mengetahui Brighton");
      if (!firstError.ref) {
        firstError = {
          ref: knowBrightonRef,
          message: newErrors.knowBrighton,
        };
      }
      result = false;
    }

    // Event harus dipilih
    if (
      inputData?.knowBrighton === "Event" &&
      inputData?.eventName === undefined
    ) {
      newErrors.eventName = notChoosedMessage("Event");
      if (!firstError.ref) {
        firstError = { ref: eventNameRef, message: newErrors.eventName };
      }
      result = false;
    }

    // Punya Pasangan harus dipilih
    if (inputData?.havePartner === undefined) {
      newErrors.havePartner = notChoosedMessage("Punya Pasangan");
      if (!firstError.ref) {
        firstError = {
          ref: havePartnerRef,
          message: newErrors.havePartner,
        };
      }
      result = false;
    }

    // Nama pasangan tidak boleh hanya spasi
    if (
      inputData?.havePartner === "Ya" &&
      inputData?.partnerName?.trim() === ""
    ) {
      newErrors.partnerName = onlySpacesMessage("Nama Pasangan");
      if (!firstError.ref) {
        firstError = { ref: partnerNameRef, message: newErrors.partnerName };
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

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) return;
    onFormSubmit();
  };

  const photoPreview = useMemo(() => {
    const file = inputData?.ktpPhotoFile;
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [inputData?.ktpPhotoFile]);

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {/* Full Name */}
      <TextField<RegisterAgentInputDataProps>
        field="fullName"
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap"
        value={inputData?.fullName || ""}
        onChange={onChangeInput}
        errorText={errors?.fullName}
        minLength={3}
        ref={fullNameRef}
        required
      />
      {/* No WhatsApp */}
      <TextField<RegisterAgentInputDataProps>
        field="noWA"
        label="Nomor WhatsApp"
        placeholder="Masukkan nomor WhatsApp"
        value={inputData?.noWA || ""}
        onChange={(field, value) => {
          if (!value?.match(/^[0-9]*$/)) return;
          onChangeInput(field, value);
        }}
        errorText={errors?.noWA}
        inputMode="numeric"
        pattern="[0-9]*"
        minLength={10}
        maxLength={15}
        required
      />
      {/* Email */}
      <TextField<RegisterAgentInputDataProps>
        type="email"
        field="email"
        label="Email"
        placeholder="Masukkan email"
        value={inputData?.email || ""}
        onChange={onChangeInput}
        errorText={errors?.email}
        required
      />
      {/* Address */}
      <TextField<RegisterAgentInputDataProps>
        field="address"
        label="Alamat Domisili"
        placeholder="Masukkan alamat domisili"
        value={inputData?.address || ""}
        onChange={onChangeInput}
        errorText={errors?.address}
        ref={addressRef}
        required
      />
      {/* KTP Photo */}
      <FieldWrapper
        id="photo"
        label="Upload Foto KTP"
        errorText={errors?.ktpPhoto}
        required
      >
        {photoPreview && (
          <div className="relative inline-block">
            <Image
              src={photoPreview}
              alt="Preview"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-40 object-cover rounded-lg border-2 border-gray-300"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleRemovePhoto();
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-4">
          <input
            ref={hiddenInputFileRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            ref={ktpPhotoButtonRef}
            variant="secondary"
            className="rounded-full font-semibold flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleClickUploadButton();
            }}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Foto KTP</span>
          </Button>
          <p className="text-xs">
            Pastikan foto KTP Anda jelas, tidak buram, <br /> dan bukan fotokopi
            KTP
          </p>
        </div>
        <Alert>
          <Info />
          <AlertTitle>Catatan</AlertTitle>
          <AlertDescription className="text-sm">
            Note: Wajib untuk upload Foto KTP! <br />
            Jika tidak mohon maaf proses pendaftaran Anda tidak dapat kami
            proses
          </AlertDescription>
        </Alert>
      </FieldWrapper>
      {/* Instagram */}
      <TextField<RegisterAgentInputDataProps>
        field="instagram"
        label="Akun Instagram"
        placeholder="Contoh: @username"
        value={inputData?.instagram || ""}
        onChange={onChangeInput}
        errorText={errors?.instagram}
        ref={instagramRef}
      />
      {/* Private Vehicle */}
      <SelectField<RegisterAgentInputDataProps>
        field="privateVehicle"
        label="Punya Kendaraan Pribadi"
        options={["Tidak Ada", "Mobil", "Motor"]}
        value={inputData?.privateVehicle || ""}
        onChange={onChangeInput}
        errorText={errors?.privateVehicle}
        ref={privateVehicleRef}
        required
      />
      {/* Language */}
      <div className="space-y-2">
        <Label>Apakah Anda menguasai Bahasa Asing?</Label>
        <div className="space-y-4 border border-gray-200 rounded-lg p-4">
          <RadioField<RegisterAgentInputDataProps>
            field="langEn"
            label="English"
            options={["Aktif", "Pasif"]}
            value={inputData?.langEn || ""}
            onChange={onChangeInput}
            errorText={errors?.langEn}
          />
          <RadioField<RegisterAgentInputDataProps>
            field="langCn"
            label="Mandarin"
            options={["Aktif", "Pasif"]}
            value={inputData?.langCn || ""}
            onChange={onChangeInput}
            errorText={errors?.langCn}
          />
          <Label
            htmlFor="isOtherLangCheck"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              id="isOtherLangCheck"
              value="isOtherLangCheck"
              checked={inputData?.isOtherLangCheck || false}
              className="cursor-pointer"
              onCheckedChange={() =>
                onChangeInput("isOtherLangCheck", !inputData?.isOtherLangCheck)
              }
            />
            <span>Bahasa Asing Lain</span>
          </Label>
          {inputData?.isOtherLangCheck && (
            <TextField<RegisterAgentInputDataProps>
              field="otherLang"
              placeholder="Contoh: Korean, Deutsch, Thai, ..."
              value={inputData?.otherLang || ""}
              onChange={onChangeInput}
              errorText={errors?.otherLang}
            />
          )}
        </div>
      </div>
      {/* Active At Bank */}
      <SelectField<RegisterAgentInputDataProps>
        field="usedWorkAtBank"
        label="Apakah Anda Pernah Aktif di dalam Dunia Perbankan?"
        options={["Ya", "Tidak"]}
        value={inputData?.usedWorkAtBank || ""}
        onChange={onChangeInput}
        errorText={errors?.usedWorkAtBank}
        ref={usedWorkAtBankRef}
        required
      />
      {/* Bank Name */}
      {inputData?.usedWorkAtBank === "Ya" && (
        <TextField<RegisterAgentInputDataProps>
          field="bankName"
          label="Nama Bank"
          placeholder="Contoh: BCA, BRI, Mandiri, ..."
          value={inputData?.bankName || ""}
          onChange={onChangeInput}
          errorText={errors?.bankName}
          ref={bankNameRef}
          required
        />
      )}
      {/* Know Brighton */}
      <SelectField<RegisterAgentInputDataProps>
        field="knowBrighton"
        label="Mengetahui Brighton Dari"
        options={[
          "Event",
          "Banner Brighton",
          "Kenalan Tim Brighton",
          "Instagram",
          "Youtube",
          "Facebook",
          "Tiktok",
        ]}
        value={inputData?.knowBrighton || ""}
        onChange={onChangeInput}
        errorText={errors?.knowBrighton}
        ref={knowBrightonRef}
        required
      />
      {/* Event Name */}
      {inputData?.knowBrighton === "Event" && (
        <SelectField<RegisterAgentInputDataProps>
          field="eventName"
          label="Event"
          options={["Brighton Day Online", "Brighton Day Offline/Onsite"]}
          value={inputData?.eventName || ""}
          onChange={onChangeInput}
          errorText={errors?.eventName}
          required
        />
      )}
      {/* Have Partner */}
      <SelectField<RegisterAgentInputDataProps>
        field="havePartner"
        label="Apakah ada pasangan (suami/istri) yang bergabung di Brighton?"
        options={["Ya", "Tidak"]}
        value={inputData?.havePartner || ""}
        onChange={onChangeInput}
        errorText={errors?.havePartner}
        ref={havePartnerRef}
        required
      />
      {/* Partner Name */}
      {inputData?.havePartner === "Ya" && (
        <TextField<RegisterAgentInputDataProps>
          field="partnerName"
          label="Nama Pasangan"
          placeholder="Masukkan nama pasangan"
          value={inputData?.partnerName || ""}
          onChange={onChangeInput}
          errorText={errors?.partnerName}
          ref={partnerNameRef}
          required
        />
      )}
      {/* Buttons */}
      <div className="flex gap-4">
        {/* Reset Button */}
        <Dialog
          open={isOpenConfirmCancel}
          onOpenChange={setIsOpenConfirmCancel}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full font-semibold">
              Batalkan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Batal?</DialogTitle>
              <DialogDescription>
                Apa Anda yakin ingin membatalkan pendaftaran?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-full font-semibold"
                >
                  Tidak
                </Button>
              </DialogClose>
              <Button
                onClick={handleReset}
                className="rounded-full font-semibold"
              >
                Ya, batalkan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Next Button */}
        <Button
          type="submit"
          className="flex-1 w-full rounded-full font-semibold"
        >
          Lanjutkan
        </Button>
      </div>
    </form>
  );
};

export default PersonalDataForm;
