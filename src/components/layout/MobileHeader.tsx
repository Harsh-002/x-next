import Link from "next/link";
import React from "react";
import { LuSparkle } from "react-icons/lu";
import { MdMenu } from "react-icons/md";

const MobileHeader: React.FC = () => {
  return (
    <header className="fixed w-full flex h-14 items-center justify-center bg-white border-b border-gray-400 md:hidden p-4">
      <div className="absolute left-0 p-4">
        <MdMenu size={20} />
      </div>
      <Link href={"/"}>
        <LuSparkle className="h-8 w-8 text-slate-800" />
      </Link>
    </header>
  );
};

export default MobileHeader;
