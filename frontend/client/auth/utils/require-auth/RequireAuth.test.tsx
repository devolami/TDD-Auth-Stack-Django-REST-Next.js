import React from "react";

import { render } from "@testing-library/react";
import RequireAuth from "./RequireAuth";
import { useAppSelector } from "../../../../redux/hooks";
import { redirect } from "next/navigation";

jest.mock("../../../../redux/hooks", () => ({
   useAppSelector: jest.fn()
}));

jest.mock("next/navigation", () => ({
    redirect: jest.fn()
}));

describe("RequireAuth", () => {
  it("it renders loader when isLoading is true", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
    });

    const { getByRole } = render(
      <RequireAuth>
        <div>Protected Content</div>
      </RequireAuth>
    );
    expect(
      getByRole("heading", { name: "Authenticating..." })
    ).toBeInTheDocument();
  });

  it("renders children when isAuthenticated is true", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    });

    const { getByText } = render(
      <RequireAuth>
        <div>Protected Content</div>
      </RequireAuth>
    );

    expect(getByText("Protected Content")).toBeInTheDocument();
  });
  it("redirects to /auth/login when isAuthenticated if false", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
        isLoading: false,
        isAuthenticated: false,
      });
      render(<RequireAuth><div>Protected Content</div></RequireAuth>);
      expect(redirect).toHaveBeenCalledWith("/auth/login")
  })
});
