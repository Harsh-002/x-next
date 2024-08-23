"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

interface HeaderProps {
  children: React.ReactNode;
  hasBackButton?: boolean;
}

export default function Header({ children, hasBackButton }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="flex w-full items-center gap-4 border-b border-slate-200 p-4 text-xl font-bold">
      {hasBackButton && (
        <button onClick={() => router.back()} className="text-sky-500">
          <LuArrowLeft />
        </button>
      )}
      {children}
    </div>
  );
}
