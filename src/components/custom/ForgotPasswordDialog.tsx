import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { ForgotPasswordRequestBody } from "../../../types/auth-types";
import { forgotPassword } from "@/services/auth-service";

const ForgotPasswordDialog = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeOpen = (value: boolean) => {
    if (isLoading) return;
    setInputValue("");
    setIsOpen(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(handleForgotPassword(), {
      loading: "Mengirim...",
      success: (m) => `${m}`,
      error: (e) => `${e}`,
    });
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const request: ForgotPasswordRequestBody = {
        Email: inputValue,
      };
      const result = await forgotPassword(request);

      if (result?.Message?.Code === 200) {
        setIsOpen(false);
        setInputValue("");
        return result?.Message?.Text;
      } else {
        throw result?.Message?.Text;
      }
    } catch (e) {
      throw `${e}`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChangeOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lupa Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 py-4">
            <Label htmlFor="email">Email</Label>
            <InputGroup className="rounded-full overflow-hidden">
              <InputGroupAddon>
                <Send className="w-4 h-4" />
              </InputGroupAddon>
              <InputGroupInput type="email" id="email" placeholder="Masukkan email" value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={isLoading} required />
            </InputGroup>
          </div>
          <DialogFooter className="justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-full" disabled={isLoading}>
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-full" disabled={isLoading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
