"use client";

import { seedPost } from "@/lib/seed";
import { getUserPosts } from "@/lib/userPosts";
import { useEffect } from "react";

const page = () => {
  const getPosts = async () => {
    const posts = await getUserPosts("20");
    console.log(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div></div>;
};

export default page;
