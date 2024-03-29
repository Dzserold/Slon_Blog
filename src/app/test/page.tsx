"use client";

import { createPost } from "@/lib/post";

const page = async () => {
  const newPost = async (e: any) => {
    e.preventDefault();
    const post = await createPost();
    console.log(post);
  };

  return (
    <div>
      <form onSubmit={newPost}>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default page;
