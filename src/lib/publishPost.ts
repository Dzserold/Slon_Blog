"use server";
import { z } from "zod";
import prisma from "./client";
import { Post } from "@prisma/client";

interface User {
  id: number;
  userName: string;
  email: string;
}

const FormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters"),
  content: z
    .string()
    .min(2, "Content should be at least 2 characters")
    .max(500, "Content  must be less than 500 characters"),
  categories: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Category name must be at least 2 characters")
          .max(
            20,
            "Category name must be less than 20 characters"
          ),
      })
    )
    .nonempty({
      message: "Post must have at least one category",
    })
    .max(6, "Post must have maximum 6 categories"),
});

type InputType = z.infer<typeof FormSchema>;

export const createPost = async (
  data: InputType,
  session: User
) => {
  // Validate User and its Post data
  const isValid = FormSchema.safeParse(data);
  if (!isValid.success) {
    return {
      status: 400,
      message: "Data validation failed",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (!user)
    return {
      status: 400,
      message: "Invalid credentials",
    };

  // Creating Post in DB
  const categoriesData = data.categories.map((category) => {
    return {
      name: category.name,
    };
  });

  console.log(data.categories);
  try {
    const res = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorName: session.userName,
        authorId: session.id,
        category: {
          connectOrCreate: {
            where: {
              name: categoriesData[0].name,
            },
            create: {
              name: categoriesData[0].name,
            },
          },
        },
      },
    });

    return {
      status: 200,
      message: "Post created successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

export const editPost = async (
  post: Post,
  data: InputType,
  session: User
) => {
  // Validate User and its Post data
  const isValid = FormSchema.safeParse(data);
  if (!isValid.success) {
    return {
      status: 400,
      message: "Data validation failed",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  const prevPost = await prisma.post.findUnique({
    where: {
      id: post.id,
    },
  });

  if (!user || !prevPost || prevPost.authorId !== user.id) {
    return {
      status: 400,
      message: "Action denied due authorization error",
    };
  }

  // Creating Post in DB
  const categoriesData = data.categories.map((category) => {
    return {
      name: category.name,
    };
  });

  try {
    const categor = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        category: {},
      },
    });

    const res = await prisma.post.update({
      where: {
        id: post.id,
        authorId: session.id,
      },
      data: {
        title: data.title,
        content: data.content,
        category: {
          create: categoriesData,
        },
      },
    });

    return {
      categor,
      status: 200,
      message: "Post created successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
