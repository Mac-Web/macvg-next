"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NavSearch from "../ui/NavSearch";
import Logo from "./Logo";
import Link from "next/link";

const navLinkStyles = "text-gray-800 dark:text-gray-300 transition-colors p-2.5 hover:text-primary";

function cloak(cloaker?: object) {
  const savedCloaker = localStorage.getItem("macvg-cloaker");
  if (savedCloaker) {
    const { name, icon } = cloaker || JSON.parse(savedCloaker);
    console.log(name, icon);

    //TODO: add dynamic favicon parsing this is going super well
    setTimeout(() => {
      document.title = name;
      if (icon) {
        console.log(Array(document.getElementsByTagName("link"))[0]);
        (document.querySelector('[rel="icon"]')! as HTMLLinkElement).href = icon;
      }
    }, 100);
  }
}

function Nav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("macvg-themes");
    if (savedTheme) {
      const { primary, primaryHover, secondary } = JSON.parse(savedTheme);
      document.documentElement.style.setProperty("--primary", primary);
      document.documentElement.style.setProperty("--primary-hover", primaryHover);
      document.documentElement.style.setProperty("--secondary", secondary);
    }
    const cloakerListener = (e: any) => {
      cloak(e.detail?.cloaker);
    };
    window.addEventListener("cloaker-change", cloakerListener);
    return () => {
      window.removeEventListener("cloaker-change", cloakerListener);
    };
  }, []);

  useEffect(() => {
    cloak();
  }, [pathname]);

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
        {children}
      </div>
    </nav>
  );
}

export default Nav;
