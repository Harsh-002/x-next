import React, { useOptimistic, useTransition } from "react";
import RequiresAuth from "../auth/RequiresAuth";
import { LuHeart } from "react-icons/lu";
import { likePost, unLikePost } from "@/lib/actions/likePost";
import { usePathname } from "next/navigation";

interface LikeCountProps {
  likeCount: number;
  likedByUser: boolean;
  postId: string;
}

const LikeCount = ({ likeCount, likedByUser, postId }: LikeCountProps) => {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [optimisticLikeCount, setOptimisticLikeCount] =
    useOptimistic(likeCount);

  const [optimisticLikesByUser, setoptimisticLikesByUser] =
    useOptimistic(likedByUser);

  function likeOrDislikePost(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      if (optimisticLikesByUser) {
        setoptimisticLikesByUser(false);
        setOptimisticLikeCount(optimisticLikeCount - 1);
        await unLikePost(postId, pathname);
      } else {
        setoptimisticLikesByUser(true);
        setOptimisticLikeCount(optimisticLikeCount + 1);
        await likePost(postId, pathname);
      }
    });
  }

  return (
    <div className="flex items-center gap-1">
      <RequiresAuth className="flex items-center" onClick={likeOrDislikePost}>
        <LuHeart
          className={`my-1 h-5 w-5 ${optimisticLikesByUser ? "fill-red-500" : "hover:fill-red-300"}`}
        />
      </RequiresAuth>
      <span>{optimisticLikeCount}</span>
    </div>
  );
};

export default LikeCount;
