import Posts from "@/components/Posts";
import { getUserPosts } from "@/lib/userPosts";
import Link from "next/link";

const page = async () => {
  const posts = await getUserPosts("20");

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default page;
