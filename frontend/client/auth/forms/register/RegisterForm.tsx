"use client";
import React from "react";

import Link from "next/link";
import { InputField, SocialLinks } from "../../utils";

import { useRegister } from "../../hooks";

import { RegisterConfig } from "../../configs/RegisterConfig";
import { Button } from "../../../../client/shared/button/Button";
export function AccountRegisterForm() {
  const {
    hookFormRegister,
    errors,
    submitForm,
    handleSubmit,
    isLoading,
    getValues,
    setValue,
  } = useRegister();

  return (
    <div className="flex flex-col justify-center items-center bg-[#f4f9ec] py-[50px]">
      <div className="flex flex-col justify-center items-center w-[90%] md:w-[60%] box-border">
        <div className="text-center font-bold text-green-700 m-[30px]">
          <h3>Sign up for your account</h3>
        </div>

        <form className="w-full bg-white p-[30px] flex flex-col items-center justify-center" onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start">
              <InputField
                getValues={getValues}
                register={hookFormRegister}
                errors={errors}
                config={RegisterConfig(getValues)}
                setValue={setValue}
              />
          </div>
           <Button disabled={isLoading}>
               {isLoading ? "Submitting" : "Submit"}
             </Button>
        </form>
        <div
         className="bg-white w-full px-[25px] pb-[20px]"
        >
          <SocialLinks label="Sign up" />
          <p className="mt-[15px]">
            Already have an account?{" "}
            <Link
              className="no-underline text-[#006838] font-bold"
              href={"/auth/login"}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
