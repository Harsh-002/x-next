import React from "react";
import RequiresAuth from "../auth/RequiresAuth";
import { LuHeart } from "react-icons/lu";

interface LikeCountProps {
  likeCount: number;
  likedByUser: boolean;
}

const LikeCount = ({ likeCount, likedByUser }: LikeCountProps) => {
  return (
    <div className="flex">
      <RequiresAuth>
        <LuHeart
          className={`my-1 h-5 w-5 ${likedByUser ? "fill-red-500" : "hover:fill-red-300"}`}
        />
      </RequiresAuth>
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeCount;
