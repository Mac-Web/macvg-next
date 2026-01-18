"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { MdLogout, MdLightMode, MdDarkMode } from "react-icons/md";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";

const menuOptionStyles =
  "flex gap-x-3 items-center text-gray-800 dark:text-gray-100 py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer duration-300 rounded group";

type NavUserProps = {
  children: React.ReactNode;
  user: Session["user"];
};

function NavUser({ children, user }: NavUserProps) {
  //TODO: pass in credentials pfp from navicon child server component that fetches pfp data from backend

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const clickHandler = (e: Event) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="rounded-full cursor-pointer w-10 h-10 border-2 border-gray-700 overflow-hidden"
        onClick={() => setMenuOpen(true)}
      >
        {user?.image ? (
          <Image src={user.image} alt="Avatar" title="Avatar" width={40} height={40} />
        ) : (
          <Image src="/icons/profile/user.svg" alt="Avatar" title="Avatar" width={40} height={40} />
        )}
      </motion.div>
      {menuOpen && (
        <div className="absolute right-0 top-[120%] flex flex-col rounded-lg p-2 bg-gray-100 dark:bg-gray-900 w-35" ref={menuRef}>
          <div className={`${menuOptionStyles} font-bold hover:bg-gray-100!  dark:hover:bg-gray-900! cursor-default!`}>
            {user?.name}
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_AUTH_URL}/profile`}
            className={`${menuOptionStyles} group`}
            onClick={() => setMenuOpen(false)}
          >
            <FaUser size={20} className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" />
            Profile
          </a>
          <div className={menuOptionStyles} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? (
              <MdLightMode size={20} className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" />
            ) : (
              <MdDarkMode size={20} className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" />
            )}
            Theme
          </div>
          <div className={menuOptionStyles} onClick={() => signOut()}>
            <MdLogout className="group-hover:scale-120 group-hover:-translate-y-1 duration-300" size={20} />
            Log out
          </div>
        </div>
      )}
    </div>
  );
}

export default NavUser;
