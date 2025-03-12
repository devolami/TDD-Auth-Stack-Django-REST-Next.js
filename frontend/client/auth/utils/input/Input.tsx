"use client";
import React from "react";

import { RegisterFormData } from "../../hooks";
import { InputFieldProps } from "./input-types";

export const InputField: React.FC<InputFieldProps> = ({
  config,
  register,
  errors,
  setValue
}) => {

  const trimOnly = (name: keyof RegisterFormData)=> (e: React.ChangeEvent<HTMLInputElement>) =>{
    const trimmedValue = e.target.value.trim()
    setValue(name, trimmedValue, {shouldValidate: true})
  }
  const trimAndLower = (name: keyof RegisterFormData)=> (e: React.ChangeEvent<HTMLInputElement>) =>{
    const trimmedValue = e.target.value.trim().toLowerCase()
    setValue(name, trimmedValue, {shouldValidate: true})
  }

  return (
    <>
      {config.map((fieldConfig, index) => (
        <div
          key={fieldConfig.name}
          className={`w-full ${config.length % 2 !== 0 && index === config.length - 1 ? "md:col-span-full" : ''}`}
        >
          <input
            {...register(fieldConfig.name, fieldConfig.validationRules)}
            type={fieldConfig.type}
            placeholder={fieldConfig.placeholder}
            id={fieldConfig.id}
            className="my-[10px] p-[20px] rounded-sm border-[1.5px] border-[#E4E8F1] w-full font-normal text-[16px] bg-white text-[#364259] focus:outline-none focus:border-[#CBE5A7]"
            onChange={fieldConfig.trimOnly ? trimOnly(fieldConfig.name) :  fieldConfig.trimAndLower ? trimAndLower(fieldConfig.name): undefined}
          />
          <p className="text-[#FF8A00] text-[12px]">{errors[fieldConfig.name]?.message}</p>
        </div>
      ))}
    </>
  );
};
