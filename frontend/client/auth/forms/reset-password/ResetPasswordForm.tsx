"use client";
import React from "react";

import { InputField } from "../../utils";
import { Button } from "../../../../client/shared/button/Button";
import { useResetPassword } from "../../hooks";
import { ResetPasswordConfig } from "../../configs/ResetPasswordConfig";

export function ResetPasswordForm() {
  const {
    hookFormRegister,
    errors,
    submitForm,
    handleSubmit,
    isLoading,
    getValues,
    setValue,
  } = useResetPassword();

  return (
    <div className="flex flex-col justify-center items-center bg-[#f4f9ec] py-[50px]">
      <div className="flex flex-col justify-center items-center  w-[90%] md:w-[60%] box-border">
        <div className="m-[30px]">
          <div className="text-center m-[30px]">
            <h3 className="font-bold text-green-700">Reset your password</h3>
            <br />
            <p>
              Please enter your email and we&apos;ll send
              you a re-activation link
            </p>
          </div>
        </div>
        <form className="w-full bg-white p-[30px] flex flex-col items-center justify-center" onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="w-full grid grid-cols-1 gap-x-4 items-start">
            <InputField
              getValues={getValues}
              register={hookFormRegister}
              errors={errors}
              config={ResetPasswordConfig}
              setValue={setValue}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
