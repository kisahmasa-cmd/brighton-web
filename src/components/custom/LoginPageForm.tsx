"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import LoginForm from "./LoginForm";

interface LoginPageFormProps {
  isMember?: boolean;
}

const LoginPageForm: React.FC<LoginPageFormProps> = ({ isMember = true }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">
        {isMember ? "Public Member Login" : "Agent Login"}
      </h1>
      {/* Form */}
      <LoginForm isMember={isMember} />
      {/* Links */}
      <div className="flex flex-col items-center gap-2">
        {isMember && (
          <p className="text-center text-sm">
            <span>Belum punya akun? </span>
            <Link
              href="/visitor/register"
              className=" hover:text-blue-700 hover:underline font-semibold"
            >
              Daftar Sekarang
            </Link>
          </p>
        )}
        <ForgotPasswordDialog>
          <Button
            variant="link"
            className="text-black hover:text-blue-700 hover:underline"
          >
            Lupa Password?
          </Button>
        </ForgotPasswordDialog>
        <Link
          href="/"
          className="hover:text-gray-900 hover:underline font-semibold text-sm"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
};

export default LoginPageForm;
