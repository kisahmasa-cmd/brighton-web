"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { LoginRequestBody } from "../../../types/auth-types";
import { login } from "@/services/auth-service";
import Cookies from "js-cookie";
import { setServerToken } from "@/actions/token-action";
import { tokenVerify } from "@/services/token-service/token-verify-service";
import { manageUserInfoCookie } from "@/actions/user-action";

interface LoginFormProps {
  isMember: boolean;
  onClose?: () => void;
}

interface RememberMeData {
  username?: string;
  password?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isMember, onClose }) => {
  const REMEMBER_ME_KEY = "rememberMe";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRememberMeLogin = ():RememberMeData => {
    if (!isMember) return {};
    const data = Cookies.get(REMEMBER_ME_KEY);
    if (!!data) {
      const parsed: RememberMeData = JSON.parse(data);
      return parsed;
    }
    return {};
  }

  const setRememberMeLogin = () => {
    const data = { username, password };
    Cookies.set(REMEMBER_ME_KEY, JSON.stringify(data), {
      expires: 1, sameSite: "strict",
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(handleLogin(), {
      loading: "Loading...",
      success: "Login berhasil!",
      error: (e) => `${e}`,
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const request: LoginRequestBody = {
        User: username,
        Password: password,
      };
      const result = await login(request);

      if (result.Data) {
        if (result.AccessToken) {
          await setServerToken(result.AccessToken);
        }
        if (isMember) {
          if (isRememberMe) {
            setRememberMeLogin();
          } else {
            Cookies.remove(REMEMBER_ME_KEY);
          }
        }

        if (onClose) {
          onClose();
        }

        const verifyResult = await tokenVerify();
        await manageUserInfoCookie(verifyResult);

        if (!verifyResult) {
          throw "Token tidak valid!";
        } else {
          setTimeout(() => {
            if (verifyResult.UserType === "AGEN") {
              window.location.href = "/agent/dashboard";
            } else {
              if (!verifyResult.IsVerified) {
                window.location.href = "/visitor/verification-phone";
              } else {
                window.location.href = "/visitor/";
              }
            }
          }, 1000);
        }

        return true;
      } else {
        throw "Login gagal!";
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUsername(getRememberMeLogin().username || "");
    setPassword(getRememberMeLogin().password || "");
    setIsRememberMe(getRememberMeLogin().username !== undefined);
  }, [isMember]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email/Username Field */}
      <div className="space-y-2">
        <Label htmlFor="username">Email/Username</Label>
        <InputGroup className="rounded-full overflow-hidden">
          <InputGroupAddon>
            <User className="w-4 h-4" />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            id="username"
            placeholder="Masukkan email/username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
        </InputGroup>
      </div>
      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <InputGroup className="rounded-full overflow-hidden">
          <InputGroupAddon>
            <Lock className="w-4 h-4" />
          </InputGroupAddon>
          <InputGroupInput
            type={isShowPassword ? "text" : "password"}
            id="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="rounded-full"
              tabIndex={-1}
            >
              {isShowPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Remember Me Checkbox - hanya untuk Member */}
      {isMember && (
        <Label
          htmlFor="rememberMe"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Checkbox
            id="rememberMe"
            value="alwaysLogin"
            defaultChecked={isRememberMe}
            checked={isRememberMe}
            className="cursor-pointer"
            onCheckedChange={() => setIsRememberMe(!isRememberMe)}
          />
          <span>Biarkan saya tetap masuk</span>
        </Label>
      )}

      {/* Login Button */}
      <Button
        type="submit"
        size="lg"
        className="rounded-full w-full font-semibold"
        disabled={isLoading}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
