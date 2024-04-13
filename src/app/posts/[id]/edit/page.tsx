import { getPostById } from "@/lib/userPosts";
import EditPostForm from "./EditPostForm";

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
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(Number(params.id));
  return <EditPostForm post={post as Post} />;
}
