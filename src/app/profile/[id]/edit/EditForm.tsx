"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import edit from "@/images/edit.svg";
import Image from "next/image";

interface User {
  id: number;
  userName: string;
  email: string;
}

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

export default function EditForm({
  id,
  session,
}: {
  id: string;
  session: User;
}) {
  console.log(session);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: session.userName,
      email: session.email,
    },
  });

  const update: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Update</h1>
      <h3 className="mb-3 text-sm font-light">
        You can update your profile. Click on the field you want
        to change
      </h3>
      <form
        onSubmit={handleSubmit(update)}
        className="flex flex-col gap-3 text-dark"
      >
        <div className="flex items-center gap-1">
          <input
            disabled={true}
            placeholder={session.userName}
            contentEditable="false"
            className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
            {...register("userName")}
          />
          <button
            className="flex items-center justify-center w-8 h-8 rounded-md bg-pink"
            type="button"
          >
            <Image
              src={edit}
              width={26}
              height={26}
              alt="edit"
            />
          </button>
        </div>
        {errors.userName && (
          <p className="mt-2 italic text-md text-error">
            {errors.userName?.message}
          </p>
        )}
        <div className="flex items-center gap-1">
          <input
            disabled={true}
            className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
            type="email"
            {...register("email")}
          />
          <button
            className="flex items-center justify-center w-8 h-8 rounded-md bg-pink"
            type="button"
          >
            <Image
              src={edit}
              width={26}
              height={26}
              alt="edit"
            />
          </button>
        </div>
        {errors.email && (
          <p className="mt-2 italic text-md text-error">
            {errors.email?.message}
          </p>
        )}
        <div className="flex items-center gap-1">
          <input
            placeholder="Password"
            className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
            type="password"
            {...register("password")}
          />
          <button
            className="flex items-center justify-center w-8 h-8 rounded-md bg-pink"
            type="button"
          >
            <Image
              src={edit}
              width={26}
              height={26}
              alt="edit"
            />
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 italic text-md text-error">
            {errors.password?.message}
          </p>
        )}
        <input
          hidden={true}
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
          Update
        </button>
      </form>
    </div>
  );
}
