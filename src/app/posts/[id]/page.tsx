import { getPostById } from "@/lib/userPosts";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(params.id);

  if (!post) {
    redirect("/posts");
  }

  return (
    <div>
      {" "}
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
    </div>
  );
}
