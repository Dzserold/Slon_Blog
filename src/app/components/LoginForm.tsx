"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter your email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const logIn: SubmitHandler<InputType> = async (data) => {
    console.log(data);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Login</h1>
      <h3 className="mb-3 text-sm font-light">
        If you have an account already, please log in
      </h3>
      <form
        onSubmit={handleSubmit(logIn)}
        className="flex flex-col gap-3 text-dark"
      >
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
        />
        {errors.email && (
          <p className="mt-2 italic text-md text-error">
            {errors.email?.message}
          </p>
        )}
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
        />
        {errors.password && (
          <p className="mt-2 italic text-md text-error">
            {errors.password?.message}
          </p>
        )}

        <button className="inline-block text-lg font-bold rounded-md bg-pink hover:bg-dark_pink">
          LOGIN
        </button>
      </form>
      <h3 className="mt-3 text-sm font-light">
        Don&apos;t have an account?
        <Link
          className="ml-1 text-base text-pink hover:text-dark_pink"
          href="/register"
        >
          Register
        </Link>
      </h3>
    </div>
  );
};

export default LoginForm;
