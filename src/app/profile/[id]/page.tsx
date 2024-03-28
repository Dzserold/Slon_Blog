import prisma from "@/lib/client";
import { getSession, getUserData } from "@/lib/functions";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const session = await getSession();
  const user = await getUserData(id);

  return (
    <section className="flex flex-col items-center gap-3 p-3 text-lg text-center">
      <div className="max-w-lg p-4">
        <h2 className="p-3 text-2xl">
          This is{" "}
          <span className="text-pink">{user.userName} </span>'s
          profile page
        </h2>
        {session.isLoggedIn && session.userId === id ? (
          <div>
            <h3 className="py-4 text-base">
              You can manage your data here. If you would like to
              change something on it, please click the "Edit"
              button below
            </h3>
            <h3 className="text-base">
              You can add a new post by clicking the "NEW POST"
              link
            </h3>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col max-w-md gap-4 p-5 border-4 rounded-lg border-pink">
        <p>
          Your ID: <span className="text-pink">{user?.id}</span>
        </p>
        <p>
          Your Name:{" "}
          <span className="text-pink">{user?.userName}</span>
        </p>
        <p>
          Your Email:{" "}
          <span className="text-pink ">{user?.email}</span>
        </p>
      </div>
      <div>
        {session.isLoggedIn && session.userId === id ? (
          <Link href={`/profile/${session.userId}/edit`}>
            <button className="inline-block px-4 py-1 mx-4 text-lg font-bold rounded-sm text-dark bg-pink hover:bg-dark_pink">
              Edit
            </button>
          </Link>
        ) : null}
        {session.isLoggedIn && session.userId === id ? (
          <Link href={`/profile/${session.userId}/newPost`}>
            <button className="p-3 text-pink hover:text-dark_pink">
              NEW POST
            </button>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
