import { InputConfigProps } from "../utils";

export const ResetPasswordConfig: InputConfigProps[] = [
    {
        name: "email",
        type: "text", // type text is used because type email is not trimming trailing space.
        placeholder: "Email",
        id: "email",
        trimAndLower: true,
        validationRules: {
            required: "Email is required!",
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
];
