"use client";
import React from "react";

import { redirect } from "next/navigation";
import { useAppSelector } from "../../../../redux/hooks";
import Loader from "../../../shared/Loader";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <Loader>
        <h2>Authenticating...</h2>
      </Loader>
    );
  }

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
