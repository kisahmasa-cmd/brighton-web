"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Edit2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { OtpSendCodeParams, OtpVerifyCodeParams } from "../../../types/otp-types";
import { sendOTPCode, verifyOTPCode } from "@/services/otp-service";
import { UserData } from "../../../types/user-types";
import { setServerToken } from "@/actions/token-action";
import { useRouter } from "next/navigation";

interface VerificationPhoneFormProps {
  user: UserData;
}

const VerificationPhoneForm: React.FC<VerificationPhoneFormProps> = ({
  user,
}) => {
  const [stateWANumber, setStateWANumber] = useState<string>(user.Phone);
  const [isShowChangeNumber, setIsShowChangeNumber] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLoadingSendOtp, setIsLoadingSendOtp] = useState(false);

  const router = useRouter();

  const handleSendOtp = async (waNumber: string) => {
    try {
      setIsLoadingSendOtp(true);
      const param: OtpSendCodeParams = {
        UserID: user.UserID,
        Phone: waNumber,
      };
      const result = await sendOTPCode(param);
      if (!result) {
        throw "Gagal mengirim kode verifikasi!";
      }

      setStateWANumber(waNumber);
      setIsTimerRunning(true);
      setIsShowChangeNumber(false);
    } catch (e) {
      toast.error(`${e}`);
    } finally {
      setIsLoadingSendOtp(false);
    }
  };

  const handleTimerEnd = () => {
    setIsTimerRunning(false);
    setOtpCode("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleVerify();
  };

  const handleKeyDownVerify = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleVerify();
    }
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      if (otpCode.length < 4) {
        throw "Kode verifikasi harus 4 digit";
      }
      const param: OtpVerifyCodeParams = {
        UserID: user.UserID,
        OTP: otpCode,
      };
      const result = await verifyOTPCode(param);

      if (!result.Data) {
        throw "Gagal verifikasi kode";
      }

      if (result.AccessToken) {
        await setServerToken(result.AccessToken);
      }

      router.refresh();
    } catch (e) {
      toast.error(`${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSendOtp(stateWANumber);
  }, []);

  if (isShowChangeNumber) {
    return (
      <ChangeNumberForm
        setIsShowChangeNumber={setIsShowChangeNumber}
        handleSendOtp={handleSendOtp}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center">
          Masukkan Kode Verifikasi
        </h1>
        <p className="text-center">
          Kami telah mengirimkan kode verifikasi ke nomor:
        </p>
        <p className="text-center px-4 py-2 rounded-md bg-info/20 text-lg font-semibold">
          {stateWANumber}
        </p>
        {!isTimerRunning && (
          <Button
            variant="ghost"
            onClick={() => setIsShowChangeNumber(true)}
            disabled={isTimerRunning}
            className="flex items-center gap-2 font-semibold rounded-full text-blue-600 hover:text-blue-700"
          >
            <Edit2 className="w-4 h-4" />
            <span>Nomor salah? Ganti nomor</span>
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-80 space-y-2">
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
                className="w-full text-xl font-semibold"
                inputMode="numeric"
              />
            </InputOTPGroup>
          ))}
        </InputOTP>
        <Button
          size="xl"
          type="submit"
          disabled={isLoading || !isTimerRunning}
          className="w-full rounded-full font-semibold text-lg"
        >
          {isLoading ? "Verifikasi..." : "Verifikasi"}
        </Button>
      </form>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm">Tidak menerima kode?</p>
        {isTimerRunning ? (
          <p>
            Tunggu{" "}
            <span className="font-bold text-lg">
              <OTPTimer
                isRunning={isTimerRunning}
                onTimerEnd={handleTimerEnd}
              />
            </span>{" "}
            untuk kirim ulang
          </p>
        ) : (
          <Button
            variant="outline"
            onClick={() => handleSendOtp(stateWANumber)}
            className="font-semibold rounded-full"
            disabled={isLoadingSendOtp}
          >
            Kirim Ulang Kode
          </Button>
        )}
      </div>
    </div>
  );
};

interface ChangeNumberProps {
  setIsShowChangeNumber: (value: boolean) => void;
  handleSendOtp: (waNumber: string) => Promise<void>;
}

const ChangeNumberForm = ({
  setIsShowChangeNumber,
  handleSendOtp,
}: ChangeNumberProps) => {
  const [newWANumber, setNewWANumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeNoWA = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.match(/^[0-9]*$/)) return;
    setNewWANumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleSendOtp(newWANumber).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center">Ganti Nomor WhatsApp</h1>
        <p className="text-center">
          Masukkan nomor WhatsApp baru untuk menerima kode verifikasi
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-72"
      >
        <Input
          type="text"
          placeholder="Masukkan Nomor WhatsApp"
          value={newWANumber}
          onChange={handleChangeNoWA}
          className="w-full rounded-full text-center"
          inputMode="numeric"
          pattern="[0-9]*"
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="font-semibold rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Mengirim..." : "Kirim Kode Verifikasi"}
        </Button>
        <Button
          variant="outline"
          className="font-semibold rounded-full"
          disabled={isLoading}
          onClick={() => setIsShowChangeNumber(false)}
        >
          Batal
        </Button>
      </form>
    </div>
  );
};

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

  return <span>{formatTime(timeLeft)}</span>;
};

export default VerificationPhoneForm;
