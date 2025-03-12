"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActivationMutation } from "../../../../redux/features/authApiSlice";
import { toast } from "react-toastify";
import { Loader } from "../../../../client/shared";
import { Setup } from "../../../../client/auth";

type Props = {
  params: {
    uid: string;
    token: string;
  };
};

export default function Page({ params }: Props) {
  const router = useRouter();
  const [activation] = useActivationMutation();

  useEffect(() => {
    const { uid, token } = params;

    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast.success("Account activated");
      })
      .catch(() => {
        toast.error("Failed to activate account");
      })
      .finally(() => {
        router.push("/auth/login");
      });
  }, [activation, params, router]);

  return (
    <section>
      <Setup/>
      <Loader><h2>Activating your account...</h2></Loader>
    </section>
  );
}
