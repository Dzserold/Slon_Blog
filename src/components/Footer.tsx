import Image from "next/image";
import github from "@/images/github.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-2 customBorder bg-bg">
      <div className="flex flex-row gap-2">
        <h3 className="inline-block">Slon Blog 2024</h3>
        <a
          className="flex gap-2 text-pink hover:scale-105 "
          href="https://github.com/Dzserold/Slon_Blog"
        >
          Source code
          <Image
            src={github}
            alt="github logo"
            width={30}
            height={30}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
