"use server";
import prisma from "./client";

interface UserData {
  id: number;
  userName: string;
  email: string;
  password: string[];
}
export const updateProfile = async (data: UserData) => {
  const res = await prisma.user.update({
    where: {
      id: 20,
    },
    data: {
      userName: "Dzse",
    },
  });
  console.log(data);
  return;
};
