"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import LogoutWrapper from "./LogoutWrapper";
import Link from "next/link";
import { useUser } from "./UserContext";

interface UserMenuPopoverProps {
  isMember: boolean;
  onClose?: () => void;
}

const UserMenuPopover: React.FC<UserMenuPopoverProps> = ({ isMember, onClose }) => {
  const user = useUser();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-4 px-2">
        <Image
          src="/empty.png"
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 w-full flex flex-col">
          <p className="text-sm font-semibold line-clamp-1">
            {user?.Name ?? "-"}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            {user?.Email ?? "-"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <MenuLink href={user?.UserType === "MEMBER" ? "/visitor" : "/agent/dashboard" } label="Dashboard" />
        {!isMember && (
          <>
            <MenuLink href="#!" label="Listing" />
            <MenuLink href="#!" label="Banner" />
            <Divider />
          </>
        )}
        <MenuLink href="#!" label="Ubah Profil" />
        <MenuLink href="#!" label="Ubah Password" />
        <Divider />
        <LogoutWrapper withRemoveCookie onClose={onClose}>
          <Button
            variant="ghost"
            className="w-full font-semibold rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive justify-start"
          >
            Logout
          </Button>
        </LogoutWrapper>
      </div>
    </div>
  );
};

const MenuLink = ({ href = "#!", label }: { href?: string; label: string }) => {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className="w-full rounded-full font-semibold justify-start"
      >
        {label}
      </Button>
    </Link>
  );
};

const Divider = () => {
  return <div className="w-full border border-gray-200"></div>;
};

export default UserMenuPopover;
