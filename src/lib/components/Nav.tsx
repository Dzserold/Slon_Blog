import Image from "next/image";
import logo from "@/lib/images/logo.svg";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between">
      <Link href="/">
        <div className="flex items-center p-1">
          <Image src={logo} alt="Slon Blog Logo" height={50} width={50} />
          <h1 className="font-bold text-2xl text-dark_pink">Slon Blog</h1>
        </div>
      </Link>
      <ul className="flex">
        <Link href="/">
          <li className="p-3 text-pink hover:text-dark_pink">HOME</li>
        </Link>
        <Link href="/">
          <li className="p-3 text-pink hover:text-dark_pink">HOME</li>
        </Link>
        <Link href="/">
          <li className="p-3 text-pink hover:text-dark_pink">HOME</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
