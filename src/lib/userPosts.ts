"use server";
import prisma from "./client";

export const getUserPosts = async (id: string) => {
  const post = await prisma.post.findMany({
    where: {
      authorId: Number(id),
    },
    include: {
      category: true,
    },
  });
  return post;
};

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
  return post;
};

export const getAllPosts = async (
  take: number,
  skip: number
) => {
  const post = await prisma.post.findMany({
    take: take,
    skip: skip,
    orderBy: {
      id: "asc",
    },
    include: {
      category: true,
    },
  });
  return post;
};
