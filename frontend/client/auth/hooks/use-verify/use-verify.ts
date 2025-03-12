"use client";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setAuth,
  finishInitialLoad,
} from "../../../../redux/features/authSlice";
import { useVerifyMutation } from "../../../../redux/features/authApiSlice";

export default function useVerify() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [verify, { isLoading }] = useVerifyMutation();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await verify().unwrap();
        dispatch(setAuth());
      } catch (error) {
        console.error("Verification failed", error);
      } finally {
        dispatch(finishInitialLoad());
      }
    };

    verifyUser();
  }, [dispatch, verify]);
}
