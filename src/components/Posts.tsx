"use server";
import { getSession } from "@/lib/session";
import Link from "next/link";
import rightArrow from "@/images/right_arrow.svg";
import edit from "@/images/edit.svg";
import Image from "next/image";

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

interface PostArray {
  posts: Post[];
  tagId?: number;
}

export default async function Posts({
  posts,
  tagId,
}: PostArray) {
  const session = await getSession();

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
                <Link
                  key={categor.id}
                  href={`/category/${categor.id}`}
                >
                  <h4
                    className={`${
                      tagId && tagId === categor.id
                        ? "bg-dark text-error"
                        : "bg-dark_pink"
                    }  rounded-md hover:scale-105`}
                  >
                    {categor.name.slice(0, 9)}
                  </h4>
                </Link>
              );
            })}
          </div>
          <p className="px-1 text-sm text-center">
            {post.content.slice(0, 200)}...
          </p>
          <div
            className={`${
              session.isLoggedIn &&
              session.userId === post.authorId?.toString()
                ? "justify-around"
                : "justify-center"
            } flex gap-2`}
          >
            <Link
              className="flex gap-1 px-2 text-center rounded-md text-dark hover:scale-105 bg-pink"
              href={`/posts/${post.id}`}
            >
              To Post
              <Image src={rightArrow} alt="right arrow" />
            </Link>
            {session.isLoggedIn &&
              session.userId === post.authorId?.toString() && (
                <Link
                  className="flex items-center gap-1 px-2 text-center rounded-md text-dark hover:scale-105 bg-pink"
                  href={`/posts/${post.id}/edit`}
                >
                  Edit
                  <Image
                    src={edit}
                    alt="edit"
                    className="w-auto h-auto"
                  />
                </Link>
              )}
          </div>
        </article>
      ))}
    </div>
  );
}
