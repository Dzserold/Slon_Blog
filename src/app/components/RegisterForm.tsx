"use client";

import Input from "@/app/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    userName: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(45, "First Name must be less than 45 characters")
      .regex(
        new RegExp("^[a-zA-Z]+$"),
        "No special character allowed!"
      ),
    email: z
      .string()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match",
    path: ["password", "confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const registerUser = (data: InputType) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Register</h1>
      <h3 className="mb-3 text-sm font-light">
        If you would like to create an account, please register
      </h3>
      <form
        onSubmit={handleSubmit(registerUser)}
        className="flex flex-col gap-3 text-dark"
      >
        <Input
          placeholder="Username"
          type="text"
          {...register("userName")}
        />
        {errors.userName && (
          <p className="mt-2 italic text-md text-error">
            {errors.userName?.message}
          </p>
        )}
        <Input placeholder="Email" type="email" name="email" />
        <Input
          placeholder="Password"
          type="password"
          name="password"
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
        />

        <button
          type="submit"
          className="inline-block text-lg font-bold rounded-md bg-pink hover:bg-dark_pink"
        >
          REGISTER
        </button>
      </form>
      <h3 className="mt-3 text-sm font-light">
        Already have an account?
        <Link
          className="ml-1 text-base text-pink hover:text-dark_pink"
          href="/login"
        >
          Login
        </Link>
      </h3>
    </div>
  );
}
