import prisma from "@/lib/client";
import { getSession } from "@/lib/functions";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const session = await getSession();
  const isOwner = session.userId === id;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return (
    <div>
      <p>{user?.id}</p>
      <p>{user?.userName}</p>
      <p>{user?.email}</p>
      {session.isLoggedIn && isOwner ? (
        <Link
          className=""
          href={`/profile/${session.userId}/edit`}
        >
          <button className="inline-block px-3 text-lg font-bold rounded-sm bg-pink hover:bg-dark_pink">
            Edit
          </button>
        </Link>
      ) : null}
    </div>
  );
}
