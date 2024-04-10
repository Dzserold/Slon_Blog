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

export const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
    },
  });
  return post;
};

export const getAllPosts = async () => {
  const post = await prisma.post.findMany({
    include: {
      category: true,
    },
  });
  return post;
};
