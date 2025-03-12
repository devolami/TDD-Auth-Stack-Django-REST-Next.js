import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export type ApiErrorResponse ={
    error_message?: string;
    error?: string;
  }
  
  export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    if (typeof error === "object" && error !== null && "status" in error) {
      const potentialError = error as { status: unknown }; // Narrow the type, but still handle unknown
      return typeof potentialError.status === "number";
    }
    return false;
  }
  
  export function isSerializedError(error: unknown): error is SerializedError {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    );
  }
  