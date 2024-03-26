"use server";
import { User } from "@prisma/client";
import prisma from "./client";
import { getSession } from "./functions";

export const Login = async (
  data: Omit<User, "userName" | "id" | "createdAt" | "updatedAt">
) => {
  //Check if user exist
  const user = await prisma.user.findFirst({
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
};

// const session = await getSession();
// session.userId = "1";
// session.username = username;
// session.isPro = isPro;
// session.isLoggedIn = true;

// await session.save();
// redirect("/");
