"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useResetPasswordConfirmMutation } from "../../../../redux/features/authApiSlice";
import { RegisterFormData } from "../use-register";
import {
  isSerializedError,
  isFetchBaseQueryError,
  ApiErrorResponse,
} from "../errorType";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  uid: string;
  token: string;
};
export function useResetPasswordConfirm({ uid, token }: Props) {
  const router = useRouter();
  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();

  const form = useForm<RegisterFormData>();
  const {
    register: hookFormRegister,
    handleSubmit,
    formState,
    getValues,
    reset,
    setValue,
  } = form;
  const { errors } = formState;

  const submitForm: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const request_data = { ...data, uid, token };
      await resetPasswordConfirm(request_data).unwrap();
      toast.success("Password changed successfully!");
      reset();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error registering your account", error);
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
    setValue,
  };
}
