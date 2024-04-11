import PaginationControls from "@/components/PaginationControls";
import Posts from "@/components/Posts";
import prisma from "@/lib/client";
import { getAllPosts } from "@/lib/userPosts";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const perPage = searchParams["per_page"] ?? "12";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const postLength = await prisma.post.count();
  const post = await getAllPosts(Number(perPage), start);

  return (
    <div className="flex flex-col gap-3 text-center ">
      <h1 className="text-3xl">Here you can check our posts</h1>
      <h3>They are sorted by release date</h3>
      <Posts posts={post} />
      {postLength > Number(perPage) && (
        <PaginationControls
          hasNextPage={end < postLength}
          hasPrevPage={start > 0}
          length={postLength}
        />
      )}
    </div>
  );
}
