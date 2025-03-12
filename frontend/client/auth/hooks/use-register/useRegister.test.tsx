import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useRegister } from "./use-register";
import { useRegisterAccountMutation } from "../../../../redux/features/authApiSlice";
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

describe("useRegister hook", () => {
  const mockRegister = jest.fn();

  (useRegisterAccountMutation as jest.Mock).mockReturnValue([
    mockRegister,
    { isLoading: false },
  ]);

  const mockRouterPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

  it("initializes form states correctly", () => {
    const { result } = renderHook(() => useRegister(), {
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

  it("registers successfully", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useRegister(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    mockRegister.mockResolvedValue({ data: {} });
    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        email: { name: "email", value: "muham@gmail.com" },
        password: { name: "password", value: "password123" },
        re_password: { name: "re_password", value: "password123" },
        first_name: { name: "first_name", value: "test_name" },
        last_name: { name: "last_name", value: "test_name" },
      },
    } as unknown as React.BaseSyntheticEvent;

    await act(async () => {
      await result.current.handleSubmit(result.current.submitForm)(mockEvent);
    });

    expect(mockRegister).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "Please check email to verify account"
    );
    jest.advanceTimersByTime(5000);
    expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
  });

  it("handles register error", async () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    mockRegister.mockResolvedValue({
      error: {
        status: 400,
        data: { error_message: "An unknown error occurred" },
      },
    });

    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        email: { name: "email", value: "muham@gmail.com" },
        password: { name: "password", value: "password123" },
        re_password: { name: "re_password", value: "password123" },
        first_name: { name: "first_name", value: "test_name" },
        last_name: { name: "last_name", value: "test_name" },
      },
    } as unknown as React.BaseSyntheticEvent;

    await act(async () => {
      await result.current.handleSubmit(result.current.submitForm)(mockEvent);
    });

    expect(mockRegister).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("An unknown error occurred");
  });
});
