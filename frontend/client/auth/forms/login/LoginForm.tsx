"use client";
import Link from "next/link";
import React from "react";

import { InputField, SocialLinks } from "../../utils";
import { useLogin } from "../../hooks/use-login/use-login";
import { LoginConfig } from "../../configs/LoginConfig";
import { Button } from "../../../../client/shared/button/Button";
export function LoginForm() {
  const {
    hookFormRegister,
    errors,
    submitForm,
    handleSubmit,
    isLoading,
    getValues,
    setValue,
  } = useLogin();

  return (
    <div
      className="flex flex-col justify-center items-center bg-[#f4f9ec] py-[50px] w-full"
    >
      <div className="flex flex-col justify-center items-center w-[90%] md:w-[60%] box-border">
        <div className="text-center font-bold text-green-700 m-[30px]">
          <h3>Login to your account</h3>
        </div>
        <form className="w-full bg-white p-[30px] flex flex-col items-center justify-center" onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start">
            <InputField
              getValues={getValues}
              register={hookFormRegister}
              errors={errors}
              config={LoginConfig}
              setValue={setValue}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </form>
        <div className="bg-white text-left w-full py-[5p] pl-[30px]">
          <Link
            className="bg-white text-left text-[#006838] font-bold no-underline"
            href={"/password-reset"}
          >
            Forgot your password?
          </Link>
        </div>
        <div className="bg-white w-full px-[25px] pb-[20px]">
          <SocialLinks label="Sign in" />
          <p className="mt-[15px]">
            Don&apos;t have an account?{" "}
            <Link
              className="no-underline text-[#006838] font-bold"
              href={"/auth/register"}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
