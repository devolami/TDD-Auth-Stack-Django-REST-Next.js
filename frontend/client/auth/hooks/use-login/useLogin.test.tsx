import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useLogin } from "./use-login";
import { useLoginMutation } from "../../../../redux/features/authApiSlice";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

jest.mock("react-toastify");
jest.mock("../../../../redux/features/authApiSlice");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("useLogin hook", () => {
  const mockLogin = jest.fn();

  (useLoginMutation as jest.Mock).mockReturnValue([
    mockLogin,
    { isLoading: false },
  ]);

  const mockRouterPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

  it("initializes form states correctly", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current.hookFormRegister).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.submitForm).toBeDefined();
    expect(result.current.errors).toBeDefined();
    expect(result.current.getValues).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.setValue).toBeDefined();
  });

  it("login successfully", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    mockLogin.mockResolvedValue({ data: {} });
    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        email: { name: "email", value: "muham@gmail.com" },
        password: { name: "password", value: "password123" },
      },
    } as unknown as React.BaseSyntheticEvent;

    await act(async () => {
      await result.current.handleSubmit(result.current.submitForm)(mockEvent);
    });

    expect(mockLogin).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Successfully logged in");
    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard"); 
  });

  it("handles login error", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    mockLogin.mockResolvedValue({
      error: { status: 400, data: { error_message: "An unknown error occurred" } },
    });

    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        email: { name: "email", value: "muham@gmail.com" },
        password: { name: "password", value: "password123" },
      },
    } as unknown as React.BaseSyntheticEvent;

    await act(async () => {
      await result.current.handleSubmit(result.current.submitForm)(mockEvent);
    });

    expect(mockLogin).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("An unknown error occurred");
  });
});
