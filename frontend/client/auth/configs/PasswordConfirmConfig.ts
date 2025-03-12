import { InputConfigProps } from "../utils";
import { RegisterFormData } from "../hooks";
import { UseFormGetValues } from "react-hook-form";

export const PasswordConfirmConfig = (
  getValues: UseFormGetValues<RegisterFormData>
): InputConfigProps[] => [
  {
    name: "new_password",
    type: "password",
    placeholder: "New Password",
    id: "password",
    trimOnly: true,
    validationRules: {
      required: "Password is required!",
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        message:
          "Password must contain at least one upper case letter, one lower case letter, a digit and a special character from the set: @$!%*?&",
      },
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    },
  },
  {
    name: "re_new_password",
    type: "password",
    placeholder: "Enter new password again",
    id: "password",
    trimOnly: true,
    validationRules: {
      required: "Enter new password again!",
      validate: {
        passwordMatch: (value) =>
          value === getValues("new_password") || "Passwords did not match!",
      },
    },
  },
];
