import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  category: Category[];
}

interface Category {
  id: number;
  name: string;
}

interface PostsArray {
  posts: Post[];
}
export default function Posts(posts: PostsArray) {
  return <div></div>;
}
