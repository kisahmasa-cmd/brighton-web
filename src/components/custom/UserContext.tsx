"use client";

import { createContext, useContext } from "react";
import { UserData } from "../../../types/user-types";

const UserContext = createContext<UserData | null>(null);

interface UserContextProps {
  value: UserData | null;
  children: React.ReactNode;
}

export function UserProvider({ value, children }: UserContextProps) {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
