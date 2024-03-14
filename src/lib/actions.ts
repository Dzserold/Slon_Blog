"use server";

import { User } from "@prisma/client";
import { prisma } from "./client";

export const registerUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  try {
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

    if (isUserExist)
      return {
        status: 400,
        message: "This username already taken",
      };

    if (isEmailExist)
      return {
        status: 400,
        message: "User already exist with this email",
      };

    const response = await prisma.user.create({
      data: {
        userName: data.userName,
        email: data.email,
        password: data.password,
      },
    });

    return { status: 200, message: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
};
