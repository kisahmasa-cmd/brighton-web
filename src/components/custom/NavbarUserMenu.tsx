"use client"

import UserMenuPopover from "./UserMenuPopover";
import LoginPopover from "./LoginPopover";
import { User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarUserMenuProps {
  isLoggedIn: boolean;
}

const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} aria-label="Menu Profil" className="p-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
          <User className="!w-5 !h-5 text-gray-700" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        {isLoggedIn ? <UserMenuPopover isMember={true} onClose={handleClose} /> : <LoginPopover onClose={handleClose} /> }
      </PopoverContent>
    </Popover>
  );
};

export default NavbarUserMenu;
