"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Mail, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

interface ShareDialogButtonProps {
  URL?: string;
  emailSubject?: string;
}

const ShareDialogButton: React.FC<ShareDialogButtonProps> = ({
  URL,
  emailSubject,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const shareLink =
    (URL ?? typeof window !== "undefined") ? window.location.href : "#";

  function handleCopyLink() {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setIsOpen(false);
        toast.success("Tautan berhasil disalin!");
      })
      .catch((err) => {
        toast.error("Tautan gagal disalin!");
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full"
        >
          <Share2 className="w-4 h-4" />
          <span className="font-semibold">Bagikan</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bagikan</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <div
            onClick={() => handleCopyLink()}
            className="p-2 flex items-center gap-2 justify-start hover:bg-gray-100 cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Salin Tautan</span>
          </div>
          <DividerLine />
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
            target="_blank"
            className="p-2 flex items-center gap-2 justify-start hover:bg-gray-100"
          >
            <Image
              src="/facebook.svg"
              alt="Facebook Icon"
              width={0}
              height={0}
              sizes="100vw"
              className="w-4 h-4"
            />
            <span>Facebook</span>
          </Link>
          <DividerLine />
          <Link
            href={`https://api.whatsapp.com/send?text=${shareLink}`}
            target="_blank"
            className="p-2 flex items-center gap-2 justify-start hover:bg-gray-100"
          >
            <Image
              src="/whatsapp.svg"
              alt="WhatsApp Icon"
              width={0}
              height={0}
              sizes="100vw"
              className="w-4 h-4"
            />

            <span>WhatsApp</span>
          </Link>
          <DividerLine />
          <Link
            href={`https://twitter.com/share?url=${shareLink}`}
            target="_blank"
            className="p-2 flex items-center gap-2 justify-start hover:bg-gray-100"
          >
            <Image
              src="/x.svg"
              alt="Twitter X Icon"
              width={0}
              height={0}
              sizes="100vw"
              className="w-4 h-4"
            />
            <span>Twitter/X</span>
          </Link>
          <DividerLine />
          <Link
            href={`mailto:?subject=${emailSubject}&body=${shareLink}`}
            target="_blank"
            className="p-2 flex items-center gap-2 justify-start hover:bg-gray-100"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DividerLine = () => {
  return <hr className="border border-gray-200 w-full" />;
};

export default ShareDialogButton;
