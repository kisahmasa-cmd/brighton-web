"use client";

import { getServerToken, removeServerToken } from "@/actions/token-action";
import { removeUserInfoCookie } from "@/actions/user-action";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth-service";
import { useState } from "react";
import { toast } from "sonner";

interface LogoutWrapperProps {
  withRemoveCookie?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const LogoutWrapper: React.FC<LogoutWrapperProps> = ({ children, withRemoveCookie = false, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    toast.promise(handleLogout(), {
      loading: "Logging out...",
      success: "Logout berhasil!",
      error: (error) => `${error}`,
    });
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const token = await getServerToken();
      if (token) {
        const result = await logout(token);
        if (result?.Message?.Code === 200) {
          if (withRemoveCookie) {
            await removeServerToken();
            await removeUserInfoCookie();
          }
          // kalo pakai router.refresh() menu dropdownnya delay pergantiannya
          window.location.reload();
          if (onClose) {
            onClose();
          }
          return true;
        } else {
          throw result?.Message?.Text;
        }
      } else {
        throw "No token found";
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(isLoading && "opacity-50")} onClick={handleClick}>
      {children}
    </div>
  );
};

export default LogoutWrapper;
