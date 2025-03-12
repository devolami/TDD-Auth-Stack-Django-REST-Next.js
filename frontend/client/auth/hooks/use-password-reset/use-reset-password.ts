"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useResetPasswordMutation } from "../../../../redux/features/authApiSlice";
import { RegisterFormData } from "../use-register";
import { isSerializedError, isFetchBaseQueryError, ApiErrorResponse } from "../errorType";
import { toast } from "react-toastify";

export function useResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<RegisterFormData>();
  const {
    register: hookFormRegister,
    handleSubmit,
    formState,
    getValues,
    reset,
    setValue
  } = form;
  const { errors } = formState;

  const submitForm: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const trimmedData = data.email?.trim();
      await resetPassword(trimmedData).unwrap()
      toast.success("Request sent, check your email for reset link");
      reset();
      
    } catch (error) {
        console.error("Error resetting your password", error);
        if (isFetchBaseQueryError(error)) {
          const errorData = error.data as ApiErrorResponse;
          toast.error(
            errorData?.error_message ||
              errorData?.error ||
              "An unknown error occurred"
          );
        } else if (isSerializedError(error)) {
          toast.error(error.message || "An unknown error occurred");
        } else {
          toast.error("An unknown error occurred");
        }
        reset();
      
    }
  };

  return {
    hookFormRegister,
    handleSubmit,
    submitForm,
    errors,
    getValues,
    isLoading,
    setValue
  };
}
