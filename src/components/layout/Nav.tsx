"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LuHome, LuLogIn, LuSearch, LuUser } from "react-icons/lu";

const Nav: React.FC = () => {
  const pathname = usePathname();

  const links = [
    {
      icon: LuHome,
      text: "Home",
      link: "/",
    },
    {
      icon: LuSearch,
      text: "Explore",
      link: "/explore",
    },
    {
      icon: LuUser,
      text: "Profile",
      link: "/profile",
    },
    {
      icon: LuLogIn,
      text: "Login",
      link: "/login",
    },
  ];

  const isActive = (link: string): boolean => {
    return link === "/" ? pathname === link : pathname.startsWith(link);
  };

  return (
    <nav className="flex justify-around py-2 mx-auto md:flex-col md:gap-2 md:py-0 w-full">
      {links.map((item, idx) => (
        <Link
          href={item.link}
          key={idx}
          className={`w-full flex flex-col items-center gap-4 rounded-3xl text-sm md:flex-row md:py-3 md:text-xl md:px-4 md:hover:bg-gray-200 ${isActive(item.link) ? "font-bold" : "font-medium"}`}
        >
          <item.icon size={20} />
          <span>{item.text}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
