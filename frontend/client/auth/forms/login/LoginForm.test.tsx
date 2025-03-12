import React from "react";
import { screen, render, fireEvent, act, waitFor } from "@testing-library/react";
import { LoginConfig } from "../../configs/LoginConfig";
import { InputField } from "../../utils";
import { useForm, FormProvider } from "react-hook-form";

describe("Login Form Component", () => {
  it("Renders login form with correct attributes", () => {
    const TestComponent = () => {
      const form = useForm();
      const {
        register,
        formState: { errors },
        setValue,
      } = useForm();
      return (
        <FormProvider {...form}>
          <InputField
            register={register}
            errors={errors}
            setValue={setValue}
            config={LoginConfig}
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    LoginConfig.forEach((field) => {
      const input = screen.getByPlaceholderText(field.placeholder);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", field.type);
      expect(input).toHaveAttribute("id", field.id);
    });
  });
  it('does not apply "md:col-span-full" to the last input field', () => {
    const TestComponent = () => {
      const form = useForm();
      const {
        register,
        formState: { errors },
        setValue,
      } = useForm();
      return (
        <FormProvider {...form}>
          <InputField
            register={register}
            errors={errors}
            setValue={setValue}
            config={LoginConfig}
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const text_boxes = screen.getAllByRole("textbox");
    const password_field = screen.getAllByPlaceholderText("Password");
    const lastInput = [...text_boxes, ...password_field][LoginConfig.length - 1]
      .parentElement;
    expect(lastInput).not.toHaveClass("md:col-span-full");
  });

  it("trims input value when trimOnly is true and also converts value to lowercase when trimAndLower is true", () => {
    const TestComponent = () => {
      const form = useForm();
      const {
        register,
        formState: { errors },
        setValue,
      } = useForm();
      return (
        <FormProvider {...form}>
          <InputField
            register={register}
            errors={errors}
            setValue={setValue}
            config={LoginConfig}
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const email_input = screen.getByPlaceholderText(
      "Email"
    ) as HTMLInputElement;
    const password_input = screen.getByPlaceholderText(
      "Password"
    ) as HTMLInputElement;
    act(() => {
      fireEvent.change(password_input, {
        target: { value: "  Admin_2025!  " },
      });
      fireEvent.change(email_input, {
        target: { value: "  Admin@gmail.coM   " },
      });
    });
    expect(email_input.value).toBe("admin@gmail.com");
    expect(password_input.value).toBe("Admin_2025!");
  });
  it("displays validation errors", async () => {
    const TestComponent = () => {
      const form = useForm();
      const {
        register,
        formState: { errors },
        setValue,
      } = useForm();
      return (
        <FormProvider {...form}>
          <InputField
            register={register}
            errors={errors}
            setValue={setValue}
            config={LoginConfig}
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const password_input = screen.getByPlaceholderText("Password") as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: "muhamm@gmail" } });
    });
    act(() => {
        fireEvent.change(password_input, {target: {value: ' '}})
    })
    await waitFor(() => {
        expect(screen.getByText("Incorrect email!")).toBeInTheDocument();
       
    })
    await waitFor(() => {
        expect(screen.getByText("Password is required!")).toBeInTheDocument();
    })
  });
});
