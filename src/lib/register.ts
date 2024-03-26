"use server";

import { User } from "@prisma/client";
import prisma from "./client";
import { z } from "zod";
import bcrypt from "bcrypt";

const FormSchema = z.object({
  userName: z
    .string()
    .min(2, "First Name must be at least 2 characters")
    .max(45, "First Name must be less than 45 characters")
    .regex(
      new RegExp("^[a-zA-Z0-9.@_-]+$"),
      "Enter a valid username"
    ),
  email: z.string().email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at less than 50 characters"),
});

export const registerUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  // Check if data is valid
  const isValid = FormSchema.safeParse(data);
  if (!isValid.success) {
    return {
      status: 400,
      message: "Invalid credentials",
    };
  }

  try {
    // Check if user is already registered
    const isEmailExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const isUserExist = await prisma.user.findFirst({
      where: {
        userName: data.userName,
      },
    });

    if (isUserExist || isEmailExist)
      return {
        status: 400,
        message: "This user is already exist.",
      };

    // Register user
    const hashedPass = await bcrypt.hashSync(data.password, 13);
    const response = await prisma.user.create({
      data: {
        userName: data.userName,
        email: data.email,
        password: hashedPass,
      },
    });

    return { status: 200, message: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
};
