"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import NavSearch from "../ui/NavSearch";
import PrimaryButton from "../ui/PrimaryButton";
import Logo from "./Logo";
import Link from "next/link";

const navLinkStyles = "text-gray-800 dark:text-gray-300 transition-colors p-2.5 hover:text-primary";

function Nav() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("macvg-themes");
    if (savedTheme) {
      const { primary, primaryHover, secondary } = JSON.parse(savedTheme);
      document.documentElement.style.setProperty("--primary", primary);
      document.documentElement.style.setProperty("--primary-hover", primaryHover);
      document.documentElement.style.setProperty("--secondary", secondary);
    }
  }, []);

  function handleSignin() {
    console.log("Sign in");
  }

  return (
    <nav
      className="flex items-center justify-between gap-x-2 border-b border-gray-700 px-5 md:px-20 lg:px-[calc(50%-550px)] h-17 z-50 
    sticky top-0 bg-gray-200 dark:bg-gray-950"
    >
      <Link
        href="/"
        className="flex items-center gap-x-2 text-black dark:text-white text-lg duration-300 pr-5 py-2 font-bold
       hover:text-shadow-gray-400 hover:text-shadow-sm"
        scroll={true}
      >
        <Logo /> MacVG
      </Link>
      <NavSearch />
      <div className="flex gap-x-3 items-center">
        <div className="md:flex items-center gap-x-3 hidden">
          <Link href="/new" className={navLinkStyles}>
            New
          </Link>
          <Link href="/trending" className={navLinkStyles}>
            Trending
          </Link>
          <Link href="/recent" className={navLinkStyles}>
            Recent
          </Link>
          <Link href="/settings" className={navLinkStyles}>
            Settings
          </Link>
        </div>
        <PrimaryButton text="Sign in" click={handleSignin} />
        <PrimaryButton text="Theme" click={() => setTheme(theme === "light" ? "dark" : "light")} />
      </div>
    </nav>
  );
}

export default Nav;
