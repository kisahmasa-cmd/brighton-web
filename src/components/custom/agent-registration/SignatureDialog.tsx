"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Signature } from "lucide-react";
import { useState } from "react";
import SignaturePad from "./SignaturePad";

interface SignatureDialogProps {
  fullName: string;
  onChangeSignature: (value: string) => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
  disabled?: boolean;
}

const SignatureDialog: React.FC<SignatureDialogProps> = ({
  fullName,
  onChangeSignature,
  ref,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (img: string) => {
    onChangeSignature(img);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          ref={ref}
          variant="secondary"
          className="rounded-full font-semibold flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(true);
          }}
          disabled={disabled}
        >
          <Signature className="w-4 h-4" />
          <span>Buat Tanda Tangan</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tanda Tangan Disini</DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          <p>Dengan melakukan tanda tangan, Anda menyatakan bahwa:</p>
          <ol className="list-decimal pl-4">
            <li>Tanda tangan ini sah secara hukum</li>
            <li>
              Anda melakukan tanda tangan ini dengan sadar tanpa paksaan pihak
              tertentu
            </li>
            <li>Anda memberikan persetujuan terhadap dokumen diatas</li>
            <li>Tanda tangan ini adalah tanda tangan milik {fullName}</li>
            <li>
              Tanda tangan ini hanya digunakan satu kali untuk dokumen ini saja
            </li>
            <li>Tanda tangan Anda aman karena di-enkripsi</li>
          </ol>
        </div>
        <SignaturePad onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
};

export default SignatureDialog;
