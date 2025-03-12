import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
  RegisterOptions,
  UseFormSetValue
} from "react-hook-form";

import { RegisterFormData } from "../../hooks";

export type InputConfigProps = {
  name: keyof RegisterFormData;
  type: string;
  placeholder: string;
  id: string;
  validationRules: RegisterOptions<RegisterFormData>;
  trimOnly?: boolean;
  trimAndLower?: boolean;
};

export type InputFieldProps = {
  config: InputConfigProps[];
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  getValues?: UseFormGetValues<RegisterFormData>;
  setValue: UseFormSetValue<RegisterFormData>
};