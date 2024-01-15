import Image from "next/image";
import ThemeToggle from "./themeToggle";

const Navbar = () => {
  return (
    <nav
      className={`fixed top-0 left-0  flex justify-between md:flex-col md:rounded-tr-lg rounded-bl-lg md:rounded-bl-none rounded-br-lg md:h-screen md:w-24 h-20 w-full  bg-blue-950`}
    >
      <div className={`w-full`}>
        <Image
          src="/img/logo.png"
          alt="logo"
          className="w-20 h-20 md:w-24 md:h-24 "
          width={100}
          height={100}
        />
      </div>
      <div className="w-full h-20 flex md:flex-col md:h-36 items-center justify-end md:justiry-between box-border md:mb-3 mr-3">
        <div className="md:w-24 md:h-24 w-20 h-20 flex items-center justify-center">
          <ThemeToggle />
        </div>
        <div className="md:w-full h-full md:h-0 md:border-t border-r border-blue-600"></div>
        <div className="md:w-24 md:h-24 w-20 h-20 flex items-center  justify-center ">
          <Image
            src="/avatar.jpeg"
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
