"use server";
import prisma from "./client";

interface Post {
  category: {
    id: number;
    name: string;
  }[];

  title: string;
  content: string;
  authorId: number | null;
  authorName: string | null;
}

export const createPostDumy = async (data: Post) => {
  // CHECK IF CATEGORIES EXIST AND MAKE TWO ARRAYS OF IT
  const existingCategories = await prisma.category.findMany({
    where: {
      name: {
        in: data.category.map((category) => category.name),
      },
    },
  });

  const newCategories = await data.category.filter(
    (category) =>
      !existingCategories.some((c) => c.name === category.name)
  );

  //Push data to DB
  try {
    const res = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorName: data.authorName,
        authorId: data.authorId,
        category: {
          connect: [...existingCategories],
          create: [...newCategories],
        },
      },
    });

    return {
      status: 200,
      message: "Post created successfully",
    };
  } catch (error) {
    return {
      error,
      status: 500,
      message: "Something went wrong",
    };
  }
};
