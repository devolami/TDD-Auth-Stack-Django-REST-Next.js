"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../../../../redux/features/authApiSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { RegisterFormData } from "../use-register";
// import { isSerializedError, isFetchBaseQueryError,  ApiErrorResponse} from "../errorType";
import { toast } from "react-toastify";
import { setAuth } from "../../../../redux/features/authSlice";

export function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<RegisterFormData>();
  const {
    register: hookFormRegister,
    handleSubmit,
    formState,
    getValues,
    setValue,
    reset,
  } = form;
  const { errors } = formState;

  const submitForm: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const result = await login(data);
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
        dispatch(setAuth());
        toast.success("Successfully logged in");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in to your account", error);
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
