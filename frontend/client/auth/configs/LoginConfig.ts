import { InputConfigProps } from "../utils";

export const LoginConfig: InputConfigProps[] = [
  {
    name: "email",
    // type: "email", // type text is used because type email is not trimming trailing space.
    type: "text",
    placeholder: "Email",
    id: "email",
    trimAndLower: true,
    validationRules: {
      required: "Email is required!",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Incorrect email!",
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
      required: "Password is required!",
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        message:
          "Incorrect Password!",
      },
    },
  },
];
