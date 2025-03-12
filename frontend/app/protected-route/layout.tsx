import React from "react";
import RequireAuth from "@/client/auth/utils/require-auth/RequireAuth";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <RequireAuth>{children}</RequireAuth>;
}
