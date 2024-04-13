"use client";
import { getAllPosts } from "@/lib/userPosts";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { countPostLength } from "@/lib/publishPost";

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

export default function Search() {
  const [randomPost, setRandomPost] = useState<Post | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Post[] | null>();
  const [results, setResults] = useState<Post[] | null>();

  const fetchRandomPost = async () => {
    const postLength = await countPostLength();
    const randNum = Math.floor(Math.random() * postLength);
    const data = await getAllPosts(1, randNum);
    console.log(data);
    setRandomPost(data[0]);
  };

  useEffect(() => {
    fetchRandomPost();
  }, []);

  const fetchData = async () => {
    const posts = await getAllPosts(1000, 0);
    setData(posts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterPost = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");

    const found = data?.filter(
      (search) =>
        regex.test(search.title) ||
        search.category.some((category) =>
          regex.test(category.name)
        )
    );
    return found;
  };

  //Handle input typing
  useEffect(() => {
    const searchResult = filterPost(search);

    if (search === "" || search === "") {
      setResults(null);
    } else {
      setResults(searchResult);
    }
  }, [search]);

  return (
    <section className="flex flex-col items-center justify-start gap-4 min-h-[75vh]">
      <input
        className="p-2 text-center text-black border-4 border-black rounded-lg outline-none justify-self-start w-72 text-md focus:border-dark_pink"
        placeholder="Search posts title or category"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />

      {results ? (
        <article className="grid grid-cols-1 gap-2 px-3 md:grid-cols-2">
          {results.map((post, index) => {
            return (
              <PostCard key={index} post={post} query={search} />
            );
          })}
        </article>
      ) : (
        randomPost && (
          <PostCard post={randomPost} query={search} />
        )
      )}
    </section>
  );
}
