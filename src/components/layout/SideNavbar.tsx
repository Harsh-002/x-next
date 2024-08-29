"use client";

import Link from "next/link";
import React from "react";
import { LuSparkle } from "react-icons/lu";
import Nav from "./Nav";
import PostModal from "../post/PostModal";

const SideNavbar: React.FC = () => {
  return (
    <aside className="hidden h-screen w-1/4 border-r border-gray-800 md:top-0 md:flex items-center md:flex-col gap-10 xl:w-1/5 p-6 md:sticky">
      <Link href={"/"}>
        <LuSparkle size={25} />
      </Link>
      <Nav />
      <PostModal />
    </aside>
  );
};

export default SideNavbar;
