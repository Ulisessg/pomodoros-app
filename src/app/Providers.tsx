"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { FC, ReactNode } from "react";

export const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => <UserProvider>
  {children}
</UserProvider>;
