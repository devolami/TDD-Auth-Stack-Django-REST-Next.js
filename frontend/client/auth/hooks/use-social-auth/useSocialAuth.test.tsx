import { renderHook, act } from "@testing-library/react";
import useSocialAuth from "./use-social-auth";
import { useAppDispatch } from "../../../../redux/hooks";
import { setAuth } from "../../../../redux/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

jest.mock("../../../../redux/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useSocialAuth", () => {
  const mockDispatch = jest.fn();
  const mockRouterPush = jest.fn();
  const mockSearchParamsGet = jest.fn();
  const mockAuthenticate = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useSearchParams as jest.Mock).mockReturnValue({ get: mockSearchParamsGet });
    mockDispatch.mockClear();
    mockRouterPush.mockClear();
    mockSearchParamsGet.mockClear();
    mockAuthenticate.mockClear();
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  it("should call authenticate and dispatch setAuth on success", async () => {
    mockSearchParamsGet.mockReturnValueOnce("testState").mockReturnValueOnce("testCode");
    mockAuthenticate.mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });

    renderHook(() => useSocialAuth(mockAuthenticate, "google"));

    await act(async () => {
      await Promise.resolve(); // Allow useEffect to run
    });

    expect(mockAuthenticate).toHaveBeenCalledWith({
      provider: "google",
      state: "testState",
      code: "testCode",
    });
    expect(mockDispatch).toHaveBeenCalledWith(setAuth());
    expect(toast.success).toHaveBeenCalledWith("Logged in");
    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should call authenticate and show error on failure", async () => {
    mockSearchParamsGet.mockReturnValueOnce("testState").mockReturnValueOnce("testCode");
    mockAuthenticate.mockReturnValue({ unwrap: jest.fn().mockRejectedValue(new Error("Login failed")) });

    renderHook(() => useSocialAuth(mockAuthenticate, "google"));

    await act(async () => {
      await Promise.resolve(); // Allow useEffect to run
    });

    expect(mockAuthenticate).toHaveBeenCalledWith({
      provider: "google",
      state: "testState",
      code: "testCode",
    });
    expect(toast.error).toHaveBeenCalledWith("Failed to log in");
    expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
  });

  it("should not call authenticate if state or code is missing", async () => {
    mockSearchParamsGet.mockReturnValueOnce(null).mockReturnValueOnce("testCode");

    renderHook(() => useSocialAuth(mockAuthenticate, "google"));

    await act(async () => {
      await Promise.resolve(); // Allow useEffect to run
    });

    expect(mockAuthenticate).not.toHaveBeenCalled();
  });

  it("should only run the effect once", async () => {
    mockSearchParamsGet.mockReturnValueOnce("testState").mockReturnValueOnce("testCode");
    mockAuthenticate.mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });

    const { rerender } = renderHook(() => useSocialAuth(mockAuthenticate, "google"));

    await act(async () => {
      await Promise.resolve();
    });

    rerender(); // Rerender to simulate component update

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
  });
});