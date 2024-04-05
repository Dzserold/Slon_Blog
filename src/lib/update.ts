"use server";
import { z } from "zod";
import prisma from "./client";
import bcrypt from "bcrypt";

interface UserData {
  id: number;
  userName: string;
  email: string;
  password: string[];
}

const FormSchema = z
  .object({
    id: z.number(),
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

export const updateProfile = async (data: UserData) => {
  //Validate data
  const isValid = FormSchema.safeParse(data);
  if (!isValid.success) {
    return {
      status: 400,
      message: "Invalid data",
    };
  }
  // Validate user
  const user = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!user) return { status: 400, message: "Invalid data" };

  //Check if user password is correct
  const isPassCorrect = bcrypt.compareSync(
    data.password[0],
    user.password
  );

  if (!isPassCorrect)
    return { status: 400, message: "Invalid data" };

  //Update user in DB
  if (data.password.length > 1) {
    const hashedPass = await bcrypt.hashSync(
      data.password[2],
      13
    );

    const res = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        userName: data.userName,
        email: data.email,
        password: hashedPass,
      },
    });
  } else {
    const res = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        userName: data.userName,
        email: data.email,
      },
    });
  }

  return {
    status: 200,
    message: "Successfully updated Your profile",
  };
};
