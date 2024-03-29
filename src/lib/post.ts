"use server";
import prisma from "./client";

export const createPost = async () => {
  try {
    const post = await prisma.post.create({
      data: {
        title: "test",
        content: "test",
        authorId: 19,
      },
    });

    console.log(post);

    return { status: 200, message: "success" };
  } catch (error) {
    console.log(error);
  }
};
