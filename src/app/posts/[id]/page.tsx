import { getPostById } from "@/lib/userPosts";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(Number(params.id));

  if (!post) {
    redirect("/posts");
  }

  return (
    <div>
      {" "}
      <article className="flex flex-col items-center justify-center gap-4 px-3">
        <h1 className="text-3xl">{post?.title}</h1>
        <div className="flex gap-2">
          {post?.category &&
            post.category.map((category) => (
              <Link
                href={`/category/${category.id}`}
                key={category.id}
              >
                <p className="px-2 rounded-md bg-dark_pink">
                  {category.name}
                </p>
              </Link>
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
