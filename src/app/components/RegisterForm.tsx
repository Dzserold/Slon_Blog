"use client";

import Input from "@/app/components/Input";
import Link from "next/link";
import { FormEvent } from "react";

export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        }),
      });
      await console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Register</h1>
      <h3 className="mb-3 text-sm font-light">
        If you would like to create an account, please register
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 text-dark">
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Password" type="password" name="password" />

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
