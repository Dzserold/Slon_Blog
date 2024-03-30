"use client";
import Image from "next/image";
import plusImg from "@/images/plus.svg";
import xImg from "@/images/x.svg";
import { useState } from "react";

interface Input {
  name: string;
  value: string;
}

export default function Home() {
  const [inputs, setInputs] = useState<Input[]>([]);

  const handleAddClick = () => {
    setInputs([...inputs, { name: "", value: "" }]);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const handleRemoveClick = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl">Making new Post</h1>
      <form className="flex flex-col w-8/12 gap-3 text-dark">
        <input
          placeholder="Title"
          className="px-3 py-1 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
        />

        <button
          type="button"
          className="flex items-center justify-center px-1 rounded-md bg-pink"
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
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {inputs.slice(0, 9).map((input, index) => (
            <div className="flex">
              <input
                key={index}
                placeholder="Category"
                type="text"
                className="w-full px-3 py-1 mr-2 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
                name={`input-${index}`}
                value={input.value}
                onChange={(event) => handleChange(index, event)}
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
          rows={8}
          placeholder="Content"
          className="px-3 py-1 border-4 border-black rounded-md outline-none text-md focus:border-dark_pink"
        />

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
