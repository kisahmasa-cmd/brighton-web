"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "../ui/label";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { sendOTPCode, verifyOTPCode } from "@/services/otp-service";
import {
  OtpSendCodeParams,
  OtpVerifyCodeParams,
} from "../../../types/otp-types";
import { useRouter } from "next/navigation";
import { setServerToken } from "@/actions/token-action";
import { useUser } from "./UserContext";
import { tokenVerify } from "@/services/token-service/token-verify-service";
import { manageUserInfoCookie } from "@/actions/user-action";

// ==================== OTP Timer Component ====================
interface OTPTimerProps {
  isRunning: boolean;
  onTimerEnd: () => void;
  resetSeconds?: number;
}

const OTPTimer: React.FC<OTPTimerProps> = ({
  isRunning,
  onTimerEnd,
  resetSeconds = 119,
}) => {
  const [timeLeft, setTimeLeft] = useState(resetSeconds);
  const intervalRef = useRef<number | null>(null);

  // Reset timer ketika isRunning berubah menjadi true
  useEffect(() => {
    if (isRunning) {
      setTimeLeft(resetSeconds);
    }
  }, [isRunning, resetSeconds]);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Separate effect untuk handle timer end
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      onTimerEnd();
      setTimeLeft(resetSeconds);
    }
  }, [timeLeft, isRunning, onTimerEnd, resetSeconds]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${m}:${ss.toString().padStart(2, "0")}`;
  };

  if (!isRunning) return null;

  return <span>Waktu tersisa: {formatTime(timeLeft)}</span>;
};

// ==================== OTP Popup Component ====================
interface OTPPopupProps {
  title: string;
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
  agentID?: number;
  onSuccess: () => void;
  initialName?: string;
  initialPhone?: string;
}

const OTPPopup: React.FC<OTPPopupProps> = ({
  title,
  isPopupOpen,
  setIsPopupOpen,
  onSuccess,
  initialName,
  initialPhone,
}) => {
  const user = useUser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userID, setUserID] = useState<string>(user?.UserID ?? "");

  const router = useRouter();

  function handleOpenDialog(isOpen: boolean) {
    // if (!isOpen) reset();
    setIsPopupOpen(isOpen);
  }

  function handleTimerEnd() {
    setIsTimerRunning(false);
    setOtpCode("");
  }

  function validation(): string {
    const trimmedName = name.trim();
    if (!trimmedName) return "Nama tidak boleh kosong";

    const cleanedPhone = phone.replace(/\D/g, "");
    if (!cleanedPhone || cleanedPhone.length < 10 || cleanedPhone.length > 15)
      return "Nomor telepon harus 10-15 digit";

    if ((!otpCode || otpCode.length !== 4) && isTimerRunning)
      return "Kode verifikasi harus 4 digit";

    return "ok";
  }

  function handleSendCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(sendOtp(), {
      loading: "Mengirim kode...",
      success: "Kode Verifikasi sudah dikirim!",
      error: (e) => e,
    });
  }

  async function sendOtp() {
    try {
      const valid = validation();
      if (valid !== "ok") throw new Error(valid);

      const param: OtpSendCodeParams = {
        UserID: user?.UserID,
        Name: name,
        Phone: phone,
      };
      const result = await sendOTPCode(param);
      if (!result.Data) {
        throw new Error("Gagal mengirim kode verifikasi!");
      }

      setUserID(result.Data.UserID);
      setIsTimerRunning(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }

  function handleKeyDownVerify(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  }

  async function handleSubmit() {
    setIsLoading(true);

    toast.promise(verifyOTP(), {
      loading: "Mengverifikasi kode...",
      success: "Verifikasi Kode OTP berhasil!",
      error: (e) => e,
    });
  }

  async function verifyOTP() {
    try {
      const valid = validation();
      if (valid !== "ok") {
        throw new Error(valid);
      }

      const param: OtpVerifyCodeParams = {
        UserID: userID,
        OTP: otpCode,
      };

      const result = await verifyOTPCode(param);

      if (!result.Data) {
        throw new Error("Gagal verifikasi kode");
      }

      if (result.AccessToken) {
        await setServerToken(result.AccessToken);
        const verifyResult = await tokenVerify();
        await manageUserInfoCookie(verifyResult);
      }

      reset();
      setTimeout(() => {
        onSuccess();
        router.refresh();
      }, 1000);
      return true;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  function reset() {
    setName("");
    setPhone("");
    setOtpCode("");
    setIsTimerRunning(false);
    setIsLoading(false);
    setIsPopupOpen(false);
  }

  useEffect(() => {
    setName(user?.Name ?? initialName ?? "");
    setPhone(user?.Phone ?? initialPhone ?? "");
  }, [user, initialName, initialPhone]);

  return (
    <Dialog open={isPopupOpen} onOpenChange={handleOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className={cn(
            "border-t border-gray-200 pt-4 flex flex-col gap-3",
            isTimerRunning && "border-b pb-4",
          )}
        >
          <p>
            Untuk dapat menghubungi agen silakan Login atau kirim Kode
            Verifikasi terlebih dahulu
          </p>
          <form onSubmit={handleSendCode} className="space-y-3">
            <div>
              <Input
                type="text"
                placeholder="Nama Anda"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading || user?.Name !== undefined}
              />
            </div>
            <div className="flex flex-row gap-4">
              <Input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Nomor Telepon"
                className="flex-1"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(value);
                }}
                required
                disabled={isLoading}
                readOnly={isTimerRunning}
              />
              <Button
                type="submit"
                className="rounded-full font-semibold"
                disabled={isTimerRunning || isLoading}
              >
                Kirim Kode
              </Button>
            </div>
          </form>
          <div className="flex flex-col gap-2">
            <Label htmlFor="otpInput" className="text-base self-start">
              Masukkan Kode Verifikasi:
            </Label>
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              id="otpInput"
              className="w-full flex"
              disabled={isLoading}
              readOnly={isLoading}
              value={otpCode}
              onChange={(value) => setOtpCode(value)}
              onKeyDown={handleKeyDownVerify}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <InputOTPGroup key={index} className="flex-1">
                  <InputOTPSlot
                    index={index}
                    className="w-full"
                    inputMode="numeric"
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
            <p className="text-xs">
              Periksa kotak masuk WA Anda.{" "}
              <OTPTimer
                isRunning={isTimerRunning}
                onTimerEnd={handleTimerEnd}
              />
            </p>
          </div>
        </div>
        {isTimerRunning && (
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="font-semibold"
                disabled={isLoading}
              >
                Batal
              </Button>
            </DialogClose>

            <Button
              type="button"
              className="font-semibold"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Verifikasi Kode
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OTPPopup;
