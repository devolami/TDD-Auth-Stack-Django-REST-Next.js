"use client";
import React from "react";
import { InputField } from "../../utils";

import { useResetPasswordConfirm } from "../../hooks";
import { PasswordConfirmConfig } from "../../configs/PasswordConfirmConfig";
import { Button } from "../../../../client/shared/button/Button";

type Props = {
  uid: string;
  token: string;
};
export function ResetPasswordConfirmForm({ uid, token }: Props) {
  const {
    hookFormRegister,
    errors,
    submitForm,
    handleSubmit,
    isLoading,
    getValues,
    setValue,
  } = useResetPasswordConfirm({ uid, token });

  return (
    <div
      className="flex flex-col justify-center items-center bg-[#f4f9ec] py-[50px]"
    >
      <div className="flex flex-col justify-center items-center w-[90%] md:w-[60%] box-border">
        <div className="text-center font-bold text-green-700 m-[30px]">
          <h3>Change password</h3>
        </div>
        <form className="w-full bg-white p-[30px] flex flex-col items-center justify-center" onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start">
            <InputField
              getValues={getValues}
              register={hookFormRegister}
              errors={errors}
              config={PasswordConfirmConfig(getValues)}
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
