"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import Link from "next/link";
import LoginForm from "./LoginForm";

interface LoginPopoverProps {
  onClose?: () => void;
}

export default function LoginPopover({ onClose }: LoginPopoverProps) {
  const [userType, setUserType] = useState<"member" | "agen">("member");

  const tabValues = {
    member: 'Member Umum',
    agen: 'Agen Brighton'
  }

  return (
      <div className="space-y-4">
        {/* Tab Switcher */}
        <div className={`relative bg-primary rounded-full p-1.5 flex overflow-hidden transition-all duration-300 ease-in-out`}>
          {/* Indicator */}
          <div
            className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] bg-white rounded-full transition-transform duration-300 ease-in-out`}
            style={{
              transform: userType === "member" ? "translateX(0%)" : "translateX(100%)",
            }}
          />

          {/* Tombol Tab */}
          {Object.entries(tabValues).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setUserType(key === 'member' ? 'member' : 'agen')}
              className="flex-1 relative z-10 text-center rounded-full px-2 py-2 font-semibold transition-colors duration-300 cursor-pointer text-xs">
              {value}
            </button>
          ))}
        </div>

        <LoginForm isMember={userType === 'member'} onClose={onClose} />

        {/* Social Login Section - hanya untuk Member */}
        {userType === "member" && (
          <div className="space-y-2">
            <div className="flex items-center pb-2">
              <div className="flex-1 border border-gray-300"></div>
              <span className="px-6 text-gray-600 font-medium">ATAU</span>
              <div className="flex-1 border border-gray-300"></div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Image src="/facebook.svg" width={0} height={0} sizes="100vw" alt="facebook" className="w-4 h-4 filter invert brightness-0 contrast-200" />
              <span>Facebook</span>
            </Button>

            <Button variant="outline" className="w-full font-semibold py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Image src="/google.svg" width={0} height={0} sizes="100vw" alt="google" className="w-4 h-4" />
              <span>Google</span>
            </Button>

            <div className="w-full border border-gray-300 my-4"></div>

            <ForgotPasswordDialog>
              <Button variant="outline" className="w-full font-semibold rounded-full">
                Lupa kata sandi/username?
              </Button>
            </ForgotPasswordDialog>

            <Link href="/visitor/register">
              <Button variant="outline" className="w-full font-semibold rounded-full">
                Daftar Akun
              </Button>
            </Link>
          </div>
        )}
      </div>
  );
}
