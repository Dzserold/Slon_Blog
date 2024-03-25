"use client";

import { registerUser } from "@/lib/register";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z
  .object({
    userName: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(45, "First Name must be less than 45 characters")
      .regex(
        new RegExp("^[a-zA-Z0-9.@_-]+$"),
        "This username is not valid"
      ),
    email: z
      .string()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at less than 50 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveUser: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await registerUser(data);
      console.log(result);
      if (result.status === 200) {
        toast.success(result.message, { theme: "colored" });
      } else {
        toast.warning(result.message, { theme: "colored" });
      }
    } catch (error) {
      toast.error("Something went wrong", { theme: "colored" });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Register</h1>
      <h3 className="mb-3 text-sm font-light">
        If you would like to create an account, please register
      </h3>
      <form
        onSubmit={handleSubmit(saveUser)}
        className="flex flex-col gap-3 text-dark"
      >
        <input
          placeholder="Username"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          {...register("userName")}
        />
        {errors.userName && (
          <p className="mt-2 italic text-md text-error">
            {errors.userName?.message}
          </p>
        )}
        <input
          placeholder="Email"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-2 italic text-md text-error">
            {errors.email?.message}
          </p>
        )}
        <input
          placeholder="Password"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-2 italic text-md text-error">
            {errors.password?.message}
          </p>
        )}
        <input
          placeholder="Connfirm Password"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="mt-2 italic text-md text-error">
            {errors.confirmPassword?.message}
          </p>
        )}
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
