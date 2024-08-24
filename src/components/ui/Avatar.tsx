import React from "react";
import { LuUser } from "react-icons/lu";
import ProfileLink from "../profile/ProfileLink";

interface AvatarProps {
  profileId?: string;
  username?: string;
  size?: number;
  link?: boolean;
}

const Avatar = ({
  profileId,
  username,
  size = 48,
  link = true,
}: AvatarProps) => {
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

  if (link) {
    return (
      <ProfileLink username={username}>
        <img
          src={avatarPlaceHolder}
          width={size}
          height={size}
          alt={username ?? profileId}
          className="mr-4 rounded-full"
        />
      </ProfileLink>
    );
  }

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
