import Posts from "@/components/Posts";
import { getPostByCategoryId } from "@/lib/category";

export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostByCategoryId(Number(params.id));

  return (
    <div>
      <Posts posts={post} tagId={Number(params.id)} />
    </div>
  );
}
