"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  LuHome,
  LuLoader,
  LuLogIn,
  LuLogOut,
  LuSearch,
  LuUser,
} from "react-icons/lu";

const Nav: React.FC = () => {
  const { user, handleSignOut, loading } = useAuth();
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
    ...(loading
      ? [{ icon: LuLoader, text: "..." }]
      : user
        ? [
            {
              icon: LuLogOut,
              text: "Logout",
              onClick: handleSignOut,
            },
          ]
        : [
            {
              icon: LuLogIn,
              text: "Login",
              link: "/login",
            },
          ]),
  ];

  const isActive = (link: string): boolean => {
    return link === "/" ? pathname === link : pathname.startsWith(link);
  };

  const commonClassName =
    "w-full flex flex-col items-center gap-4 rounded-3xl text-sm md:flex-row md:py-3 md:text-xl md:px-4 md:hover:bg-gray-200";

  return (
    <nav className="flex justify-around py-2 mx-auto md:flex-col md:gap-2 md:py-0 w-full">
      {links.map((item, idx) => (
        <React.Fragment key={item.text}>
          {item.link ? (
            <Link
              href={item.link}
              className={` ${commonClassName} ${isActive(item.link) ? "font-bold" : "font-medium"}`}
            >
              <item.icon size={20} />
              <span>{item.text}</span>
            </Link>
          ) : (
            <button onClick={item.onClick} className={commonClassName}>
              <item.icon size={20} />
              <span>{item.text}</span>
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Nav;
