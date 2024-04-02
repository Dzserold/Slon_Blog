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

  const userId = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (!user || !userId)
    return {
      status: 400,
      message: "Invalid credentials",
    };

  console.log(user, userId);
  return;
};
