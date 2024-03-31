"use client";
import Image from "next/image";
import plusImg from "@/images/plus.svg";
import xImg from "@/images/x.svg";
import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Input {
  name: string;
  value: string;
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
  const [inputs, setInputs] = useState<Input[]>([]);

  const handleAddClick = () => {
    setInputs([
      ...inputs,
      { name: `${inputs.length}`, value: "" },
    ]);
  };

  const handleRemoveClick = (index: number) => {
    // Remove the item at the specified index

    setInputs((prevState) =>
      prevState.filter((item) => item.name !== index.toString())
    );

    // Unregister the removed input from React Hook Form
    unregister(`categories.${index}`);

    console.log(inputs);
  };

  //Validate and handle Form publish
  const {
    control,
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
          disabled={inputs.length === 9}
          type="button"
          className={`${
            inputs.length > 8 ? "bg-dark_pink" : "bg-pink"
          } flex items-center self-center justify-center px-1 rounded-md w-60 `}
          onClick={handleAddClick}
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
        {errors.categories && (
          <p className="mt-2 italic text-md text-error">
            {errors.categories?.message}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {inputs.slice(0, 9).map((input, index) => (
            <div className="flex" key={index}>
              <input
                key={index}
                {...register(`categories.${index}`)}
                placeholder="Category"
                type="text"
                className="w-full px-3 py-1 mr-2 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
              />
              <button
                type="button"
                onClick={() => handleRemoveClick(index)}
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
