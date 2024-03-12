"use server";

import { User } from "@prisma/client";
import prisma from "./client";

export const registerUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const isUserExist = await prisma.user.findFirst({
      where: {
        userName: data.userName,
      },
    });

    if (isUserExist) return "This username already taken";

    if (isEmailExist)
      return "User already exist with this email";

    const response = await prisma.user.create({
      data: {
        userName: data.userName,
        email: data.email,
        password: data.password,
      },
    });

    return "Successfully registered";
  } catch (error) {
    console.log(error);
    return "Something went wrong";
  }
};
