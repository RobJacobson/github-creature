import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="absolute top-0 flex w-full items-center justify-between p-4">
      <Image
        src="/github-creature-logo.png"
        alt="logo"
        width={60}
        height={60}
      />
      <ModeToggle />
    </header>
  );
};

export default Header;
