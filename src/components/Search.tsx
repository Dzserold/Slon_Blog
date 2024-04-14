"use client";
import {
  getAllPosts,
  getPostsByQuery,
  countPostLength,
} from "@/lib/userPosts";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

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
  const [results, setResults] = useState<Post[] | null>();

  // Gets a random post from DB
  const fetchRandomPost = async () => {
    const postLength = await countPostLength();
    const randNum = Math.floor(Math.random() * postLength);
    const data = await getAllPosts(1, randNum);
    setRandomPost(data[0]);
  };

  useEffect(() => {
    fetchRandomPost();
  }, []);

  // get posts based on query
  const getPost = async (query: string) => {
    if (search === "" || query === "" || query.length < 3) {
      setResults(null);
    } else {
      const posts = await getPostsByQuery(query);
      setResults(posts);
      console.log(results);
    }
  };

  // Start looking for post based on usertyping
  useEffect(() => {
    getPost(search);
  }, [search]);

  return (
    <section className="flex flex-col items-center justify-start gap-4 min-h-[75vh]">
      <input
        className="p-2 text-center text-black border-4 border-black rounded-lg outline-none justify-self-start w-72 text-md focus:border-dark_pink"
        placeholder="Search posts title or category"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />

      {results && search.length > 2 ? (
        <article className="grid grid-cols-1 gap-2 px-3 md:grid-cols-2">
          {results.map((post, index) => {
            return (
              <PostCard key={index} post={post} query={search} />
            );
          })}
        </article>
      ) : (
        randomPost && (
          <div className="px-3">
            <PostCard post={randomPost} query="" />
          </div>
        )
      )}
    </section>
  );
}
