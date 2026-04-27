"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

const NavBar = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Car hub logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full bg-white shadow text-xl"
            title="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <CustomButton
            title="Sign In"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
          />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
