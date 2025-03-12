"use client";
import React from "react";

import { ToastContainer } from "react-toastify";
import useVerify from "../hooks/use-verify/use-verify";
import "react-toastify/dist/ReactToastify.css"

export function Setup() {
  useVerify()
  return <ToastContainer />
}
