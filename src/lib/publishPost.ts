"use server";
import { z } from "zod";
import prisma from "./client";

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
      email: session.email,
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

  try {
    const res = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorName: session.userName,
        authorId: session.id,
        category: {
          create: categoriesData,
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
