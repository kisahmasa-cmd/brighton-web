"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "@/services/user-service";

interface ChangePasswordRequestBody {
  OldPassword: string;
  NewPassword: string;
}

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isShowCurrent, setIsShowCurrent] = useState<boolean>(false);
  const [isShowNew, setIsShowNew] = useState<boolean>(false);
  const [isShowRepeat, setIsShowRepeat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password minimal 8 karakter";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password harus mengandung minimal 1 huruf besar";
    }
    if (!/[a-z]/.test(password)) {
      return "Password harus mengandung minimal 1 huruf kecil";
    }
    if (!/[0-9]/.test(password)) {
      return "Password harus mengandung minimal 1 angka";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate new password
    const validationError = validatePassword(newPassword);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Check if passwords match
    if (newPassword !== repeatPassword) {
      toast.error("Password baru tidak cocok!");
      return;
    }

    toast.promise(handleChangePassword(), {
      loading: "Loading...",
      success: "Password berhasil diubah!",
      error: (e) => `${e}`,
    });
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);
      const request: ChangePasswordRequestBody = {
        OldPassword: currentPassword,
        NewPassword: newPassword,
      };
      const result = await changePassword(request);

      if (result.Data || result.Message?.Code === 200) {
        // Reset form
        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
        return true;
      } else {
        throw "Ubah password gagal!";
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {/* Current Password Field */}
      <div className="space-y-2">
        <Label htmlFor="current-password">Password Saat Ini</Label>
        <InputGroup className="rounded-full overflow-hidden">
          <InputGroupAddon>
            <Lock className="w-4 h-4" />
          </InputGroupAddon>
          <InputGroupInput
            type={isShowCurrent ? "text" : "password"}
            id="current-password"
            placeholder="Masukkan password saat ini"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setIsShowCurrent(!isShowCurrent)}
              className="rounded-full"
              tabIndex={-1}
            >
              {isShowCurrent ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* New Password Field */}
      <div className="space-y-2">
        <Label htmlFor="new-password">Password Baru</Label>
        <InputGroup className="rounded-full overflow-hidden">
          <InputGroupAddon>
            <Lock className="w-4 h-4" />
          </InputGroupAddon>
          <InputGroupInput
            type={isShowNew ? "text" : "password"}
            id="new-password"
            placeholder="Masukkan password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setIsShowNew(!isShowNew)}
              className="rounded-full"
              tabIndex={-1}
            >
              {isShowNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <div className="text-xs text-gray-600 space-y-1 mt-2">
          <p className={newPassword.length >= 8 ? "text-green-600" : ""}>
            • Minimal 8 karakter
          </p>
          <p className={/[A-Z]/.test(newPassword) ? "text-green-600" : ""}>
            • Minimal 1 huruf besar
          </p>
          <p className={/[a-z]/.test(newPassword) ? "text-green-600" : ""}>
            • Minimal 1 huruf kecil
          </p>
          <p className={/[0-9]/.test(newPassword) ? "text-green-600" : ""}>
            • Minimal 1 angka
          </p>
        </div>
      </div>

      {/* Repeat New Password Field */}
      <div className="space-y-2">
        <Label htmlFor="repeat-password">Ulangi Password Baru</Label>
        <InputGroup className="rounded-full overflow-hidden">
          <InputGroupAddon>
            <Lock className="w-4 h-4" />
          </InputGroupAddon>
          <InputGroupInput
            type={isShowRepeat ? "text" : "password"}
            id="repeat-password"
            placeholder="Ulangi password baru"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setIsShowRepeat(!isShowRepeat)}
              className="rounded-full"
              tabIndex={-1}
            >
              {isShowRepeat ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {repeatPassword && newPassword !== repeatPassword && (
          <p className="text-xs text-red-600 mt-1">
            Password tidak cocok
          </p>
        )}
      </div>

      {/* Change Password Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full font-semibold"
        disabled={isLoading}
      >
        Ubah Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;