import { Button } from "@/components/ui/button";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";

export default function SearchEmpty() {
  return (
    <div className="p-4 flex flex-col gap-2 items-center bg-yellow-50 rounded-xl">
      <h2 className="font-bold text-xl text-center text-yellow-950">
        Data tidak ditemukan
      </h2>
      <p className="text-center text-yellow-950">
        Klik tombol dibawah agar dibantu oleh Agen kami.
      </p>
      <Link href="/hubungi/feedback">
        <Button
          variant="secondary"
          className="font-semibold hover:text-primary flex items-center gap-2"
        >
          <CircleQuestionMark className="h-4 w-4" />
          <span>Bantuan</span>
        </Button>
      </Link>
    </div>
  );
}
