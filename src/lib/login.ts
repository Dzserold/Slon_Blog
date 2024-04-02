"use server";
import { User } from "@prisma/client";
import prisma from "./client";
import bcrypt from "bcrypt";
import { getSession } from "./session";

export const Login = async (
  data: Omit<User, "userName" | "id" | "createdAt" | "updatedAt">
) => {
  //Check if user exist
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user)
    return {
      status: 400,
      message: "Invalid credentials",
    };

  // Check if password correct
  const isPassCorrect = bcrypt.compareSync(
    data.password,
    user.password
  );

  if (!isPassCorrect)
    return {
      status: 400,
      message: "Invalid credentials",
    };

  try {
    const session = await getSession();
    session.userId = user.id.toString();
    session.userName = user.userName;
    session.isLoggedIn = true;

    await session.save();

    return {
      status: 200,
      message: "Successfull login",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
