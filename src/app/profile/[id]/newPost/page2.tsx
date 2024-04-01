"use client";
import Image from "next/image";
import plusImg from "@/images/plus.svg";
import { useEffect, useState } from "react";
import { z } from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters"),
  content: z
    .string()
    .min(2, "Content should be at least 2 characters")
    .max(500, "Content  must be less than 500 characters"),
  categories: z.array(
    z
      .string()
      .nonempty({ message: "Category name is required" })
      .min(2, "Category name must be at least 2 characters")
  ),
});

type InputType = z.infer<typeof FormSchema>;

export default function Home() {
  // Handle categories
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const addCategories = () => {
    if (inputValue === "" || inputValue === " ") {
      return;
    }
    setCategories((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  const removeCategory = (index: number) => {
    // Remove the item at the specified index
    setCategories((prevArray) =>
      prevArray
        .slice(0, index)
        .concat(prevArray.slice(index + 1))
    );
    unregister(`categories.${index}`);
  };

  //Validate and handle Form publish
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const publishPost: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };
  useEffect(() => {
    console.log(errors.categories);
  }, [errors?.categories]);

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

        {errors.categories && (
          <p className="mt-2 italic text-md text-error">
            {errors.categories?.message}
          </p>
        )}
        <div className="grid grid-cols-2 text-center gap-y-3 md:grid-cols-3 min-h-8 text-light ">
          {categories[0] ? (
            categories.map((category, index) => (
              <div className="p-0 py-2 " key={index}>
                <input
                  value={category}
                  className="p-2 text-center rounded-md appearance-none cursor-default hover:border-r-dark_pink hover:bg-error caret-transparent focus:outline-none bg-dark_pink"
                  contentEditable={false}
                  {...register(`categories.${index}`)}
                  onClick={() => removeCategory(index)}
                />
              </div>
            ))
          ) : (
            <p className="col-span-3">
              Add Category tags to your post
            </p>
          )}
        </div>
        <div className="flex">
          <input
            value={inputValue}
            onChange={handleChange}
            placeholder="Category"
            type="text"
            className="w-full px-3 py-1 mr-2 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
          />

          <button
            disabled={categories.length === 9}
            type="button"
            className={`${
              categories.length > 8 ? "bg-dark_pink" : "bg-pink"
            } flex items-center self-center justify-center px-1 rounded-md w-60 `}
            onClick={addCategories}
          >
            ADD NEW
            <Image
              className="p-2"
              src={plusImg}
              alt="Plus icon"
              height={30}
              width={30}
            />
          </button>
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
