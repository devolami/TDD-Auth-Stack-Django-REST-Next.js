// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import Page from "./page";
// import { useActivationMutation } from "../../../../redux/features/authApiSlice";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// jest.mock("../../../../redux/features/authApiSlice");
// jest.mock("react-toastify");
// jest.mock("next/navigation");

// describe("Activation Page", () => {
//   const mockActivation = jest.fn();
//   const mockRouterPush = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (useActivationMutation as jest.Mock).mockReturnValue([mockActivation]);
//     (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
//   });

//   it("should display loader and activate successfully", async () => {
//     mockActivation.mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });

//     render(
//       <Page params={{ uid: "testUid", token: "testToken" }} />
//     );

//     expect(screen.getByRole("heading", { name: "Activating your account..." })).toBeInTheDocument();

//     await waitFor(() => {
//       expect(mockActivation).toHaveBeenCalledWith({
//         uid: "testUid",
//         token: "testToken",
//       });
//     });

//     await waitFor(() => {
//       expect(toast.success).toHaveBeenCalledWith("Account activated");
//       expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
//     });
//   });

//   it("should display loader and handle activation failure", async () => {
//     mockActivation.mockReturnValue({
//       unwrap: jest.fn().mockRejectedValue(new Error("Activation failed")),
//     });

//     render(
//       <Page params={{ uid: "testUid", token: "testToken" }} />
//     );

//     expect(screen.getByRole("heading", { name: "Activating your account..." })).toBeInTheDocument();

//     await waitFor(() => {
//       expect(mockActivation).toHaveBeenCalledWith({
//         uid: "testUid",
//         token: "testToken",
//       });
//     });

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith("Failed to activate account");
//       expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
//     });
//   });

//   it("should call router.push even if activation fails", async () => {
//     mockActivation.mockReturnValue({
//       unwrap: jest.fn().mockRejectedValue(new Error("Activation failed")),
//     });

//     render(
//       <Page params={{ uid: "testUid", token: "testToken" }} />
//     );
//     await waitFor(() => {
//         expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
//     })

//   });
// });
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import { useActivationMutation } from "../../../../redux/features/authApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux"; // Import Provider
import { store } from "../../../../redux/store"; // Import your Redux store

jest.mock("../../../../redux/features/authApiSlice");
jest.mock("react-toastify");
jest.mock("next/navigation");

jest.mock("../../../../client/auth/utils/Setup", () => ({
    Setup: () => null,
  }));


describe("Activation Page", () => {
  const mockActivation = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useActivationMutation as jest.Mock).mockReturnValue([mockActivation]);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("should display loader and activate successfully", async () => {
    mockActivation.mockReturnValue({ unwrap: jest.fn().mockResolvedValue({}) });

    render(
      <Provider store={store}>
        <Page params={{ uid: "testUid", token: "testToken" }} />
      </Provider>
    );

    expect(screen.getByRole("heading", { name: "Activating your account..." })).toBeInTheDocument();

    await waitFor(() => {
      expect(mockActivation).toHaveBeenCalledWith({
        uid: "testUid",
        token: "testToken",
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Account activated");
      expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
    });
  });

  it("should display loader and handle activation failure", async () => {
    mockActivation.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(new Error("Activation failed")),
    });

    render(
      <Provider store={store}>
        <Page params={{ uid: "testUid", token: "testToken" }} />
      </Provider>
    );

    expect(screen.getByRole("heading", { name: "Activating your account..." })).toBeInTheDocument();

    await waitFor(() => {
      expect(mockActivation).toHaveBeenCalledWith({
        uid: "testUid",
        token: "testToken",
      });
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to activate account");
      expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
    });
  });

  it("should call router.push even if activation fails", async () => {
    mockActivation.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(new Error("Activation failed")),
    });

    render(
      <Provider store={store}>
        <Page params={{ uid: "testUid", token: "testToken" }} />
      </Provider>
    );
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
    });
  });
});