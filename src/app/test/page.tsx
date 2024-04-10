import PaginationControls from "@/components/PaginationControls";
import Posts from "@/components/Posts";
import { getAllPosts } from "@/lib/userPosts";

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

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const post = await getAllPosts();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = post.slice(start, end);

  return (
    <div>
      <Posts posts={entries} />
      <PaginationControls
        hasNextPage={end < post.length}
        hasPrevPage={start > 0}
        length={post.length}
      />
    </div>
  );
}
