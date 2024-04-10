"use client";
import { seedPost } from "@/lib/seed";
import { getPostById } from "@/lib/userPosts";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function page() {
  const [post, setPost] = useState<Post | null>();
  useEffect(() => {
    const getPost = async () => {
      const pos = await getPostById("31");

      setPost(pos);
    };
    getPost();
  }, []);

  console.log(post);

  return (
    <article className="flex gap-4 flex-col justify-center items-center px-3">
      <h1 className="text-3xl">{post?.title}</h1>
      <div className="flex gap-2">
        {post?.category &&
          post.category.map((category) => (
            <p className="bg-dark_pink rounded-md px-2">
              {category.name}
            </p>
          ))}
      </div>
      <h3 className="text-light">{post?.content}</h3>
      <Link href={`/profile/${post?.authorId}`}>
        <h4 className="hover:scale-110">
          Written By:{" "}
          <span className="text-dark_pink">
            {post?.authorName}
          </span>
        </h4>
      </Link>
    </article>
  );
}
