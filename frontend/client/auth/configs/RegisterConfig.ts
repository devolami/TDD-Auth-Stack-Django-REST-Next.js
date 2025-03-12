import { InputConfigProps } from "../utils";
import { RegisterFormData } from "../hooks";
import { UseFormGetValues } from "react-hook-form";


export const RegisterConfig = (
  getValues: UseFormGetValues<RegisterFormData>
): InputConfigProps[] => [
    {
      name: "first_name",
      type: "text",
      placeholder: "First Name",
      id: "first_name",
      trimOnly: true,
      validationRules: {
        required: "Please enter first name!",
        pattern: {
          value: /^[a-zA-Z-']+$/,
          message: "Use only letters, hyphen or single quote",
        },
        validate: {
          tooLong: (fieldValue) => fieldValue!.length < 16 || "Max of 15 letters!",
          tooShort: (fieldValue) => fieldValue!.length > 2 || "Min of 3 letters",
        },
      },
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
      id: "last_name",
      trimOnly: true,
      validationRules: {
        required: "Please enter last name!",
        pattern: {
          value: /^[a-zA-Z-']+$/,
          message: "Use letters, hyphen or single quote",
        },
        validate: {
          tooLong: (fieldValue) => fieldValue!.length < 15 || "Max of 15 letters!",
          tooShort: (fieldValue) => fieldValue!.length > 2 || "Min of 3 letters",
        },
      },
    },
    {
      name: "email",
      type: "text", // type text is used because type email is not trimming trailing space.
      placeholder: "Email",
      id: "email",
      trimAndLower: true,
      validationRules: {
        required: "Please enter email!",
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Please enter a valid email!",
        },
        validate: {
          notThisEmail: (fieldValue) =>
            fieldValue !== "admin@example.com" ||
            "Please enter a different email",
          notBadEmail: (fieldValue) =>
            !fieldValue!.endsWith("@example.com") ||
            "Please enter a different email",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      id: "password",
      trimOnly: true,
      validationRules: {
        required: "Password is required",
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
      name: "re_password",
      type: "password",
      placeholder: "Re-enter Password",
      id: "re_password",
      trimOnly: true,
      validationRules: {
        required: "Please re-enter your password",
        validate: {
          passwordMatch: (value) =>
            value === getValues("password") || "Passwords did not match!",
        },
      },
    },
  ];
