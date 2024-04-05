"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import edit from "@/images/edit.svg";
import Image from "next/image";
import { useState } from "react";
import { updateProfile } from "@/lib/update";
import { toast } from "react-toastify";

interface User {
  id: number;
  userName: string;
  email: string;
}

const FormSchema = z
  .object({
    userName: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(45, "Username  must be less than 45 characters")
      .regex(
        new RegExp("^[a-zA-Z0-9.@_-]+$"),
        "This username is not valid"
      ),
    email: z
      .string()
      .email("Please enter a valid email address"),

    password: z
      .array(
        z
          .string()
          .min(6, "Password must be at least 6 characters")
          .max(50, "Password must be at less than 50 characters")
      )
      .nonempty("You need to confirm with password")
      .max(3),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length === 3) {
        return data.password[1] === data.password[2];
      } else return true; // Allow empty or single-character passwords (optional)
    },
    {
      message: "Password and confirm password doesn't match",
      path: ["password"],
    }
  );

type InputType = z.infer<typeof FormSchema>;

export default function EditForm({
  session,
}: {
  session: User;
}) {
  const [usernameClosed, setUsernameClosed] = useState(true);
  const [emailClosed, setEmailClosed] = useState(true);
  const [newPassClosed, setNewPassClosed] = useState(true);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: session.userName,
      email: session.email,
      password: [""],
    },
  });

  const update: SubmitHandler<InputType> = async (formData) => {
    const res = await updateProfile({
      id: session.id,
      ...formData,
    });

    if (res.status === 200) {
      toast.success(res.message, { theme: "colored" });
      reset();
    } else if (res.status === 400) {
      toast.warning(res.message, { theme: "colored" });
    } else
      toast.error("Something went wrong", { theme: "colored" });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Update</h1>
      <h3 className="mb-3 text-sm font-light">
        You can update your profile. Click on the the button by
        the field you want to change
      </h3>
      <form
        onSubmit={handleSubmit(update)}
        className="flex flex-col gap-3 text-dark"
      >
        {errors.userName && (
          <p className="mt-2 italic text-md text-error">
            {errors.userName?.message}
          </p>
        )}
        <div className="flex items-center gap-1">
          <input
            disabled={usernameClosed}
            placeholder={session.userName}
            contentEditable="false"
            className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
            {...register("userName")}
          />
          <button
            onClick={() => setUsernameClosed(!usernameClosed)}
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
            disabled={emailClosed}
            className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
            type="email"
            {...register("email")}
          />
          <button
            onClick={() => setEmailClosed(!emailClosed)}
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
        {errors.password?.[0] && (
          <p className="mt-2 italic text-md text-error">
            {"Enter your current password"}
          </p>
        )}
        <div className="flex items-center gap-1">
          <input
            {...register("password.0")}
            placeholder="Current Password"
            className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
            type="password"
          />
          <button
            disabled={!newPassClosed}
            onClick={() => {
              setNewPassClosed(false);
            }}
            className={`${
              !newPassClosed ? "bg-dark_pink" : "bg-pink"
            } flex items-center justify-center w-8 h-8 rounded-md `}
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
        {errors.password?.root && (
          <p className="mt-2 italic text-md text-error">
            {errors.password?.root?.message}
          </p>
        )}
        {errors.password?.[1] && (
          <p className="mt-2 italic text-md text-error">
            {errors.password?.[1]?.message}
          </p>
        )}
        <input
          {...(!newPassClosed && {
            ...register("password.1"),
          })}
          hidden={newPassClosed}
          placeholder="New Password"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          type="password"
        />
        {errors.password?.[2] && (
          <p className="mt-2 italic text-md text-error">
            {errors.password?.[2]?.message}
          </p>
        )}
        <input
          {...(!newPassClosed && {
            ...register("password.2"),
          })}
          hidden={newPassClosed}
          placeholder="Confirm Password"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          type="password"
        />
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
