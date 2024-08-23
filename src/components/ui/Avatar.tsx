import React from "react";
import { LuUser } from "react-icons/lu";

interface AvatarProps {
  profileId?: string;
  username?: string;
  size?: number;
}

const Avatar = ({ profileId, username, size = 48 }: AvatarProps) => {
  if (!profileId || !username) {
    return (
      <div
        style={{ width: size }}
        className="flex aspect-square justify-center items-center rounded-full bg-slate-200"
      >
        <LuUser className="h-6 w-6 text-slate-400" />
      </div>
    );
  }

  const avatarPlaceHolder = `https://api.dicebear.com/9.x/bottts/svg?seed=${profileId}`;

  return (
    <img
      src={avatarPlaceHolder}
      width={size}
      height={size}
      alt={username ?? profileId}
      className="mr-4 rounded-full"
    />
  );
};

export default Avatar;
