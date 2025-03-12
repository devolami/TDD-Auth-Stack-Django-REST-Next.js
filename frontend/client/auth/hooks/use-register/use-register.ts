"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRegisterAccountMutation } from "../../../../redux/features/authApiSlice";
// import { ApiErrorResponse, isFetchBaseQueryError, isSerializedError } from "../errorType";
import { toast } from "react-toastify";

export type RegisterFormData = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  re_password?: string;
  new_password?: string;
  re_new_password?: string;
  uid?: string;
  token?: string;
};

export function useRegister() {
  const router = useRouter();
  const [registerAccount, { isLoading }] = useRegisterAccountMutation();

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
    // try {
    //   registerAccount(data).unwrap();
    //   toast.success("Please check email to verify account");
    //   setTimeout(() => {
    //     router.push("/auth/login");
    //   }, 5000);
    // } catch (error) {
    //   console.error("Error registering your account", error);
    //   if (isFetchBaseQueryError(error)) {
    //     const errorData = error.data as ApiErrorResponse;
    //     toast.error(
    //       errorData?.error_message ||
    //         errorData?.error ||
    //         "An unknown error occurred"
    //     );
    //   } else if (isSerializedError(error)) {
    //     toast.error(error.message || "An unknown error occurred");
    //   } else {
    //     toast.error("An unknown error occurred");
    //   }
    //   reset();
    // }

    try {
      const result = await registerAccount(data);
      if ("error" in result) {
        if (result.error && "status" in result.error) {
          if (result.error.status === 400) {
            const errorData = result.error.data as { error_message: string };
            toast.error(errorData.error_message);
          } else {
            toast.error("An unknown error occurred");
          }
        } else {
          toast.error("An unknown error occurred");
        }
      } else {
        toast.success("Please check email to verify account");
        setTimeout(() => {
          router.push("/auth/login");
        }, 5000);
      }
    } catch (error) {
      console.error("Error registering your account", error);
      toast.error("An unknown error occurred"); // Fallback for unexpected errors
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
