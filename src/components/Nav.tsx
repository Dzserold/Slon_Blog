import Image from "next/image";
import logo from "@/images/logo.svg";
import Link from "next/link";
import { getSession } from "@/lib/functions";

const Nav = async () => {
  const session = await getSession();

  return (
    <nav className="flex justify-between items-center p-2 w-full">
      <Link href="/">
        <div className="flex items-center p-1">
          <Image
            src={logo}
            alt="Slon Blog Logo"
            height={50}
            width={50}
          />
          <h1 className="text-3xl font-bold text-dark_pink">
            Slon<span className="text-pink">Blog</span>
          </h1>
        </div>
      </Link>
      {session.isLoggedIn && (
        <div className="p-2 text-3xl hidden sm:inline-block">
          Wellcome{" "}
          <span className="text-pink">{session.userName}</span>
        </div>
      )}
      <div className="flex">
        <ul className="flex">
          <Link href="/">
            <li className="p-3 text-pink hover:text-dark_pink hidden sm:inline-block">
              HOME
            </li>
          </Link>
          <Link href="/posts">
            <li className="p-3 text-pink hover:text-dark_pink">
              POSTS
            </li>
          </Link>
        </ul>
        {session.isLoggedIn ? (
          <Link href={`/profile/${session.userId}`}>
            <h3 className="p-2 text-lg font-bold hover:text-dark_pink">
              Profile
            </h3>
          </Link>
        ) : (
          <Link href="/login">
            <h3 className="p-2 text-lg font-bold hover:text-dark_pink">
              Login
            </h3>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
