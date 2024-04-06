import Posts from "@/components/Posts";

import { getUserPosts } from "@/lib/userPosts";
import Link from "next/link";

const page = async () => {
  const posts = await getUserPosts("20");
  console.log(posts);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 ">
      {posts?.map((post) => (
        <article
          className="flex flex-col gap-2 p-1 bg-black rounded-md"
          key={post.id}
        >
          <h3 className="text-xl text-center text-light">
            {post.title}
          </h3>
          <div className="grid grid-cols-3 gap-1 text-center">
            {post.category.map((categor) => {
              return (
                <h4 className="bg-dark_pink" key={categor.id}>
                  {categor.name.slice(0, 10)}
                </h4>
              );
            })}
          </div>
          <p className="px-1 text-sm text-center">
            {post.content.slice(0, 200)}...
          </p>
          <Link
            className="self-center w-5/12 text-center rounded-md bg-pink"
            href={`/posts/${post.id}`}
          >
            To Post
          </Link>
        </article>
      ))}
    </div>
  );
};

export default page;
