"use client";

import { Eye, EyeOff, Lock, X } from "lucide-react";
import { Label } from "../ui/label";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { RepairPasswordRequestBody } from "../../../types/auth-types";
import { repairPassword } from "@/services/auth-service";
import Link from "next/link";

interface RepairPasswordFormData {
  password?: string;
  confirmPassword?: string;
}

interface RepairPasswordFormProps {
  token: string;
}

const RepairPasswordForm: React.FC<RepairPasswordFormProps> = ({ token }) => {
  const [inputData, setInputData] = useState<RepairPasswordFormData | null>(null);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<RepairPasswordFormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hiddenRedirectLinkRef = useRef<HTMLAnchorElement>(null);

  const isPasswordValid = (): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(inputData?.password || "");
  };

  const isValid = () => {
    setErrors(null);
    let result = true;

    const newErrors: RepairPasswordFormData = {};

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
    toast.promise(handleRepairPassword(), {
      loading: "Memproses...",
      success: (m) => `${m}`,
      error: (e) => `${e}`,
    });
  };

  const handleRepairPassword = async () => {
    if (!inputData) throw new Error("Input data is required");
    setIsLoading(true);
    try {
      const request: RepairPasswordRequestBody = {
        Token: token,
        Password: inputData.password!,
      };
      const result = await repairPassword(request);

      if (result?.Message?.Code === 200) {
        setTimeout(() => {
          // redirect to login page
          if (hiddenRedirectLinkRef.current) {
            hiddenRedirectLinkRef.current.click();
          }
        }, 1000);
        reset();
        return result.Message.Text;
      } else {
        throw result?.Message?.Text;
      }
    } catch (e) {
      throw `${e}`;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setInputData(null);
    setErrors(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <Link ref={hiddenRedirectLinkRef} href="/visitor/login" className="hidden">
        redirect
      </Link>
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">Ubah Password</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password Baru</Label>
          <InputGroup className={cn("rounded-full overflow-hidden", errors?.password && "border-red-500")}>
            <InputGroupAddon>
              <Lock className="w-4 h-4" />
            </InputGroupAddon>
            <InputGroupInput
              type={isShowPassword ? "text" : "password"}
              id="password"
              placeholder="Masukkan password baru"
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
          <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
          <InputGroup className={cn("rounded-full overflow-hidden", errors?.confirmPassword && "border-red-500")}>
            <InputGroupAddon>
              <Lock className="w-4 h-4" />
            </InputGroupAddon>
            <InputGroupInput
              type={isShowConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Masukkan konfirmasi password baru"
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
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RepairPasswordForm;
