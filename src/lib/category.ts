"use server";
import prisma from "./client";

export const getPostByCategoryId = async (id: number) => {
  const res = await prisma.post.findMany({
    where: {
      category: {
        some: {
          id: id,
        },
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return res;
};
