import Link from "next/link";

interface Category {
  id: number;
  name: string;
}
[];
interface Post {
  id: number;
  category: Category[];
  title: string;
  content: string;
  authorId: number | null;
  authorName: string | null;
}

interface Data {
  post: Post;
  query: string;
}

// This function shows the post Card in the user searches for Posts
export default function PostCard({ post, query }: Data) {
  function getHighlightedText(text: string, highlight: string) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { backgroundColor: " rgba(223, 255, 99, 0.2)" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className="p-3 text-center bg-black rounded-lg ">
      <h3 className="text-lg ">
        {getHighlightedText(post.title, query)}
      </h3>
      <div className="flex justify-center gap-2">
        <h4 className="">Category: </h4>

        {post.category.map((category) => (
          <p
            key={category.id}
            className="px-2 rounded-md bg-dark_pink"
          >
            {getHighlightedText(category.name, query)}
          </p>
        ))}
      </div>
      <p className="text-sm">{post.content.slice(0, 200)} ...</p>
      <Link href={"posts/" + post.id}>
        <button className="px-2 rounded-md bg-pink hover:scale-105">
          Read more
        </button>
      </Link>
    </div>
  );
}
