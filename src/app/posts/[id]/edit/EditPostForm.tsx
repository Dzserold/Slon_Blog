"use client";
import Image from "next/image";
import plusImg from "@/images/plus.svg";
import xImg from "@/images/x.svg";
import { z } from "zod";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserDataClient } from "@/lib/session";
import { toast } from "react-toastify";

interface User {
  id: number;
  userName: string;
  email: string;
}

interface Post {
  category: {
    id: number;
    name: string;
  }[];
  id: number;
  title: string;
  content: string;
  authorId: number | null;
  authorName: string | null;
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

export default function EditPostForm({ post }: { post: Post }) {
  //Validate and handle Form publish
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      categories: [
        ...post.category.map((category) => ({
          name: category.name,
        })),
      ],
    },
  });

  // Handle dynamic inputs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const publishPost: SubmitHandler<InputType> = async (data) => {
    const session = await getUserDataClient();

    console.log(data);
    // const result =
    // if (result.status === 200) {
    //   toast.success(result.message, { theme: "colored" });
    //   reset();
    // } else
    //   toast.warning(result.message || "Something went wrong", {
    //     theme: "colored",
    //   });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl">Making new Post</h1>
      <form
        onSubmit={handleSubmit(publishPost)}
        className="flex flex-col w-8/12 gap-3 text-dark"
      >
        <input
          {...register("title")}
          placeholder="Title"
          className="px-3 py-1 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
        />
        {errors.title && (
          <p className="mt-2 italic text-md text-error">
            {errors.title?.message}
          </p>
        )}

        <button
          onClick={() => append({ name: "" })}
          disabled={fields.length === 9}
          type="button"
          className={`${
            fields.length > 8 ? "bg-dark_pink" : "bg-pink"
          } flex items-center self-center justify-center px-1 rounded-md w-60 `}
        >
          ADD NEW CATEGORY
          <Image
            className="p-2"
            src={plusImg}
            alt="Plus icon"
            height={30}
            width={30}
          />
        </button>
        {errors.categories?.message && (
          <p className="mt-2 italic text-md text-error">
            {errors.categories?.message}
          </p>
        )}
        {errors.categories?.root && (
          <p className="mt-2 italic text-md text-error">
            {errors.categories?.root.message}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {fields.slice(0, 9).map((field, index) => (
            <div className="flex flex-col" key={field.id}>
              <div className="flex ">
                <input
                  key={index}
                  {...register(`categories.${index}.name`)}
                  placeholder="Category"
                  type="text"
                  className="w-full px-3 py-1 mr-2 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Image
                    className="w-6"
                    src={xImg}
                    alt="X icon"
                    height={40}
                    width={40}
                  />
                </button>
              </div>
              {errors.categories && errors.categories[index] && (
                <p className="text-error ">
                  {errors.categories[index]?.name?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <textarea
          {...register("content")}
          rows={8}
          placeholder="Content"
          className="px-3 py-1 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
        />
        {errors.content && (
          <p className="mt-2 italic text-md text-error">
            {errors.content?.message}
          </p>
        )}
        <button
          type="submit"
          className="self-center inline-block text-lg font-bold rounded-md w-36 bg-pink hover:bg-dark_pink"
        >
          PUBLISH POST
        </button>
      </form>
    </div>
  );
}
