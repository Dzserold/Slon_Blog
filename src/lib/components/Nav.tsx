import Image from "next/image";
import logo from "@/lib/images/logo.svg";

const Nav = () => {
  return (
    <nav>
      <div className="flex">
        <Image src={logo} alt="Slon Blog Logo" height={40} width={40} />
        <h1 className="">Slon Blog</h1>
      </div>
    </nav>
  );
};

export default Nav;
