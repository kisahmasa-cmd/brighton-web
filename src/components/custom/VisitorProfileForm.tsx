"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { edit } from "@/services/user-service";
import { Profile } from "../../../types/user-types"; // Adjust path as needed

interface VisitorProfileFormProps {
  user: Profile;
}

interface EditProfileRequestBody {
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
}

const VisitorProfileForm: React.FC<VisitorProfileFormProps> = ({ user }) => {
  const [name, setName] = useState<string>(user?.Name || "");
  const [email, setEmail] = useState<string>(user?.Email || "");
  const [phone, setPhone] = useState<string>(user?.Phone || "");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(handleEdit(), {
      loading: "Loading...",
      success: "Profile berhasil diupdate!",
      error: (e) => `${e}`,
    });
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const request: EditProfileRequestBody = {
        Name: name,
        Email: email,
        Phone: phone,
        Address: address,
      };
      const result = await edit(request);

      if (result.Data) {
        return true;
      } else {
        throw "Update profile gagal!";
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {/* Full Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input
          type="text"
          id="name"
          placeholder="Masukkan nama lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="phone">Nomor Telepon</Label>
        <Input
          type="tel"
          id="phone"
          placeholder="Masukkan nomor telepon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {/* Address Field */}
      <div className="space-y-2">
        <Label htmlFor="address">Alamat</Label>
        <Textarea
          id="address"
          placeholder="Masukkan alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
          rows={3}
        />
      </div>

      {/* Update Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full font-semibold"
        disabled={isLoading}
      >
        Simpan Perubahan
      </Button>
    </form>
  );
};

export default VisitorProfileForm;