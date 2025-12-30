// src/components/custom/UserProviderClient.tsx
"use client";

import { useEffect, useState } from "react";
import { UserProvider } from "./UserContext";
import { getUserInfo } from "@/actions/user-action";
import { UserData } from "../../../types/user-types";

export default function UserProviderClient({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    getUserInfo().then(setUser);
  }, []);

  return <UserProvider value={user}>{children}</UserProvider>;
}
