import React from "react";
import { renderHook, act } from "@testing-library/react";
import useVerify from "./use-verify";
import { useAppDispatch } from "../../../../redux/hooks";
import { setAuth, finishInitialLoad } from "../../../../redux/features/authSlice";
import { useVerifyMutation } from "../../../../redux/features/authApiSlice";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";

jest.mock("../../../../redux/hooks");
jest.mock("../../../../redux/features/authApiSlice", () => ({
    useVerifyMutation: jest.fn(),
  }));


describe("useVerify", () => {
  const mockDispatch = jest.fn();
  let mockVerify: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    mockVerify = jest.fn(() => ({
      unwrap: jest.fn().mockResolvedValue({}),
    }));

    (useVerifyMutation as jest.Mock).mockReturnValue([mockVerify, { isLoading: false }]);
  });

  it("should call verify and dispatch setAuth on success", async () => {
    renderHook(() => useVerify(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockVerify).toHaveBeenCalled(); 
    expect(mockDispatch).toHaveBeenCalledWith(setAuth());
    expect(mockDispatch).toHaveBeenCalledWith(finishInitialLoad());
  });

  it("should call verify and dispatch finishInitialLoad on failure", async () => {
    mockVerify = jest.fn(() => ({
      unwrap: jest.fn().mockRejectedValue(new Error("Verification failed")),
    }));
    (useVerifyMutation as jest.Mock).mockReturnValue([mockVerify, { isLoading: false }]);

    renderHook(() => useVerify(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockVerify).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(finishInitialLoad());
    expect(mockDispatch).not.toHaveBeenCalledWith(setAuth());
  });

  it("should dispatch finishInitialLoad even if verify fails", async () => {
    mockVerify = jest.fn(() => ({
      unwrap: jest.fn().mockRejectedValue(new Error("Verification failed")),
    }));
    (useVerifyMutation as jest.Mock).mockReturnValue([mockVerify, { isLoading: false }]);

    renderHook(() => useVerify(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockDispatch).toHaveBeenCalledWith(finishInitialLoad());
  });
});
