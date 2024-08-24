"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface ProfileLinkProps {
  children: React.ReactNode;
  username: string;
  className?: string;
}

const ProfileLink = ({ children, username, className }: ProfileLinkProps) => {
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${username}`);
  }

  return (
    <div role="button" className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default ProfileLink;
