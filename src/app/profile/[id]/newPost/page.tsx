import Image from "next/image";
import image from "@/images/plus.svg";

export default function Home() {
  return (
    <div className="flex gap-4 flex-col items-center ">
      <h1 className="text-2xl">Making new Post</h1>
      <form className="w-10/12 flex flex-col gap-3 text-dark">
        <input
          placeholder="Title"
          className="px-3 py-1 border-4 border-black rounded-md outline-none  text-md focus:border-dark_pink"
        />
        <div className="flex flex-wrap gap-3">
          <Image
            className="bg-dark_pink"
            src={image}
            alt="Plus icon"
            height={30}
            width={30}
          />

          <input
            placeholder="Category"
            className="w-36 px-3 py-1 border-4 border-black rounded-md outline-none  text-md focus:border-dark_pink"
            type="email"
          />
          <input
            placeholder="Category"
            className="w-36 px-3 py-1 border-4 border-black rounded-md outline-none  text-md focus:border-dark_pink"
            type="email"
          />
        </div>

        <textarea
          placeholder="Content"
          className="px-3 py-1 border-4 border-black rounded-md outline-none  text-md focus:border-dark_pink"
        />

        <button
          type="submit"
          className="inline-block text-lg font-bold rounded-md bg-pink hover:bg-dark_pink"
        >
          PUBLISH POST
        </button>
      </form>
    </div>
  );
}
