import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { HtmlContentDisplay } from "./HtmlContentDisplay";

interface TermsConfirmDialogProps {
  content: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onConfirm: () => void;
}

const TermsConfirmDialog: React.FC<TermsConfirmDialogProps> = ({ content, isOpen, setIsOpen, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="lg:max-w-3xl max-h-3/4 flex flex-col">
        <DialogHeader>
          <DialogTitle>{"Syarat & Ketentuan"}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <HtmlContentDisplay content={content} />
        </div>
        <DialogFooter className="justify-center">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-full font-semibold"
            >
              Batalkan
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="rounded-full font-semibold"
            onClick={onConfirm}
          >
            Setuju
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsConfirmDialog;
