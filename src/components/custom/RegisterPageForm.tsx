"use client";

import { Eye, EyeOff, Lock, Mail, User, X } from "lucide-react";
import { Label } from "../ui/label";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LoginRequestBody, RegisterRequestBody } from "../../../types/auth-types";
import { login, register } from "@/services/auth-service";
import TermsConfirmDialog from "./TermsConfirmDialog";
import { setServerToken } from "@/actions/token-action";

interface RegisterFormData {
  name?: string;
  email?: string;
  noWA?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegisterPageFormProps {
  termContent: string;
}

const RegisterPageForm: React.FC<RegisterPageFormProps> = ({ termContent }) => {
  const [inputData, setInputData] = useState<RegisterFormData | null>(null);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegisterFormData | null>(null);
  const [isShowTerms, setIsShowTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeNoWA = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(/^[0-9]*$/)) return;
    setInputData({ ...inputData, noWA: e.target.value });
    setErrors({ ...errors, noWA: undefined });
  };

  const isPasswordValid = (): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(inputData?.password || "");
  };

  const isValid = () => {
    setErrors(null);
    let result = true;

    const onlySpacesMessage = (label: string) => `${label} tidak boleh hanya spasi!`;

    const newErrors: RegisterFormData = {};

    if (inputData?.name?.trim() === "") {
      result = false;
      newErrors.name = onlySpacesMessage("Nama");
    }
    if (!isPasswordValid()) {
      result = false;
      newErrors.password = "Password minimal 8 karakter mengandung 1 huruf besar, 1 huruf kecil dan 1 angka.";
    }
    if (inputData?.password !== inputData?.confirmPassword) {
      result = false;
      newErrors.confirmPassword = "Password tidak cocok!";
    }
    setErrors({ ...errors, ...newErrors });
    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) return;
    setIsShowTerms(true);
  };

  const handleConfirmRegister = async () => {
    setIsShowTerms(false);
    toast.promise(handleRegister(), {
      loading: "Mendaftar...",
      success: "Registrasi berhasil!",
      error: (e) => `${e}`,
    });
  };

  const handleRegister = async () => {
    if (!inputData) throw new Error("Input data is required");
    setIsLoading(true);
    try {
      const request: RegisterRequestBody = {
        Name: inputData.name!,
        Email: inputData.email!,
        Phone: inputData.noWA!,
        Password: inputData.password!,
      };
      const result = await register(request);

      if (result?.Message?.Code === 201) {
        setTimeout(() => {
          toast.promise(handleAutoLogin(), {
            loading: "Login otomatis...",
            success: "Login berhasil!",
            error: (e) => `${e}`,
          });
        }, 1000);
        return true;
      } else {
        throw result?.Message?.Text;
      }
    } catch (e) {
      throw `${e}`;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoLogin = async () => {
    try {
      if (!inputData) throw new Error("Input data is required");

      const request: LoginRequestBody = {
        User: inputData.email!,
        Password: inputData.password!,
      };
      const result = await login(request);

      if (result.Data) {
        setInputData(null);
        if (result.AccessToken) {
          await setServerToken(result.AccessToken);
        }
        setTimeout(() => {
          window.location.href = "/visitor";
        }, 1000);
        return true;
      } else {
        throw result?.Message?.Text;
      }
    } catch (e) {
      throw `${e}`;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">Registrasi</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <InputGroup className={cn("rounded-full overflow-hidden", errors?.name && "border-red-500")}>
            <InputGroupAddon>
              <User className="w-4 h-4" />
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              id="name"
              placeholder="Masukkan nama lengkap"
              value={inputData?.name || ""}
              onChange={(e) => {
                setInputData({ ...inputData, name: e.target.value });
                setErrors({ ...errors, name: undefined });
              }}
              disabled={isLoading}
              required
            />
            {inputData?.name && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => {
                    setInputData({ ...inputData, name: undefined });
                    setErrors({ ...errors, name: undefined });
                  }}
                  className="rounded-full"
                  tabIndex={-1}
                >
                  <X className="w-4 h-4" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors?.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <InputGroup className={cn("rounded-full overflow-hidden", errors?.email && "border-red-500")}>
            <InputGroupAddon>
              <Mail className="w-4 h-4" />
            </InputGroupAddon>
            <InputGroupInput
              type="email"
              id="email"
              placeholder="Masukkan email"
              value={inputData?.email || ""}
              onChange={(e) => {
                setInputData({ ...inputData, email: e.target.value });
                setErrors({ ...errors, email: undefined });
              }}
              disabled={isLoading}
              required
            />
            {inputData?.email && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => {
                    setInputData({ ...inputData, email: undefined });
                    setErrors({ ...errors, email: undefined });
                  }}
                  className="rounded-full"
                  tabIndex={-1}
                >
                  <X className="w-4 h-4" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors?.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="nowa">Nomor WhatsApp</Label>
          <InputGroup className={cn("rounded-full overflow-hidden", errors?.noWA && "border-red-500")}>
            <InputGroupAddon>
              <div className="w-4 h-4 bg-gray-500 mask-[url(/whatsapp.svg)] mask-no-repeat mask-center mask-contain" />
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              id="nowa"
              placeholder="Masukkan nomor WhatsApp"
              value={inputData?.noWA || ""}
              onChange={handleChangeNoWA}
              inputMode="numeric"
              pattern="[0-9]*"
              disabled={isLoading}
              required
            />
            {inputData?.noWA && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => {
                    setInputData({ ...inputData, noWA: undefined });
                    setErrors({ ...errors, noWA: undefined });
                  }}
                  className="rounded-full"
                  tabIndex={-1}
                >
                  <X className="w-4 h-4" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors?.noWA && <p className="text-red-500 text-xs">{errors.noWA}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <InputGroup className={cn("rounded-full overflow-hidden", errors?.password && "border-red-500")}>
            <InputGroupAddon>
              <Lock className="w-4 h-4" />
            </InputGroupAddon>
            <InputGroupInput
              type={isShowPassword ? "text" : "password"}
              id="password"
              placeholder="Masukkan password"
              value={inputData?.password || ""}
              onChange={(e) => {
                setInputData({ ...inputData, password: e.target.value });
                setErrors({ ...errors, password: undefined });
              }}
              minLength={8}
              disabled={isLoading}
              required
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton onClick={() => setIsShowPassword(!isShowPassword)} className="rounded-full" tabIndex={-1}>
                {isShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </InputGroupButton>
            </InputGroupAddon>
            {inputData?.password && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => {
                    setInputData({ ...inputData, password: undefined });
                    setErrors({ ...errors, password: undefined });
                  }}
                  className="rounded-full"
                  tabIndex={-1}
                >
                  <X className="w-4 h-4" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors?.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <InputGroup className={cn("rounded-full overflow-hidden", errors?.confirmPassword && "border-red-500")}>
            <InputGroupAddon>
              <Lock className="w-4 h-4" />
            </InputGroupAddon>
            <InputGroupInput
              type={isShowConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Masukkan konfirmasi password"
              value={inputData?.confirmPassword || ""}
              onChange={(e) => {
                setInputData({ ...inputData, confirmPassword: e.target.value });
                setErrors({ ...errors, confirmPassword: undefined });
              }}
              minLength={8}
              disabled={isLoading}
              required
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} className="rounded-full" tabIndex={-1}>
                {isShowConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </InputGroupButton>
            </InputGroupAddon>
            {inputData?.confirmPassword && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => {
                    setInputData({ ...inputData, confirmPassword: undefined });
                    setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  className="rounded-full"
                  tabIndex={-1}
                >
                  <X className="w-4 h-4" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {errors?.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>
        <Button type="submit" variant="default" size="lg" className="mt-2 rounded-full w-full font-semibold text-lg" disabled={isLoading}>
          Registrasi
        </Button>
      </form>
      <TermsConfirmDialog content={termContent} isOpen={isShowTerms} setIsOpen={setIsShowTerms} onConfirm={handleConfirmRegister} />
      {/* Links */}
      <div className="flex flex-col items-center gap-2">
        <Link href="/" className="hover:text-gray-900 hover:underline font-semibold text-sm">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
};

export default RegisterPageForm;
